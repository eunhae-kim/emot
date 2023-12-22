import React from 'react';

export interface MainItemBoxProps {
  isOpen: boolean;
  title: string | null;
  message: string;
  getClosed: any;
  type?: string | null;
  id?: string | null;
}

export function ModalEmergency({ isOpen, title, message, getClosed, type, id }: MainItemBoxProps) {
  let displayText = '';
  let hiddenDays = 0;

  switch (type) {
    case '7':
      displayText = '하루동안 열지 않음';
      hiddenDays = 1;
      break;
    case '10':
      displayText = '일주일동안 열지 않음';
      hiddenDays = 7;
      break;
    case '100':
      displayText = '다시 보지 않음';
      hiddenDays = 365;
      break;
    case '0':
      displayText = '';
      hiddenDays = 0;
      break;
  }

  function setDisplayPeriod() {
    const today = new Date();
    const hiddenDate = new Date(today);

    // 정책: X버튼 클릭 시 7일간 보지 않음
    hiddenDate.setDate(today.getDate() + hiddenDays);
    localStorage.setItem(`notice${id}`, hiddenDate.toString());
    getClosed();
  }

  return (
    <div aria-hidden={!isOpen} className="overlay-modal" onClick={getClosed}>
      <div className="modal-alarm" role="dialog" aria-modal="true">
        <div className="modal-content modal-content-notice" onClick={(e) => e.stopPropagation()}>
          <h2 className="modal-title tit-mt">{title}</h2>
          <div className="cont" dangerouslySetInnerHTML={{ __html: message }} />
          <div className="btn-area">
            <button type="button" className="check-btn" onClick={setDisplayPeriod}>
              {displayText}
            </button>
            <button type="button" className="close" onClick={getClosed}>
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
