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
import { MyQuickMenu } from '../components/My/MyQuickMenu';
import { MyMembership } from '../components/My/MyMembership';
import { MySubscribe } from '../components/My/MySubscribe';
import { MyJoinInfo } from '../components/My/MyJoinInfo';
import myApiRespToDisplayData from '../common/apiRespToDisplayData/my';
import ppsApiRespToDisplayData from '../common/apiRespToDisplayData/pps';
import paidApiRespToDisplayData from '../common/apiRespToDisplayData/paid';
import myBalancesApiRespToDisplayData from '../common/apiRespToDisplayData/myBalances';
import tmembershipApiRespToDisplayData from '../common/apiRespToDisplayData/tmembership';
import contractsApiRespToDisplayData from '../common/apiRespToDisplayData/contracts';
import tuniverseApiRespToDisplayData from '../common/apiRespToDisplayData/tuniverse';
import myQuickMenuRespToDisplayData from '../common/apiRespToDisplayData/myQuickMenu';

import myBalancesApi from '../api/my/myBalances';
import ppsApi from '../api/my/pps';
import paidApi from '../api/my/paid';
import quickMenuApi from '../api/my/quickMenu';
import tMembershipApi from '../api/my/tmembership';
import contractsApi from '../api/my/contracts';
import tuniverseApi from '../api/my/tuniverse';

import { Message, MessageProps } from '../components/My/Message';
import {
  조회불가_노출데이터_없음,
  조회불가_신규_가입이력_없음,
  예외_CASE_A_1,
  예외_CASE_A_2,
  예외_CASE_A_3,
  예외_CASE_A_4,
  예외_CASE_A_5,
  예외_CASE_A_6,
  예외_CASE_C,
  예외_CASE_LOADING,
  유선_SK브로드밴드,
  예외_미정의,
} from '../components/My/Message.stories';
import { autoLogoutNoticeUrl, isAndroid, isApp } from '../js/commonUtil';

import { BillsScreenType, InquiryExcpetion } from '../common/types';
import {
  callBridgeApi,
  formatYYYYMDHHmm,
  getBillsScreenType,
  getInquiryException,
  getPaidInquiryException,
  guessLang,
  isLoggedIn,
  myRedirect,
} from '../common/utils';
import { FeeModule } from '../components/My/FeeModule';
import XtrAw from '../components/Common/XtrAw';
import useModal from '../hooks/useModal';

export const historyBackOrCloseMyWebView = () => {
  if (isApp()) {
    callBridgeApi({
      command: 'closeMyAndOpenUrl',
      params: {},
    });
  } else {
    const qs = new URLSearchParams(window.location.search);
    const returnUrl = qs.get('returnUrl');
    if (returnUrl) {
      window.location.href = returnUrl;
    } else {
      history.back();
    }
  }
};

