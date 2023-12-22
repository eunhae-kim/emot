import React, { useContext, useEffect, useState } from 'react';
import {
  BottomNavProps,
  BottomSheetMode,
  MenuInfoMap,
  MyButtonAction,
  NavBottom,
} from '../components/Fullmenu/NavBottom';
import myApi from '../api/my/my';
import { callBridgeApi, isLoggedIn, isServer } from '../common/utils';
// import appVersionApi from '../api/appVersion';
import { AppContext } from '../context/AppContext';
import { Lang } from '../common/types';
import myApiRespToDisplayData from '../common/apiRespToDisplayData/my';
import myBalancesApiRespToDisplayData from '../common/apiRespToDisplayData/myBalances';
import { LineIcon } from '../components/My/MyLineManagement';
import TXT from '../common/i18nMsgs';
import { GraphType } from '../components/My/MyGraph';
import {
  isApp,
  // isIos,
  loginUrl,
  manageLineUrl,
  quickLoginUrl,
  registerLineUrl,
  signUpUrl,
  v6TworldUrl,
  toNetFunnelUrl,
} from '../js/commonUtil';
import myBalancesApi from '../api/my/myBalances';
import { SHOP_BNAV_BTN_APP_URL, SHOP_BNAV_BTN_URL, V6_API_BASE_URL } from '../common/const';

declare global {
  interface Window {
    $tw: any;
  }
}

export type ShowBottomSheet = 'Y' | 'N' | 'EXCEPTION_ONLY';
export type QuotaData = { quota: string; quotaText: string };

export type LDSP_TYPE = 'LOCAL' | 'STG_LOCAL' | 'GREEN_LOCAL' | 'DEV' | 'STG' | 'GREEN' | 'BLUE';
export type ApiType = 'V6' | 'V5' | 'NONE';

export type BottomNavPropsCommon = {
  // 생략 시 process.env.NEXT_PUBLIC_CONFIG_TYPE 사용. standalone에서는 필수.
  ldsp?: LDSP_TYPE;
  tabIndex?: number;
  showBottomSheet?: ShowBottomSheet;

  // 값이 없으면 상대경로 생성 (각종 경로 생성 함수에서)
  // 티월드 도메인상에서는 값이 없는게 정상
  tworldUrl?: string;
  // 생략 시 ldsp와 V6_API_BASE_URL 조합으로 값 설정
  apiBaseUrl?: string;
  // 생략 시 ldsp와 SHOP_URL/SHOP_APP_URL 조합으로 값 설정
  shopUrl?: string;

  show?: boolean;

  zIndex?: number;
  lang?: Lang;

  // 값을 주지 않을 경우 디폴트 티월드 로그인 URL 사용
  loginUrl?: string;
  simpleLoginUrl?: string;

  // 내재화 영역에서는 context에서 꺼내 쓰지만, standalone 모드에서는 파라미터로 값을 받는다.
  myInfo?: any;
};

export type BottomNavStandaloneProps = BottomNavPropsCommon & {
  apiType?: ApiType;
};

export type BottomNavContainerProps = BottomNavPropsCommon & {
  isTworld?: boolean;
  isStandalone?: boolean;
};

const WebBottomSheetModeToNativeStatusParam: Record<BottomSheetMode, number> = {
  NONE: -1,
  LOGIN: 0,
  NORMAL: 1,
  REGISTER_A_LINE: 2,
  NO_REGISTERED_LINE: 3,
  NO_ACCESS_LINK_TO_KOR: 4,
  NO_ACCESS_SELECT_MOBILE: 5,
};

const generateLandingInfo = (tworldUrl: string, lang: Lang) => {
  return {
    login: loginUrl(tworldUrl, lang),
    simpleLogin: quickLoginUrl(tworldUrl, lang),
    signUp: signUpUrl(tworldUrl, lang),
    registerLine: registerLineUrl(tworldUrl, lang),
    selectMobileLine: manageLineUrl(tworldUrl, lang),
    korTworld: v6TworldUrl(tworldUrl, 'KO'),
  };
};

