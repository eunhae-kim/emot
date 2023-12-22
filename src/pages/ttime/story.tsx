import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import V6Link from '../../components/Common/V6Link';
import { ContentDetailTag } from '../../components/Ttime/ContentDetailTag';
import { AppContext } from '../../context/AppContext';
import { TtimeToast } from '../../components/Ttime/TtimeToast';
import { TtimeLayout } from '../../components/Layout/TtimeLayout';
import useModal from '../../hooks/useModal';
import { story as getStoryInfo, readComplete, view } from '../../api/ttime/story';
import { TtimeStory as TtimeStoryType } from '../../common/types';
import { ContentDetailNotiAgree } from '../../components/Ttime/ContentDetailNotiAgree';
import EnjoyMoreTtimeStoryListCont from '../../container/ttime/EnjoyMoreTtimeStroyListCont';
import { isApp } from '../../js/commonUtil';
import { getTermAgreement } from '../../api/main';
import useTtimeContext from '../../hooks/useTtimeContext';
import { V6_PRIVATE_API_BASE_URL } from '../../common/const';
import { callApi } from '../../common/callApi';
import { isServer } from '../../common/utils';

const HEADER_HEIGHT = 56;
const INITIAL_IFRAME_HEIGHT = 1000;

interface TargetUrl {
  url: string;
  isBillingUrl: boolean;
  isInAppUrl: boolean;
}

