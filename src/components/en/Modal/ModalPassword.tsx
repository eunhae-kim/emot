/* eslint-disable react/no-danger */
import React, { useState } from 'react';

export interface ModalPasswordProps {
  getClosed: any;
}

export function ModalPassword({ getClosed, ...props }: ModalPasswordProps) {
  const isOpen = true;

  const [password, setPassword] = useState('');
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const setIsActive = (boolean) => getClosed(boolean);

  return (
    <div aria-hidden={!isOpen} className={`overlay ${isOpen ? 'active' : ''}`}>
      <div className="layer-type-password">
        <div className="layer-container">
          <h2 className="layer-title">Login to Privacy protected service</h2>
          <div className="subscript-info">
            <span className="info-type">
              <i className="ic-etc-disk" /> Mobile
            </span>
            <span className="info-detail">010-40**-13**</span>
          </div>
          <div className="input-area">
            <form>
              <div className="pswd-box">
                <input type="password" maxLength={6} className="motion-password" onChange={onChangePassword} />
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
              <em>비밀번호 입력 오류 총 4회</em>
            </form>
          </div>
          <div className="alert-msg-box">
            <i className="ic-warn" aria-hidden="true" />
            <p>
              If you enter an incorrect passcode up to 5 times or have forgotten your passcode, please visit a nearby SK
              Telecom store to reset your passcode
            </p>
          </div>
          <button type="button" className="btn-close" onClick={() => setIsActive(false)}>
            {/* 웹 접근성 aria-hidden="true" 추가 */}
            <i className="ic-tbar-cls" aria-hidden="true" />
            <span className="hidden">닫기</span>
          </button>
        </div>
      </div>
    </div>
  );
}
