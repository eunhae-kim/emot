/* eslint-disable no-use-before-define */
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { AppContext } from '../context/AppContext';
import {
  changeDeviceRanking,
  changeScmRanking,
  getMainNotice,
  getMarketingCard,
  getMarketingCardDefault,
  getTermAgreement,
} from '../api/main';
import { callConversion } from '../api/statistics';
import { getDeviceSegName, getScmSegName, exitApp, isApp, getOSInfo, isAndroid } from '../js/commonUtil';

import { Layout } from '../components/Layout/Layout';
import { MainMessageBubble } from '../components/Main/MainMessageBubble';
import { Header } from '../components/Layout/Header';
import { MainEvent } from '../components/Main/MainEvent';
import { MainAgeThumbContent } from '../components/Main/MainAgeThumbContent';
import { MainMySmartPhone } from '../components/Main/MainMySmartPhone';
import { MainProductsContent } from '../components/Main/MainProductsContent';
import { MainNoWrapContent } from '../components/Main/MainNoWrapContent';
import { MainWrapContent } from '../components/Main/MainWrapContent';
import { MainSubscribeContent } from '../components/Main/MainSubscribeContent';
import { MainFixContent } from '../components/Main/MainFixContent';
import { MainItemsSlide } from '../components/Main/MainItemsSlide';
import { MainVisualSlide } from '../components/Main/MainVisualSlide';
import { MainRankingSlide } from '../components/Main/MainRankingSlide';
import { callBridgeApi } from '../common/utils';
import { Default as RoamingStoryProps } from '../components/Main/MainItemsSlide.stories';

import BottomNav from '../container/BottomNav';
import { MainTopBanner } from '../container/main/MainTopBanner';
import { HotAndNew } from '../container/main/HotAndNew';
import { MobileGuide } from '../container/main/MobileGuilde';
import { QuickMenu } from '../container/main/QuickMenu';
import { Notice } from '../container/main/Notice';
import { ShortCutMenu } from '../container/main/ShortCutMenu';
import { EventBanner } from '../container/EventBanner';
import useModal from '../hooks/useModal';
import { ModalStateContext } from '../context/ModalContext';
import { TtimeCard } from '../container/main/TtimeCard';
import { S3_URL } from '../common/const';

interface Seg {
  id: string;
  name: string;
  noReload?: boolean;
}

