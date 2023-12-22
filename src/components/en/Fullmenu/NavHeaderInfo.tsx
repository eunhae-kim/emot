/* eslint-disable no-empty */
import React, { useEffect, useState } from 'react';
import { isAndroid, isApp, isIos, manageLineUrl, signUpUrl } from '../../../js/commonUtil';
import { HeaderInfo } from '../../../js/types';

import V6Link from '../../Common/V6Link';
import Xtr from '../../Common/Xtr';
import classnames from 'classnames';
import useModal from '../../../hooks/useModal';

export interface InfoPropsType {
  viewtype: string;
  name: string;
  number: string | null;
  arrow: string | null;
  target: string | null;
  logintype: string;
}

function navHeader({ name, number, loginYn, loginType, userType, hasMultiLine, isPps, isWired }: HeaderInfo) {
  const { lineSelector } = useModal();

  const [loginLink, setLoginLink] = useState('');
  const [logoutLink, setLogoutLink] = useState('');
  const [quickLink, setQuickLink] = useState('');
  const [signUpLink, setSignUpLink] = useState('');

  useEffect(() => {
    const appYn = isApp() ? 'Y' : 'N';
    const quickLoginYn = loginType === 'S' ? 'Y' : 'N';

    setLoginLink(`/en/common/tid/login?target=${location.pathname}&app=${appYn}`);
    setLogoutLink(`/en/common/tid/logout?type=5&target=/en/main/home&slogin=${quickLoginYn}`);
    setSignUpLink(signUpUrl(``, `EN`));

    if (isIos()) setQuickLink(`/en/common/member/slogin/ios?target=${location.pathname}`);
    if (isAndroid()) setQuickLink(`/en/common/member/slogin/aos?target=${location.pathname}`);
  }, []);

  return (
    <div className="nav-header en">
      <div className="nav-info-box">
        <div className="info-login">
          {!loginYn ? (
            <Xtr xtrEid={'CMMA_A10_B80_C1199-29'} xtrClick={true} xtrView={true}>
              <V6Link href={loginLink}>
                <h1>
                  <span className="usernm">
                    <>
                      Please sign in <i className={'bl-arr right'} />
                    </>
                  </span>
                </h1>
              </V6Link>
            </Xtr>
          ) : (
            <h1>
              <span className="usernm">{name}</span>
            </h1>
          )}

          {number && !isPps && !isWired && (
            <button
              type="button"
              className="btn-txt"
              title="회선번호선택" /* 2022-11-23 / 접근성 추가 */
              onClick={() => {
                if (hasMultiLine) {
                  lineSelector.show();
                } else {
                }
              }}
              aria-haspopup="dialog" /* 2022-12-20 접근성 / aria 추가 */
              aria-controls="myActive" /* 2023-01-26 접근성 / aria-controls 와 회선팝업 id 동일하게 */
              aria-expanded="false" /* 2022-12-20 접근성 / aria 추가 */
            >
              <span className="info-number">
                {number} <i className={classnames([{ 'bl-arr': hasMultiLine }, { btm: hasMultiLine }])} />
              </span>
            </button>
          )}
          {(isPps || isWired) && (
            <button type="button" className="btn-txt" aria-haspopup="dialog">
              {' '}
              {/* 2022-12-20 접근성 / aria 추가 */}
              <span className="info-number">
                Your Lines may access on the{' '}
                <a href={manageLineUrl('', 'KO')}>
                  <span className="underline">T world KOR</span>
                </a>
              </span>
            </button>
          )}
          {
            // 로그인 & 타사
            loginYn && userType === 'notSKTUser' && (
              <V6Link href={logoutLink} className="btn-txt">
                <Xtr xtrEid={'CMMA_A10_B80_C1199-54'} xtrClick={true} xtrView={true}>
                  <span className="txt-login">Sign out</span>
                </Xtr>
              </V6Link>
            )
          }
          {
            // 로그인 & 가입회선 미등록(자사)
            loginYn && userType === 'noLineUser' && (
              <>
                <V6Link href={'/en/common/member/line/register?type=02'} className="btn-txt">
                  <span className="underline">Register Line</span>
                </V6Link>
                <V6Link href={logoutLink} className="btn-txt">
                  <Xtr xtrEid={'CMMA_A10_B80_C1199-54'} xtrClick={true} xtrView={true}>
                    <span className="txt-login">Sign out</span>
                  </Xtr>
                </V6Link>
              </>
            )
          }
          {
            // 로그인 & 정회원
            loginYn && number && (
              <V6Link href={logoutLink} className="btn-txt">
                <Xtr xtrEid={'CMMA_A10_B80_C1199-54'} xtrClick={true} xtrView={true}>
                  <span className="txt-login">Sign out</span>
                </Xtr>
              </V6Link>
            )
          }
          {
            // 로그아웃
            !loginYn && (
              <>
                {isApp() && (
                  <V6Link href={quickLink} className="btn-txt">
                    <Xtr xtrEid={'CMMA_A10_B80-69'} xtrClick={true} xtrView={true}>
                      <span className="underline">Simple Sign in</span>
                    </Xtr>
                  </V6Link>
                )}
                <V6Link href={signUpLink} className="btn-txt">
                  <Xtr xtrEid={'CMMA_A10_B80_C1199-51'} xtrClick={true} xtrView={true}>
                    <span className="underline">Register</span>
                  </Xtr>
                </V6Link>
              </>
            )
          }
        </div>

        {/* 아이콘메뉴 */}
        <ul className="info-items">
          {(loginYn || (!loginYn && isApp())) && (
            <li>
              <V6Link href="/en/main/menu/settings" title="setting">
                <div className="btn-icon">
                  <i className="ic-settg" aria-hidden="true">
                    <span className="hidden">Settings</span>
                  </i>
                </div>
              </V6Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export const NavHeaderInfo = React.memo(navHeader);
