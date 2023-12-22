import { Lang } from '../common/types';
import { callBridgeApi, guessLang, isServer } from '../common/utils';
import {
  NETFUNNEL_BRIDGE_REL_URL,
  SHOP_APP_URL,
  SHOP_URL,
  SKTUNIVERSE_URL,
  SS_NETFUNNEL_BRIDGE_REL_URL,
  TWORLD_APP_URL,
  TWORLD_URL,
} from '../common/const';
import v6NetfunnelWrapper from '../common/v6NetfunnelWrapper';
import { LDSP_TYPE } from '../container/BottomNav';
import { NewWindowType } from '../components/Common/V6Link';

export const getCookie = (key) => {
  if (typeof window !== 'object') return;

  const cookieItemList = document.cookie.split(';');
  let value = null;

  cookieItemList.forEach((item) => {
    const cookieItem = item.split('=');
    if (cookieItem[0].trim() === key) {
      value = cookieItem[1].trim();
    }
  });

  return value;
};

export const setCookie = (name, value, hour?) => {
  let expires = '';
  if (hour) {
    const date = new Date();
    date.setTime(date.getTime() + hour * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }

  if (name === 'SessionUpdatedAt' && global.LDSP !== 'LOCAL') {
    document.cookie = `${name}=${value || ''}${expires};domain=.tworld.co.kr;path=/;`;
  } else {
    document.cookie = `${name}=${value || ''}${expires};path=/;`;
  }
};

export const deleteCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;`;
};

export const getServiceName = (svcAttrCd: string, lang: Lang) => {
  if (lang === 'EN') {
    switch (svcAttrCd) {
      case 'M1': {
        return 'Mobile';
      }
      case 'M2': {
        return 'Prepaid';
      }
      case 'M3': {
        return 'Pocket';
      }
      case 'M4': {
        return 'T login';
      }
      case 'S1': {
        return 'Internet';
      }
      case 'S2': {
        return 'IPTV';
      }
      case 'S3': {
        return 'Landline';
      }
      default: {
        return null;
      }
    }
  } else {
    switch (svcAttrCd) {
      case 'M1': {
        return '휴대폰';
      }
      case 'M2': {
        return '선불폰';
      }
      case 'M3': {
        return 'T Pocket-Fi';
      }
      case 'M4': {
        return 'T login';
      }
      case 'S1': {
        return '인터넷';
      }
      case 'S2': {
        return 'IPTV';
      }
      case 'S3': {
        return '전화';
      }
      default: {
        return null;
      }
    }
  }
};

export const getDisplayName = (svcInfo, lang?: Lang) => {
  lang = lang || guessLang();
  const res = getServiceName(svcInfo.svcAttrCd, lang);

  if (res) return res;
  if (lang === 'EN') {
    return `${svcInfo.mbrNm}`;
  }
  return `${svcInfo.mbrNm} 님`;
};

export const getDisplayNameForLineSelector = (svcInfo, lang: Lang) => {
  if (lang === 'KO') {
    // 닉네임
    if (svcInfo.nickNm) return svcInfo.nickNm;
    // 팬네임
    if (svcInfo.oriRmk) return svcInfo.oriRmk;
  }

  // 서비스명
  // 자녀 회선은 svcAttrCd이 없고 모바일만 등록 가능해서 모바일로 간주
  return getServiceName(svcInfo.svcAttrCd || 'M1', lang);
};

export const hypenatePhoneNumber = (phoneNumber: string) => {
  return phoneNumber.replace(/(02|\S{3})(\S+)(\S{4})/, '$1-$2-$3');
};
export const getDisplayNumber = (svcInfo) => {
  switch (svcInfo.svcAttrCd) {
    case 'M1':
    case 'M2':
    case 'M3':
    case 'M4':
      return hypenatePhoneNumber(svcInfo.svcNum);
    case 'S1':
    case 'S2':
      return svcInfo.addr;
    case 'S3':
      return hypenatePhoneNumber(svcInfo.svcNum);
    default:
      // 자녀 회선 정보는 svcAttrCd가 없음
      return hypenatePhoneNumber(svcInfo.svcNum);
  }
};

export const isApp = (userAgent?: string) => {
  if (typeof userAgent === 'string') {
    // 주어진 userAgent 사용
  } else {
    if (typeof window !== 'object') return false;
    userAgent = window.navigator.userAgent;
  }

  return userAgent.indexOf('TWM_APP') !== -1;
};

export const isAndroid = () => {
  if (typeof window !== 'object') return false;

  return /Android/i.test(window.navigator.userAgent);
};

export const isIos = () => {
  if (typeof window !== 'object') return false;

  return /iPhone|iPad|iPod/i.test(window.navigator.userAgent);
};

export const getPathname = () => {
  let pathname = '';
  if (!isServer()) {
    pathname = location.pathname;
  }
  return pathname;
};

export const getSearchParam = () => {
  let searchParam = '';
  if (!isServer()) {
    searchParam = encodeURIComponent(window.location.search);
  }
  return searchParam;
};

export const loginUrl = (baseUrl: string, lang: Lang, includeParam = false) =>
  `${typeof baseUrl === 'string' ? baseUrl : ''}/${lang === 'EN' ? 'en/' : ''}common/tid/login?target=${
    getPathname() + (includeParam ? getSearchParam() : '')
  }&app=${isApp() ? 'Y' : 'N'}`;
/*
export const logoutUrl = (baseUrl: string, lang: Lang) =>
  `${typeof baseUrl === 'string' ? baseUrl : ''}/${
    lang === 'EN' ? 'en/' : ''
  }common/tid/logout?target=${pathname}&app=${isApp() ? 'Y' : 'N'}`;
 */
export const signUpUrl = (baseUrl: string, lang: Lang) => {
  baseUrl = typeof baseUrl === 'string' ? baseUrl : '';

  if (lang === 'EN') {
    return `${baseUrl}/en/common/tid/signup-foreigner?target=${getPathname()}`;
  }
  return `${baseUrl}/common/member/signup-guide`;
};
export const v6TworldUrl = (baseUrl: string, lang: Lang) =>
  `${typeof baseUrl === 'string' ? baseUrl : ''}/${lang === 'EN' ? 'en/' : ''}v6/main`;
export const quickLoginUrl = (baseUrl: string, lang: Lang) => {
  if (isIos())
    return `${typeof baseUrl === 'string' ? baseUrl : ''}/${
      lang === 'EN' ? 'en/' : ''
    }common/member/slogin/ios?target=${getPathname()}`;
  if (isAndroid())
    return `${typeof baseUrl === 'string' ? baseUrl : ''}/${
      lang === 'EN' ? 'en/' : ''
    }common/member/slogin/aos?target=${getPathname()}`;
};
export const manageLineUrl = (baseUrl: string, lang: Lang) =>
  `${typeof baseUrl === 'string' ? baseUrl : ''}/${lang === 'EN' ? 'en/' : ''}common/member/line`;
export const registerLineUrl = (baseUrl: string, lang: Lang) =>
  `${typeof baseUrl === 'string' ? baseUrl : ''}/${lang === 'EN' ? 'en/' : ''}common/member/line/register?type=02`;
export const custPwdFailUrl = (baseUrl: string, lang: Lang) =>
  `${typeof baseUrl === 'string' ? baseUrl : ''}/${lang === 'EN' ? 'en/' : ''}common/member/login/cust-pwdfail`;
export const autoLogoutNoticeUrl = (baseUrl: string, lang: Lang) =>
  `${typeof baseUrl === 'string' ? baseUrl : ''}/${lang === 'EN' ? 'en/' : ''}common/member/logout/expire`;

export const toNetFunnelUrl = ({ url, useAppUrl, ldsp }: { url: string; useAppUrl?: boolean; ldsp?: LDSP_TYPE }) => {
  if (!ldsp) ldsp = global.LDSP;

  if (typeof useAppUrl !== 'boolean') {
    useAppUrl = isApp();
  }
  return (useAppUrl ? TWORLD_APP_URL[ldsp] : TWORLD_URL[ldsp]) + NETFUNNEL_BRIDGE_REL_URL + encodeURIComponent(url);
};

export const toSsNetFunnelUrl = (url) => {
  const baseUrl = isApp() ? TWORLD_APP_URL[global.LDSP] : TWORLD_URL[global.LDSP];

  return baseUrl + SS_NETFUNNEL_BRIDGE_REL_URL + encodeURIComponent(url);
};

export const getDeviceSegId = (age: any) => {
  if (age <= 12) {
    return { id: 'age_0_12', name: '키즈' };
  }
  if (age >= 13 && age < 20) {
    return { id: 'age_13_19', name: '10대' };
  }
  if (age >= 20 && age < 30) {
    return { id: 'age_20_29', name: '20대' };
  }
  if (age >= 30 && age < 40) {
    return { id: 'age_30_39', name: '30대' };
  }
  if (age >= 40 && age < 50) {
    return { id: 'age_40_49', name: '40대' };
  }
  if (age >= 50 && age < 60) {
    return { id: 'age_50_59', name: '50대' };
  }
  if (age >= 60) {
    return { id: 'age_60_99', name: '시니어' };
  }
};

export const getDeviceSegName = (segId: string) => {
  switch (segId) {
    case 'age_0_12':
      return '키즈';
    case 'age_13_19':
      return '10대';
    case 'age_20_29':
      return '20대';
    case 'age_30_39':
      return '30대';
    case 'age_40_49':
      return '40대';
    case 'age_50_59':
      return '50대';
    case 'age_60_99':
      return '60대';
    default:
      return '모두';
  }
};

export const getScmSegId = (age: any) => {
  if (age <= 9) {
    return { id: '00_ALL', name: '키즈' };
  }
  if (age >= 10 && age < 20) {
    return { id: '10_ALL', name: '10대' };
  }
  if (age >= 20 && age < 30) {
    return { id: '20_ALL', name: '20대' };
  }
  if (age >= 30 && age < 40) {
    return { id: '30_ALL', name: '30대' };
  }
  if (age >= 40 && age < 50) {
    return { id: '40_ALL', name: '40대' };
  }
  if (age >= 50 && age < 60) {
    return { id: '50_ALL', name: '50대' };
  }
  if (age >= 60 && age < 70) {
    return { id: '60_ALL', name: '60대' };
  }
  if (age >= 70 && age < 80) {
    return { id: '70_ALL', name: '70대' };
  }
  if (age >= 80) {
    return { id: '80_ALL', name: '시니어' };
  }
};

export const getScmSegName = (segId: string) => {
  switch (segId) {
    case '00_ALL':
      return '키즈';
    case '10_ALL':
      return '10대';
    case '20_ALL':
      return '20대';
    case '30_ALL':
      return '30대';
    case '40_ALL':
      return '40대';
    case '50_ALL':
      return '50대';
    case '60_ALL':
      return '60대';
    case '70_ALL':
      return '70대';
    case '80_ALL':
      return '시니어';
    default:
      return '모두';
  }
};

export const getRoamingImg = (country) => {
  const map = {
    'United States': 'usa.png',
    Vietnam: 'vnm.png',
    'Guam Saipan': 'gum.png',
    Thailand: 'tha.png',
    Philippines: 'phl.png',
    France: 'fra.png',
    Germany: 'deu.png',
    Japan: 'jpn.png',
    Singapore: 'sgp.png',
    Italy: 'ita.png',
    Canada: 'can.png',
    Malaysia: 'mys.png',
    'United Arab Emirates': 'are.png',
    Turkey: 'tur.png',
    China: 'chn.png',
    Indonesia: 'idn.png',
    Switzerland: 'che.png',
    'United Kingdom': 'gbr.png',
    Austria: 'aut.png',
    Spain: 'esp.png',
  };

  return map[country];
};

export const getTDSUrl = (groupId, categoryId, utmMedium?: 'reco' | 'topsell' | 'helpchs') => {
  if (isApp()) {
    return `${
      SHOP_APP_URL[global.LDSP]
    }/myshop/product-select?linkChnlSvcId=TWD-MOB&categoryId=${categoryId}&productGrpId=${groupId}&utm_campaign=renewal&utm_source=tworld&utm_medium=app_${utmMedium}`;
  }
  return `${
    SHOP_URL[global.LDSP]
  }/nf/index_nf_yp_detail.html?categoryId=${categoryId}&productGrpId=${groupId}&utm_campaign=renewal&utm_source=tworld&utm_medium=m_${utmMedium}`;
};

export const exitApp = () => {
  const appYn = isApp();
  if (appYn) {
    callBridgeApi({
      command: 'exit',
      params: {},
    });
  }
};

export const isOverflown = ({ elm, widthBuffer = 0 }: { elm: HTMLElement; widthBuffer: number }) => {
  const { clientWidth, clientHeight, scrollWidth, scrollHeight } = elm;
  return scrollHeight > clientHeight || scrollWidth > clientWidth + widthBuffer;
};

export const getUserType = (myInfo) => {
  const { svcInfo } = myInfo;
  let userType = 'regularUser';
  if (!svcInfo.svcAttrCd) {
    userType = svcInfo.totalSvcCnt > 0 ? 'noLineUser' : 'notSKTUser';
  }

  return userType;
};

export const getBrowserInfo = (uA) => {
  const userAgent = uA?.toLowerCase() || '';
  const browser = {
    name: null,
    version: null,
  };
  let reg;

  if (userAgent.indexOf('chrome') !== -1) {
    reg = /chrome\/(\S+)/;
    browser.name = 'Chrome';
    browser.version = reg.exec(userAgent)[1];
    browser.version = Number(browser.version.split('.')[0]);
  } else if (
    userAgent.indexOf('safari') !== -1 ||
    userAgent.indexOf('iphone') !== -1 ||
    userAgent.indexOf('ipad') !== -1
  ) {
    browser.name = 'Safari';
    browser.version = userAgent.match(/\b[0-9]+_[0-9]+(?:_[0-9]+)?\b/)[0].split('_')[0];
    browser.version = Number(browser.version.split('.')[0]);
  }

  return browser;
};

export const getOSInfo = (uA) => {
  const userAgent = uA?.toLowerCase() || '';
  const os = {
    name: null,
    version: null,
  };

  let reg;

  try {
    if (userAgent.indexOf('android') !== -1) {
      reg = /android (\d+(?:\.\d+){0,2});/;
      os.name = 'AOS';
      os.version = reg.exec(userAgent)[1];
    } else if (
      userAgent.indexOf('safari') !== -1 ||
      userAgent.indexOf('iphone') !== -1 ||
      userAgent.indexOf('ipad') !== -1
    ) {
      os.name = 'iOS';
      os.version = userAgent.match(/\b[0-9]+_[0-9]+(?:_[0-9]+)?\b/)[0].split('_')[0];
    }

    os.version = Number(os.version.split('.')[0]);

    return os;
  } catch (e) {
    return null;
  }
};

const isMobileAgent = (userAgent: string): boolean => {
  return /Mobi/i.test(userAgent);
};

const isAppAgent = (userAgent: string): boolean => {
  return /TWM_APP/i.test(userAgent);
};

export const getChannel = (userAgent): 'mobile-app' | 'mobile-web' | 'online-web' => {
  if (isAppAgent(userAgent)) {
    return 'mobile-app';
  }
  if (isMobileAgent(userAgent)) {
    return 'mobile-web';
  }
  return 'online-web';
};

export const titleProps = (url) => {
  if (url.startsWith(SHOP_URL[global.LDSP])) {
    return 'T다이렉트 샵 모바일 웹 (새창)';
  }
  if (url.startsWith('https://www.skbroadband.com/')) {
    return 'SK브로드밴드 웹 (새창)';
  }
  return null;
};

export const isBillingExceptionUrl = (url): boolean => {
  return url && url.startsWith('https://my-adot.onelink.me');
};

export const newWindowProp = (url) => {
  return url && (url.startsWith(SHOP_URL[global.LDSP]) || url.startsWith('https://www.skbroadband.com/'))
    ? 'BROWSER'
    : undefined;
};

export const enableScroll = (initialScrollY?: number) => {
  const scrollY = parseInt(document.body.style.top || '0', 10);
  document.body.style.position = '';
  document.body.style.top = `-${initialScrollY ?? 0}px`;
  window.scrollTo(0, Math.abs(scrollY));
};

export const disableScroll = (initialScrollY: number) => {
  document.body.style.position = 'fixed';
  document.body.style.width = '100%';
  document.body.style.top = `-${initialScrollY}px`;
};
