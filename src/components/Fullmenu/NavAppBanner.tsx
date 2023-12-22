import React from 'react';
import V6Link from '../Common/V6Link';
import Xtr from '../Common/Xtr';

export function appBannerList({ tApp }) {
  return (
    <div className="nav-app-cont">
      <h2>T 앱</h2>
      <Xtr xtrEid={'CMMA_A11_B3-77'} xtrClick={true} xtrView={true}>
        <V6Link href="/product/apps">
          <span className="btn-more">더 보기</span>
        </V6Link>
      </Xtr>
      <ul className="app-list">
        {tApp &&
          tApp.map((app, index: number) => (
            <li key={index}>
              <Xtr xtrEid={app.oferStcCd} xtrClick={true} xtrView={true}>
                <a href={app.imgLinkUrl} className="btn-icon" title={`${app.titleNm}(새창)`}>
                  <i className="icon-app">
                    <img loading="lazy" src={app.bnnrFilePathNm} alt="" width="104" height="104" />
                  </i>
                  <span className="txt">{app.titleNm}</span>
                </a>
              </Xtr>
            </li>
          ))}
      </ul>
    </div>
  );
}

export const NavAppBanner = React.memo(appBannerList);
