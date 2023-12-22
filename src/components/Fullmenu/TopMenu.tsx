import React from 'react';
import { QuickMenu } from '../../js/types';
import V6Link from '../Common/V6Link';
import XtrAw from '../Common/XtrAw';

export interface FullMenuBoxProps {
  quickMenuList: Array<QuickMenu>;
}

function quickMenu({ quickMenuList }: FullMenuBoxProps) {
  return (
    <div className="nav-top-menu">
      <ul className="top-menu-list">
        {quickMenuList.map((quickMenu, index: number) => (
          <li key={index}>
            <XtrAw appEid={quickMenu.oferStcCd} webEid={quickMenu.oferStcCd} xtrClick={true} xtrView={true}>
              <V6Link
                href={quickMenu.menuUrl}
                newWindow={quickMenu.exUrlNotiYn === 'Y' && 'BROWSER'}
                title={quickMenu.exUrlNotiYn === 'Y' ? `${quickMenu.menuNm}(새창)` : undefined}
                className="btn-icon"
              >
                <span className="icon-box">
                  <img src={`${quickMenu.iconPath}`} alt={quickMenu.menuNm} />
                </span>
                <span className="txt">{quickMenu.menuNm}</span>
              </V6Link>
            </XtrAw>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const TopMenu = React.memo(quickMenu);
