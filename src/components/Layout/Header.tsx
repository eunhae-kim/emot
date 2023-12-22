import React, { useEffect, useState } from 'react';
import { isApp } from '../../js/commonUtil';
import V6Link from '../Common/V6Link';
import XtrAw from '../Common/XtrAw';

interface HeaderProps {
  myInfo?: any;
}

export function Header({ myInfo }: HeaderProps) {
  const [isNotiVisible, setIsNotiVisible] = useState(false);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    if (isApp() && myInfo.svcInfo && myInfo.svcInfo.loginType !== 'S') {
      setIsNotiVisible(true);
      setUserId(myInfo.svcInfo.userId);
    }
  }, []);

  return (
    <div className="header">
      <h1>
        <a href="/v6/main" className="link-logo">
          <span className="hidden">T World</span>
        </a>
      </h1>

      <div className="svc-box">
        {isNotiVisible && (
          <V6Link href={`/common/notify?tid=${userId}`} className="svc-item-alarm">
            <XtrAw appEid={'CMMA_A20-165'} webEid={'MWMA_A20-167'} xtrClick={true} xtrView={true}>
              <i className="icon ic-alarm-svc" />
              <span className="hidden">알림</span>
            </XtrAw>
          </V6Link>
        )}

        <V6Link href="/common/search-main" className="svc-item-search">
          <XtrAw appEid={'CMMA_A20-166'} webEid={'MWMA_A20-168'} xtrClick={true} xtrView={true}>
            <i className="icon ic-tbar-srch1" />
            <span className="hidden">검색</span>
          </XtrAw>
        </V6Link>
      </div>
    </div>
  );
}
