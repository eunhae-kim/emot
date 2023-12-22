import React, { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import { AppContext } from '../context/AppContext';
import { MyLineInfo } from '../components/My/MyLineInfo';
import { MyTitle, TitleType } from '../components/My/MyTitle';
import { MyGraph } from '../components/My/MyGraph';
import { MyVolume } from '../components/My/MyVolume';
import { MyItem } from '../components/My/MyItem';
import {
  실시간_이용요금 as setMyItem,
  지난달_청구요금 as setMyItem3,
  콘텐츠_이용료 as setMyItem2,
} from '../components/My/MyItem.stories';
import { MyQuickMenu as EnMyQuickMenu } from '../components/en/My/MyQuickMenu';
import myApiRespToDisplayData from '../common/apiRespToDisplayData/my';
import myBalancesApiRespToDisplayData from '../common/apiRespToDisplayData/myBalances';

import myBalancesApi from '../api/my/myBalances';

import { Message, MessageProps } from '../components/My/Message';
import { 예외_CASE_LOADING } from '../components/My/Message.stories';
import { autoLogoutNoticeUrl } from '../js/commonUtil';
import { BillsScreenType, InquiryExcpetion } from '../common/types';
import {
  formatYYYYMDHHmm,
  getBillsScreenType,
  getInquiryException,
  getPaidInquiryException,
  guessLang,
  isLoggedIn,
  myRedirect,
} from '../common/utils';
import paidApi from '../api/my/paid';
import paidApiRespToDisplayData from '../common/apiRespToDisplayData/paid';
import { MY_영문_퀵메뉴 } from '../components/en/My/MyQuickMenu.stories';
import { historyBackOrCloseMyWebView } from './My';
import XtrAw from '../components/Common/XtrAw';
import useModal from '../hooks/useModal';

const genMessageParamsFromInquiryException = (
  ex: InquiryExcpetion,
  is데이터통화모듈: boolean,
  options?: { showLineSelector: () => void },
): MessageProps => {
  let result: MessageProps;

  switch (ex.type) {
    case '조회할수없음_월제한초과':
      result = {
        loading: false,
        exIcon: 'ic-warn',
        exTit: 'Please try again later',
        exSubTit: 'The number of inquiries permitted is limited to ensure service stability',
        exBtnRefresh: false,
        exAddClass: false,
      };
      break;
    case '조회할수없음_요금제변경이력있음':
      result = {
        loading: false,
        exIcon: 'ic-warn',
        exTit: 'Not available',
        exSubTit: 'You have just switched back to your current plan within the past month',
        exBtnRefresh: false,
        exAddClass: false,
      };
      break;
    case '조회할수없음_회선정지이력있음':
      result = {
        loading: false,
        exIcon: 'ic-warn',
        exTit: 'Not available',
        exSubTit: 'You have suspended your service within the past month',
        exBtnRefresh: false,
        exAddClass: false,
      };
      break;
    case '조회할수없음_항목없음':
      if (is데이터통화모듈) {
        result = {
          loading: false,
          exIcon: 'ic-warn',
          exTit: 'Not available',
          exSubTit: 'No data balance information available',
          exBtnRefresh: false,
          exAddClass: false,
        };
      } else {
        result = {
          loading: false,
          exIcon: 'ic-qck-myfee',
          exTit: 'No Billing History',
          exSubTit: 'No billing history has been charged',
          exBtnRefresh: false,
          exAddClass: false,
          exBtnView: true,
        };
      }
      break;
    case '조회할수없음_권한있는자녀회선아님':
      result = {
        loading: false,
        exIcon: 'ic-warn',
        exTit: 'Not available',
        exSubTit: 'You are not the legal guardian of the subscriber',
        exBtnRefresh: false,
        exAddClass: false,
      };
      break;
    case '조회할수없음_오류':
      result = {
        loading: false,
        exIcon: 'ic-warn',
        exTit: 'Not available',
        exSubTit: 'Data balance could not be found',
        exBtnRefresh: true,
        exAddClass: false,
      };
      break;
    case '서비스점검중':
      result = {
        loading: false,
        exIcon: 'ic-inspect',
        exTit: 'System under maintenance',
        exSubTit: `Please try again later ${formatYYYYMDHHmm(ex.apiResp.block.fromDtm)}~${formatYYYYMDHHmm(
          ex.apiResp.block.toDtm,
        )}`,
        exBtnRefresh: false,
        exAddClass: false,
      };
      break;
    case '조회할수없음_미응답':
      result = {
        loading: false,
        exIcon: 'ic-warn',
        exTit: 'Please try again later',
        exSubTit: 'NOT_RESPONDING',
        exBtnRefresh: false,
        exAddClass: false,
      };
      break;
    case '미지원_영문PPS':
      result = {
        loading: false,
        exIcon: 'ic-warn',
        exTit: 'Access Unavailable',
        exSubTit:
          'The service for PPS and non-mobile lines are still under development.<br> You may access these services on the  Korean version of T world.',
        exBtnRefresh: false,
        exAddClass: false,
        exBtnView: false,
        showLineSelector: options.showLineSelector,
        showTworldHomeLink: true,
      };
      break;
    case '조회불가없음_신규가입이력없음':
      result = {
        loading: false,
        exIcon: 'ic-qck-myfee',
        exTit: 'No Billing History',
        exSubTit: 'No billing history within the past 6 months',
        exBtnRefresh: false,
        exAddClass: false,
        exBtnView: true,
      };
      break;
    case '미정의오류':
    default:
      result = {
        loading: false,
        exIcon: 'ic-warn',
        exTit: 'Please try again later',
        exSubTit: `${ex.apiResp?.respMsg}`,
        exBtnRefresh: false,
        exAddClass: false,
      };
      break;
  }

  return result;
};

export default function () {
  const appContext = useContext(AppContext);
  const [myInfo] = appContext.myInfo;
  const [myInfoLoaded] = appContext.myInfoLoaded;
  const [, setIsMyWebview] = appContext.isMyWebview;

  const { dataGift, dataRefill, lineSelector } = useModal();

  const [myDisplayData, setMyDisplayData] = useState(null);
  const [lastMonthBillsDisplayData, setLastMonthBillsDisplayData] = useState(null);
  const [balancesLoadFinished, setBalancesLoadFinished] = useState(false);
  const [billsLoadFinished, setBillsLoadFinished] = useState(false);
  const [myBalancesDisplayData, setMyBalancesDisplayData] = useState(null);

  const [balanceInquiryException, setBalanceInquiryException] = useState<InquiryExcpetion>(null);
  const [billsInquiryException, setBillsInquiryException] = useState<InquiryExcpetion>(null);

  const [billsScreenType, setBillsScreenType] = useState<BillsScreenType>(null);

  const [use데이터통화, setUse데이터통화] = useState(false);
  const [use요금, setUse요금] = useState(false);

  useEffect(() => {
    setIsMyWebview(true);
  }, []);

  useEffect(() => {
    if (!myInfoLoaded) return;
    // my 화면은 로그인 안한/풀린 상태에서는 접근 금지
    if (!isLoggedIn(myInfo)) {
      myRedirect(autoLogoutNoticeUrl(null, guessLang()));
      return;
    }
    // 준회원 접근 금지
    if (!myInfo?.svcInfo) return;

    const _myDisplayData = myApiRespToDisplayData(myInfo);
    setMyDisplayData(_myDisplayData);

    const _billsScreenType = getBillsScreenType(_myDisplayData);
    setBillsScreenType(_billsScreenType);

    const _use데이터통화 = billsScreenType !== '준회원' && _myDisplayData.선택회선.group === 'm';
    setUse데이터통화(_use데이터통화);

    if (_use데이터통화) {
      if (_billsScreenType === '무선_PPS') {
        setBalancesLoadFinished(true);
        setBalanceInquiryException({
          type: '미지원_영문PPS',
          apiResp: null,
        });
      } else {
        myBalancesApi({
          params: { onlyRemainedYn: 'N' },
          setter: (apiResp) => {
            console.log('myBalances', apiResp);

            setBalancesLoadFinished(true);
            const ex = getInquiryException(apiResp);
            if (ex) {
              setBalanceInquiryException(ex);
              return;
            }

            const myBalancesDisplayData = myBalancesApiRespToDisplayData(apiResp, 'EN');
            setMyBalancesDisplayData(myBalancesDisplayData);
          },
        });
      }
    }

    const _use요금 = _billsScreenType !== '준회원' && _billsScreenType !== '유선_SK브로드밴드';
    setUse요금(_use요금);

    if (_use요금) {
      if (_myDisplayData.선택회선.group === 'm' && _billsScreenType !== '무선_PPS') {
        paidApi({
          setter: (apiResp) => {
            setBillsLoadFinished(true);

            const ex = getPaidInquiryException(apiResp);
            if (ex) {
              setBillsInquiryException(ex);
              return;
            }
            const lastMonthBillResp = paidApiRespToDisplayData(apiResp);

            setLastMonthBillsDisplayData(lastMonthBillResp);

            if (lastMonthBillResp.통합청구사용) {
              setBillsScreenType(
                _myDisplayData.선택회선.svcInfo.actRepYn === 'Y' ? '무선_통합청구_대표회선' : '무선_통합청구_일반회선',
              );
            }
          },
        });
      } else {
        // PPS/유선 요금은 영문에서 노출 안함
      }
    }
  }, [myInfo, myInfoLoaded]);

  let touchStartY: number = null;

  return myInfo && myInfoLoaded && myDisplayData ? (
    <div
      className="layer-type-detail"
      onTouchMove={(e) => {
        if (!touchStartY && e.currentTarget.scrollTop === 0) {
          touchStartY = e.changedTouches[0].clientY;
        }
      }}
      onTouchEnd={(e) => {
        const touchLengthY = e.changedTouches[0].clientY - touchStartY;
        if (touchStartY && touchLengthY > innerHeight * 0.2) {
          historyBackOrCloseMyWebView();
        }
        touchStartY = null;
      }}
    >
      <Head>
        <title>My &lt; Tworld</title>
      </Head>
      <div className="my-web-btn">
        <XtrAw
          appEid={'CMMA_A10_B134-14'}
          webEid={'MWMA_A10_B134-28'}
          xtrClick
          xtrView
          as="button"
          className="my-btn-close"
          onClick={historyBackOrCloseMyWebView}
        >
          <i className="ic-tbar-cls" />
          <span className="hidden">내 정보 닫기</span>
        </XtrAw>
      </div>

      {(() => {
        if (myDisplayData && myDisplayData.선택회선) {
          return (
            <MyLineInfo
              lineName={myDisplayData.선택회선.lineIdText}
              hasMultiLine={myDisplayData.hasMultiLine}
              icon={myDisplayData.선택회선.icon}
              itemName={myInfo.svcInfo.prodEngNm}
              itemNameLink={'/en/myt-join/submain'}
              onLineSelectorOpen={lineSelector.show}
            />
          );
        } else {
          // 영문은 등록회선 없을 경우 My 페이지 진입하지 않음
        }
      })()}

      {(use데이터통화 || use요금) && (
        <div className="card-bottom-content">
          <div className="my-line-info">
            {use데이터통화 && !myBalancesDisplayData?.noDisplayData && (
              <div className="my-box">
                {myBalancesDisplayData?.title ? (
                  <MyTitle type={myBalancesDisplayData.title} />
                ) : (
                  <MyTitle type={TitleType.EN_ERR남은데이터통화} />
                )}
                {balanceInquiryException && (
                  <Message
                    {...genMessageParamsFromInquiryException(balanceInquiryException, true, {
                      // PPS 제외 무선 회선이 있을 경우에만 회선 변경 버튼 표시
                      showLineSelector:
                        myDisplayData.mobileLineList.filter((lineInfo) => lineInfo?.svcInfo?.svcAttrCd !== 'M2')
                          .length > 0
                          ? lineSelector.show
                          : null,
                    })}
                  />
                )}
                {!balancesLoadFinished && <Message {...예외_CASE_LOADING.args} />}
                {myBalancesDisplayData && (
                  <>
                    <MyGraph
                      {...myBalancesDisplayData}
                      onDataRefillClick={dataRefill.show}
                      onDataGiftClick={dataGift.show}
                      lang={'EN'}
                    />
                  </>
                )}
              </div>
            )}

            {use요금 &&
              (billsScreenType === '무선_일반' ||
                billsScreenType === '무선_통합청구_대표회선' ||
                billsScreenType === '무선_통합청구_일반회선') && (
                <div className="my-box">
                  {billsInquiryException && <MyTitle type={TitleType.EN_ERR요금정보} />}
                  {!billsInquiryException && billsScreenType === '무선_일반' && (
                    <MyTitle type={TitleType.EN_무선_일반} />
                  )}
                  {!billsInquiryException && billsScreenType === '무선_통합청구_대표회선' && (
                    <MyTitle type={TitleType.EN_무선_통합청구_대표회선} lang={'EN'} />
                  )}
                  {!billsInquiryException && billsScreenType === '무선_통합청구_일반회선' && (
                    <MyTitle type={TitleType.EN_무선_통합청구_일반회선} />
                  )}

                  {billsInquiryException && (
                    <Message {...genMessageParamsFromInquiryException(billsInquiryException, false)} />
                  )}
                  {!billsLoadFinished && <Message {...예외_CASE_LOADING.args} />}

                  {lastMonthBillsDisplayData?.요금 && (
                    <>
                      <XtrAw appEid={'CMMA_A10_B134-9'} webEid={'MWMA_A10_B134-23'} xtrClick xtrView>
                        <MyVolume
                          over1={lastMonthBillsDisplayData.요금}
                          overUnit0={'￦'}
                          link={`/en/myt-fare/submain`}
                        />
                      </XtrAw>
                      <div className="my-period">{lastMonthBillsDisplayData.기간}</div>
                      <div className="fee-list">
                        <XtrAw appEid={'CMMA_A10_B134-10'} webEid={'MWMA_A10_B134-24'} xtrClick xtrView>
                          <MyItem
                            icon={setMyItem.args.icon}
                            title={'Real-time Monthly Fees'}
                            fee=""
                            link={'/en/myt-fare/bill/hotbill'}
                            lang={`EN`}
                            hideUnit
                          />
                        </XtrAw>
                      </div>
                    </>
                  )}
                </div>
              )}
          </div>
        </div>
      )}

      {billsScreenType !== '무선_PPS' && <EnMyQuickMenu {...MY_영문_퀵메뉴.args} />}
    </div>
  ) : null;
}
