/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-array-index-key */
import React, { useContext, useEffect, useState } from 'react';
import { BASE_PATH } from '../../common/const';
import { AppContext } from '../../context/AppContext';
import { loginUrl, quickLoginUrl } from '../../js/commonUtil';
import { Lang } from '../../common/types';
import V6Link from '../Common/V6Link';

export interface TtimeToastProps {
  isShow: boolean;
  message: string | null;
  type?: string;
}
export function TtimeToast({ isShow, message, type }: TtimeToastProps) {
  const appContext = useContext(AppContext);
  const [language] = appContext?.language || ['KO'];
  const login = loginUrl(undefined, language as Lang, true);
  const [slogin, setSlogin] = useState<string>('');

  useEffect(() => {
    const path = location.pathname + location.search;
    setSlogin(`/common/member/slogin/fail?target=${path}`);
  }, []);

  return (
    <div className={`my-layer-toast tTime ${isShow ? 'active' : ''}`}>
      {/* 이야기안내 토스트팝업 */}
      {type === 'storyGuide' && (
        <div className="my-message">
          <img src={`${BASE_PATH}/images/sub/ic-toastPopup.png`} width="24" height="24" alt="" />
          {message}
        </div>
      )}

      {/* 로그인안내 토스트팝업 */}
      {type === 'loginGuide' && (
        <V6Link href={appContext.loginInfo === 'S' ? slogin : login} className="my-message">
          <img src={`${BASE_PATH}/images/sub/ic-toastPopup.png`} width="24" height="24" alt="" />
          {message}
          <i className="bl-arr-bold right" aria-hidden="true" />
        </V6Link>
      )}
    </div>
  );
}