export default function TtimeStory({ storyProps }) {
  const [storyInfo, setStoryInfo] = useState<TtimeStoryType | undefined>(undefined);
  const [saveYn, setSaveYn] = useState<'Y' | 'N'>('N');
  const [tAlarmAgreeYn, setTAlarmAgreeYn] = useState<'Y' | 'N'>();
  const [targetUrl, setTargetUrl] = useState<TargetUrl>({ url: '', isBillingUrl: false, isInAppUrl: false });
  const [iframeHeight, setIframeHeight] = useState<number>(INITIAL_IFRAME_HEIGHT);
  const [isReadComplete, setIsReadComplete] = useState<boolean>(false);
  const [isShowReadCompleteToast, setIsShowReadCompleteToast] = useState<boolean>(false);
  const [iframeSrc, setIframeSrc] = useState<string>(undefined);
  const { ttimeStoryLogin } = useModal();

  const appContext = useContext(AppContext);
  const isTidLogin = appContext.loginInfo === 'T';

  const { ttimeUserInfo } = useTtimeContext();

  const router = useRouter();
  const { id } = router.query;

  const isShowLoginToast = !isTidLogin && !ttimeStoryLogin.isVisible();

  useEffect(() => {
    let timeout;
    if (isShowReadCompleteToast) {
      timeout = setTimeout(() => {
        setIsShowReadCompleteToast(false);
      }, 5000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [isShowReadCompleteToast]);

  useEffect(() => {
    if (storyInfo?.storyUrl && ttimeUserInfo) {
      setIframeSrc(`${storyInfo.storyUrl}?username=${encodeURIComponent(ttimeUserInfo?.userName ?? '')}`);
    }
  }, [storyInfo, ttimeUserInfo]);

  // 스토리 정보 조회
  useEffect(() => {
    if (id) {
      getStoryInfo(id as string).then((res) => {
        const { data } = res;
        if (data.storyList.length === 0) {
          router.replace(`/404`);
        } else {
          setStoryInfo(data.storyList[0]);
          // 로그인되지 않은 사용자는 티타임 로그인 바텀시트 표출
          if (!isTidLogin) {
            ttimeStoryLogin.show({
              messageType: appContext.loginInfo === 'S' ? 'simpleLoginUser' : 'logoutUser',
            });
          }
          // 앱에서 TID 로그인된 사용자만을 대상으로 T알람 동의 여부 확인
          if (isApp() && isTidLogin) {
            getTermAgreement().then((response) => {
              const alarmAgreeYn = response.tNotiInfoRcvAgreeYn === 'Y' && response.twdAdRcvAgreeYn === 'Y' ? 'Y' : 'N';
              setTAlarmAgreeYn(alarmAgreeYn);
            });
          }
        }
      });

      view(id as string);
    } else {
      router.replace(`/404`);
    }
  }, [id]);

  useEffect(() => {
    // 이야기 새로 불러왔을 때 isReadComplete 초기화
    setIsReadComplete(false);
    setIsShowReadCompleteToast(false);
    setSaveYn(storyInfo?.savedYn ?? 'N');
  }, [storyInfo]);

  // iframe으로 부터 메시지 수신
  const receiveMsgFromChild = (e: { data }) => {
    const message = e.data;
    switch (message.function) {
      case 'loadComplete':
        // eslint-disable-next-line no-case-declarations
        const msg = { function: 'getHeight' };
        document.querySelector('iframe')?.contentWindow?.postMessage(JSON.stringify(msg), '*');
        break;
      case 'redirect':
        setTargetUrl(message.data);
        document.getElementById('redirect').click();
        break;
      case 'onGetHeight':
        setIframeHeight(message.data.height);
        break;
      case 'scrollTo':
        window.scrollTo({ top: message.data.top, behavior: 'smooth' });
        break;
      default:
    }
  };

  // 완독 여부 체크(iframe의 하단이 웹뷰의 하단에 닿았을 때)
  const checkReadComplete = () => {
    // iframe 로딩 이후, TID 로그인 사용자만, 그리고 페이지 진입후 아직 안읽은 경우만(중복 호출방지용)
    if (iframeHeight === 0 || !isTidLogin || isReadComplete === true) return;
    const { clientHeight, scrollTop } = document.documentElement;
    if (scrollTop + clientHeight > iframeHeight + HEADER_HEIGHT) {
      // 읽음(완독) 처리 api 호출
      readComplete(id as string).then(() => {
        // 중복 호출 방지를 위해 완독 상태값 변경
        setIsReadComplete(true);
        // 실제로 최초 완독일 경우만 토스트 메시지 표출
        if (storyInfo.readYn === 'N') {
          setIsShowReadCompleteToast(true);
        }
      });
    }
  };

  const scrollEventDelay = (func, delay) => {
    let timer;
    // eslint-disable-next-line func-names
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const handleScroll = scrollEventDelay(checkReadComplete, 300);

  const generateTagString = (tagArray) => {
    if (!tagArray) return;
    const tagStrings = tagArray.map((tagObj) => {
      return `#${tagObj.title}`;
    });
    return tagStrings.join(' ');
  };

  // 완독 처리를 위한 스크롤 이벤트 등록
  useEffect(() => {
    if (storyInfo) {
      window.addEventListener('scroll', handleScroll);
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [storyInfo, iframeHeight, isReadComplete]);

  // 뒤로가기시 스토리 정보 초기화(이전 페이지 스크롤 위치와 랜더링 타이밍으로 인해 읽음처리 되는 케이스를 막기위한 코드)
  const resetWhenPopstate = () => {
    setStoryInfo(undefined);
  };

  useEffect(() => {
    window.addEventListener('message', receiveMsgFromChild);
    window.addEventListener('popstate', resetWhenPopstate);
    return () => {
      window.removeEventListener('message', receiveMsgFromChild);
      window.removeEventListener('popstate', resetWhenPopstate);
    };
  }, []);

  return (
    <>
      {storyProps.data && (
        <Head>
          <meta property="og:title" content={storyProps.data.title} />
          <meta property="og:description" content={generateTagString(storyProps.data.tags)} />
          <meta property="og:image" content="https://cdnm.tworld.co.kr/img/dummy/kakao_share.jpg?1692839509718" />
        </Head>
      )}
      <TtimeLayout
        headerConfig={{
          isBackBtn: true,
          buttons: [
            { type: 'save', props: { id: id as string, saveYn, setSaveYn } },
            { type: 'share', props: { id: id as string } },
          ],
        }}
        bottomNavConfig={{ isShowBottomNav: false }}
      >
        <div className={`tTime-container ${isShowLoginToast ? 'tTime-container-detail' : ''}`}>
          {iframeSrc && (
            <iframe
              key={iframeSrc as string}
              title="ttime story"
              src={iframeSrc}
              height={`${iframeHeight}px`}
              style={{ border: '0', width: '100%', overflow: 'auto', WebkitOverflowScrolling: 'touch' }}
            />
          )}
          {storyInfo && (
            <>
              <ContentDetailTag tags={storyInfo?.tags.map((tag) => tag.title) ?? []} />

              {isApp() && isTidLogin && tAlarmAgreeYn === 'N' && <ContentDetailNotiAgree />}

              <EnjoyMoreTtimeStoryListCont storyId={Number(id)} title="T 타임 이야기 더 보기" />

              <V6Link
                href={targetUrl.url}
                newWindow={!targetUrl.isInAppUrl && 'BROWSER'}
                billYn={targetUrl.isBillingUrl}
              >
                <div id="redirect" />
              </V6Link>
            </>
          )}
        </div>

        {/* 티타임 이야기 로그인 토스트 */}
        {isShowLoginToast && (
          <TtimeToast
            isShow={isShowLoginToast}
            message={`${appContext.loginInfo === 'S' ? 'T ID ' : ''}로그인하고 다양한 컵을 모아보세요`}
            type="loginGuide"
          />
        )}

        {/* 티타임용 완독 토스트 메시지 */}
        {isTidLogin && (
          <TtimeToast isShow={isShowReadCompleteToast} message="이야기를 다 읽으셨군요!" type="storyGuide" />
        )}
      </TtimeLayout>
    </>
  );
}
export async function getServerSideProps(context) {
  try {
    if (!isServer()) return;
    const { query } = context;
    const storyProps = await getOGInfo(query.id);
    return {
      props: {
        storyProps,
      },
    };
  } catch (e) {
    console.error('error', e);
  }
}

async function getOGInfo(id) {
  const data = await callApi({
    baseUrl: V6_PRIVATE_API_BASE_URL[global.LDSP],
    method: 'get',
    url: `/private/benefit/story/${id}/og`,
  });

  return data;
}
