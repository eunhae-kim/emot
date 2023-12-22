import React, { useState, useRef, useEffect } from 'react';
import focusLoop from '../../common/focusLoop';
import { useActiveElement } from '../../common/utils';
import V6Link from '../Common/V6Link';
import useModal from '../../hooks/useModal';

interface SurveyStep2Props {
  step2Answer: string;
  setStep2Answer: any;
}

export function SurveyStep2({ step2Answer, setStep2Answer }: SurveyStep2Props) {
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
      id: 'step2_0',
      svtitle: '실속형',
      labeltxt: '경제적인 가격의 휴대폰',
    },
    {
      id: 'step2_1',
      svtitle: '균형',
      labeltxt: '가성비 좋은 휴대폰',
    },
    {
      id: 'step2_2',
      svtitle: '고사양',
      labeltxt: '빠르고 성능 좋은 휴대폰',
    },
  ];

  return (
    <div>
      <header className="tworld-sub-header">
        <div className="sub-header-inner">
          <V6Link href="/v6/survey/step1" className="menu-item-prev" title="이전 페이지">
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
            <span className="figure-data" style={{ width: '28%' }} />
          </div>
        </div>
      </header>

      <div className="survey-content ">
        <div className="popup-top">
          <p className="step">Step2</p>
          <h2
            className="top-title"
            dangerouslySetInnerHTML={{ __html: '원하는 휴대폰 유형을 <br/> 선택해 주세요.' }}
          ></h2>
        </div>

        <ul className="inquire-type-question">
          {cardList.map((obj, index: number) => (
            <li onClick={() => setStep2Answer(obj.svtitle)} className="inquire-item" key={index}>
              <input type="radio" id={obj.id} name="step2" checked={step2Answer === obj.svtitle} readOnly />
              <label htmlFor={obj.id} className="survey-title">
                <em className="sv-title">{obj.svtitle}</em>
                {obj.labeltxt}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
