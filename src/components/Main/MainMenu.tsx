import React from 'react';
import V6Link from '../Common/V6Link';
import XtrAw from '../Common/XtrAw';

export function MainMenu({ quickMenuList }) {
  return (
    <>
      {quickMenuList && quickMenuList.length > 0 && (
        <article className="card-main-menu">
          <ul className="list-grid-menu">
            {quickMenuList.map((quickMenu, index: number) => {
              return (
                <li key={index}>
                  <XtrAw appEid={quickMenu.oferStcCd} webEid={quickMenu.oferStcCd} xtrClick={true} xtrView={true}>
                    <V6Link
                      newWindow={quickMenu.exUrlNotiYn === 'Y' && 'BROWSER'}
                      href={quickMenu.menuUrl}
                      title={`${quickMenu.menuNm}${quickMenu.exUrlNotiYn === 'Y' ? '(새창)' : ''}`}
                    >
                      <span className="icon-box">
                        <img className="img-icon" src={quickMenu.iconPath} alt={quickMenu.iconAltCtt} />
                      </span>
                      {quickMenu.menuNm}
                    </V6Link>
                  </XtrAw>
                </li>
              );
            })}
          </ul>
        </article>
      )}
    </>
  );
}
