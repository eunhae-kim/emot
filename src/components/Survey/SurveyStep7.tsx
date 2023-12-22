/* eslint-disable no-use-before-define */
import { useEffect, useRef } from 'react';
import { gsap, Power2, Power1 } from 'gsap';
import { MotionPathPlugin } from 'gsap/dist/MotionPathPlugin.js';

export function SurveyStep7(): JSX.Element {
  function closeSurvey() {
    sessionStorage.removeItem('step1');
    sessionStorage.removeItem('step2');
    sessionStorage.removeItem('step3');
    sessionStorage.removeItem('step4');
    sessionStorage.removeItem('step5');
    sessionStorage.removeItem('step6');

    location.href = '/v6/main';
  }

  // Interaction
  gsap.registerPlugin(MotionPathPlugin);
  const appRef = useRef();
  useEffect(() => {
    const analysisMotion = gsap.context(() => {
      const shape2 = `M469.539032,263.986786H-0.000001L0,229.890961c310.649475,58.156982,255.61113-98.5,469.539032-65.062302V263.986786z`;
      const shape3 = `M469.539032,263.986786H-0.000001L0,0c226.11113,0,182.887283-0.414484,469.539032,0V263.986786zz`;
      const tl = gsap.timeline();
      const tl2 = gsap.timeline({ repeat: -1, repeatDelay: 0 });

      // Target the two specific elements we have asigned the animate class
      const obj1 = {
        attr: { d: shape2 },
        ease: Power2.easeIn,
      };
      const obj2 = {
        attr: { d: shape3 },
        ease: Power2.easeOut,
      };

      tl.from('.glass', {
        duration: 0.5,
      });
      tl.to(
        '.lg_pop',
        {
          duration: 0,
          opacity: 1,
        },
        '+=0.1',
      );
      tl.to(
        '.sm_pop',
        {
          duration: 0,
          opacity: 1,
        },
        '+=0.1',
      );
      // tl.to('#wave', 0.8, obj1, '+=1');
      // tl.to('#wave', 0.8, obj2, '+=0.2');
      tl.to('#wave', obj1, '+=0.8');
      tl.to('#wave', obj2, '+=0.2');

      tl2.delay(0.5);
      tl2.to('.lg_pop', {
        duration: 1,
        y: -8,
        scale: 0.7,
      });
      tl2.to(
        '.lg_pop',
        {
          duration: 0,
        },
        '-=0.5',
      );
      tl2.to(
        '.lg_pop',
        {
          ease: Power1.easeIn,
          duration: 0.7,
          scale: 1.5,
          opacity: 0,
        },
        '-=0.5',
      );
      tl2.to(
        '.sm_pop',
        {
          duration: 1,
          y: -5,
          scale: 0.7,
        },
        '-=0.8',
      );
      tl2.to(
        '.sm_pop',
        {
          duration: 0,
        },
        '-=0.5',
      );
      tl2.to(
        '.sm_pop',
        {
          ease: Power1.easeIn,
          duration: 0.3,
          scale: 1.5,
          opacity: 0,
        },
        '-=0.5',
      );
    }, appRef);

    return () => analysisMotion.revert();
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

      <div className="survey-content">
        <div className="result-cont">
          <div className="popup-top">
            {/* Interaction */}
            <div className="step flask-area">
              <div className="analysis_wrap" ref={appRef}>
                <div className="glass">
                  <div className="water">
                    <svg xmlns="http://www.w3.org/2000/svg" width="46.233" height="25.703" viewBox="0 0 46.233 25.703">
                      <g id="group13" transform="translate(-165.383 -235.078)">
                        <g id="group14">
                          <path
                            id="wave"
                            d="M469.539032,263.986786H-0.000001L0,263.557617c66.11113,0.429169,351.088104,0.429169,469.539032,0.208344V263.986786z"
                            fill="#3b56ff"
                          />
                          <path
                            id="path6"
                            d="M17.157,67.4l-4.706,7.262v3.325"
                            transform="translate(160 178)"
                            fill="none"
                            stroke="#fff"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3.026"
                          />
                        </g>
                      </g>
                    </svg>
                  </div>
                </div>
                <div className="lg_pop"></div>
                <div className="sm_pop"></div>
              </div>
            </div>
            {/* // Interaction */}

            <h2 className="top-title">결과를 분석하고 있어요.</h2>
            <p className="help-info">잠시만 기다려 주세요</p>
          </div>
        </div>
        {/* .result-cont */}
      </div>
      {/* .survey-content */}
    </div>
  );
}
function from(arg0: string, arg1: { duration: number; x: number; y: number; ease: any }, arg2: string): any {
  throw new Error('Function not implemented.');
}

function to(arg0: string, arg1: { duration: number }, arg2: string): any {
  throw new Error('Function not implemented.');
}
