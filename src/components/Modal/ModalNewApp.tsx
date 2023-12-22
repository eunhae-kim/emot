import React from 'react';
import V6Link from '../Common/V6Link';

export interface MainItemBoxProps {
  isOpen: boolean;
  getClosed: any;
}

export function ModalNewApp({ isOpen, getClosed }: MainItemBoxProps) {
  return (
    <div aria-hidden={!isOpen} className="overlay-modal" onClick={getClosed}>
      <div className="modal-alarm" role="dialog" aria-modal="true">
        <div className="alarm-content" onClick={(e) => e.stopPropagation()}>
          <div className="cont">
            <div className="txt-area">
              <span className="txt-lg">2023년 1월, T가 새로워졌습니다.</span>
              <span className="txt-sm">
                새로운 T의 모습이 반영된 T 월드 앱을
                <br />
                이용해 보세요!
              </span>
            </div>
            <div className="btm-cont">
              <V6Link
                newWindow="BROWSER"
                href="https://play.google.com/store/apps/details?id=com.sktelecom.minit"
                className="button-down"
                title="새로운 앱 다운로드(새창)"
              >
                <i className="ic-download">
                  <span className="hidden">다운로드</span>
                </i>
                다운로드 하기
              </V6Link>
              <span className="btm-txt">
                <i className="ic-t">
                  <span className="hidden">T로고</span>
                </i>
                새로운 아이콘을 꼭 확인해 주세요.
              </span>
            </div>
          </div>
          <div className="btn-area">
            <button
              type="button"
              className="disagree"
              onClick={() => {
                localStorage.setItem('closeNewAppModal', 'y');
                getClosed();
              }}
            >
              다시보지 않음
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
