import { LDSP_TYPE } from '../container/BottomNav';

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';
// export const LDSP = (process.env.NEXT_PUBLIC_CONFIG_TYPE || null) as LDSP_TYPE;
export const getInitialLdspFromServer = (runtimeLdsp: string) => {
  if (!runtimeLdsp) return 'LOCAL';
  return runtimeLdsp;
};
export const LDSP_ARR = [`LOCAL`, `DEV_LOCAL`, `GREEN_LOCAL`, `PRJ_DEV`, `DEV`, `STG`, `GREEN`, `BLUE`];

export const NETFUNNEL_BRIDGE_REL_URL = `/common/util/netfunnel?type=w_replace&target=`;
export const SS_NETFUNNEL_BRIDGE_REL_URL = `/v6/netfunnel?target=`;
export const VENDOR_CRAWLER = /facebook|kakaotalk/;
// 바텀네비를 사용하지 않는 페이지 리스트
export const PAGES_WITHOUT_BOTTOM_NAVI = [
  '/v6/ttime/story',
  '/v6/survey/step1',
  '/v6/survey/step2',
  '/v6/survey/step3',
  '/v6/survey/step4',
  '/v6/survey/step5',
  '/v6/survey/step6',
  '/v6/survey/complete',
  '/v6/block',
  '/v6/404',
];

export const TWORLD_URL = {
  LOCAL: 'https://v6local.tworld.co.kr:3443',
  STG_LOCAL: 'https://v6local.tworld.co.kr:3443',
  GREEN_LOCAL: 'https://v6local.tworld.co.kr:3443',
  PRJ_DEV: 'https://m-prj-dev.tworld.co.kr',
  DEV: 'https://m-dev.tworld.co.kr',
  STG: 'https://m-stg.tworld.co.kr',
  GREEN: 'https://m-prd.tworld.co.kr',
  BLUE: 'https://m.tworld.co.kr',
};

export const TWORLD_APP_URL = {
  LOCAL: 'https://app-dev.tworld.co.kr',
  STG_LOCAL: 'https://app-stg.tworld.co.kr',
  GREEN_LOCAL: 'https://app-prd.tworld.co.kr',
  PRJ_DEV: 'https://app-prj-dev.tworld.co.kr',
  DEV: 'https://app-dev.tworld.co.kr',
  STG: 'https://app-stg.tworld.co.kr',
  GREEN: 'https://app-prd.tworld.co.kr',
  BLUE: 'https://app.tworld.co.kr',
};

export const WEB_NETFUNNEL_BRIDGE_URL = {};
LDSP_ARR.forEach((ldsp) => {
  WEB_NETFUNNEL_BRIDGE_URL[ldsp] = `${TWORLD_URL[ldsp]}${NETFUNNEL_BRIDGE_REL_URL}`;
});

export const SHOP_URL = {
  LOCAL: 'https://m.shop.tworld.co.kr',
  STG_LOCAL: 'https://m.shop.tworld.co.kr',
  GREEN_LOCAL: 'https://m.shop.tworld.co.kr',
  PRJ_DEV: 'https://m.shop.tworld.co.kr',
  DEV: 'https://m.shop.tworld.co.kr',
  STG: 'https://stg.m.shop.tworld.co.kr',
  GREEN: 'https://m.shop.tworld.co.kr',
  BLUE: 'https://m.shop.tworld.co.kr',
};

export const SHOP_APP_URL = {
  LOCAL: 'https://stg-my-shop.tworld.co.kr',
  STG_LOCAL: 'https://stg-my-shop.tworld.co.kr',
  GREEN_LOCAL: 'https://my-shop.tworld.co.kr',
  PRJ_DEV: 'https://stg-my-shop.tworld.co.kr',
  DEV: 'https://stg-my-shop.tworld.co.kr',
  STG: 'https://stg-my-shop.tworld.co.kr',
  GREEN: 'https://my-shop.tworld.co.kr',
  BLUE: 'https://my-shop.tworld.co.kr',
};

// prettier-ignore
export const SHOP_BNAV_BTN_URL = {
  LOCAL: `${SHOP_URL.LOCAL}/nf/index_nf.html?&utm_campaign=renewal&utm_source=tworld&utm_medium=m_bttmnavi`,
  STG_LOCAL:  `${SHOP_URL.STG}/nf/index_nf.html?&utm_campaign=renewal&utm_source=tworld&utm_medium=m_bttmnavi`,
  GREEN_LOCAL:  `${SHOP_URL.GREEN}/nf/index_nf.html?&utm_campaign=renewal&utm_source=tworld&utm_medium=m_bttmnavi`,
  PRJ_DEV:   `${SHOP_URL.PRJ_DEV}/nf/index_nf.html?&utm_campaign=renewal&utm_source=tworld&utm_medium=m_bttmnavi`,
  DEV:   `${SHOP_URL.DEV}/nf/index_nf.html?&utm_campaign=renewal&utm_source=tworld&utm_medium=m_bttmnavi`,
  STG:   `${SHOP_URL.STG}/nf/index_nf.html?&utm_campaign=renewal&utm_source=tworld&utm_medium=m_bttmnavi`,
  GREEN: `${SHOP_URL.GREEN}/nf/index_nf.html?&utm_campaign=renewal&utm_source=tworld&utm_medium=m_bttmnavi`,
  BLUE:  `${SHOP_URL.BLUE}/nf/index_nf.html?&utm_campaign=renewal&utm_source=tworld&utm_medium=m_bttmnavi`,
};

