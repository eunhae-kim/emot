import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import Script from 'next/script';
import moment from 'moment';

import Head from 'next/head';
import axios from 'axios';
import { AppProvider } from '../context/AppContext';

import { issueTWM } from '../api/auth';
import * as My from '../api/my/my';
import * as ServiceBlock from '../api/serviceBlock';

import '../../styles/app.min.css';

import { getBrowserInfo, getChannel, getCookie, getOSInfo, getUserType, isApp, setCookie } from '../js/commonUtil';
import '../css/popup-style.css';

import AppContextDataLoader from '../context/AppContextDataLoader';
import Toast from '../container/Toast';
import Beusable from '../components/Common/Beusable';

import { callBridgeApi, guessLang } from '../common/utils';
import {
  BASE_PATH,
  getInitialLdspFromServer,
  PAGES_WITHOUT_BOTTOM_NAVI,
  TWORLD_APP_URL,
  TWORLD_URL,
  V6_API_BASE_URL,
  V6_PRIVATE_API_BASE_URL,
  VENDOR_CRAWLER,
} from '../common/const';
import { initNetfunnel } from '../vendor/netfunnelHelper';
import BottomNav, { LDSP_TYPE } from '../container/BottomNav';
import ModalProvider from '../context/ModalContext';
import Modals from '../container/Modals';
import * as FlowControl from '../api/flowControl';
import * as UpdateSession from '../api/updateSession';
import { TtimeProvider } from '../context/TtimeContext';
import { getMccCode } from '../api/roaming';

const isServer = () => typeof window === 'undefined';
const skipNaviUrl = ['/my'];
const skipTwmComparison = ['/v6/my'];

declare global {
  interface Window {
    onBack: any;
    onGetNetwork: any;
    onGetMcc: any;
    onSessionExpired: any;
    onRefresh: any;
  }
}

interface CustomPageProps {
  twm: string;
  sessionUpdatedAt: string;
  myInfo: {};
  userType: string;
  LDSP: LDSP_TYPE;
  isInitialIssue: boolean;
  isLogin: boolean;
}

axios.defaults.withCredentials = true;

