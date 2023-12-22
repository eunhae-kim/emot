import React, { useState, useRef, useEffect } from 'react';
import focusLoop from '../../common/focusLoop';
import { useActiveElement } from '../../common/utils';
import V6Link from '../Common/V6Link';
import useModal from '../../hooks/useModal';

interface SurveyStep6Props {
  step6Answer: string;
  setStep6Answer: any;
}

export function SurveyStep6({ step6Answer, setStep6Answer }: SurveyStep6Props) {
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
      surveyh2: '무선 충전',
      surveyh3: '케이블 없이 충전할 수 있는 기능이 필요해요',
    },
    {
      surveyh2: '방수/방진',
      surveyh3: '물과 먼지의 유입을 막아 주는 기능이 필요해요',
    },
    {
      surveyh2: '생체 인식',
      surveyh3: '바이오 보안 기능이 필요해요',
    },
    {
      surveyh2: '디지털 Pay',
      surveyh3: '휴대폰 결제 기능이 필요해요',
    },
    {
      surveyh2: '전용 펜',
      surveyh3: '휴대폰 전용 펜이 필요해요',
    },
    {
      surveyh2: '폴더블',
      surveyh3: '접히는 디스플레이가 필요해요',
    },
  ];

  function answerClicked(index, answer) {
    const arr = step6Answer.split(',');
    arr[index] = answer;
    setStep6Answer(arr.toString());
  }

  return (
    <div>
      <header className="tworld-sub-header">
        <div className="sub-header-inner">
          <V6Link href="/v6/survey/step5" className="menu-item-prev" title="이전 페이지">
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
            <span className="figure-data" style={{ width: '84%' }} />
          </div>
        </div>
      </header>

      <div className="survey-content">
        <div className="popup-top">
          <p className="step">Step6</p>
          <h2 className="top-title" dangerouslySetInnerHTML={{ __html: '더 필요한 기능이 <br> 있으면 알려 주세요' }} />
        </div>

        {cardList.map((objs, index: number) => (
          // index=0 일때 'div'에 클래스 'first' 추가 - top라인 제거
          <div key={index} className={`common-content-inquire ${index === 0 ? 'first' : ''}`}>
            <h2 className="survey-h2">{objs.surveyh2}</h2>
            <p className="survey-h3">{objs.surveyh3}</p>
            <ul className="inquire-type-three">
              {stepList.map((obj, i: number) => (
                <li key={i} className="inquire-item">
                  <input
                    type="radio"
                    id={`radio_6_${index}_${i + 1}`}
                    name={`radio_6_${index}_${i + 1}`}
                    onClick={() => {
                      answerClicked(index, i + 1);
                    }}
                    checked={step6Answer?.split(',')[index] === (i + 1).toString()}
                  />
                  <label htmlFor={`radio_6_${index}_${i + 1}`} className="survey-title">
                    <em className="sv-title">{obj}</em>
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
