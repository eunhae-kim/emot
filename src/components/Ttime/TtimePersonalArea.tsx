import React from 'react';

export interface TtimePersonalProps {
  isLogin?: boolean;
}

export function TtimePersonalArea({ isLogin }: TtimePersonalProps) {
  return (
    <div className="tTime-personal-area">
      <a href="#none">
        <strong>지금 T-time Room은?</strong>
      </a>

      <div className="tTime-status ">
        <div className="teabag-box">
          <span>티백</span>
          <span className="num">
            <em>99</em>개
          </span>
        </div>
        <div className="teacup-box">
          <span>찻잔</span>
          <span className="num">
            <em>100</em>개
          </span>
        </div>
      </div>

      <button type="button" className="btn-refresh">
        <i className="ic-refresh" aria-hidden="true" />
      </button>

      {/* 비로그인 시 div.no-login-area 영역 활성화 */}
      {isLogin || (
        <div className="no-login-area">
          <p>
            로그인하시고 <br />
            T-time의 찻잔과 티백을 모아보세요!
          </p>

          <button type="button" className="btn-login">
            <span>로그인하기</span>
          </button>
        </div>
      )}
    </div>
  );
}