const genMessageParamsFromInquiryException = (ex: InquiryExcpetion, is데이터통화모듈: boolean): MessageProps => {
  let result: MessageProps;

  switch (ex.type) {
    case '조회할수없음_월제한초과':
      result = 예외_CASE_A_1.args;
      break;
    case '조회할수없음_요금제변경이력있음':
      result = 예외_CASE_A_2.args;
      break;
    case '조회할수없음_회선정지이력있음':
      result = 예외_CASE_A_3.args;
      break;
    case '조회불가없음_신규가입이력없음':
      result = 조회불가_신규_가입이력_없음.args;
      break;
    case '조회할수없음_항목없음':
      if (is데이터통화모듈) {
        result = 예외_CASE_A_4.args;
      } else {
        result = 조회불가_노출데이터_없음.args;
      }
      break;
    case '조회할수없음_권한있는자녀회선아님':
      result = 예외_CASE_A_5.args;
      break;
    case '조회할수없음_오류':
      result = 예외_CASE_A_6.args;
      break;
    case '서비스점검중':
      result = {
        ...예외_CASE_C.args,
        exSubTit: `잠시 후 다시 이용해 주세요. <br/>${formatYYYYMDHHmm(ex.apiResp.block.fromDtm)}~${formatYYYYMDHHmm(
          ex.apiResp.block.toDtm,
        )}`,
      };
      break;
    case '조회할수없음_미응답':
      result = 예외_CASE_A_6.args;
      break;
    case '미정의오류':
    default:
      result = { ...예외_미정의.args, exSubTit: 예외_미정의.args.exSubTit.replace(/CODE/, ex.apiResp?.respCode) };
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
  const [quickMenuDisplayData, setQuickMenuDisplayData] = useState(null);
  const [myBalancesDisplayData, setMyBalancesDisplayData] = useState(null);
  const [tmembershipDisplayData, setTMembershipDisplayData] = useState(null);
  const [contractsDisplayData, setContractsDisplayData] = useState(null);
  const [subscriptionDisplayData, setSubscriptionDisplayData] = useState(null);
  const [ppsDisplayData, setPpsDisplayData] = useState(null);
  const [wireDisplayData, setWireDisplayData] = useState(null);

  const [balanceInquiryException, setBalanceInquiryException] = useState<InquiryExcpetion>(null);
  const [billsInquiryException, setBillsInquiryException] = useState<InquiryExcpetion>(null);

  const [billsScreenType, setBillsScreenType] = useState<BillsScreenType>(null);

  const [use데이터통화, setUse데이터통화] = useState(false);
  const [use요금, setUse요금] = useState(false);
  const [useT멤버십, setUseT멤버십] = useState(false);

  /*
  const [use퀵메뉴, setUse퀵메뉴] = useState(false)
  const [useT우주, setUseT우주] = useState(false)
  const [use모바일가입정보, setUse모바일가입정보] = useState(false)
  const [use인터넷_전화_IPTV가입정보, setUse인터넷_전화_IPTV가입정보] = useState(false)
   */

  useEffect(() => {
    setIsMyWebview(true);

    setTimeout(() => {
      const closeBtn = document.getElementById('closeMyBtn');
      closeBtn.style.display = 'none';

      setTimeout(() => {
        closeBtn.style.display = '';
        closeBtn?.focus();
      }, 100);
    }, 0);
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

    const _use데이터통화 =
      _billsScreenType !== '준회원' &&
      // PPS가 아닌 무선
      ((_myDisplayData.선택회선.group === 'm' && _myDisplayData.선택회선.svcInfo.svcAttrCd !== 'M2') ||
        // 유선 집전화
        _myDisplayData.선택회선.svcInfo.svcAttrCd === 'S3');
    setUse데이터통화(_use데이터통화);

    if (_use데이터통화) {
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

          const myBalancesDisplayData = myBalancesApiRespToDisplayData(apiResp, 'KO');
          setMyBalancesDisplayData(myBalancesDisplayData);
        },
      });
    }

    const _use요금 = _billsScreenType !== '준회원' && _billsScreenType !== '유선_SK브로드밴드';
    setUse요금(_use요금);

    if (
      _myDisplayData?.선택회선 &&
      // 무선이면서
      _myDisplayData.선택회선.group === 'm' &&
      // PPS가 아니고
      _myDisplayData.선택회선.svcInfo.svcAttrCd !== 'M2' &&
      // 포켓파이도 아님
      _myDisplayData.선택회선.svcInfo.svcAttrCd !== 'M3'
    ) {
      setUseT멤버십(true);
    }

    if (_use요금) {
      if (_billsScreenType === '무선_PPS') {
        ppsApi({
          setter: (apiResp) => {
            setBillsLoadFinished(true);

            const ex = getInquiryException(apiResp);

            if (ex) {
              setBillsInquiryException(ex);
              return;
            }
            const ppsDisplayData = ppsApiRespToDisplayData(apiResp);
            setPpsDisplayData(ppsDisplayData);
          },
        });
      } else if (_myDisplayData.선택회선.group === 'm') {
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
        // 유선 요금
        paidApi({
          setter: (apiResp) => {
            setBillsLoadFinished(true);

            const ex = getPaidInquiryException(apiResp);
            if (ex) {
              setBillsInquiryException(ex);
              return;
            }

            const wireDisplayData = paidApiRespToDisplayData(apiResp);
            setWireDisplayData(wireDisplayData);

            if (wireDisplayData.통합청구사용) {
              setBillsScreenType(
                _myDisplayData.선택회선.svcInfo.actRepYn === 'Y' ? '유선_통합청구_대표회선' : '유선_통합청구_일반회선',
              );
            }
          },
        });
      }
    }

    if (_myDisplayData?.선택회선?.group !== 's') {
      contractsApi({
        setter: (contractsResp) => {
          if (!contractsResp) return;
          const contractsDisplayData = contractsApiRespToDisplayData(contractsResp);
          setContractsDisplayData(contractsDisplayData);
        },
      });
    }

    tuniverseApi({
      setter: (tuniverseResp) => {
        if (!tuniverseResp) return;
        const subscriptionDisplayData = tuniverseApiRespToDisplayData(tuniverseResp);
        setSubscriptionDisplayData(subscriptionDisplayData);
      },
    });

    quickMenuApi({
      setter: (apiResp) => {
        if (!apiResp) return;
        const quickMenuDisplayData = myQuickMenuRespToDisplayData(apiResp, myInfo);
        setQuickMenuDisplayData(quickMenuDisplayData);
      },
    });
  }, [JSON.stringify(myInfo), myInfoLoaded]);

  useEffect(() => {
    if (!useT멤버십) return;

    tMembershipApi({
      setter: (tmembershipResp) => {
        if (!tmembershipResp) return;
        const tmembershipDisplayData = tmembershipApiRespToDisplayData(tmembershipResp, myInfo);
        setTMembershipDisplayData(tmembershipDisplayData);
      },
    });
  }, [useT멤버십]);

  const wiredContractsDisplayProps = myDisplayData?.wiredContractsDisplayProps;

  let touchStartY: number = null;

  return myInfo && myInfoLoaded && myDisplayData ? (
    <div
      className="layer-type-detail"
      // 스크롤을 다 올린 상태면 거기서 부터 길이 카운트
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
          appEid={'CMMA_A24-16'}
          webEid={'MWMA_A24-65'}
          xtrClick
          as="button"
          className="my-btn-close"
          onClick={historyBackOrCloseMyWebView}
          id={'closeMyBtn'}
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
              itemName={myDisplayData.선택회선.svcInfo.prodNm}
              itemNameLink="/myt-join/myplan"
              isLineSelectorOpen={lineSelector.isVisible()}
              onLineSelectorOpen={lineSelector.show}
            />
          );
        }
        if (+myInfo.svcInfo?.totalSvcCnt === 0) {
          return (
            <MyLineInfo
              {...{
                messageOnly: true,
                lineName: '가입하신 회선이 없어요.',
              }}
            />
          );
        }
        return (
          <MyLineInfo
            {...{
              lineName: '회선을 등록해 주세요.',
              itemName: '회선 등록',
              itemNameLink: '/common/member/line',
            }}
          />
        );
      })()}
      {(use데이터통화 || use요금 || billsScreenType === '유선_SK브로드밴드') && (
        <div className="card-bottom-content">
          <div className="my-line-info">
            {use데이터통화 && !myBalancesDisplayData?.noDisplayData && (
              <div className="my-box">
                {myBalancesDisplayData?.title ? (
                  <MyTitle type={myBalancesDisplayData.title} />
                ) : (
                  <MyTitle type={TitleType.ERR남은데이터통화} />
                )}
                {balanceInquiryException && (
                  <Message {...genMessageParamsFromInquiryException(balanceInquiryException, true)} />
                )}
                {!balancesLoadFinished && <Message {...예외_CASE_LOADING.args} />}
                {myBalancesDisplayData && (
                  <MyGraph
                    {...myBalancesDisplayData}
                    onDataRefillClick={dataRefill.show}
                    onDataGiftClick={() => {
                      dataGift.show({
                        t가족모아데이터_가입가능: myInfo.tfamilySharingProdYn === 'Y',
                        t가족모아데이터_가입됨: myBalancesDisplayData.t가족모아데이터_가입됨,
                      });
                    }}
                    isDataRefillLayerVisible={dataRefill.isVisible()}
                    isDataGiftLayerVisible={dataGift.isVisible()}
                    lang="KO"
                  />
                )}
              </div>
            )}

            {use요금 &&
              (billsScreenType === '무선_일반' ||
                billsScreenType === '무선_통합청구_대표회선' ||
                billsScreenType === '무선_통합청구_일반회선') && (
                <div className="my-box">
                  {billsInquiryException && <MyTitle type={TitleType.ERR요금정보} />}
                  {!billsInquiryException && lastMonthBillsDisplayData && billsScreenType === '무선_일반' && (
                    <MyTitle type={TitleType.무선_일반} titleParams={{ 청구월: lastMonthBillsDisplayData.청구월 }} />
                  )}
                  {!billsInquiryException &&
                    lastMonthBillsDisplayData &&
                    billsScreenType === '무선_통합청구_대표회선' && (
                      <MyTitle
                        type={TitleType.무선_통합청구_대표회선}
                        titleParams={{ 청구월: lastMonthBillsDisplayData.청구월 }}
                      />
                    )}
                  {!billsInquiryException &&
                    lastMonthBillsDisplayData &&
                    billsScreenType === '무선_통합청구_일반회선' && (
                      <MyTitle
                        type={TitleType.무선_통합청구_일반회선}
                        titleParams={{ 청구월: lastMonthBillsDisplayData.청구월 }}
                      />
                    )}

                  {billsInquiryException && (
                    <Message {...genMessageParamsFromInquiryException(billsInquiryException, false)} />
                  )}
                  {!billsLoadFinished && <Message {...예외_CASE_LOADING.args} />}

                  {lastMonthBillsDisplayData?.요금 && (
                    <>
                      <XtrAw appEid="CMMA_A24-13" webEid="MWMA_A24-45" xtrClick>
                        <MyVolume over1={lastMonthBillsDisplayData.요금} overUnit1="원" link="/myt-fare/submain" />
                      </XtrAw>
                      <div className="my-period">{lastMonthBillsDisplayData.기간}</div>

                      <div className="fee-list">
                        <XtrAw appEid="CMMA_A24-14" webEid={'MWMA_A24-46'} xtrClick>
                          <MyItem
                            icon={setMyItem.args.icon}
                            title="실시간 이용요금"
                            fee=""
                            link="/myt-fare/bill/hotbill"
                            hideUnit
                          />
                        </XtrAw>
                        {lastMonthBillsDisplayData.휴대폰결제이용동의 && (
                          <XtrAw appEid="CMMA_A24-15" webEid={'MWMA_A24-47'} xtrClick>
                            <MyItem
                              icon={setMyItem2.args.icon}
                              title="휴대폰 결제/콘텐츠 이용료"
                              fee=""
                              link="/myt-fare/bill/small"
                              hideUnit
                            />
                          </XtrAw>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )}

            {use요금 && billsScreenType === '무선_PPS' && (
              <div className="my-box">
                {!billsLoadFinished && <Message {...예외_CASE_LOADING.args} />}

                {billsInquiryException && <MyTitle type={TitleType.ERR남은데이터통화} />}
                {billsInquiryException && (
                  <Message {...genMessageParamsFromInquiryException(billsInquiryException, false)} />
                )}

                {!billsInquiryException && ppsDisplayData?.사용가능금액 && (
                  <>
                    <MyTitle type={TitleType.PPS_남은요금} />
                    <XtrAw
                      appEid={ppsDisplayData.사용가능데이터 ? 'CMMA_A24-68' : 'CMMA_A24-66'}
                      webEid={ppsDisplayData.사용가능데이터 ? 'MWMA_A24-72' : 'MWMA_A24-70'}
                      xtrView={true}
                      xtrClick
                    >
                      <MyVolume over1={ppsDisplayData.사용가능금액} overUnit1="원" link="/myt-fare/submain" />
                    </XtrAw>
                  </>
                )}

                {!billsInquiryException && !ppsDisplayData?.사용가능금액 && ppsDisplayData?.사용가능데이터 && (
                  <>
                    <MyTitle type={TitleType.PPS_남은데이터} />
                    <XtrAw appEid="CMMA_A24-67" webEid="MWMA_A24-71" xtrView={true} xtrClick>
                      <MyVolume over1={ppsDisplayData.사용가능데이터} overUnit1="MB" link="/myt-fare/submain" />
                    </XtrAw>
                  </>
                )}

                {ppsDisplayData && ppsDisplayData.사용가능데이터 && ppsDisplayData.사용가능금액 && (
                  <div className="fee-list">
                    <XtrAw appEid="CMMA_A24-69" webEid="MWMA_A24-73" xtrView={true} xtrClick>
                      <MyItem
                        icon={setMyItem.args.icon}
                        title="사용할 수 있는 데이터"
                        fee={`${ppsDisplayData.사용가능데이터}MB`}
                        link="/myt-fare/submain"
                        hideUnit
                      />
                    </XtrAw>
                  </div>
                )}
              </div>
            )}

            {billsScreenType === '유선_SK브로드밴드' && (
              <div className="my-box">
                <MyTitle type={TitleType.ERR요금정보} />
                <Message {...유선_SK브로드밴드.args} />
              </div>
            )}

            {use요금 &&
              (billsScreenType === '유선_일반' ||
                billsScreenType === '유선_통합청구_대표회선' ||
                billsScreenType === '유선_통합청구_일반회선') && (
                <div className="my-box">
                  {billsInquiryException && <MyTitle type={TitleType.ERR요금정보} />}
                  {!billsInquiryException && wireDisplayData && billsScreenType === '유선_일반' && (
                    <MyTitle type={TitleType.유선공통} titleParams={{ 청구월: wireDisplayData.청구월 }} />
                  )}
                  {!billsInquiryException && wireDisplayData && billsScreenType === '유선_통합청구_대표회선' && (
                    <MyTitle type={TitleType.유선통합청구대표회선} titleParams={{ 청구월: wireDisplayData.청구월 }} />
                  )}
                  {!billsInquiryException && wireDisplayData && billsScreenType === '유선_통합청구_일반회선' && (
                    <MyTitle type={TitleType.유선통합청구일반회선} titleParams={{ 청구월: wireDisplayData.청구월 }} />
                  )}

                  {billsInquiryException && (
                    <Message {...genMessageParamsFromInquiryException(billsInquiryException, false)} />
                  )}
                  {!billsLoadFinished && <Message {...예외_CASE_LOADING.args} />}

                  {wireDisplayData?.요금 && (
                    <>
                      <XtrAw appEid="CMMA_A24-17" webEid="MWMA_A24-49" xtrView={true} xtrClick>
                        <MyVolume over1={wireDisplayData.요금} overUnit1="원" link="/myt-fare/billguide/guide" />
                      </XtrAw>
                      <div className="my-period">{wireDisplayData.기간}</div>
                      {/* 함께 청구됨 메시지 */}
                      {!billsInquiryException && billsScreenType === '유선_통합청구_일반회선' && (
                        <FeeModule 요금메시지="대표회선으로 청구되었어요" />
                      )}
                    </>
                  )}
                </div>
              )}
          </div>
        </div>
      )}
      {quickMenuDisplayData?.compProps && <MyQuickMenu {...quickMenuDisplayData.compProps} />}
      {tmembershipDisplayData && tmembershipDisplayData.compProps && (
        <MyMembership {...tmembershipDisplayData.compProps} />
      )}
      {subscriptionDisplayData?.compProps?.subscribeList?.length > 0 && (
        <MySubscribe {...subscriptionDisplayData.compProps} />
      )}
      {contractsDisplayData?.compProps?.itemList?.length > 0 && <MyJoinInfo {...contractsDisplayData.compProps} />}
      {myDisplayData?.선택회선?.group !== 's' && wiredContractsDisplayProps?.itemList?.length > 0 && (
        <MyJoinInfo {...wiredContractsDisplayProps} />
      )}
    </div>
  ) : null;
}
