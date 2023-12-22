import React, { useState } from 'react';

export interface TooltipProps {
  message: string;
}

export function Tooltip({ message, ...props }: TooltipProps) {
  const [isActive, setIsActive] = useState(false);
  const onToggle = (state) => {
    //setTimeout(() => {
    // focus 처리
    if (state) {
      //document.getElementById('tip-help').focus();
    } else {
      document.getElementById('tooltip_btn').focus();
    }

    setTimeout(() => {
      setIsActive(state);
      console.log(state);
    }, 100);
    //}, 0);
  };
  return (
    <div className={`my-tooltip ${isActive ? `active` : ``}`}>
      {/* s:  접근성 추가 */}
      <button
        id="tooltip_btn"
        type="button"
        onClick={() => onToggle(true)}
        aria-describedby="tip-help"
        aria-expanded={isActive}
      >
        <i className="ic-info" aria-hidden="true" />
        <i className="tooltip-arrow" aria-hidden="true" />
        <span className="hidden">도움말보기</span>
      </button>
      <div className="my-tooltip-content" id="tip-help" role="tooltip">
        <p className="text">{message}</p>
        <button type="button" className="btn-close" onClick={() => onToggle(false)}>
          {/* 웹 접근성 aria-hidden="true" 추가 */}
          <i className="ic-tbar-cls" aria-hidden="true" />
          <span className="hidden">닫기</span>
        </button>
      </div>
      {/* e:  접근성 추가 */}
    </div>
  );
}
