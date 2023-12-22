import React, { useContext, useEffect, useState } from 'react';
import { loginUrl, quickLoginUrl } from '../../js/commonUtil';
import V6Link from '../Common/V6Link';
import { AppContext } from '../../context/AppContext';
import { Lang } from '../../common/types';
import XtrAw from '../Common/XtrAw';

export interface BottomSheetLoginProps {
  isOpen?: boolean;
  onClose?: () => void;
  messageType?: 'logoutUser' | 'simpleLoginUser';
}

export default function BottomSheetLogin({ isOpen, onClose, messageType = 'logoutUser' }: BottomSheetLoginProps) {
  const appContext = useContext(AppContext);
  const [language] = appContext?.language || ['KO'];
  const login = loginUrl(undefined, language as Lang, true);
  const isSimpleLogin = messageType === 'simpleLoginUser';
  const [slogin, setSlogin] = useState<string>('');

  useEffect(() => {
    const path = location.pathname + location.search;
    setSlogin(`/common/member/slogin/fail?target=${path}`);
  }, []);

  return (
    <div aria-hidden={!isOpen} className="overlay-modal">
      <div
        className="BottomSheet modal-content-transition"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="login-guide">
          {/* 바텀시트 컨텐츠 */}
          <div className="modal-content">
            <div className="text-area">
              <strong className="tit">
                {isSimpleLogin ? 'T ID ' : ''}로그인 후 이야기를 읽으면
                <br />
                컵을 모을 수 있어요.
              </strong>
              <p className="sub-text">
                앗, {isSimpleLogin ? '간편 로그인' : '로그아웃'} 상태로 T 타임을 즐기고 계시네요!
                <br />
                이야기를 읽고 컵을 모으려면 {isSimpleLogin ? 'T ID ' : ''}로그인해 주세요.
              </p>
            </div>

            <div className="btn-area">
              <V6Link className="btn-login" href={isSimpleLogin ? slogin : login}>
                <XtrAw appEid="CMMA_A23_B121_C1419_D4439-4" webEid="CMMA_A23_B121_C1419_D4439-4" xtrClick xtrView>
                  <button type="button">{isSimpleLogin ? 'T ID ' : ''}로그인하고 이야기 읽기</button>
                </XtrAw>
              </V6Link>
              <XtrAw appEid="CMMA_A23_B121_C1419_D4439-5" webEid="CMMA_A23_B121_C1419_D4439-5" xtrClick xtrView>
                <button type="button" className="btn-closed" onClick={onClose}>
                  아쉽지만 그대로 읽기
                </button>
              </XtrAw>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