// 앱에서는 네이티브가 app-version API 응답값을 사용하여 실제 사용되는 케이스는 없음
export const SHOP_BNAV_BTN_APP_URL = {
  LOCAL: `${SHOP_APP_URL.LOCAL}/main/home?linkChnlSvcId=TWD-MOB&utm_campaign=renewal&utm_source=tworld&utm_medium=app_bttmnavi`,
  STG_LOCAL: `${SHOP_APP_URL.STG}/main/home?linkChnlSvcId=TWD-MOB&utm_campaign=renewal&utm_source=tworld&utm_medium=app_bttmnavi`,
  GREEN_LOCAL: `${SHOP_APP_URL.GREEN}/main/home?linkChnlSvcId=TWD-MOB&utm_campaign=renewal&utm_source=tworld&utm_medium=app_bttmnavi`,
  PRJ_DEV: `${SHOP_APP_URL.PRJ_DEV}/main/home?linkChnlSvcId=TWD-MOB&utm_campaign=renewal&utm_source=tworld&utm_medium=app_bttmnavi`,
  DEV: `${SHOP_APP_URL.DEV}/main/home?linkChnlSvcId=TWD-MOB&utm_campaign=renewal&utm_source=tworld&utm_medium=app_bttmnavi`,
  STG: `${SHOP_APP_URL.STG}/main/home?linkChnlSvcId=TWD-MOB&utm_campaign=renewal&utm_source=tworld&utm_medium=app_bttmnavi`,
  GREEN: `${SHOP_APP_URL.GREEN}/main/home?linkChnlSvcId=TWD-MOB&utm_campaign=renewal&utm_source=tworld&utm_medium=app_bttmnavi`,
  BLUE: `${SHOP_APP_URL.BLUE}/main/home?linkChnlSvcId=TWD-MOB&utm_campaign=renewal&utm_source=tworld&utm_medium=app_bttmnavi`,
};

export const V6_API_BASE_URL = {
  LOCAL: 'https://m-dev.tworld.co.kr:443/api/v6',
  STG_LOCAL: 'https://m-stg.tworld.co.kr:443/api/v6',
  GREEN_LOCAL: 'https://m-prd.tworld.co.kr:443/api/v6',
  PRJ_DEV: 'https://m-dev.tworld.co.kr:443/api/v6',
  DEV: 'https://m-dev.tworld.co.kr:443/api/v6',
  STG: 'https://m-stg.tworld.co.kr:443/api/v6',
  GREEN: 'https://m-prd.tworld.co.kr:443/api/v6',
  BLUE: 'https://app.tworld.co.kr:443/api/v6',
};

export const V6_PRIVATE_API_BASE_URL = {
  LOCAL: 'https://m-dev.tworld.co.kr:443/api/v6',
  STG_LOCAL: 'https://m-stg.tworld.co.kr:443/api/v6',
  GREEN_LOCAL: 'https://m-prd.tworld.co.kr:443/api/v6',
  PRJ_DEV: 'https://priv-agw-dev.tworld.co.kr/api/v6',
  DEV: 'https://priv-agw-dev.tworld.co.kr/api/v6',
  STG: 'https://priv-agw-stg.tworld.co.kr/api/v6',
  GREEN: 'https://priv-agw-green.tworld.co.kr/api/v6',
  BLUE: 'https://priv-agw.tworld.co.kr/api/v6',
};

export const SKTUNIVERSE_URL = {
  LOCAL: 'https://stg-scm-front.tworld.co.kr',
  STG_LOCAL: 'https://stg-scm-front.tworld.co.kr',
  GREEN_LOCAL: 'https://m-sktuniverse.tworld.co.kr',
  PRJ_DEV: 'https://stg-scm-front.tworld.co.kr',
  DEV: 'https://stg-scm-front.tworld.co.kr',
  STG: 'https://stg-scm-front.tworld.co.kr',
  GREEN: 'https://m-sktuniverse.tworld.co.kr',
  BLUE: 'https://m-sktuniverse.tworld.co.kr',
};

export const S3_URL = {
  LOCAL: 'https://s3-tworld-stg-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com',
  STG_LOCAL: 'https://s3-tworld-stg-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com',
  GREEN_LOCAL: 'https://s3-tworld-prd-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com',
  PRJ_DEV: 'https://s3-tworld-dev-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com',
  DEV: 'https://s3-tworld-dev-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com',
  STG: 'https://s3-tworld-stg-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com',
  GREEN: 'https://s3-tworld-prd-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com',
  BLUE: 'https://cdnm.tworld.co.kr',
};
