@Library('jenkins-retort') _

import org.jenkinsci.plugins.pipeline.modeldefinition.Utils

def stage(name, execute, block) {
	return stage(name, execute ? block : {
		echo "Skipped stage : $name"
		Utils.markStageSkippedForConditional(STAGE_NAME)
	})
}

def isExecute = true
def isScale = false
def isDelete = false
def isRoute = false
def label = "jenkins-${UUID.randomUUID().toString()}"

timestamps {
	node (NODE_NAME) {
        stage ('Get Ready') {
            echo "=============== Worksapce = $WORKSPACE "
            script {
                properties([
                    parameters([
                        string(
                            name:'GIT_BRANCH',
                            defaultValue: 'develop',
                            description: '배포 브랜치'
                        ),
                        booleanParam(
                            defaultValue: false,
                            description: 'IS_INIT_DEPLOY',
                            name: 'IS_INIT_DEPLOY'
                        ),
                        booleanParam(
                            defaultValue: true,
                            description: 'Gulp build 후 S3로 파일을 복사 후 동기화합니다.',
                            name: 'SYNC_TO_S3'
                        ),booleanParam(
                            defaultValue: true,
                            description: '도커 컨테이너 캐시를 제거하여 용량을 확보합니다.',
                            name: 'REMOVE_CONTAINER_CACHE'
                        )
                    ])
                ])
            }
        }

        stage('Checkout Source') {
            dir(WORKSPACE){
                checkout([$class: "GitSCM",
                    branches: [[name: GIT_BRANCH]],
                    userRemoteConfigs: [[
                        url: GIT_URL,
                        credentialsId: "tworld-cloud-git-credentials"
                    ]]
                ])
                
            }    
		}		

        stage ('Remove Docker Cache') {
            if (params.REMOVE_CONTAINER_CACHE == false) {
                return
            }
            dir (WORKSPACE) {
                sh '''
                    docker system prune --all --force
                '''
            }
        }

        echo "=============== Validate K8s Version ================"

        stage('Validate K8s Version', isExecute) {
            dir (WORKSPACE) {
                try {
                    def blueAppDockerImgVer
                    def blueAppDeployVer
                    def newVersion = getDoubleDigitsNewVersion();

                    sh "cp -p k8s/deployment-prd.yml k8s/deployment-prd-tmp.yml"
                    sh "cp -p k8s/deployment-green.yml k8s/deployment-green-tmp.yml"
                    sh "cp -p k8s/service-prd.yml k8s/service-prd-tmp.yml"
                    sh "cp -p k8s/service-green.yml k8s/service-green-tmp.yml"

                    echo "=== New Green Version : $newVersion ==="
                    if("${IS_INIT_DEPLOY}" == 'false') {
                        blueAppDeployVer = sh(script: """
                                                    kubectl get service ${K8S_APP_NAME} \
                                                    -n ${K8S_NAMESPACE} \
                                                    -o=jsonpath='{.spec.selector.version}'
                                                    """, returnStdout: true)
                        echo "=============== Validate K8s Version 3 blueAppDeployVer = $blueAppDeployVer "
                        
                        yaml.bluegreenDeployUpdate file: "k8s/deployment-prd.yml", deployName:"${PROJECT_NAME}-${blueAppDeployVer}", version: "${blueAppDeployVer}", dockerImage:"${DOCKER_REPOSITORY}:${blueAppDeployVer}"

                        greenAppDeployVer = sh(script: """
                                                    kubectl get service ${K8S_APP_NAME}-g \
                                                    -n ${K8S_NAMESPACE} \
                                                    -o=jsonpath='{.spec.selector.version}'
                                                    """, returnStdout: true)
                        echo "=============== Validate K8s Version 3 greenAppDeployVer = $greenAppDeployVer "
                        
                        yaml.bluegreenDeployUpdate file: "k8s/deployment-green.yml", deployName:"${PROJECT_NAME}-g-${greenAppDeployVer}", version: "${greenAppDeployVer}", dockerImage:"${DOCKER_REPOSITORY}:${greenAppDeployVer}"
                    }

                    yaml.bluegreenDeployUpdate file: "k8s/deployment-green-tmp.yml", deployName:"${PROJECT_NAME}-g-${newVersion}", version: "${newVersion}", dockerImage:"${DOCKER_REPOSITORY}:${newVersion}"
                    yaml.bluegreenDeployUpdate file: "k8s/deployment-prd-tmp.yml", deployName:"${PROJECT_NAME}-${newVersion}", version: "${newVersion}", dockerImage:"${DOCKER_REPOSITORY}:${newVersion}"

                    yaml.bluegreenServiceUpdate file: "k8s/service-green-tmp.yml", version: "${newVersion}"
                    yaml.bluegreenServiceUpdate file: "k8s/service-prd-tmp.yml", version: "${newVersion}"

                } catch(Exception e) {
                    echo e.toString()
                    throw e
                }
            }
        }

        stage('Build Docker Image') {
            dir(WORKSPACE){
                def newVersion = getDoubleDigitsNewVersion();
             	docker.withRegistry("https://${DOCKER_REGISTRY}", "tworld-cloud-harbor-credentials"){
	                app=docker.build("${DOCKER_REPOSITORY}:${newVersion}", "--build-arg BUILD_ENV=green --build-arg DOCKER_REGISTRY=${DOCKER_REGISTRY} .")
            		app.push()
                }
            }
        }

        echo "=============== 5 Deploy K8s Green App ================"

        stage('Deploy K8s Green App', isExecute) {
            dir (WORKSPACE) {
                try {
                    def deployVer = getDoubleDigitsNewVersion();
                    echo "=== New Green Version : $deployVer ==="
                    
                    echo "================ deployment cat ===================="
                    sh "cat k8s/deployment-green-tmp.yml"

                    sh "kubectl apply -f k8s/deployment-green-tmp.yml -n ${K8S_NAMESPACE}"

                    input('Please wait 1 min.')

                    sh "cat k8s/service-green.yml"
                    sh "kubectl apply -f k8s/service-green-tmp.yml -n ${K8S_NAMESPACE}"

                    if("${IS_INIT_DEPLOY}" == 'false') {
                        sh "kubectl delete -f k8s/deployment-green.yml -n ${K8S_NAMESPACE}"
                    }
            
                    sh "rm -f k8s/deployment-green-tmp.yml"
                    sh "rm -f k8s/service-green-tmp.yml"
                    yaml.bluegreenDeployUpdate file: "k8s/deployment-green.yml", deployName:"${PROJECT_NAME}-g-${deployVer}", version: "${deployVer}", dockerImage:"${DOCKER_REPOSITORY}:${deployVer}"
                     
                    isScale = true
                } catch(Exception e) {
                    echo e.toString()
                    throw e
                }
            }
        }

        echo "=============== Confirm Synchronize S3 ================"

        stage('Confirm Synchronize S3', isExecute) {
            try{
                input('Confirm to Synchronize S3 ?')
                isScale = true
            } catch(Exception e) {
                isScale = true
            }
        }

        stage('Sync S3'){
           if (params.SYNC_TO_S3 == false) {
                return
            }
            dir(WORKSPACE){
                sh '''

                rm -rf s3_tmp
                mkdir s3_tmp

                runningPod=$(kubectl get po -o=name -l app=${PROJECT_NAME}-g --sort-by=".metadata.creationTimestamp" -n mtw-${BUILD_ENV} --field-selector=status.phase==Running -o 'jsonpath={.items[0].metadata.name}')
                echo $runningPod
                
                kubectl cp mtw-${BUILD_ENV}/$runningPod:.next/static s3_tmp
                ls s3_tmp

                aws s3 sync --acl public-read --cache-control max-age=8640 s3_tmp s3://s3-tworld-${BUILD_ENV}-an2-cdn-origin-mobile/_next/static
                rm -rf s3_tmp
                '''
            }
          
        }


        echo "=============== Scale Out Green Deployment ================"

        isScale = ((isScale == true && isExecute == true)) ? true : false
        isDelete = ((isScale == false && isExecute == true)) ? true : false

        echo "=============== Delete Green Deployment ================"

        stage('Delete Green Deployment', isDelete) {
            try {
                echo '=== ScaleOut Denied : Delete Green Application ==='

                dir (WORKSPACE) {

                    if("${IS_INIT_DEPLOY}" == 'false') {
                        sh "kubectl apply -f k8s/service-green.yml -n ${K8S_NAMESPACE}"
                    } else {
                        sh "kubectl delete -f k8s/service-green-tmp.yml -n ${K8S_NAMESPACE}"
                    }

                    sh "kubectl delete -f k8s/deployment-green-tmp.yml -n ${K8S_NAMESPACE}"

                    sh "rm -f k8s/deployment-green-tmp.yml"
                    sh "rm -f k8s/service-green-tmp.yml"

                    currentBuild.result = 'UNSTABLE'
                }

                isExecute = false

            } catch(Exception ex) {
                echo ex.toString()
                throw ex
            }
        }


        stage('Confirm Routing to Blue App', isExecute) {
            try{
                input('Confirm to Rout to Blue App on eks?')
                isRoute = true
            } catch(Exception e) {
                isRoute = false
            }
        }

        isRoute = ((isRoute == true && isExecute == true)) ? true : false
        isDelete = ((isRoute == false && isExecute == true)) ? true : false

        stage('Rounting Blue Service to Green Deployment', isRoute) {
            dir (WORKSPACE) {
                try {
                    def deployVer = getDoubleDigitsNewVersion();
                    echo '=== New Blue Version : ${deployVer} ==='
                    
                    echo "================ deployment cat ===================="
                    sh "cat k8s/deployment-prd-tmp.yml"

                    sh "kubectl apply -f k8s/deployment-prd-tmp.yml -n ${K8S_NAMESPACE}"

                    input('Please wait 1 min.')

                    sh "cat k8s/service-prd.yml"
                    sh "kubectl apply -f k8s/service-prd-tmp.yml -n ${K8S_NAMESPACE}"
                    
                    if("${IS_INIT_DEPLOY}" == 'false') {
                        sh "kubectl delete -f k8s/deployment-prd.yml -n ${K8S_NAMESPACE}"
                    }
            
                    sh "rm -f k8s/deployment-prd-tmp.yml"
                    sh "rm -f k8s/service-prd-tmp.yml"
                    yaml.bluegreenDeployUpdate file: "k8s/deployment-prd.yml", deployName:"${PROJECT_NAME}-${deployVer}", version: "${deployVer}", dockerImage:"${DOCKER_REPOSITORY}:${deployVer}"
                     
                } catch(Exception e) {
                    echo e.toString()
                    throw e
                }
            }
        }

 
        stage('Purge CDN', isRoute) {
            try {
                echo 'Request Purge'

                dir (WORKSPACE) {
                    sh 'curl -d "key=edafaa47a13d215b51339c938c8cf2aa&domain_id=cdnm.tworld.co.kr&urls=[\\"https://cdnm.tworld.co.kr/_next/*\\"]" -H "Content-Type: application/x-www-form-urlencoded" -X POST http://stats.myskcdn.com/api/purge'
                    //sh 'curl -d "key=9d9fecf021eec70a2e14f05b6b61e5665a1d9755c49c44296eec3f5773edf687&domain_id=cdnm2.tworld.co.kr&urls=[\\"https://cdnm2.tworld.co.kr/_next/*\\"]" -H "Content-Type: application/x-www-form-urlencoded" -X POST http://stats.myskcdn.com/api/purge'
                }
            } catch(Exception ex) {
                echo ex.toString()
                throw ex
            }
        }       

    }
   
    
    
}

def getDoubleDigitsNewVersion() {
    def version = "1.${BUILD_NUMBER}"
    return version;
}

def printTitle(msg) {
    sh """
        set +x
        echo "#####################################"
        echo "# $msg"
        echo "#####################################"
        set -x
    """
}