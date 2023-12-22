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
  TWORLD_APP_URL,
  TWORLD_URL,
  V6_API_BASE_URL,
  V6_PRIVATE_API_BASE_URL,
} from '../common/const';
import { initNetfunnel } from '../vendor/netfunnelHelper';
import { LDSP_TYPE } from '../container/BottomNav';
import ModalProvider from '../context/ModalContext';
import Modals from '../container/Modals';
import * as FlowControl from '../api/flowControl';

const isServer = () => typeof window === 'undefined';

declare global {
  interface Window {
    onBack: any;
    onGetNetwork: any;
    onGetMcc: any;
    onSessionExpired: any;
  }
}

interface CustomPageProps {
  twm: string;
  sessionUpdatedAt: string;
  myInfo: {};
  userType: string;
  LDSP: LDSP_TYPE;
  isInitialIssue: boolean;
}

axios.defaults.withCredentials = true;

function App({ Component, pageProps }: AppProps<CustomPageProps>) {
  //console.log('========================================================', pageProps);
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

    if (preTWM && decodeURIComponent(preTWM) != decodeURIComponent(currentTWM)) {
      location.href = `/common/member/logout/expire?target=${location.pathname}`;
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
  }

  return (
    <AppProvider pageProps={pageProps}>
      <ModalProvider>
        <Head>
          <link rel="shortcut icon" href={`${BASE_PATH}/favicon.ico`} />
          <link rel="shortcut icon" href={`${BASE_PATH}/favicon.png`} />
          <link rel="apple-touch-icon" href={`${BASE_PATH}/favicon.png`} />
        </Head>
        {/*
          // 외부 스크립트 로드하지 않고 고정 소스 함께 빌드하도록 수정됨
          // 외부 스크립트 로딩 방식이 필요해지면 아래 코드 사용 (고정 소스 require 구문은 삭제 필요)
          <Script src="/v6/xtr/js/xtractor_script.js" />
        */}
        <Script src={'https://xtr.tos.sktelecom.com/js/xtractor_script.js'}></Script>
        <AppContextDataLoader />
        {/* 모달 통합 컴포넌트: Modals */}
        <Modals />
        <Component {...pageProps} />
        <Toast />
        <Beusable />
      </ModalProvider>
    </AppProvider>
  );
}

