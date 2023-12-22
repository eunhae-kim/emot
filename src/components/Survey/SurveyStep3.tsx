import React, { useState, useRef, useEffect } from 'react';
import focusLoop from '../../common/focusLoop';
import { useActiveElement } from '../../common/utils';
import V6Link from '../Common/V6Link';
import useModal from '../../hooks/useModal';

interface SurveyStep3Props {
  step3Answer: string;
  setStep3Answer: any;
}

export function SurveyStep3({ step3Answer, setStep3Answer }: SurveyStep3Props) {
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

  function answerClicked(id) {
    const array = step3Answer === '' ? [] : step3Answer.split(',');
    if (array.includes(id)) {
      const index = array.indexOf(id);
      if (index > -1) array.splice(index, 1);
    } else {
      array.push(id);
    }
    setStep3Answer(array.toString());
  }

  const cardList = [
    {
      id: 'step_0',
      svtitle: '메신저, SNS',
    },
    {
      id: 'step_1',
      svtitle: '사진, 동영상 촬영',
    },
    {
      id: 'step_2',
      svtitle: '동영상 시청',
    },
    {
      id: 'step_3',
      svtitle: '업무 용도',
    },
    {
      id: 'step_4',
      svtitle: '웹 서핑, 쇼핑',
    },
    {
      id: 'step_5',
      svtitle: '음악 듣기, 팟캐스트',
    },
    {
      id: 'step_6',
      svtitle: '모바일 게임',
    },
    {
      id: 'step_7',
      svtitle: '전화, 문자',
    },
  ];

  return (
    <div>
      <header className="tworld-sub-header">
        <div className="sub-header-inner">
          <V6Link href="/v6/survey/step2" className="menu-item-prev" tite="이전 페이지">
            {/* 2022-12-21 접근성 / 위치 변경 */}
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

        <div className="channel-line-graph">
          <div className="bar-graph">
            <span className="figure-data" style={{ width: '42%' }} />
          </div>
        </div>
      </header>

      <div className="survey-content">
        <div className="popup-top">
          <p className="step">Step3</p>
          <h2
            className="top-title"
            dangerouslySetInnerHTML={{ __html: '휴대폰을 무엇에 이용하는지 <br>모두 선택해 주세요' }}
          />
        </div>

        <ul className="inquire-type-two">
          {cardList.map((obj) => (
            <li className="inquire-item" key={obj.id}>
              <input
                type="checkbox"
                id={obj.id}
                name="step3"
                checked={step3Answer?.split(',').includes(obj.id)}
                onClick={() => {
                  answerClicked(obj.id);
                }}
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
