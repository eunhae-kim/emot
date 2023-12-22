import React, { useEffect, useRef } from 'react';
import { gsap, Power1 } from 'gsap';
import { MotionPathPlugin } from 'gsap/dist/MotionPathPlugin.js';

export function SurveyStep9({ errorCode }) {
  function closeSurvey() {
    sessionStorage.removeItem('step1');
    sessionStorage.removeItem('step2');
    sessionStorage.removeItem('step3');
    sessionStorage.removeItem('step4');
    sessionStorage.removeItem('step5');
    sessionStorage.removeItem('step6');

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
          <h1 className="sub-header-tit">나에게 맞는 기기 찾기</h1>
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

      <div className="survey-content step1">
        <div className="popup-top">
          {/* <p className="step step-img">
            <img src={`${BASE_PATH}/images/icon/ic-result.png`} alt="결과화면" />
          </p> */}

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

          <h2 className="top-title" dangerouslySetInnerHTML={{ __html: '고객님께 추천해 드리는 <br>휴대폰입니다.' }} />
        </div>

        <div className="complete-survey-content">
          <div className="my-msg-exception">
            <i className="ic-warn" aria-hidden="true" />
            {/* 2023-01-11 접근성 / aria 추가 */}
            <p className="emp-text">이용에 불편을 드려 죄송합니다.</p>
            <span
              className="acc-text"
              dangerouslySetInnerHTML={{
                __html: `일시적으로 서비스 제공이<br>원활하지 않습니다. ${
                  errorCode && errorCode !== 1004 ? ` (코드: ${errorCode})` : ''
                }`,
              }}
            />
            {errorCode !== 1004 && (
              <div className="my-btn-area">
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  다시 시도하기
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