const getMenuInfoMap = (tworldUrl: string, shopUrl: string, lang: Lang, ldsp: LDSP_TYPE) => {
  let menuInfoMap: MenuInfoMap;
  if (lang === 'KO') {
    menuInfoMap = {
      MY: {
        label: 'MY',
        url: `${tworldUrl}/v6/my?returnUrl=${window.location.href}`,
      },
      HOME: {
        label: '홈',
        url: `${tworldUrl}/v6/main`,
      },
      SHOP: {
        label: 'T 다이렉트샵',
        url: shopUrl,
      },
      BENEFIT: {
        label: '혜택',
        url: toNetFunnelUrl({ url: `/benefit/main`, ldsp }),
      },
      MENU: {
        label: '메뉴',
        url: `${tworldUrl}/v6/menu`,
      },
    };
  } else {
    menuInfoMap = {
      MY: {
        label: 'MY',
        url: `${tworldUrl}/v6/en/my?returnUrl=${window.location.href}`,
      },
      HOME: {
        label: 'HOME',
        url: `${tworldUrl}/en/main/home`,
      },
      MENU: {
        label: 'MENU',
        url: `${tworldUrl}/v6/en/menu`,
      },
    };
  }

  return menuInfoMap;
};

const generateDefaultProps = (allProps: BottomNavContainerProps) => {
  const {
    lang = 'KO',
    ldsp = global.LDSP,
    tworldUrl: tworldUrlParam = null,
    shopUrl: shopUrlParam = null,
    ...props
  } = allProps;

  let tworldUrl = tworldUrlParam;
  let shopUrl = shopUrlParam;

  // 서버단에서 tworldUrl가 제대로 처리 안되는 케이스는 브라우저단에서 다시 처리
  if (!tworldUrl) {
    tworldUrl = window.location.origin;
  }

  if (typeof shopUrl !== 'string') {
    if (isApp()) {
      shopUrl = SHOP_BNAV_BTN_APP_URL[ldsp];
    } else {
      shopUrl = SHOP_BNAV_BTN_URL[ldsp];
    }
  }

  const menuInfoMap = getMenuInfoMap(tworldUrl || '', shopUrl, lang, ldsp);

  const landingInfo = generateLandingInfo(tworldUrl, lang);
  if (props.loginUrl) {
    landingInfo.login = props.loginUrl;
  }
  if (props.simpleLoginUrl) {
    landingInfo.simpleLogin = props.simpleLoginUrl;
  }
  const bottomSheetMode: BottomSheetMode = 'NONE';

  const defaultCompProps = {
    ...props,

    lang,
    tworldUrl,
    shopUrl,
    bottomSheetMode,
    myButtonAction: 'NONE' as MyButtonAction,
    hasMultiLine: false,
    lineIdText: '',
    menuInfoMap,

    landingInfo,
  };

  return defaultCompProps;
};

const fetchMyInfo = async (baseUrl, lang, setMyInfo, setMyInfoLoaded) => {
  try {
    const myInfo = await myApi({ baseUrl, params: { lang } });
    setMyInfo(myInfo);
  } catch (e) {
    setMyInfo({});
  }

  setMyInfoLoaded(true);
};

const fetchMyBalances = async (baseUrl: string, lang: Lang, setQuotaData: (QuotaData) => void, myDisplayData) => {
  let quota = '';
  let quotaText = '';

  let result;
  try {
    result = await myBalancesApi({ baseUrl, params: { onlyRemainedYn: 'Y' } });

    console.log(result);
    const myBalanceDisplayData = myBalancesApiRespToDisplayData(result, lang);
    console.log(myBalanceDisplayData);

    if (myBalanceDisplayData.isMainDataNumber) {
      quota = myBalanceDisplayData.mainRmText;
      quotaText = TXT['남음'][lang];
    } else {
      quota = '';
      if (
        myBalanceDisplayData.graphType === GraphType.DATA &&
        myBalanceDisplayData.mainRmText === TXT['무제한'][lang]
      ) {
        quotaText = TXT['데이터_무제한'][lang];
      } else {
        // 잔여량이 정상적으로 온 케이스가 아니라면 상품명 노출
        quotaText = myBalanceDisplayData.mainRmText;
      }
    }
  } catch (e) {
    console.log(e);
    quotaText = '';
  }

  if (!quota && !quotaText) {
    quotaText =
      (lang === 'KO' ? myDisplayData.선택회선?.svcInfo.prodNm : myDisplayData.선택회선?.svcInfo.prodEngNm) || '';
  }

  setQuotaData({
    quota,
    quotaText,
  });
};