App.getInitialProps = async (context) => {
  if (isServer()) {
    //process.env.DEPLOY_ENV = 'blue';
    global.LDSP = getInitialLdspFromServer(process.env.DEPLOY_ENV);
    //console.log('source ldsp:', global.LDSP);
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

  let twm = '';
  let sessionUpdatedAt = '';
  let myInfo = {};
  let userType = '';
  let isInitialIssue = false;

  const isSSR = isServer();

  const userAgent = isSSR ? context.ctx.req.headers['user-agent'] : window.navigator.userAgent;
  const sktSSORedirect = () => {
    if (isSSR) {
      // SKTSSO가 있고, SSR인 경우
      const appYn = userAgent.indexOf('TWM_APP') === -1 ? 'N' : 'Y';
      context.ctx.res.writeHead(302, {
        Location: `/common/tid/login?target=/v6${context.ctx.pathname}&app=${appYn}`,
        'Content-Type': 'text/html; charset=utf-8',
      });
      context.ctx.res.end();
    } else {
      // SKTSSO가 있고, CSR 경우
      const appYn = isApp() ? 'Y' : 'N';
      location.href = `/common/tid/login?target=${context?.ctx?.asPath}&app=${appYn}`;
    }
  };
  const osBlockPageRedirect = () => {
    if (isSSR) {
      context.ctx.res.writeHead(302, {
        Location: '/main/store',
        'Content-Type': 'text/html; charset=utf-8',
      });
      context.ctx.res.end();
    } else {
      location.href = '/main/store';
    }
  };
  const browserBlockPageRedirect = (browser) => {
    if (isSSR) {
      context.ctx.res.writeHead(302, {
        Location: `/common/util/os-block?os=${browser === 'Chrome' ? 'aos' : 'ios'}`,
        'Content-Type': 'text/html; charset=utf-8',
      });
      context.ctx.res.end();
    } else {
      location.href = '/common/util/os-block?os=aos';
    }
  };

  // PC 버전 redirect
  if (getChannel(userAgent) === 'online-web') {
    if (isSSR) {
      context.ctx.res.writeHead(302, {
        Location: `https://www.tworld.co.kr`,
        'Content-Type': 'text/html; charset=utf-8',
      });
      context.ctx.res.end();
      return defaultResult;
    } else {
      window.location.href = `https://www.tworld.co.kr`;
    }
  }

  // OS 버전 확인 후 redirect
  const osInfo = getOSInfo(userAgent);
  if (osInfo) {
    if ((osInfo.name === 'AOS' && osInfo.version < 5) || (osInfo.name === 'iOS' && osInfo.version < 12)) {
      osBlockPageRedirect();
      return defaultResult;
    }
  }

  // WebView 버전 확인 후 redirect
  const browserInfo = getBrowserInfo(userAgent);
  if (browserInfo) {
    if (
      (browserInfo.name === 'Chrome' && browserInfo.version < 64) ||
      (browserInfo.name === 'Safari' && browserInfo.version < 12)
    ) {
      browserBlockPageRedirect(browserInfo.name);
      return defaultResult;
    }
  }

  // 모바일 app인데 web url 접근 시 app으로 redirect
  if (getChannel(userAgent) === 'mobile-app') {
    const host = isSSR ? context?.ctx?.req?.headers.host : location.host;
    if (TWORLD_URL[LDSP].indexOf(host) !== -1) {
      if (isSSR) {
        context.ctx.res.writeHead(302, {
          Location: `${TWORLD_APP_URL[LDSP]}/v6${context?.ctx?.req?.url}`,
          'Content-Type': 'text/html; charset=utf-8',
        });
        context.ctx.res.end();
        return defaultResult;
      } else {
        location.href = `${TWORLD_APP_URL[LDSP]}${location.pathname}`;
      }
    }
  }

  // 전체 서비스 차단, 앱 과부하 제어 체크 (앱이 아닐때만 체크)
  try {
    if (userAgent.indexOf('TWM_APP') === -1) {
      const response = await FlowControl.default();
      /**
       * respCode
       *  0: 정상
       *  1019: 서비스 차단(Throttled)
       *  1004: 서비스 차단(Service Blocked)
       */
      if (response.respCode !== 0) {
        if (isSSR) {
          // 정상이 아닐 경우 서비스 차단 페이지로 redirect
          context.ctx.res.writeHead(302, {
            Location: response.block.url,
            'Content-Type': 'text/html; charset=utf-8',
          });
          context.ctx.res.end();
          return defaultResult;
        } else {
          window.location.href = response.block.url;
        }
      }
    }
  } catch (e) {
    console.error(e);
  }

  // service block check는 issueTWM 하기 전에 수행
  try {
    const menuUrl = isSSR ? `/v6${context?.ctx?.req?.url}` : context?.ctx?.asPath;
    const response = await ServiceBlock.default({
      baseUrl: isSSR ? V6_PRIVATE_API_BASE_URL[LDSP] : V6_API_BASE_URL[LDSP],
      params: {
        menuUrl: menuUrl,
      },
    });

    if (response.respCode === 1004) {
      if (isSSR) {
        context.ctx.res.writeHead(302, {
          Location: response.block.url,
          'Content-Type': 'text/html; charset=utf-8',
        });
        context.ctx.res.end();
        return defaultResult;
      } else {
        location.href = response.block.url;
      }
    }
  } catch (e) {
    console.error(e);
  }

  const sktSSO = isSSR ? context.ctx.req.cookies.SKTSSO : getCookie('SKTSSO');
  twm = isSSR ? context.ctx.req.cookies.TWM : getCookie('TWM');
  sessionUpdatedAt = isSSR ? context.ctx.req.cookies.SessionUpdatedAt : getCookie('SessionUpdatedAt');

  if (!sessionUpdatedAt) {
    sessionUpdatedAt = moment().format();
  }

  if (!twm || twm === '') {
    // TWM은 없지만 SKTSSO가 Y인 경우 TID page로 redirect, issueTWM 할 필요 없음(/common/tid/login 소프트웍스 페이지에서 TWM 생성)
    // SKTSSO 값은 앱 케이스에만 체크 -> getChannel이 mobile-app이 아닌경우만 체크
    if (sktSSO === 'Y' && getChannel(userAgent) !== 'mobile-app') {
      sktSSORedirect();
      return defaultResult;
    } else {
      try {
        // 최초 발급
        const session = await issueTWM();
        twm = session.TWM;
        sessionUpdatedAt = moment().format();
        isInitialIssue = true;
      } catch (e) {
        console.error(e);
      }
    }
  } else {
    // TWM이 있는 경우 로그인 된 사용자인지 확인을 위해 my 호출
    try {
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
    } catch (e) {
      if (sktSSO === 'Y') {
        // 미로그인이지만 SKTSSO가 Y인 경우 TID page로 redirect
        sktSSORedirect();
        return defaultResult;
      } else {
        myInfo = {};
      }
    }
  }

  /*
  if (isSSR) {
    if (context?.router?.route === '/netfunnel') {
      const { target } = context.router.query;

      const aid = LDSP !== 'GREEN' && LDSP !== 'BLUE' ? 'act-0test' : getActionId(target);

      let landingUrl = target;

      // 로그인 상태에서만 넷퍼넬 첵
      if (isLoggedIn(myInfo)) {
        const url = `https://netfunnel.tworlddirect.com:443/ts.wseq?opcode=5101&nfid=0&prefix=NetFunnel.gRtype=5101;&sid=service_3&aid=${aid}&${new Date().valueOf()}`;
        console.log('netfunnel url', url);

        try {
          const result = await axios({
            method: 'get',
            url: url,
            timeout: 3000,
          });

          // NetFunnel.gRtype=5101;202:key=C899DC0B4DB52820AB615169E5B108AABC2AB9F605DB0A7DA733E95F845F00EDB6C559811A568F0A2C970F9A33481656D15DFDA113138431610AF9F911F9D9E69683614BC08CBC25F73A47727059C29544258CFC032676E4E
          // C9F5E11D916F01A73742C302C352C312C312C30&nwait=1&nnext=1&tps=0.049990&ttl=5&ip=netfunnel.tworlddirect.com&port=443
          //console.log(result.data);
          const resCode = result.data.match(/;([\d]+)/)[1];
          //console.log('==============[netfunnel result]===================', resCode);
          // 미로그인이거나 성공이거나 action_id가 잘못돼서 할게 없음
          if (resCode === '200' || resCode === '501') {
            //
          } else {
            const useAppUrl = isApp(context.ctx.req.headers['user-agent']);
            landingUrl = toNetFunnelUrl({ url: landingUrl, useAppUrl });
          }
        } catch (e) {
          // 넷퍼넬 서버 호출 실패 시 최종 타겟으로 바로 리다이렉트
        }
      }

      context.ctx.res.writeHead(302, {
        Location: landingUrl,
        'Content-Type': 'text/html; charset=utf-8',
      });
      context.ctx.res.end();
    }
  }
  */

  const pageProps = { twm, sessionUpdatedAt, myInfo, userType, LDSP, isInitialIssue };
  return { pageProps };
};

export default App;