export default function Main({ ...props }) {
  const { confirm, termsAgreement, emergency, newApp } = useModal();
  const appContext = useContext(AppContext);
  const [myInfo] = appContext.myInfo;
  const [bottomNavCompProps] = appContext.bottomNav.compProps;
  const { addToOnBackHandlers, removeFromOnBackHandlers } = appContext;
  const { getMccCode } = appContext;
  const [mccCode] = appContext.mccCode;

  const [membershipType, setMembershipType] = useState<'01' | '02'>('01');
  const [svcMgmtNum, setSvcMgmtNum] = useState<string>(null);
  const [deviceRankingSeg, setDeviceRankingSeg] = useState<Seg>(null);
  const [scmRankingSeg, setScmRankingSeg] = useState<Seg>(null);
  const [termAgreement, setTermAgreement] = useState(false);
  const [messageBubble, setMessageBubble] = useState(null);
  const [cardList, setCardList] = useState<Array<string>>([]);
  const [cardItems, setCardItems] = useState<any>({});
  const [deviceRanking, setDeviceRanking] = useState<Array<any>>([]);
  const [scmRanking, setScmRanking] = useState<any>({});
  const [processId, setProcessId] = useState('none');

  const [showTerms, setShowTerms] = useState<boolean>(false);
  const [isRedirectMy, setIsRedirectMy] = useState<boolean>(false);

  let hwBackBtnClicked = 0;
  let hwBackBtnLastClickTime = 0;

  const modalIsVisibleRef = useRef<boolean>(false);
  const { openedModals, openedOverlayModals } = useContext(ModalStateContext);

  function observeRef(ref) {
    const observer = new IntersectionObserver(onImpressionConversion, { threshold: 0.5 });
    observer.observe(ref);
  }

  // 선택약관 모달
  useEffect(() => {
    if (showTerms) {
      setTimeout(() => {
        // my로 redirect 되는 상황이면 표출하지 않음
        if (isRedirectMy) return;
        termsAgreement.show();
      }, 350);
    }
  }, [showTerms]);

  // 긴급공지 모달
  async function getEmergencyNotice(disableShow = false) {
    if (sessionStorage.getItem('emergencyNotice') === 'y') return;
    if (disableShow) return;

    const response = await getMainNotice();
    if (response.noticeList.length === 0) return;

    // 브라우저 마다 1회만 노출하기 위해 sessionStoragey 내 emergencyNotice 'y' 저장
    sessionStorage.setItem('emergencyNotice', 'y');
    const { notice } = response.noticeList[0];
    if (localStorage.getItem(`notice${notice.ntcId}`)) {
      const hiddenDate = new Date(localStorage.getItem(`notice${notice.ntcId}`));
      const today = new Date();
      if (hiddenDate.getTime() >= today.getTime()) return;
    }

    const noticeContent = notice.ntcCtt.replace(/\{\{cdn\}\}/g, S3_URL[global.LDSP]);

    emergency.show({
      isOpen: true,
      getClosed: () => emergency.close(),
      title: notice.ntcTitNm,
      message: noticeContent,
      type: notice.ntcReqRsnCtt,
      id: notice.ntcId,
    });
  }

  async function checkNewAppYn(disableShow = false) {
    if (!isApp() || sessionStorage.getItem('newAppModal') === 'y' || localStorage.getItem('closeNewAppModal') === 'y') {
      return;
    }

    const osInfo = getOSInfo(window.navigator.userAgent);
    const appVersion: string = window.navigator.userAgent?.match(/\|appVersion:([\.0-9]*)\|/)[1];
    const isNewApp = parseInt(appVersion.split('.')[2]) % 2 !== 0;

    if (osInfo && osInfo.name === 'AOS' && !isNewApp) {
      sessionStorage.setItem('newAppModal', 'y');
      if (disableShow) return;
      newApp.show();
    }
  }

  // Conversion API 를 위한 useCallback
  const device_001 = useCallback(
    (ref) => {
      if (ref && processId) observeRef(ref);
    },
    [cardItems, processId, svcMgmtNum],
  );
  const device_002 = useCallback(
    (ref) => {
      if (ref && processId) observeRef(ref);
    },
    [cardItems, processId, svcMgmtNum],
  );
  const membership_001 = useCallback(
    (ref) => {
      if (ref && processId) observeRef(ref);
    },
    [cardItems, processId, svcMgmtNum],
  );
  const scm_001 = useCallback(
    (ref) => {
      if (ref && processId) observeRef(ref);
    },
    [cardItems, processId, svcMgmtNum],
  );
  const broadband_001 = useCallback(
    (ref) => {
      if (ref && processId) observeRef(ref);
    },
    [cardItems, processId, svcMgmtNum],
  );
  const vcolor_001 = useCallback(
    (ref) => {
      if (ref && processId) observeRef(ref);
    },
    [cardItems, processId, svcMgmtNum],
  );
  const vcolor_002 = useCallback(
    (ref) => {
      if (ref && processId) observeRef(ref);
    },
    [cardItems, processId, svcMgmtNum],
  );
  const roaming_001 = useCallback(
    (ref) => {
      if (ref && processId) observeRef(ref);
    },
    [cardItems, processId, svcMgmtNum],
  );
  const adt_001 = useCallback(
    (ref) => {
      if (ref && processId) observeRef(ref);
    },
    [cardItems, processId, svcMgmtNum],
  );
  const adt_002 = useCallback(
    (ref) => {
      if (ref && processId) observeRef(ref);
    },
    [cardItems, processId, svcMgmtNum],
  );
  const plan_001 = useCallback(
    (ref) => {
      if (ref && processId) observeRef(ref);
    },
    [cardItems, processId, svcMgmtNum],
  );
  const combine_001 = useCallback(
    (ref) => {
      if (ref && processId) observeRef(ref);
    },
    [cardItems, processId, svcMgmtNum],
  );

  // ConversionAPI handler (impression)
  function onImpressionConversion([entry], observer) {
    if (entry.isIntersecting && svcMgmtNum) {
      observer.unobserve(entry.target);
      if (processId && processId !== 'none') {
        // ranking process id 가 있으면 conversion 호출
        callConversion(svcMgmtNum, 'reco_tw_ranking', processId, entry.target.id, 'impression');
      }
      switch (entry.target.id) {
        case 'device_001': {
          if (cardItems.device_001) {
            const data = cardItems.device_001.data[0];
            if (!data) return;
            callConversion(svcMgmtNum, data.channelId, data.processId, data.id, 'impression');
            break;
          }
        }
        case 'plan_001': {
          if (cardItems.plan_001) {
            const data = cardItems.plan_001;
            if (!data) return;
            callConversion(svcMgmtNum, data.channelId, data.processId, data.id, 'impression');
            break;
          }
        }
        case 'vcolor_001': {
          if (cardItems.vcolor_001) {
            const { data } = cardItems.vcolor_001;
            if (!data) return;
            callConversion(svcMgmtNum, data.channelId, data.processId, data.id, 'impression');
            break;
          }
        }
      }
    }
  }

  // ConversionAPI handler (click)
  async function onClickConversion(id) {
    if (svcMgmtNum) {
      switch (id) {
        case 'device_001': {
          if (cardItems.device_001) {
            const data = cardItems.device_001.data[0];
            await callConversion(svcMgmtNum, data.channelId, data.processId, data.id, 'click');
            await callConversion(svcMgmtNum, 'reco_tw_ranking', processId, id, 'click');
          }
          break;
        }
        case 'plan_001': {
          if (cardItems.plan_001) {
            const data = cardItems.plan_001;
            await callConversion(svcMgmtNum, data.channelId, data.processId, data.id, 'click');
            await callConversion(svcMgmtNum, 'reco_tw_ranking', processId, id, 'click');
          }
          break;
        }
        case 'vcolor_001': {
          if (cardItems.vcolor_001) {
            const { data } = cardItems.vcolor_001;
            await callConversion(svcMgmtNum, data.channelId, data.processId, data.id, 'click');
            await callConversion(svcMgmtNum, 'reco_tw_ranking', processId, id, 'click');
          }
          break;
        }
        default: {
          await callConversion(svcMgmtNum, 'reco_tw_ranking', processId, id, 'click');
          break;
        }
      }
    }
  }

  function isAgreementShow() {
    // 30일간 설정한지 체크
    if (localStorage.getItem('terms')) {
      const hiddenDate = new Date(localStorage.getItem('terms'));
      const today = new Date();

      if (hiddenDate.getTime() > today.getTime()) {
        return false;
      }
    }
    // 앱 구동 후 이미 봤는지 체크
    if (sessionStorage.getItem('termsToday') === 'y') {
      return false;
    }

    return true;
  }

  function errorConfirm(respCode: number) {
    confirm.show({
      isOpen: true,
      message: `일시적으로 서비스 제공이 원활하지 않습니다.<br/>잠시 후 다시 이용해주세요. ${
        respCode && respCode !== 1004 ? ` (코드: ${respCode})` : ''
      }`,
    });
  }

  useEffect(() => {
    modalIsVisibleRef.current = !(openedModals.length === 0 && openedOverlayModals.length === 0);
  }, [openedModals, openedOverlayModals]);

  // (최초 로드 시점) window.onBack 이벤트 등록, 공지사항 확인
  useEffect(() => {
    const exitAppFunction = () => {
      // 다른 모달 열려 있을때 앱종료 모달을 표출 back 버튼 이벤트 무시(모달 닫기 동작과 충돌)
      if (modalIsVisibleRef.current || window.location.pathname !== '/v6/main') return;
      const currentTime = Date.now();
      if (currentTime - hwBackBtnLastClickTime <= 3000) {
        hwBackBtnClicked += 1;
        if (hwBackBtnClicked === 2) {
          termsAgreement.close();
          hwBackBtnClicked = 0;
          // 앱 종료 모달
          setTimeout(() => {
            confirm.show({
              isOpen: true,
              message: '앱을 종료하시겠습니까?',
              onClickCancel: confirm.close,
              onClickConfirm: () => exitApp(),
              isEndPopUp: true,
              isExitApp: true,
            });
          }, 100);
        }
      } else {
        hwBackBtnClicked = 1;
      }
      hwBackBtnLastClickTime = currentTime;
    };
    addToOnBackHandlers(() => exitAppFunction());

    return () => {
      removeFromOnBackHandlers(() => exitAppFunction());
    };
  }, []);

  useEffect(() => {
    (async () => {
      if (myInfo) {
        const loginYn = Object.keys(myInfo).length > 0;
        if (!loginYn) {
          // 비로그인 Case
          const mlsData = await getMarketingCardDefault();
          if (mlsData) {
            alignCards(mlsData);
          }
        } else {
          // 로그인 Case (marketing-card)
          const mlsData = await getMarketingCard();
          if (mlsData) {
            alignCards(mlsData);

            if (mlsData.processId) {
              setProcessId(mlsData.processId);
            }
            if (mlsData.messageBubbles) {
              setMessageBubble(mlsData.messageBubbles);
            }
          }

          // 서비스관리번호 / 멤버십 Type 셋팅 (멤버십 Type default 01)
          if (myInfo.svcInfo.svcMgmtNum) {
            setSvcMgmtNum(myInfo.svcInfo.svcMgmtNum);
          }
          if (myInfo.svcInfo.mbrCardBenfTypCd) {
            setMembershipType(myInfo.svcInfo.mbrCardBenfTypCd);
          }

          // 약관 관련 셋팅 -> isAdult이면서 mbrChlId가 있으면 약관 동의 체크, PPS회선 거르는 로직 삭제
          if (myInfo.svcInfo?.isAdult && myInfo.svcInfo?.mbrChlId) {
            const agreements = await getTermAgreement();

            if (agreements && agreements.twdInfoRcvAgreeYn === 'Y') {
              setTermAgreement(true);
            }
            if (agreements && agreements.twdInfoRcvAgreeYn === 'N' && isAgreementShow()) {
              sessionStorage.setItem('termsToday', 'y');
              setShowTerms(true);
            }

            // 앱이고, twdLocUeAgreeYn Y인 경우 > network type 읽어서 로밍모드 랜딩
            // 앱 실행 후 최초1회 수행하기 위해 alreadyMCC 쿠키값을 'y'로 셋팅
            // 안드로이드만 MCC 코드 확인, iOS는 NAG API 활용 예정
            if (isApp() && isAndroid() && sessionStorage.getItem('alreadyReadMCC') !== 'y') {
              if (agreements.twdLocUseAgreeYn === 'Y') {
                getMccCode();
                setTimeout(() => {
                  if (mccCode !== '450') {
                    sessionStorage.setItem('alreadyReadMCC', 'y');
                    window.location.href = `/product/roaming/on?mcc=${mccCode}`;
                  }
                }, 500);
              }
            }
          }
        }
      }
    })();
  }, [myInfo, mccCode]);

  // 단말 통계 카드-> Seg 변경 시 다시 화면 Update
  useEffect(() => {
    (async () => {
      if (deviceRankingSeg && !deviceRankingSeg.noReload) {
        let subscriptionId = null;
        if (termAgreement && myInfo.svcInfo) subscriptionId = myInfo.svcInfo.prodId;
        const data = await changeDeviceRanking(deviceRankingSeg.id, subscriptionId);
        if (data.result) setDeviceRanking(data.result);
        else {
          // 에러 발생 시 sessionStorage에 있던 기존 seg값으로 표시
          setDeviceRankingSeg(JSON.parse(sessionStorage.getItem('prev_deviceSeg')));
          errorConfirm(data?.respCode);
        }
      }
    })();
  }, [deviceRankingSeg]);

  // 구독 통계 카드-> Seg 변경 시 다시 화면 Update
  useEffect(() => {
    (async () => {
      if (scmRankingSeg && !scmRankingSeg.noReload) {
        let subscriptionId = null;
        if (termAgreement && myInfo.svcInfo) subscriptionId = myInfo.svcInfo.prodId;
        const data = await changeScmRanking(scmRankingSeg.id, subscriptionId);
        if (data && data.result) setScmRanking(data.result);
        else {
          // 에러 발생 시 sessionStorage에 있던 기존 seg값으로 표시
          setScmRankingSeg(JSON.parse(sessionStorage.getItem('prev_scmSeg')));
          errorConfirm(data?.respCode);
        }
      }
    })();
  }, [scmRankingSeg]);

  // My layer 자동오픈은 웹에서 My 레이어 사용 가능 상태인지 확인 되면 실행
  useEffect(() => {
    if (!bottomNavCompProps) return;

    let disableModal = false;
    const params = new URL(location.href).searchParams;
    const shouldOpenMyLayer = !!params.get('fromWidget');

    if (shouldOpenMyLayer && bottomNavCompProps.myButtonAction === 'MY') {
      // 모달 제어를 위해 my로 redirect 되는지 상태 저장(선택약관 모달 표출 시점때문에 따로 처리)
      setIsRedirectMy(true);
      disableModal = true;

      // back 버튼으로 돌아올때마다 My 레이어 띄우는 것을 방지하기 위해서 query string을 날려줌
      history.replaceState(null, null, location.pathname);

      callBridgeApi({
        command: 'openMyCsLayer',
        randomCode: '000001',
      });
    }

    // 메인 페이지 최초 로딩시 표출 되어야 하는 모달들
    mainInitModal(disableModal);
  }, [JSON.stringify(bottomNavCompProps)]);

  // 메인페이지 최초 로딩시 표출 되어야 하는 모달들
  function mainInitModal(disableShow = false) {
    (async () => {
      await getEmergencyNotice(disableShow); // 긴급공지
      await checkNewAppYn(disableShow); // 소문자앱 업데이트
    })();
  }

  // 카드 순서 정렬
  function alignCards(mlsData) {
    const response = mlsData.cardRanking;
    if (response) {
      response.splice(1, 0, 'hotAndNew');
      response.splice(3, 0, 'subBanner');
      setCardList(response);
      setCardItems(mlsData.cardItems);

      if (mlsData.cardItems.device_002) {
        setDeviceRanking(mlsData.cardItems.device_002.data);
        setDeviceRankingSeg({
          name: getDeviceSegName(mlsData.cardItems.device_002.segKey),
          id: mlsData.cardItems.device_002.segKey,
          noReload: true,
        });
      }

      if (mlsData.cardItems.scm_001) {
        setScmRanking(mlsData.cardItems.scm_001.data);
        setScmRankingSeg({
          name: getScmSegName(mlsData.cardItems.scm_001.segKey),
          id: mlsData.cardItems.scm_001.segKey,
          noReload: true,
        });
      }
    } else {
      // 에러발생 상황에 hotAndNew와 subBanner만 보여지게 한다.
      setCardList(['hotAndNew', 'subBanner']);
    }
  }

  // Message Bubble 클릭 시 카드로 smooth 랜딩
  function scrollToCard(cardId) {
    const element = document.getElementById(cardId);
    const headerOffset = 95;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  }

  return (
    <Layout addClass="main">
      <html lang="ko" />
      <Head>
        <title>홈 &lt; Tworld</title>
      </Head>

      {/* Message Bubble */}
      {messageBubble && (
        <MainMessageBubble message={messageBubble} scrollToCard={scrollToCard} svcMgmtNum={myInfo.svcInfo.svcMgmtNum} />
      )}

      <Header myInfo={myInfo} twm={props.twm} />

      {/* 배너(메인 상단) */}
      <MainTopBanner />

      {/* Quick Menu */}
      <QuickMenu />

      {/* 메뉴 바로가기 */}
      <ShortCutMenu />

      {cardList.map((card) => {
        switch (card) {
          case 'device_001':
            return (
              cardItems.device_001?.statusCode === 'SUCCESS' &&
              cardItems.device_001.data.length > 0 && (
                <div id="device_001" key="device_001" ref={device_001}>
                  <MainProductsContent
                    deviceO2OList={cardItems.device_001.data}
                    onClickConversion={onClickConversion}
                  />
                </div>
              )
            );
          case 'device_002':
            return (
              cardItems.device_002?.statusCode === 'SUCCESS' &&
              deviceRanking &&
              deviceRanking.length > 0 && (
                <div id="device_002" key="device_002" ref={device_002}>
                  <MainAgeThumbContent
                    deviceRanking={deviceRanking}
                    seg={deviceRankingSeg ? deviceRankingSeg.name : getDeviceSegName(cardItems.device_002.segKey)}
                    onClickConversion={onClickConversion}
                    rankingSeg={deviceRankingSeg}
                    setRankingSeg={setDeviceRankingSeg}
                  />
                </div>
              )
            );
          case 'membership_001':
            return (
              cardItems.membership_001?.statusCode === 'SUCCESS' && (
                <div id="membership_001" key="membership_001" ref={membership_001}>
                  <MainNoWrapContent
                    membershipType={membershipType}
                    mpStatistics={cardItems.membership_001.data}
                    title={cardItems.membership_001.timeTitle}
                    onClickConversion={onClickConversion}
                  />
                </div>
              )
            );
          case 'scm_001':
            return (
              cardItems.scm_001?.statusCode === 'SUCCESS' && (
                <div id="scm_001" key="scm_001" ref={scm_001}>
                  <MainSubscribeContent
                    scmRanking={scmRanking}
                    seg={scmRankingSeg ? scmRankingSeg.name : getScmSegName(cardItems.scm_001.segKey)}
                    onClickConversion={onClickConversion}
                    rankingSeg={scmRankingSeg}
                    setRankingSeg={setScmRankingSeg}
                  />
                </div>
              )
            );
          case 'broadband_001':
            return (
              <div id="broadband_001" key="broadband_001" ref={broadband_001}>
                <MainEvent onClickConversion={onClickConversion} />
              </div>
            );
          case 'vcolor_001':
            return (
              cardItems.vcolor_001?.statusCode === 'SUCCESS' && (
                <div id="vcolor_001" key="vcolor_001" ref={vcolor_001}>
                  <MainVisualSlide vColoringReco={cardItems.vcolor_001.data} onClickConversion={onClickConversion} />
                </div>
              )
            );
          case 'vcolor_002':
            return (
              cardItems.vcolor_002?.statusCode === 'SUCCESS' && (
                <div id="vcolor_002" key="vcolor_002" ref={vcolor_002}>
                  <MainRankingSlide vcolorRanking={cardItems.vcolor_002.data} onClickConversion={onClickConversion} />
                </div>
              )
            );
          case 'roaming_001':
            return (
              cardItems.roaming_001?.statusCode === 'SUCCESS' && (
                <div id="roaming_001" key="roaming_001" ref={roaming_001}>
                  <MainItemsSlide
                    title={RoamingStoryProps.args.title}
                    roamingRanking={cardItems.roaming_001.data}
                    onClickConversion={onClickConversion}
                  />
                </div>
              )
            );
          case 'adt_001':
            return (
              <div id="adt_001" key="adt_001" ref={adt_001}>
                <MainWrapContent type="home" onClickConversion={onClickConversion} />
              </div>
            );
          case 'adt_002':
            return (
              <div id="adt_002" key="adt_002" ref={adt_002}>
                <MainWrapContent type="store" onClickConversion={onClickConversion} />
              </div>
            );
          case 'plan_001':
            return (
              cardItems.plan_001?.statusCode === 'SUCCESS' && (
                <div id="plan_001" key="plan_001" ref={plan_001}>
                  <MainMySmartPhone planData={cardItems.plan_001.data} onClickConversion={onClickConversion} />
                </div>
              )
            );
          case 'combine_001':
            return (
              cardItems.combine_001?.statusCode === 'SUCCESS' && (
                <div id="combine_001" key="combine_001" ref={combine_001}>
                  <MainFixContent combineData={cardItems.combine_001.data} onClickConversion={onClickConversion} />
                </div>
              )
            );
          case 'hotAndNew':
            return (
              <div key="hotAndNew">
                <HotAndNew />
              </div>
            );
          case 'subBanner':
            return (
              <div key="subBanner">
                <EventBanner type="main" />
              </div>
            );
          case 'tworld_001':
            return (
              <div key="tworld_001">
                <TtimeCard ttimeStory={cardItems.tworld_001?.data ?? []} />
              </div>
            );
          default:
            return null;
        }
      })}

      {/* 이럴땐 이렇게 해보세요 */}
      <MobileGuide />

      {/* 공지사항 */}
      <Notice />

      <BottomNav tabIndex={0} showBottomSheet="Y" />
    </Layout>
  );
}
