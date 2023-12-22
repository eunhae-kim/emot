/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import { Lang } from '../../common/types';
import { guessLang } from '../../common/utils';

export interface ModalPasswordProps {
  onClose: () => void;
  isVisible: boolean;
  onInputComplete: (string) => void;
  lineDisplayData: any;
  incorrectPwCnt: number;
  lang?: Lang;
}

export function ModalPassword({
  lineDisplayData,
  incorrectPwCnt = 0,
  onClose,
  onInputComplete,
  isVisible,
  lang,
}: ModalPasswordProps) {
  if (!lang) lang = guessLang();

  const pwInput: React.RefObject<HTMLInputElement> = React.createRef();

  const [password, setPassword] = useState('');
  const onChangePassword = (e) => {
    const val = e.target.value;
    setPassword(val);
    if (val.length >= 6) {
      onInputComplete(val);
      setTimeout(() => {
        setPassword('');
      }, 1000);
    }
  };

  useEffect(() => {
    pwInput.current.focus();
  }, []);

  return (
    <div
      aria-hidden={!isVisible}
      className="overlay-modal"
      onClick={() => {
        onClose();
      }}
    >
      <div
        className="layer-type-password modal-content-transition"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="layer-container">
          {lang === 'KO' && (
            <h2 className="layer-title">
              고객보호 비밀번호 서비스에 <br />
              가입하신 회선입니다
            </h2>
          )}
          {lang === 'EN' && <h2 className="layer-title">Login to Privacy protected service</h2>}
          <div className="subscript-info">
            <span className="info-type">
              <i className="ic-etc-disk" /> {lineDisplayData.lineLabel}
            </span>
            <span className="info-detail">{lineDisplayData.lineIdText}</span>
          </div>
          <div className="input-area">
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="pswd-box">
                <input
                  type="password"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  value={password}
                  maxLength={6}
                  className="motion-password"
                  onChange={onChangePassword}
                  ref={pwInput}
                />
                <div className={`input-wrap ${password ? `active${password.length}` : ''}`}>
                  <span>
                    <em className="hidden">비밀번호 1번째 입력칸</em>
                  </span>
                  <span>
                    <em className="hidden">비밀번호 2번째 입력칸</em>
                  </span>
                  <span>
                    <em className="hidden">비밀번호 3번째 입력칸</em>
                  </span>
                  <span>
                    <em className="hidden">비밀번호 4번째 입력칸</em>
                  </span>
                  <span>
                    <em className="hidden">비밀번호 5번째 입력칸</em>
                  </span>
                  <span>
                    <em className="hidden">비밀번호 6번째 입력칸</em>
                  </span>
                </div>
              </div>
              {incorrectPwCnt > 0 && lang === 'KO' && <em>비밀번호 입력 오류 총 {incorrectPwCnt}회</em>}
              {incorrectPwCnt > 0 && lang === 'EN' && (
                <em>You have entered incorrect passcode {incorrectPwCnt} times</em>
              )}
            </form>
          </div>
          <div className="alert-msg-box">
            <i className="ic-warn" aria-hidden="true" />
            {lang === 'EN' ? (
              <p>
                If you enter an incorrect passcode up to 5 times or have forgotten your passcode, please visit a nearby
                SK Telecom store to reset your passcode
              </p>
            ) : (
              <p>
                비밀번호를 5회 잘못 입력하셨거나 잊어버리셨을 경우, 직접 SK텔레콤 지점을 방문하여 비밀번호를 다시
                등록하셔야 합니다.
              </p>
            )}
          </div>
          <button type="button" className="btn-close" onClick={() => onClose()}>
            {/* 웹 접근성 aria-hidden="true" 추가 */}
            <i className="ic-tbar-cls" aria-hidden="true" />
            <span className="hidden">닫기</span>
          </button>
        </div>
      </div>
    </div>
  );
}
