import { useContext, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import productLedger from '../api/productLedger';
import { AppContext } from './AppContext';
import { callBridgeApi, guessLang, isLoggedIn } from '../common/utils';
import getEncryptSso from '../api/getEncryptSso';
import { deleteCookie } from '../js/commonUtil';
import { ModalStateContext } from './ModalContext';

export default () => {
  const router = useRouter();

  const appContext = useContext(AppContext);
  const [myInfo] = appContext.myInfo;
  const { netfunnel } = appContext;
  const [onBackHandlers] = appContext.onBackHandlers;
  const [, setIsUnlimit] = appContext.isUnlimit;
  const [, setMccCode] = appContext.mccCode;
  const [, setIsWifi] = appContext.isWifi;
  const [, setEncryptSsoId] = appContext.encryptSsoId;
  const [, setLanguage] = appContext.language;

  const { addToOnBackHandlers } = appContext;
  const onBackHandler = useRef<() => void>();
  const { openedModals, openedOverlayModals } = useContext(ModalStateContext);

  useEffect(() => {
    onBackHandler.current = () => {
      if (openedModals.length === 0 && openedOverlayModals.length === 0 && window.location.pathname === '/v6/my') {
        callBridgeApi({
          command: 'closeMyAndOpenUrl',
          params: {},
        });
      }
    };
  }, [openedModals, openedOverlayModals]);

  useEffect(() => {
    addToOnBackHandlers(() => {
      onBackHandler.current();
    });

    const LDSP_SHOWN_KEY = 'ldsp_shown';
    if (!window.sessionStorage.getItem(LDSP_SHOWN_KEY)) {
      if (global.LDSP !== 'BLUE') {
        const { show } = appContext.toast;
        show({ msg: global.LDSP, delay: 5000 });
      }
      window.sessionStorage.setItem(LDSP_SHOWN_KEY, 'y');
    }

    // console.log('process', process.env.NEXT_PUBLIC_CONFIG_TYPE);
  }, []);

  useEffect(() => {
    window.onBack = () => {
      onBackHandlers.forEach((func) => {
        func();
      });
    };

    window.onGetMcc = (response) => {
      if (response.resultCode !== -1) {
        setMccCode(response.params.mcc);
      }
    };

    window.onGetNetwork = (networkInfo) => {
      if (networkInfo.params.isWifiConnected) {
        setIsWifi(true);
      } else {
        setIsWifi(false);
      }
    };

    // onSessionExpired event 에 대해 핸들
    window.onSessionExpired = (sessionExpiredYn) => {
      if (sessionExpiredYn === 'Y') {
        sessionStorage.removeItem('preTWM');
        deleteCookie('TWM');
        deleteCookie('SessionUpdatedAt');
        location.href = `/common/tid/login?target=${location.pathname}&app=Y`;
      } else {
        location.href = `/common/member/logout/expire?target=${location.pathname}`;
      }
    };
  }, []);

  useEffect(() => {
    console.log(`[myInfo]`, myInfo);

    (async () => {
      try {
        /*
        const netfunnelInfo = await netfunnelInfoApi();
        if (netfunnelInfo?.result?.length > 0) {
          netfunnel.setNetfunnelActionTargetList(netfunnelInfo.result);
        }
        */
        netfunnel.setIsLoggedIn(isLoggedIn(myInfo));

        const loginYn = Object.keys(myInfo).length > 0;
        if (loginYn && myInfo.svcInfo.prodId) {
          const response = await productLedger({ params: { prodId: myInfo.svcInfo.prodId } });
          if (response.infiniteYn === 'Y') {
            setIsUnlimit(true);
          }
        }

        if (loginYn) {
          const encryptSso = await getEncryptSso();
          if (encryptSso.result.enc_sso_login_id) {
            setEncryptSsoId(encryptSso.result.enc_sso_login_id);
          }
        }
      } catch (e) {}
    })();

    setLanguage(guessLang());
  }, [router.asPath]);

  return null;
};
