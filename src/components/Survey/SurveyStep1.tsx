import React, { useState, useEffect, useRef } from 'react';
import { BASE_PATH } from '../../common/const';
import focusLoop from '../../common/focusLoop';
import { useActiveElement } from '../../common/utils';
import useModal from '../../hooks/useModal';

interface SurveyStep1Props {
  step1Answer: string;
  setStep1Answer: any;
}

export function SurveyStep1({ step1Answer, setStep1Answer }: SurveyStep1Props) {
  const selectedElm = useActiveElement();
  const [lastSelectedElm, setLastSelectedElm] = useState(selectedElm);
  const confirmRef = useRef<HTMLElement>(null);
  const { confirm } = useModal();

  const clearSessionStorage = () => {
    sessionStorage.removeItem('step1');
    sessionStorage.removeItem('step2');
    sessionStorage.removeItem('step3');
    sessionStorage.removeItem('step4');
    sessionStorage.removeItem('step5');
    sessionStorage.removeItem('step6');
  };

  useEffect(() => {
    return () => {
      clearSessionStorage();
      confirm.close();
    };
  }, []);

  useEffect(() => {
    if (confirm.isVisible()) {
      setLastSelectedElm(selectedElm);

      setTimeout(() => {
        if (confirmRef.current) {
          focusLoop.setTargetLayer(confirmRef.current);
        }
      }, 100);
    } else {
      focusLoop.cleanUp();

      if (lastSelectedElm) {
        lastSelectedElm.focus();
      }
    }
  }, [confirm.isVisible()]);

  function onClickConfirm() {
    clearSessionStorage();
    window.location.href = '/';
  }

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
                confirm.show({
                  confirmRef,
                  isOpen: true,
                  onClickCancel: confirm.close,
                  onClickConfirm: () => {
                    confirm.close();
                    onClickConfirm();
                  },
                  title: '종료하시겠습니까?',
                  message: '종료 시 선택하신 내용이 반영되지 않습니다.',
                  isEndPopUp: true,
                });
              }}
            >
              <i className="svg-close" />
              <span className="hidden">닫기</span>
            </button>
          </span>
        </div>

        {/* 그래프 */}
        <div className="channel-line-graph">
          <div className="bar-graph">
            <span className="figure-data" style={{ width: '14%' }} />
          </div>
        </div>
      </header>

      <div className="survey-content step1">
        <div className="popup-top">
          <p className="step">Step1</p>
          <h2 className="top-title" dangerouslySetInnerHTML={{ __html: '좋아하는 브랜드가 <br> 있으신가요?' }} />
        </div>

        <ul className="inquire-type-two">
          <li onClick={() => setStep1Answer('삼성')} className="inquire-item">
            <input type="radio" id="step_0" name="step1" checked={step1Answer === '삼성'} readOnly />
            <label htmlFor="step_0" className="channel-title">
              <span className="channel-chart">
                <img
                  src={`${BASE_PATH}/images/icon/ic-samsung.png`}
                  alt="삼성로고"
                  width="100%"
                  className="icsamsung"
                />
              </span>
            </label>
          </li>
          <li onClick={() => setStep1Answer('애플')} className="inquire-item">
            <input type="radio" id="step_1" name="step1" checked={step1Answer === '애플'} readOnly />
            <label htmlFor="step_1" className="channel-title">
              <span className="channel-chart">
                <img src={`${BASE_PATH}/images/icon/ic-apple.png`} alt="애플로고" width="100%" className="icapple" />
              </span>
            </label>
          </li>
          <li onClick={() => setStep1Answer('etc')} className="inquire-item">
            <input type="radio" id="step_2" name="step1" checked={step1Answer === 'etc'} readOnly />
            <label htmlFor="step_2" className="channel-title">
              <span>Etc.</span>
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
}
