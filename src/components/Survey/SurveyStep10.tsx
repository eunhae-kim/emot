import React from 'react';
import { BASE_PATH } from '../../common/const';
import useModal from '../../hooks/useModal';

export function SurveyStep10() {
  const { confirm } = useModal();

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
          <p className="step step-img">
            <img src={`${BASE_PATH}/images/icon/ic-result2.png`} alt="결과화면" />
          </p>
          <h2 className="top-title" dangerouslySetInnerHTML={{ __html: '나에게 맞는 기기 찾기<br>결과가 없습니다.' }} />
        </div>

        <div className="complete-survey-content">
          <div className="my-msg-exception">
            <i className="ic-warn" aria-hidden="true" /> {/* 2023-01-11 접근성 / aria 추가 */}
            <p
              className="emp-text"
              dangerouslySetInnerHTML={{ __html: '선택하신 조건과 일치하는<br>기기를 찾지 못했습니다.' }}
            />
            <span className="acc-text" dangerouslySetInnerHTML={{ __html: '원하는 조건을 다시 선택해주세요' }} />
            <div className="my-btn-area">
              <button
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
                type="button"
                className="btn"
              >
                다시 한번 찾아보기
              </button>
            </div>
          </div>
        </div>

        {/* 2022-11-25 err 화면일 경우 다시 보기 미노출 */}
        {/*
        <div className="link-area">
          <i className="ic-refresh left" />
          <span
            onClick={() => {
              setShowConfirm(true);
            }}
            className="link-text"
            style={{ textDecoration: 'underline' }}
          >
            <span>추천 단말 다시 찾아보기</span>
          </span>
        </div>
         */}
      </div>
    </div>
  );
}
