@Library('retort') _

timestamps {

	node(NODE_NAME) {
			
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
		
        stage('Build Docker Image') {
            dir(WORKSPACE){
             	docker.withRegistry("https://${DOCKER_REGISTRY}", "tworld-cloud-harbor-credentials"){
	                app=docker.build("${DOCKER_REPOSITORY}:${VERSION}", "--build-arg BUILD_ENV=${BUILD_ENV} --build-arg DOCKER_REGISTRY=${DOCKER_REGISTRY} .")
            		app.push()
                }
            }
        }
        
        stage('deploy on EKS'){
            dir(WORKSPACE){

                if(IS_INIT_DEPLOY == 'false'){
                    kubeCmd.delete file: "k8s/deployment-${BUILD_ENV}.yml", namespace: K8S_NAMESPACE, recoverOnFail: false, recoverFile: "k8s/deployment-${BUILD_ENV}.yml"
                    kubeCmd.delete file: "k8s/service-${BUILD_ENV}.yml", namespace: K8S_NAMESPACE, recoverOnFail: false, recoverFile: "k8s/service-${BUILD_ENV}.yml"
                }
                kubeCmd.apply file: "k8s/deployment-${BUILD_ENV}.yml", namespace: K8S_NAMESPACE, recoverOnFail: false, recoverFile: "k8s/deployment-${BUILD_ENV}.yml"
                kubeCmd.apply file: "k8s/service-${BUILD_ENV}.yml", namespace: K8S_NAMESPACE, recoverOnFail: false, recoverFile: "k8s/service-${BUILD_ENV}.yml"
            }
        }

        stage('Sync S3'){
            if(IS_CDN_DEPLOY == 'false'){
                return
            } 
            dir(WORKSPACE){
                sh '''

                rm -rf s3_tmp
                mkdir s3_tmp

                runningPod=$(kubectl get po -o=name -l app=${PROJECT_NAME}  -n mtw-${BUILD_ENV} --field-selector=status.phase==Running -o 'jsonpath={.items[0].metadata.name}')
                echo $runningPod
                
                kubectl cp mtw-${BUILD_ENV}/$runningPod:.next/static s3_tmp
                ls s3_tmp

                aws s3 sync --acl public-read --cache-control max-age=8640 s3_tmp s3://s3-tworld-${BUILD_ENV}-an2-cdn-origin-mobile/_next/static

                '''
            }
          
        }
        
        stage('Build History'){
            currentBuild.description = VERSION
        }
	}      

}
