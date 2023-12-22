import React, { useState, useRef, useEffect } from 'react';
import focusLoop from '../../common/focusLoop';
import { useActiveElement } from '../../common/utils';
import V6Link from '../Common/V6Link';
import useModal from '../../hooks/useModal';

interface SurveyStep5Props {
  step5Answer: string;
  setStep5Answer: any;
}

export function SurveyStep5({ step5Answer, setStep5Answer }: SurveyStep5Props) {
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

  const stepList = ['상관없음', '중요함', '필수임'];
  const cardList = [
    {
      surveyh2: '처리 성능',
      surveyh3: '고성능 CPU와 RAM이 필요해요',
    },
    {
      surveyh2: '통신 속도',
      surveyh3: '네트워크가 빨라야 해요',
    },
    {
      surveyh2: '화면 품질',
      surveyh3: '높은 해상도, 주사율 등을 원해요',
    },
    {
      surveyh2: '카메라 품질',
      surveyh3: '카메라의 화질, 화각 등이 중요해요',
    },
    {
      surveyh2: '대용량 배터리',
      surveyh3: '오래 사용할 수 있는 배터리가 중요해요',
    },
  ];

  function answerClicked(index, answer) {
    const arr = step5Answer.split(',');
    arr[index] = answer;
    setStep5Answer(arr.toString());
  }

  return (
    <div>
      <header className="tworld-sub-header">
        <div className="sub-header-inner">
          <V6Link href="/v6/survey/step4" className="menu-item-prev" title="이전 페이지">
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
            <span className="figure-data" style={{ width: '70%' }} />
          </div>
        </div>
      </header>

      <div className="survey-content">
        <div className="popup-top">
          <p className="step">Step5</p>
          <h2
            className="top-title"
            dangerouslySetInnerHTML={{ __html: '중요하게 생각하는<br/> 기능들을 알려 주세요!' }}
          />
        </div>

        {cardList.map((objs, index: number) => (
          // index=0 일때 'div'에 클래스 'first' 추가 - top라인 제거
          <div key={index} className={`common-content-inquire ${index === 0 ? 'first' : ''}`}>
            <h2 className="survey-h2">{objs.surveyh2}</h2>
            <p className="survey-h3">{objs.surveyh3}</p>
            <ul className="inquire-type-three">
              {stepList.map((step, i: number) => (
                <li key={i} className="inquire-item">
                  <input
                    type="radio"
                    id={`radio_${index}_${i + 1}`}
                    name={`radio_${index}_${i + 1}`}
                    onClick={() => {
                      answerClicked(index, i + 1);
                    }}
                    checked={step5Answer?.split(',')[index] === (i + 1).toString()}
                    readOnly
                  />
                  <label htmlFor={`radio_${index}_${i + 1}`} className="survey-title">
                    <em className="sv-title">{step}</em>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
