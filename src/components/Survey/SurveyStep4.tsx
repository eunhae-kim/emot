import React, { useState, useRef, useEffect } from 'react';
import focusLoop from '../../common/focusLoop';
import { useActiveElement } from '../../common/utils';
import V6Link from '../Common/V6Link';
import useModal from '../../hooks/useModal';

interface SurveyStep4Props {
  step4Answer: number;
  setStep4Answer: any;
}

export function SurveyStep4({ step4Answer, setStep4Answer }: SurveyStep4Props) {
  const selectedElm = useActiveElement();
  const [lastSelectedElm, setLastSelectedElm] = useState(selectedElm);
  const confirmRef = useRef<HTMLElement>(null);
  const { confirm } = useModal();

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
    sessionStorage.removeItem('step1');
    sessionStorage.removeItem('step2');
    sessionStorage.removeItem('step3');
    sessionStorage.removeItem('step4');
    sessionStorage.removeItem('step5');
    sessionStorage.removeItem('step6');

    window.location.href = '/v6/main';
  }

  const cardList = [
    {
      id: 'step_0',
      svtitle: '큰 화면',
    },
    {
      id: 'step_1',
      svtitle: '작은 화면',
    },
    {
      id: 'step_2',
      svtitle: '상관없음',
    },
  ];

  return (
    <div>
      <header className="tworld-sub-header">
        <div className="sub-header-inner">
          <V6Link href="/v6/survey/step3" className="menu-item-prev" title="이전 페이지">
            <i className="svg-prev" />
          </V6Link>
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
            <span className="figure-data" style={{ width: '56%' }} />
          </div>
        </div>
      </header>

      <div className="survey-content">
        <div className="popup-top">
          <p className="step">Step4</p>
          <h2 className="top-title" dangerouslySetInnerHTML={{ __html: '어떤 화면 크기를 <br> 선호하시나요?' }} />
        </div>

        <ul className="inquire-type-question">
          {cardList.map((obj, index: number) => (
            <li className="inquire-item">
              <input
                type="radio"
                id={obj.id}
                name="step3"
                onClick={() => setStep4Answer(index + 1)}
                checked={step4Answer === index + 1}
              />
              <label htmlFor={obj.id} className="survey-title">
                <em className="sv-title">{obj.svtitle}</em>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
