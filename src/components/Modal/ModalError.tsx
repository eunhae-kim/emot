import React from 'react';
import V6Link from '../Common/V6Link';

export interface MainItemBoxProps {
  isOpen: boolean;
  title?: string | null;
  message?: string | null;
  getClosed: any;
  osType?: string;
}

export function ModalError({ isOpen, getClosed, osType }: MainItemBoxProps) {
  return (
    <div aria-hidden={!isOpen} className="overlay-modal" onClick={getClosed}>
      {osType === 'AOS' && (
        <div className="modal-alarm" role="dialog" aria-modal="true">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">
              안드로이드 시스템 웹뷰 업그레이드 안내
              <span className="txt-gray">현재 사용하고 계신 "안드로이드 시스템 웹뷰"가 최신 버전이 아닙니다.</span>
            </h2>
            <div className="cont">
              <span className="list-title">“안드로이드 시스템 웹뷰&quot; 업그레이드 방법 (1)</span>
              <ul className="list-txt">
                <li>1. 구글 플레이스토어 App 실행</li>
                <li>2. &quot;Android System WebView&quot; 검색</li>
                <li>3. 업데이트 진행</li>
              </ul>

              <span className="list-title">“안드로이드 시스템 웹뷰&quot; 업그레이드 방법 (2)</span>
              <ul className="list-txt">
                <li>1. 구글 플레이스토어 App 실행</li>
                <li>2. &quot;Chrome&quot; 검색</li>
                <li>3. 업데이트 진행</li>
              </ul>
              <span className="txt-gray">
                구 버전의 " 안드로이드 시스템 웹뷰"를 사용하실 경우
                <br />
                서비스 사용 중 일부 어려움이 발생할 수 있으니, 최신 버전으로 업데이트 후 이용 부탁드립니다.
              </span>
            </div>
            <div className="btn-area">
              <button
                type="button"
                className="btn-gray close"
                onClick={() => {
                  getClosed();
                }}
              >
                닫기
              </button>
              <V6Link
                newWindow={'BROWSER'}
                href="https://play.google.com/store/apps/details?id=com.google.android.webview"
                type="button"
                className="btn-black check-btn"
              >
                업데이트
              </V6Link>
            </div>
          </div>
        </div>
      )}

      {/* ios */}
      {osType === 'iOS' && (
        <div className="modal-alarm" role="dialog" aria-modal="true">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">
              Safari 브라우저 업그레이드 안내
              <span className="txt-gray">현재 사용하고 계신 "Safari 브라우저"가 최신버전이 아닙니다.</span>
            </h2>
            <div className="cont">
              <span className="list-title">“Safari 브라우저” 업그레이드 방법</span>
              <ul className="list-txt">
                <li>1. iOS 설정 App 실행</li>
                <li>2. 일반 &gt; 소프트웨어 업데이트</li>
                <li>3. 다운로드 및 설치</li>
              </ul>
              <span className="txt-gray">
                구 버전의 &quot; Safari 브라우저&quot;를 사용하실 경우 서비스 사용 중 일부 어려움이 발생할 수 있으니,
                최신 버전 으로 업데이트 후 이용 부탁드립니다.
              </span>
            </div>
            <div className="btn-area">
              <button type="button" className="btn-black agree" onClick={getClosed}>
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