// call bridge api or draw as html
const showBottomNav = (showNavClass) => {
  console.log('show bottomNav');
  if (showNavClass && document?.body?.classList?.add) document.body.classList.add(showNavClass);

  if (isApp()) {
    console.log('Show in App');

    callBridgeApi({
      command: 'showBottomNavigation',
    });
  } else {
    console.log('Show in Web');
  }
};

const hideBottomNav = (showNavClass) => {
  console.log('hide bottomNav');
  if (showNavClass && document?.body?.classList?.remove) document.body.classList.remove(showNavClass);

  if (isApp()) {
    console.log('Hide in App');
    callBridgeApi({
      command: 'hideBottomNavigation',
    });
  } else {
    console.log('Hide in Web');
  }
};

const bottomNavPropsToNativeProps = (compProps: BottomNavProps) => {
  const nativeProps = {
    isEnglishTworld: compProps.lang === 'EN',
    myButtonAction: compProps.myButtonAction,
    tabIndex: typeof compProps.tabIndex === 'number' ? compProps.tabIndex : -1,
    lineInfo: {
      /*
       -1: 미노출 상태
        0: 미로그인 상태
        1: 모바일 회선 진입 상태(기본적인 로그인 상태)
        2: 등록회선 없음
        3: 보유회선 없음
        4: PPS/유선회선만 보유한 상태
        5: PPS/유선회선을 기준회선으로 진입한 상태
      */
      status: WebBottomSheetModeToNativeStatusParam[compProps.bottomSheetMode],
      lineMainTitle: compProps.lineIdText,
      isMultiLine: compProps.hasMultiLine,
      lineDetailsHighlight: compProps.quota,
      lineDetails: compProps.quotaText,
    },
    landingInfo: compProps.landingInfo,
  };

  return nativeProps;
};

const setBottomNav = (compProps) => {
  if (!compProps) return;
  console.log('set', compProps, bottomNavPropsToNativeProps(compProps));
  if (isApp()) {
    callBridgeApi({
      command: 'setBottomInfo',
      params: bottomNavPropsToNativeProps(compProps),
    });
  } else {
    //
  }
};

let syncedCompProps = {};