function App({ Component, pageProps }: AppProps<CustomPageProps>) {
  // console.log('========================================================', pageProps);
  // 브라우저에서 활용 가능하도록 global에 LDSP 다시 담아 줌
  if (pageProps.LDSP) {
    global.LDSP = pageProps.LDSP;
  }
  // console.log('tworld:', global.LDSP);

  if (!isServer() && global.LDSP === 'BLUE') {
    const emptyFunction = () => undefined;
    console.error = emptyFunction;
    console.log = emptyFunction;
    console.warn = emptyFunction;
    console.trace = emptyFunction;
    console.debug = emptyFunction;
    console.table = emptyFunction;
  }

  useEffect(() => {
    // @ts-ignore
    if (!window.Netfunnel) {
      require('../vendor/netfunnel');
      initNetfunnel();
    }

    // sessionStorage 내 preTWM 과 cookie 내 TWM이 맞지 않으면 자동 로그아웃 페이지 랜딩
    const preTWM = sessionStorage.getItem('preTWM');
    const currentTWM = getCookie('TWM');

    if (
      preTWM &&
      !skipTwmComparison.includes(location.pathname) &&
      decodeURIComponent(preTWM) != decodeURIComponent(currentTWM)
    ) {
      location.href = `/common/member/logout/expire?target=${location.pathname}`;
    }

    // session-update API 호출
    UpdateSession.default();

    // Restore the scroll position on route change
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  if (!isServer() && pageProps && pageProps.twm && pageProps.sessionUpdatedAt) {
    if (pageProps.isInitialIssue) {
      setCookie('TWM', pageProps.twm, 1);
      setCookie('SessionUpdatedAt', pageProps.sessionUpdatedAt, 1);

      // 앱이며, 최초 발급인 경우 native로 session전달
      if (isApp()) {
        callBridgeApi({
          command: 'session',
          params: {
            serverSession: pageProps.twm,
            expired: 3600000,
            loginType: '',
          },
        });
      }
    }

    // 예외적으로 sessionUpdatedAt이 없는 케이스 대비
    if (!getCookie('SessionUpdatedAt')) {
      setCookie('SessionUpdatedAt', pageProps.sessionUpdatedAt, 1);
    }

    // 로그인이 되었는데, sessionStorage에 preTWM이 없는 경우 preTWM 넣어 줌
    if (pageProps.isLogin) {
      sessionStorage.setItem('preTWM', pageProps.twm);
    }
  }

  return (
    <AppProvider pageProps={pageProps}>
      <ModalProvider>
        <TtimeProvider>
          <Head>
            <link rel="shortcut icon" href={`${BASE_PATH}/favicon.ico`} />
            <link rel="shortcut icon" href={`${BASE_PATH}/favicon.png`} />
            <link rel="apple-touch-icon" href={`${BASE_PATH}/favicon.png`} />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
          </Head>
          {/*
          // 외부 스크립트 로드하지 않고 고정 소스 함께 빌드하도록 수정됨
          // 외부 스크립트 로딩 방식이 필요해지면 아래 코드 사용 (고정 소스 require 구문은 삭제 필요)
          <Script src="/v6/xtr/js/xtractor_script.js" />
        */}
          <Script src="https://xtr.tos.sktelecom.com/js/xtractor_script.js" />
          <AppContextDataLoader />
          {/* 모달 통합 컴포넌트: Modals */}
          <Modals />
          <Component {...pageProps} />
          <Toast />
          <Beusable />
          {/* 바텀네비 hide 해야하는 path의 바텀네비 컨트롤을 위한 공통로직 */}
          {typeof window !== 'undefined' && PAGES_WITHOUT_BOTTOM_NAVI.includes(window.location.pathname) && (
            <BottomNav show={false} />
          )}
        </TtimeProvider>
      </ModalProvider>
    </AppProvider>
  );
}

App.getInitialProps = async (context) => {
  if (isServer()) {
    global.LDSP = getInitialLdspFromServer(process.env.DEPLOY_ENV);
  }
  const LDSP = global.LDSP;
  const defaultResult = {
    pageProps: { LDSP },
  };

  // Health Check 경로에서는 TWM 발행 로직을 스킵한다.
  if (context?.ctx?.req?.url) {
    const paths = context.ctx.req.url.split(/\//);
    if (paths[1] === '_a' || paths[1] === 'publish') {
      return defaultResult;
    }
  }
  if (context?.router?.route === '/404') {
    return defaultResult;
  }

  const isSSR = isServer();
  const userAgent = isSSR ? context.ctx.req.headers['user-agent'] : window.navigator.userAgent;
  const isApp = userAgent.indexOf('TWM_APP') !== -1;
  const host = isSSR ? context?.ctx?.req?.headers.host : location.host;
  const path = context.ctx.pathname;

  const redirect = (url: string) => {
    if (isSSR) {
      context.ctx.res.writeHead(302, {
        Location: url,
        'Content-Type': 'text/html; charset=utf-8',
      });
      context.ctx.res.end();
    } else {
      location.href = url;
    }
  };

  // PC 버전 redirect (crawler은 예외처리 진행)
  if (getChannel(userAgent) === 'online-web' && !VENDOR_CRAWLER.test(userAgent)) {
    redirect('https://www.tworld.co.kr');
    return defaultResult;
  }

  // OS 버전 확인 후 redirect
  const osInfo = getOSInfo(userAgent);
  if (osInfo && ((osInfo.name === 'AOS' && osInfo.version < 5) || (osInfo.name === 'iOS' && osInfo.version < 12))) {
    redirect('/main/store');
    return defaultResult;
  }

  // WebView 버전 확인 후 redirect
  const browserInfo = getBrowserInfo(userAgent);
  if (
    browserInfo &&
    ((browserInfo.name === 'Chrome' && browserInfo.version < 64) ||
      (browserInfo.name === 'Safari' && browserInfo.version < 12))
  ) {
    redirect(`/common/util/os-block?os=${browserInfo.name === 'Chrome' ? 'aos' : 'ios'}`);
    return defaultResult;
  }

  // 모바일 app인데 web url 접근 시 app으로 redirect
  if (isApp && TWORLD_URL[LDSP].indexOf(host) !== -1) {
    redirect(`${TWORLD_APP_URL[LDSP]}/v6${path}`);
    return defaultResult;
  }

  // 모바일 web인데 app url 접근 시 web으로 redirect
  if (!isApp && TWORLD_APP_URL[LDSP].indexOf(host) !== -1) {
    redirect(`${TWORLD_URL[LDSP]}/v6${path}`);
    return defaultResult;
  }

  // 전체 서비스 차단, 앱 과부하 제어 체크 (앱이 아닐때만 체크)
  try {
    if (!isApp) {
      const response = await FlowControl.default();
      /**
       * respCode
       *  0: 정상
       *  1019: 서비스 차단(Throttled)
       *  1004: 서비스 차단(Service Blocked)
       */
      if (response.respCode !== 0) {
        redirect(response.block.url);
        return defaultResult;
      }
    }
  } catch (e) {
    console.error(e);
  }

  let isRequireLogin = false;
  // 메뉴차단 (현재 사용하지 않음), 권한 체크
  try {
    const response = await ServiceBlock.default({
      params: {
        menuUrl: `/v6${path}`,
      },
    });

    if (response.accessType && response.accessTypes.indexOf('N') === -1) {
      isRequireLogin = true;
    }

    if (response.respCode === 1004) {
      redirect(response.block.url);
      return defaultResult;
    }
  } catch (e) {
    console.error(e);
  }

  const sktSSO = isSSR ? context.ctx.req.cookies.SKTSSO : getCookie('SKTSSO');
  let twm: string = isSSR ? context.ctx.req.cookies.TWM : getCookie('TWM');
  let sessionUpdatedAt: string = isSSR ? context.ctx.req.cookies.SessionUpdatedAt : getCookie('SessionUpdatedAt');
  let isInitialIssue = false;
  let userType = '';
  let myInfo: any = {};
  let isLogin = false;

  if (!sessionUpdatedAt) {
    sessionUpdatedAt = moment().format();
  }

  if (!twm || twm === '') {
    // Case 1. TWM이 없는 케이스
    if (sktSSO === 'Y' && !isApp) {
      // Case 1-1. TWM이 없는데 SKTSSO는 Y인 케이스 ->  TID page로 redirect, issueTWM 할 필요 없음(/common/tid/login 소프트웍스 페이지에서 TWM 생성)
      //           [참고] SKTSSO 값은 모웹 케이스에만 체크(!isApp)
      context.ctx.res.setHeader('set-cookie', 'SKTSSO=N; domain=.tworld.co.kr; path=/;');
      redirect(`/common/tid/login?target=/v6${path}&app=${isApp ? 'Y' : 'N'}`);
      return defaultResult;
    } else {
      try {
        // Case 1-2. TWM 최초 발급 케이스
        const session = await issueTWM();
        twm = session.TWM;
        sessionUpdatedAt = moment().format();
        isInitialIssue = true;
      } catch (e) {
        console.error(e);
      }
    }
  } else {
    // Case 2. TWM이 있는 케이스
    try {
      // Case 2-1. TWM이 있고, 로그인된 TWM인 케이스
      const response = await My.default({
        baseUrl: isServer() ? V6_PRIVATE_API_BASE_URL[LDSP] : V6_API_BASE_URL[LDSP],
        headers: {
          'x-session-key': twm,
          'x-session-updated': sessionUpdatedAt,
        },
        params: {
          lang: guessLang(context.ctx.pathname) === 'EN' ? 'ENG' : 'KOR',
        },
      });
      myInfo = response;
      userType = getUserType(myInfo);
      isLogin = true;

      // 로밍모드 체크(only iOS)
      try {
        const osInfo = getOSInfo(userAgent);
        if (osInfo && osInfo.name === 'iOS') {
          const alreadyReadMCC = isSSR ? context.ctx.req.cookies.alreadyReadMCC : getCookie('alreadyReadMCC');
          const mccResponse = await getMccCode(twm);
          // MCC코드가 있고, 450이 아니며, 위치정보 동의를 한 사용자는 로밍모드로 진입
          if (
            mccResponse.mcc &&
            mccResponse.mcc !== '450' &&
            myInfo.svcInfo.twdLocUseAgreeYn === 'Y' &&
            alreadyReadMCC !== 'Y'
          ) {
            context.ctx.res.setHeader('set-cookie', 'alreadyReadMCC=Y; path=/;');
            redirect(`/product/roaming/on?mcc=${mccResponse.mcc}`);
          }
        }
      } catch (e) {
        // 로밍모드에 대한 try-catch (비로그인으로 빠지지 않도록 inner에서 한번 더 잡아준다)
      }
    } catch (e) {
      // Case 2-2. TWM은 있지만, 로그인이 안된 케이스
      if (sktSSO === 'Y') {
        // Case 2-2a. TWM 있고 로그인이 안되어 있지만 SKTSSO Y인 케이스 ->  TID page로 redirect
        context.ctx.res.setHeader('set-cookie', 'SKTSSO=N; domain=.tworld.co.kr; path=/;');
        redirect(`/common/tid/login?target=/v6${path}&app=${isApp ? 'Y' : 'N'}`);
        return defaultResult;
      } else {
        // Case 2-2b. TWM 있고 로그인이 안되어 있는 미로그인 정상 케이스
        myInfo = {};
      }
    }
  }

  if (!isLogin && isRequireLogin) {
    // 앱이며 my url인 경우 skipNavi true
    if (isApp && skipNaviUrl.includes(path)) {
      redirect(`/common/tid/login?target=/v6${path}&app=Y&skipNavi=true`);
      return defaultResult;
    }

    redirect(`/common/tid/login?target=/v6${path}&app=${isApp ? 'Y' : 'N'}`);
    return defaultResult;
  }

  const pageProps = { twm, sessionUpdatedAt, myInfo, userType, LDSP, isInitialIssue, isLogin };
  return { pageProps };
};

export default App;
