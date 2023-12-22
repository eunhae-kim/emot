const env = require('dotenv');

//console.log(env, process.env.NEXT_PUBLIC_CONFIG_TYPE, process.env.NEXT_PUBLIC_CONFIG_TYPE === 'LOCAL');

env.config({ path: `${__dirname}/config/.env.common` });

let redirectRules = [
  {
    source: '/',
    destination: '/404',
  },
];

const ldspCfg = {};

if (process.env.DEPLOY_ENV === 'LOCAL') {
  console.log(`env`, JSON.stringify(process.env, null, 2));

  redirectRules.push({
    source: '/:path((?!v6).*)',
    destination: 'https://m-stg.tworld.co.kr/:path',
    basePath: false,
  });

  //ldspCfg.assetPrefix = 'https://cdn.mydomain.com';
}

if (process.env.DEPLOY_ENV === 'STG' && process.env.CONTAINER_ENV != 'FARGATE') {
  ldspCfg.assetPrefix = 'https://s3-tworld-stg-an2-cdn-origin-mobile.s3.ap-northeast-2.amazonaws.com';
}

if (process.env.DEPLOY_ENV === 'GREEN' || process.env.DEPLOY_ENV === 'BLUE') {
  redirectRules.push({
    source: '/publish/:path*',
    destination: '/404',
  });

  if (process.env.DEPLOY_ENV === 'GREEN') {
    ldspCfg.assetPrefix = 'https://s3-tworld-prd-an2-cdn-origin-mobile.s3.ap-northeast-2.amazonaws.com';
  }

  if (process.env.DEPLOY_ENV === 'BLUE') {
    ldspCfg.assetPrefix = 'https://cdnm.tworld.co.kr';
  }
}

const cfg = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  ...ldspCfg,
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/xtr/:path*',
          destination: 'https://xtr.tos.sktelecom.com/:path*',
        },
        ...redirectRules,
      ],
    };
  },
};
module.exports = cfg;
