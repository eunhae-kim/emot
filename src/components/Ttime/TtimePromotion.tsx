import React, { memo, useContext, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import _ from 'lodash';
import { TtimeCup } from '../../common/types';
import useModal from '../../hooks/useModal';
import { isApp } from '../../js/commonUtil';
import { callBridgeApi } from '../../common/utils';
import V6Link from '../Common/V6Link';
import { TWORLD_URL } from '../../common/const';
import { AppContext } from '../../context/AppContext';

// 경품 정보 리스트
const drawGoodsList = [
  {
    goodsClass: 'img01',
    goodsSrc: 'https://cdnm.tworld.co.kr/skt/ttime/promotion/img_goods01.png',
    goodsAlt: '하나투어 영국 항공권 (하나투어 상품권)',
    indexList: [0, 1, 2],
  },
  {
    goodsClass: 'img02',
    goodsSrc: 'https://cdnm.tworld.co.kr/skt/ttime/promotion/img_goods02.png',
    goodsAlt: '롯데호텔 시그니엘 시그니엘 숙박권 (+애프터눈 T 세트)',
    indexList: [3, 4, 5],
  },
  {
    goodsClass: 'img03',
    goodsSrc: 'https://cdnm.tworld.co.kr/skt/ttime/promotion/img_goods03.png',
    goodsAlt: '발뮤다 발뮤다 티팟 세트 (색상 랜덤)',
    indexList: [6, 7, 8],
  },
];

// 화면에 보이는 컵의 위치 index와 컵의 정보를 매핑
const cupInfoIndexMap = {
  6: { id: 1 },
  7: { id: 2 },
  8: { id: 3 },
  0: { id: 4 },
  1: { id: 5 },
  2: { id: 6 },
  3: { id: 7 },
  4: { id: 8 },
  5: { id: 9 },
};

// 테마별 이야기 보러가기 리스트
const themeStoryList = [
  {
    href: '/v6/ttime/theme?id=1',
    src: 'https://cdnm.tworld.co.kr/skt/ttime/promotion/img_swipe01.png',
    alt: '달달한 꿀차가 챙겨 주는 혜택 꿀정보',
    title: '혜택 꿀정보 이야기 보기',
  },
  {
    href: '/v6/ttime/theme?id=2',
    src: 'https://cdnm.tworld.co.kr/skt/ttime/promotion/img_swipe02.png',
    alt: '톡톡 튀는 소다가 들려주는 흥미로운 수다',
    title: '흥미로운 수다 이야기 보기',
  },
  {
    href: '/v6/ttime/theme?id=3',
    src: 'https://cdnm.tworld.co.kr/skt/ttime/promotion/img_swipe03.png',
    alt: '커피 한 잔과 함께 만나 보는 통신생활 안내서',
    title: '통신생활 안내서 이야기 보기',
  },
  {
    href: '/v6/ttime/theme?id=4',
    src: 'https://cdnm.tworld.co.kr/skt/ttime/promotion/img_swipe04.png',
    alt: '똘똘한 버블티가 알려 주는 스마트한 IT 지식',
    title: '스마트한 IT 지식 이야기 보기',
  },
];

interface TtimePromotionProps {
  cupInfo: TtimeCup[];
  drawInfo: string[];
  drawCallback: (ids: string) => void;
  headerPadding?: boolean;
}
interface CupIconProps {
  cup: TtimeCup;
}
interface DrawButtonProps {
  cupIndexList: number[];
  cupInfo: TtimeCup[];
  drawInfo: string[];
  drawCallback: (cupIndexListString: string) => void;
}

// 컵 아이콘 컴포넌트
const CupIcon = memo(({ cup }: CupIconProps) => {
  if (cup === undefined) return null;

  // eslint-disable-next-line no-param-reassign
  cup.popupYn = 'Y'; // 이벤트 페이지에서는 신규 획득 메시지 필요없음
  const { ttimeCup } = useModal();
  return (
    <button
      type="button"
      aria-label={cup.title}
      className={`img0${cup.id} ${cup.ownYn === 'Y' ? 'on' : ''}`}
      onClick={() => {
        ttimeCup.show({
          cupInfo: cup,
          isOpen: true,
        });
      }}
      title={cup.title}
    >
      {/* eslint-disable-next-line react/no-danger */}
      <span className="goodsName" dangerouslySetInnerHTML={{ __html: cup.titleLineBreak }} />
    </button>
  );
});

// 응모버튼 컴포넌트
function DrawButton({ cupIndexList, cupInfo, drawInfo, drawCallback }: DrawButtonProps) {
  const [loginUrl, setLoginUrl] = useState<string>('');
  if (cupInfo === undefined || drawInfo === undefined) return null;

  const appContext = useContext(AppContext);
  const { loginInfo } = appContext;

  useEffect(() => {
    setLoginUrl(
      loginInfo === 'N'
        ? `/common/tid/login?target=/v6/ttime/promotion&app=${isApp() ? 'Y' : 'N'}`
        : `/common/member/slogin/fail?target=/v6/ttime/promotion`,
    );
  }, []);

  // TID 로그인이 아닌 경우
  if (loginInfo !== 'T') {
    return (
      <div className="goodsBtnWrap">
        <V6Link href={loginUrl}>
          <button type="button" className="cup login">
            로그인하고 참여하기
          </button>
        </V6Link>
      </div>
    );
  }

  const cupOwnYnList = cupIndexList.map((index) => {
    const cupId = cupInfoIndexMap[index].id;
    const cup = _.find(cupInfo, (item) => item.id === cupId);
    return cup?.ownYn ?? 'N';
  });

  const isAllCollect = !cupOwnYnList.includes('N');
  const isApplied = drawInfo.includes(cupIndexList.toString());

  const [myInfo] = appContext.myInfo;
  const age = myInfo?.svcInfo?.age;
  const isUnderFourteen = age === undefined || age < 14;

  if (isUnderFourteen) {
    // 만 14세 미만 응모불가 케이스
    return <span className="noticeInfo">* 만 14세 이상의 고객님만 참여가 가능합니다.</span>;
  }

  if (isApplied) {
    // 응모 완료상태
    return (
      <button type="button" className="cup end" disabled>
        응모 완료
      </button>
    );
  }
  if (isAllCollect) {
    // 응모 가능상태
    return (
      <button type="button" className="cup" onClick={() => drawCallback(cupIndexList.toString())}>
        응모하기
      </button>
    );
  }
  // 응모 불가능상태(모은컵 부족)
  return (
    <button type="button" className="cup" disabled>
      컵 모으고 응모하기
    </button>
  );
}

function TtimePromotion({ cupInfo, drawInfo, drawCallback, headerPadding = true }: TtimePromotionProps) {
  const [isShowShareSection, setIsShowShareSection] = useState(true);

  useEffect(() => {
    if (!isApp() && typeof navigator.share === 'undefined') {
      // 모웹에서 공유하기가 지원되지 않는 케이스
      setIsShowShareSection(false);
    }
  }, []);

  const handleShare = () => {
    const shareUrl = TWORLD_URL[global.LDSP] + window.location.pathname + window.location.search;
    if (isApp()) {
      callBridgeApi({ command: 'share', params: { content: shareUrl } });
    } else {
      const shareData = {
        url: shareUrl,
        title: 'T 타임 런칭 이벤트',
        text: 'T world에서 T 타임 이야기 읽고 컵을 모으면 럭키박스 선물이 팡팡!',
      };
      navigator
        .share(shareData)
        .then()
        .catch(() => console.error('TtimePromotion share error'));
    }
  };

  return (
    <div className={headerPadding ? 'ttime-promotion-content' : 'ttime-promotion-content none-header'}>
      <section className="section-head">
        <div className="inner">
          <div className="h1">
            <img
              src="https://cdnm.tworld.co.kr/skt/ttime/promotion/main_logo.png"
              alt="SK telecom | T world"
              className="logo"
            />
            <strong className="h1Img">
              <img src="https://cdnm.tworld.co.kr/skt/ttime/promotion/img_h101.png" alt="럭키" />
              <img src="https://cdnm.tworld.co.kr/skt/ttime/promotion/img_h102.png" alt="컵타임" />
            </strong>
          </div>
          <p className="h1SubText">
            T world에서 T 타임 이야기 읽고
            <br />
            컵을 모으면 럭키박스 선물이 팡팡!
          </p>
          <div className="eventDate">
            <span>기간: 2023년 10월 13일(금)~11월 30일(목)</span>
            <span>당첨 발표: 2023년 12월 6일(수)</span>
          </div>
        </div>
      </section>
      <section className="section-01">
        <div className="inner">
          <p className="h2">
            T 타임 이야기 읽고 컵을 모아 <strong>럭키박스 이벤트에 응모해 보세요!</strong>
          </p>
          <p className="sub">
            원하는 럭키박스의 컵을 모두 모으면 <br /> 응모 기회를 받으실 수 있어요.
          </p>
          <div className="sub2">
            <p className="sub2Text">
              컵을 선택하면{' '}
              <strong>
                컵 획득 방법과
                <br />
                설명서
              </strong>
              를 보실 수 있어요.
            </p>
          </div>
        </div>
      </section>
      <section className="section-02">
        <div className="inner">
          <ul>
            {/* 경품 응모 리스트 */}
            {drawGoodsList.map((item) => (
              <li className={item.goodsClass} key={item.goodsClass}>
                <div className="goodsArea">
                  <img src={item.goodsSrc} alt={item.goodsAlt} />
                </div>
                <div className="goodsWhiteArea">
                  {/* 상품별 컵 아이콘 영역 */}
                  <div className="goodsBtnArea">
                    {item.indexList.map((index) => (
                      <CupIcon key={index} cup={_.find(cupInfo, (cup) => cup.id === cupInfoIndexMap[index].id)} />
                    ))}
                  </div>

                  {/* 응모 버튼 영역 */}
                  <div className="goodsBtnWrap">
                    <DrawButton
                      cupIndexList={item.indexList}
                      cupInfo={cupInfo}
                      drawInfo={drawInfo}
                      drawCallback={drawCallback}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section-03">
        <div className="inner">
          <div className="luckyBox">
            <img
              src="https://cdnm.tworld.co.kr/skt/ttime/promotion/img_lucky.png"
              alt="럭키박스 쉽고 재미있게 참여하는 방법 "
            />
          </div>
          <div className="luckyStep">
            <img
              src="https://cdnm.tworld.co.kr/skt/ttime/promotion/img_lucky_step.png"
              alt="Step1 : T world에 로그인하여 T 타임 이야기 읽기, Step2 : 이야기 읽기 등 미션 완성하고 모은 컵 확인하기, Step3 : 럭키박스 응모 찬스 확인 후 상품 응모하기"
            />
          </div>
          <div className="ttimeMainLink">
            <V6Link href="/v6/ttime/main">
              <button type="button">T world에서 T 타임 즐기기</button>
            </V6Link>
          </div>
        </div>
      </section>
      <section className="section-04">
        <div className="inner">
          <div className="tTimeStory">
            T world에서 통신생활 꿀팁이 가득한
            <br />
            <strong>T 타임 이야기</strong>를 만나 보세요!
            <div className="tTimeStorySub">다양한 테마별 이야기를 즐기실 수 있어요.</div>
          </div>
          <Swiper className="swiper" slidesPerView={1.35} centeredSlides={false} spaceBetween={12}>
            <ul className="swiper-wrapper">
              {themeStoryList.map((item) => (
                <SwiperSlide className="swiper-slide" key={item.href}>
                  <V6Link href={item.href}>
                    <img src={item.src} alt={item.alt} />
                  </V6Link>
                </SwiperSlide>
              ))}
            </ul>
          </Swiper>
        </div>
      </section>
      {isShowShareSection && (
        <section className="section-05">
          <div className="inner">
            <div className="shareText">
              럭키 컵타임 소식을
              <br />
              <strong>친구에게 알려 주세요!</strong>
            </div>
            <div className="btnShare">
              <button type="button" onClick={handleShare}>
                공유하기
              </button>
            </div>
          </div>
        </section>
      )}
      <section className="section-06">
        <div className="inner">
          <div className="noticeArea">
            <strong className="noticeText">&nbsp;이벤트 운영 사무국 안내</strong>
            <ul className="depOne">
              <li>
                <ul className="depTwo">
                  <li>- 이 이벤트 관련 자세한 내용은 T world 럭키박스 이벤트 운영사무국으로 문의해 주시기 바랍니다.</li>
                  <li>- 이메일: tworld.luckybox@gmail.com</li>
                  <li>
                    - 카카오채널: tworld_luckybox{' '}
                    <V6Link
                      href="http://pf.kakao.com/_xfmPCG/chat"
                      newWindow="BROWSER"
                      billYn="Y"
                      className="kakaoLink"
                    >
                      (http://pf.kakao.com/_xfmPCG/chat)
                    </V6Link>
                  </li>
                  <li>
                    - 전화: 1600-1834
                    <br />
                    (평일 오전 10시~오후 5시, 점심시간 낮 12시~오후 1시, 주말/공휴일 휴무, 유료)
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="section-07">
        <div className="inner">
          <div className="noticeArea">
            <strong className="noticeText">&nbsp;유의사항</strong>
            <ul className="depOne">
              <li>
                이벤트 유의사항
                <ul className="depTwo">
                  <li>
                    - 이 이벤트는 만 14세 이상 T 월드 고객님만 참여하실 수 있습니다. (법인 및 외국인 고객님은 참여하실
                    수 없습니다.)
                  </li>
                  <li>- 이벤트 당첨 여부는 T 타임 페이지에서 2023년 12월 6일(수)에 확인 가능합니다.</li>
                  <li>
                    - 메가MGC커피 아메리카노 경품은 2023년 12월 6일(수)에 당첨된 고객님께 MMS 문자로 일괄 발송됩니다.
                  </li>
                  <li>
                    - 하나투어 기프트카드, 시그니엘 서울 숙박권 경품 수령 방법은 2023년 12월 6일(수) 당첨된 고객님께
                    장문문자(LMS)로 안내해 드립니다.
                  </li>
                  <li>
                    - 비정상적이거나 불법적인 방법으로 이벤트에 참여하신 경우 당첨 및 혜택 제공 대상에 포함되지 않으며,
                    당첨 이후에도 취소될 수 있습니다.
                  </li>
                  <li>- 개인정보를 잘못 입력하여 경품을 받지 못한 경우 SK텔레콤에서 책임지지 않습니다.</li>
                  <li>- 이벤트 참여 시 제공하신 개인정보는 이벤트 용도로만 활용되며 종료 후 2개월 안에 파기됩니다.</li>
                  <li>- 이 이벤트는 SK텔레콤 및 제휴사 사정에 따라 일찍 종료될 수 있습니다.</li>
                  <li>- 이 이벤트는 SK텔레콤의 위탁을 받아 대행사 본애드컴(주)에서 운영 및 경품 발송을 진행합니다.</li>
                </ul>
              </li>
              <li>
                경품 관련 유의사항
                <span className="depTit">[메가MGC커피 (ICE)아메리카노]</span>
                <ul className="depTwo">
                  <li>- 본 모바일 쿠폰은 무상제공(B2B) 발송 상품으로 유효기간 연장 및 환불 대상이 아닙니다.</li>
                </ul>
                <span className="depTit">[이용안내]</span>
                <ul className="depTwo">
                  <li>- 전국 메가MGC커피 매장에서 사용 가능합니다. (일부 매장 제외)</li>
                  <li>
                    - 본 상품 교환시 메가MGC커피 스탬프 및 포인트 적립은 브랜드사 정책에 따릅니다.
                    <em>
                      * 브랜드사 정책은 메가MGC커피 앱 &gt; 스탬프 &gt; [스탬프 적립 주의사항]에서 확인 가능합니다.
                    </em>
                  </li>
                  <li>
                    - 본 상품은 매장 내 재고가 없을 경우 동일 가격 이상의 다른 상품으로 교환이 가능하며, 차액은 추가
                    지불 하여야 합니다. <br /> (단, 쿠폰가보다 낮은 상품으로 교환 시 잔액은 환불 드리지 않습니다.)
                  </li>
                  <li>- 자세한 사항은 참여하신 휴대폰 번호로 발송된 문자 메시지 유의사항을 확인 부탁드립니다.</li>
                </ul>
                <span className="depTit">[매장안내]</span>
                <ul className="depTwo">
                  <li>- 전국 메가MGC커피 매장에서 사용 가능합니다. (일부매장 제외)</li>
                </ul>
                <span className="depTit">[사용불가매장]</span>
                <ul className="depTwo">
                  <li>- 서울: 건대학생회관점, 서초법원점</li>
                  <li>- 경기: 홈플러스안산선부점</li>
                  <li>- 충남: 천안터미널점</li>
                  <li>- 울산: 홈플러스울산점</li>
                </ul>
                <span className="depTit">[시그니엘 서울 숙박권]</span>
                <ul className="depTwo">
                  <li>- 당첨되신 경품은 롯데호텔 통합 숙박권으로 지급됩니다.</li>
                  <li>
                    - 경품 수령에 대한 자세한 방법은 2023년 12월 6일(수) 참여하신 휴대폰 번호로 발송된 장문문자(LMS)로
                    안내해 드립니다. 문자 미수신 시, 12월 12일(화) 이내에 이벤트 운영 사무국으로 문의 부탁드립니다.
                  </li>
                  <li>
                    - 2023년 12월 12일(화)까지 경품 안내 문자에 미 응답 시 당첨이 취소됩니다. 회신 기간에 유의
                    부탁드립니다.
                  </li>
                  <li>- 본 숙박권은 발행일로부터 1년간 유효합니다.</li>
                  <li>- 본 숙박권 요금은 성인 2인 1실로 1박 투숙 기준 요금이며 세금 및 봉사료가 포함된 금액입니다.</li>
                  <li>
                    - 본 숙박권 객실 유형은 그랜드 디럭스 시티 뷰이며, 무료 이용이 가능한 부가서비스는 STAY 조식 2인 /
                    Salon de SIGNIEL (In House Guest Lounge) 2인 / 실내수영장 / 장피트니스 센터입니다.
                  </li>
                  <li>
                    - 본 숙박권 사용 제외 일자는 매주 토요일 / 2023년 7월 28일(금)부터 8월 15일(화) / 2023년 12월
                    22일(금)부터 12월 25일(월) / 2023년 12월 29일(금) 부터 2024년 1월 1일(월) 입니다.
                  </li>
                  <li>- 숙박권 이용 시 사전 예약 필수이며, 체크인 시 숙박권을 필히 제출해 주시기 바랍니다.</li>
                  <li>- 숙박권 도난, 분실, 훼손 시 환불 및 재발행이 되지 않습니다.</li>
                  <li>- 유효기간 내 미사용 시 이용 제한 또는 추가 요금이 발생됩니다.</li>
                  <li>- 호텔 운영 상황에 따라 상품 변경 및 이용에 제한이 발생할 수 있습니다.</li>
                  <li>- 5만 원이 초과하는 경품에 대한 제세공과금(22%)은 SK텔레콤에서 부담합니다.</li>
                  <li>
                    - 세금 대납 및 경품 인도 등 절차상 필요한 서류(신분증 사본 등)를 요청할 수 있으며, 이를 거부하시면
                    경품을 받으실 수 없습니다.
                  </li>
                  <li>
                    - 만 14세 이상 만 19세 미만 고객님이 당첨될 경우 법정 대리인 동의 및 관련 절차가 요구될 수 있습니다.
                    (만 19세 미만 고객님에 한해 법정 대리인에게 당첨권을 양도하실 수 있습니다.)
                  </li>
                  <li>- 숙박 관련 문의는 시그니엘 서울호텔(02-3213-1000)로 문의 부탁드립니다.</li>
                </ul>
                <span className="depTit">[하나투어 기프트카드]</span>
                <ul className="depTwo">
                  <li>- 당첨되신 경품은 하나투어 모바일 GIFT카드 금액권(300만 원권)으로 지급됩니다.</li>
                  <li>
                    - 경품 수령에 대한 자세한 방법은 2023년 12월 6일(수) 참여하신 휴대폰 번호로 발송된 장문문자(LMS)로
                    안내해 드립니다. 문자 미수신 시, 12월 12일(화) 이내에 이벤트 운영 사무국으로 문의 부탁드립니다.
                  </li>
                  <li>
                    - 2023년 12월 12일(화)까지 경품 안내 문자에 미 응답 시 당첨이 취소됩니다. 회신 기간에 유의
                    부탁드립니다.
                  </li>
                  <li>- 경품은 2028년 11월 31일까지 사용할 수 있습니다.</li>
                  <li>- 하나투어 홈페이지(https://www.hanatour.com) 및 하나투어 가맹점 모두 사용 가능합니다.</li>
                  <li>
                    - 하나투어 항공권 및 입장권 중 일부 상품 구매 시 사용에 제한이 있습니다. (국내 항공권 사용 불가)
                  </li>
                  <li>- 경품 이용에 대한 유의사항은 하나투어 이용 정책을 따릅니다.</li>
                  <li>- 5만 원이 초과하는 경품에 대한 제세공과금(22%)은 SK텔레콤에서 부담합니다.</li>
                  <li>
                    - 세금 대납 및 경품 인도 등 절차상 필요한 서류(신분증 사본 등)를 요청할 수 있으며, 이를 거부하시면
                    경품을 받으실 수 없습니다.
                  </li>
                  <li>
                    - 만 14세 이상 만 19세 미만 고객님이 당첨될 경우 법정 대리인 동의 및 관련 절차가 요구될 수 있습니다.
                    (만 19세 미만 고객님에 한해 법정 대리인에게 당첨권을 양도하실 수 있습니다.)
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TtimePromotion;