export default function BottomNav(allProps: BottomNavContainerProps) {
  const {
    lang = 'KO',
    ldsp = global.LDSP,
    isTworld = true,
    apiBaseUrl: apiBaseUrlParam = null,
    myInfo: myInfoParam = {},
    ...props
  } = allProps;

  let apiBaseUrl = apiBaseUrlParam;

  const show = !(props.show === false);

  if (typeof apiBaseUrl !== 'string') {
    apiBaseUrl = V6_API_BASE_URL[ldsp];
  }
  // g-bottom-sheet: 100px
  // g-bottom: 80px
  const [showNavClass, setShowNavClass] = useState('');
  // const [compProps, setCompProps] = useState<BottomNavProps>(defaultCompProps);
  const [quotaData, setQuotaData] = useState<QuotaData>({ quota: '', quotaText: '' });
  const [isVisible, setIsVisible] = useState(show);

  // context에 있는 action들을 standalone에서도 동일한 인터페이스로 사용할 수 있도록 할당
  let myInfo;
  let setMyInfo;
  let myInfoLoaded;
  let setMyInfoLoaded;
  let compProps;
  let setCompProps;
  if (props.isStandalone) {
    [myInfo, setMyInfo] = useState(myInfoParam || {});
    [myInfoLoaded, setMyInfoLoaded] = useState(false);
    [compProps, setCompProps] = useState<BottomNavProps>(null);
  } else {
    const appContext = useContext(AppContext);
    [myInfo, setMyInfo] = appContext.myInfo;
    [myInfoLoaded, setMyInfoLoaded] = appContext.myInfoLoaded;
    [compProps, setCompProps] = appContext.bottomNav.compProps;
  }

  // const router = useRouter();

  if (!isServer()) {
    if (typeof window.$tw === 'undefined') {
      window.$tw = {};
    }

    window.$tw.bottomNav$api = {
      isVisible,

      show: (shouldForce?: boolean) => {
        if (isVisible && shouldForce) {
          console.log('forced show');
          showBottomNav(showNavClass);
        }
        setIsVisible(true);
        window.$tw.bottomNav$api.isVisible = true;
      },
      hide: (shouldForce?: boolean) => {
        if (!isVisible && shouldForce) {
          console.log('forced hide');
          hideBottomNav(showNavClass);
        }
        setIsVisible(false);
        window.$tw.bottomNav$api.isVisible = false;
      },
    };
  }

  useEffect(() => {
    /*
      // iOS 백버튼 시 js 재실행 되지 않아서, 이벤트 시점에 바텀네비 상태 앱에 재전송 => 영한동에서 페이지에서 이벤트 잡아서 init 호출 해 주기로 해서 주석 처리
      window.onpageshow = function (event) {
        console.log('[bottomNav] onpageshow');

        if (!isIos()) {
          console.log('[bottomNav] no iOS');
          return;
        }

        console.log('[bottomNav] yes iOS');

        // BFCache를 통해 페이지 접근할 경우
        if (event.persisted || (window.performance && window.performance.navigation.type == 2)) {
          console.log('[bottomNav] pagePersisted');
          let restoredCompProps, restoredCompPropsJson;
          try {
            restoredCompProps = sessionStorage.getItem('v6bottomNav');

            console.log(`[bottomNav]`, compProps, restoredCompProps);

            if (restoredCompProps) {
              restoredCompPropsJson = JSON.parse(restoredCompProps);
            }
            setCompProps(restoredCompPropsJson);
          } catch (e) {}
        }
      };
     */
  }, []);

  // window 객체 초기화 및 Data fetch 요청
  useEffect(() => {
    const defaultProps = generateDefaultProps(allProps);
    syncedCompProps = { ...syncedCompProps, ...defaultProps };
    setCompProps(syncedCompProps);

    if (!show) {
      setIsVisible(false);
      return;
    }

    if (isTworld) {
      if (props.isStandalone) {
        fetchMyInfo(apiBaseUrl, lang, setMyInfo, setMyInfoLoaded);
      } else {
        // react는 context 값 사용
      }
    } else {
      // 티다등 기타 서비스는 API 호출 안하고 파라미터로 받은 svcInfo 사용 (state 디폴트 값으로 세팅되어 있음)
      setMyInfoLoaded(true);
    }
  }, [JSON.stringify(allProps)]);

  // 바텀시트 설정. Data 다 받은 후 실행
  useEffect(() => {
    if (!myInfoLoaded) return;

    let myButtonAction: MyButtonAction;
    let lineIdText = '';
    const { showBottomSheet } = props;

    const myDisplayData = myApiRespToDisplayData(myInfo);
    let bottomSheetMode: BottomSheetMode = 'NONE';

    const loginStatus = isLoggedIn(myInfo);

    if (loginStatus) {
      // 로그인 된 유저의 디폴트 동작은 MY 레이어 열기
      myButtonAction = 'MY';
      if (Object.keys(myInfo).length > 0) {
        // 준회원: 등록한 회선 없음
        if (myInfo.svcInfo?.expsSvcCnt < 1) {
          myButtonAction = 'NONE';
          // 가입한 회선 있음
          if (myInfo.svcInfo?.totalSvcCnt > 0) {
            // 등록한 회선 없음 / 가입한 회선 있음
            bottomSheetMode = 'REGISTER_A_LINE';
          } else {
            // 등록한 회선 없음 / 가입한 회선 없음
            bottomSheetMode = 'NO_REGISTERED_LINE';
          }
        }
        // 영문 모드에서는 PPS(M2)가 아닌 모바일회선만 지원
        else if (
          lang === 'EN' &&
          (myDisplayData.선택회선.icon !== LineIcon.모바일 || myDisplayData.선택회선.svcInfo.svcAttrCd === 'M2')
        ) {
          bottomSheetMode = 'NO_ACCESS_LINK_TO_KOR';

          // 유선 또는 PPS 회선이 기준 회선
          if (myDisplayData.선택회선.svcInfo.svcAttrCd === 'M2') {
            // My 버튼은 허용한다.
          } else {
            myButtonAction = 'NONE';
          }
        } else {
          bottomSheetMode = 'NORMAL';
        }
      } else {
        // 티월드가 아닐경우 로그인 된 유저의 상세 정보가 없어서 바텀시트 숨김처리
        bottomSheetMode = 'NONE';
      }
    } else {
      bottomSheetMode = 'LOGIN';
      myButtonAction = 'LOGIN';
    }

    if (showBottomSheet === 'N') {
      bottomSheetMode = 'NONE';
    }

    // Exception 시 바텀시트 노출 옵션 설정 되어 있으나 일반상황일 경우 바텀시트 숨김 처리
    if (showBottomSheet === 'EXCEPTION_ONLY' && bottomSheetMode === 'NORMAL') {
      bottomSheetMode = 'NONE';
    }

    if (bottomSheetMode === 'NONE') {
      setShowNavClass('g-bottom');
    } else {
      setShowNavClass('g-bottom-sheet');
    }

    if (bottomSheetMode === 'NORMAL') {
      lineIdText = myDisplayData.선택회선?.lineIdText;

      if (
        // PPS
        myDisplayData.선택회선?.svcInfo.svcAttrCd === 'M2' ||
        // 집전화 제외한 유선라인
        (myDisplayData.선택회선?.group === 's' && myDisplayData.선택회선?.icon !== LineIcon.집전화)
      ) {
        setQuotaData({
          quota: '',
          quotaText: lang === 'KO' ? myDisplayData.선택회선?.svcInfo.prodNm : myDisplayData.선택회선?.svcInfo.prodEngNm,
        });
      } else {
        // 데이터 잔여량 조회가 필요 할 경우 데이터 추가로 가져온 후 하단 네비 업데이트
        fetchMyBalances(apiBaseUrl, lang, setQuotaData, myDisplayData);
      }
    } else {
      //
    }

    // 초기 바텀 네비를 세팅하고 위에 fetchMyBalances가 호출된 경우 응답이 오면 다시 갱신함
    const newProps = {
      bottomSheetMode,
      myButtonAction,
      hasMultiLine: myDisplayData.hasMultiLine,
      lineIdText,
      // menuInfoMap,
    };
    syncedCompProps = { ...syncedCompProps, ...newProps };
    setCompProps(syncedCompProps);
  }, [myInfoLoaded, JSON.stringify(allProps)]);

  useEffect(() => {
    if (!myInfoLoaded) return;

    const newProps = { quota: quotaData.quota, quotaText: quotaData.quotaText };
    syncedCompProps = { ...syncedCompProps, ...newProps };
    setCompProps(syncedCompProps);
  }, [quotaData]);

  useEffect(() => {
    // 하단 네비를 아예 사용하지 않는 페이지에서 하단네비 속성을 건드리지 않도록 함
    // 앱에서 로그인 링크등이 망가질 수 있음
    if (!show) return;

    sessionStorage.setItem('v6bottomNav', JSON.stringify(compProps));
    setBottomNav(compProps);
  }, [JSON.stringify(compProps)]);

  useEffect(() => {
    if (isVisible) {
      showBottomNav(showNavClass);
    } else {
      hideBottomNav(showNavClass);
    }
  }, [isVisible, showNavClass]);

  return isVisible && !isApp() && compProps ? <NavBottom {...compProps} /> : null;
}
