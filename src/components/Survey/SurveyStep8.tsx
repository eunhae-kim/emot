import React, { useEffect, useState, useRef, useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y } from 'swiper';
import { getTDSUrl } from '../../js/commonUtil';
import { callConversion } from '../../api/statistics';
import { gsap, Power1 } from 'gsap';
import { MotionPathPlugin } from 'gsap/dist/MotionPathPlugin.js';
import { AppContext } from '../../context/AppContext';
import useModal from '../../hooks/useModal';

export interface SurveyCompleteProps {
  surveyResult: Array<any>;
  processId?: string;
  surveyCode?: string;
}

export function SurveyStep8({ surveyResult, processId, surveyCode }: SurveyCompleteProps) {
  const appContext = useContext(AppContext);
  const [myInfo] = appContext?.myInfo || [{ svcInfo: { svcMgmtNum: '' } }];

  const [userId, setUserId] = useState('none');
  const { confirm } = useModal();

  useEffect(() => {
    if (myInfo && myInfo.svcInfo) {
      setUserId(myInfo.svcInfo.svcMgmtNum);
    }
  }, [myInfo]);

  useEffect(() => {
    // 최초 1회 첫번째 카드에 대한 impression 전달
    if (surveyResult && processId && surveyCode) {
      callConversion(
        userId,
        'item_tworld_survey_device_reco',
        processId,
        surveyResult[0].productGrpId,
        'impression',
        null,
        surveyCode,
      );
    }
  }, [processId]);

  function cleanSessionStorage() {
    sessionStorage.removeItem('step1');
    sessionStorage.removeItem('step2');
    sessionStorage.removeItem('step3');
    sessionStorage.removeItem('step4');
    sessionStorage.removeItem('step5');
    sessionStorage.removeItem('step6');
  }

  function onClickConfirm() {
    cleanSessionStorage();
    window.location.href = '/v6/survey/step1';
  }

  function closeSurvey() {
    cleanSessionStorage();
    window.location.href = '/v6/main';
  }

  // Interaction
  gsap.registerPlugin(MotionPathPlugin);
  const appRef = useRef();
  useEffect(() => {
    const particleMotion = gsap.context(() => {
      const tl = gsap.timeline();

      // Target the two specific elements we have asigned the animate class
      tl.from('.cone_wrap', {
        duration: 1.5,
      });
      tl.from(
        '.particle_square_01',
        {
          duration: 0.2,
          x: -10,
          y: 15,
          ease: Power1.easeIn,
        },
        '-=3',
      );
      tl.from(
        '.particle_square_02',
        {
          duration: 0.2,
          x: -20,
          y: 10,
          ease: Power1.easeIn,
        },
        '-=3',
      );
      tl.from(
        '.particle_round_01',
        {
          duration: 0.2,
          scale: 0,
          ease: Power1.easeIn,
        },
        '-=3',
      );
      tl.from(
        '.particle_round_02',
        {
          duration: 0.2,
          opacity: 1,
          scale: 0,
          ease: Power1.easeIn,
        },
        '-=3',
      );
      tl.to(
        '.particle_square_01',
        {
          duration: 1,
        },
        '-=3',
      );
      tl.to(
        '.particle_square_02',
        {
          duration: 1,
        },
        '-=3',
      );
      tl.to(
        '.particle_round_01',
        {
          duration: 1,
          x: 0,
          y: 0,
          opacity: 1,
        },
        '-=3',
      );
      tl.to(
        '.particle_round_02',
        {
          duration: 1.3,
          x: 0,
          y: 0,
          opacity: 0,
        },
        '-=3',
      );
      tl.time(0);
    }, appRef);

    return () => particleMotion.revert();
  });

  return (
    <div>
      <header className="tworld-sub-header">
        <div className="sub-header-inner">
          <h1 className="sub-header-tit">나에게 맞는 기기 찾기</h1> {/* 2022-11-22 / 문구 수정 */}
          <span className="menu-box">
            <button
              type="button"
              className="menu-item-close"
              onClick={() => {
                closeSurvey();
              }}
            >
              <i className="svg-close" />
              <span className="hidden">닫기</span>
            </button>
          </span>
        </div>
      </header>

      <div className="survey-content complete">
        <div className="popup-top">
          {/* Interaction */}
          <div className="step particle_wrap">
            <div className="cone_wrap" ref={appRef}>
              <div className="particle_cone_01" />
              <div className="particle_cone_02">
                <div className="particle_square_01" />
                <div className="particle_square_02" />
                <div className="particle_round_01" />
                <div className="particle_round_02" />
              </div>
            </div>
          </div>
          {/* // Interaction */}

          <h2 className="top-title" dangerouslySetInnerHTML={{ __html: '고객님께 추천해 드리는<br> 휴대폰입니다.' }} />
        </div>

        <div className="complete-msg-box">
          {' '}
          {/* 2022-11-22 / 마크업 추가 */}
          <Swiper
            className="complete-survey-content"
            slidesPerView="auto"
            spaceBetween={8}
            pagination={{ clickable: true }}
            modules={[Pagination, A11y]}
            onSwiper={(swiper: any) => {
              //기기찾기 결과값이 1개일때
              if (swiper.slides.length < 2) {
                swiper.params.slidesPerView = 1;
                swiper.params.spaceBetween = 0;
                swiper.update();
              }
            }}
            onSlideChange={(s) => {
              callConversion(
                userId,
                'item_tworld_survey_device_reco',
                processId,
                surveyResult[s.activeIndex].productGrpId,
                'impression',
                null,
                surveyCode,
              );
            }}
          >
            {surveyResult.map((device, index: number) => (
              <SwiperSlide key={index}>
                <p
                  className="complete-title"
                  dangerouslySetInnerHTML={{ __html: `설문 결과와 <em>${Math.round(device.score * 100)}%</em> 일치` }}
                />
                <picture className="thumbnail-rounded">
                  <img loading="lazy" src={device.image} alt="" width="128" height="128" />
                </picture>
                <span className="scoped">
                  <em>{device.name}</em>
                  <ul className="color">
                    {device.color.map((color, k: number) => (
                      <li key={k}>
                        <i style={{ backgroundColor: `#${color}` }} />
                        {/* <span className="hidden">{objs.name}</span> */}
                      </li>
                    ))}
                  </ul>
                  <ul className="volume">
                    {device.capacity.map((capacity, j: number) => (
                      <li key={j}>
                        <em>{capacity}</em>
                      </li>
                    ))}
                  </ul>
                </span>

                <div
                  onClick={async () => {
                    await callConversion(
                      userId,
                      'item_tworld_survey_device_reco',
                      processId,
                      device.productGrpId,
                      'click',
                      null,
                      surveyCode,
                    );
                    window.location.href = getTDSUrl(device.productGrpId, device.categoryId, 'helpchs');
                  }}
                  className="link-rounded-large"
                >
                  자세히 보기
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* 2022.11.07 추가 */}
        <ul className="ul-link-area">
          <li>
            <a href="/" className="link-txt">
              <span>원하시는 휴대폰이 아닌가요?</span>
            </a>
          </li>
          <li className="link-again">
            <i className="ic-refresh left" />
            <span
              onClick={() => {
                confirm.show({
                  isOpen: true,
                  onClickCancel: confirm.close,
                  onClickConfirm: () => {
                    confirm.close();
                    onClickConfirm();
                  },
                  title: '',
                  message: '확인을 누르시면 결과가 초기화되며<br>첫 화면으로 이동합니다.',
                });
              }}
              className="link-text"
              style={{ textDecoration: 'underline' }}
            >
              <span>다시 하기</span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
