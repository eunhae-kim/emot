import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { callBridgeApi } from '../../common/utils';
import { isApp, isIos, isAndroid } from '../../js/commonUtil';
import { HeaderInfo } from '../../js/types';
import V6Link from '../Common/V6Link';
import Xtr from '../Common/Xtr';
import useModal from '../../hooks/useModal';

function navHeader({ name, number, loginYn, loginType, userType, userId, hasMultiLine }: HeaderInfo) {
  const { lineSelector } = useModal();

  const [loginLink, setLoginLink] = useState('');
  const [logoutLink, setLogoutLink] = useState('');
  const [quickLink, setQuickLink] = useState('');
  const [signUpLink, setSignUpLink] = useState('');

  useEffect(() => {
    const appYn = isApp() ? 'Y' : 'N';
    const quickLoginYn = loginType === 'S' ? 'Y' : 'N';

    setLoginLink(`/common/tid/login?target=${location.pathname}&app=${appYn}`);
    setLogoutLink(`/common/tid/logout?type=5&target=/v6/main&slogin=${quickLoginYn}`);
    setSignUpLink(`/common/member/signup-guide?app=${appYn}&target=${location.pathname}`);

    if (isIos()) setQuickLink(`/common/member/slogin/ios?target=${location.pathname}`);
    if (isAndroid()) setQuickLink(`/common/member/slogin/aos?target=${location.pathname}`);
  }, []);

  return (
    <div className="nav-header">
      <div className="nav-info-box">
        <div className="info-login">
          {!loginYn ? (
            <Xtr xtrEid={'CMMA_A11_B3-137'} xtrClick={true} xtrView={true}>
              <V6Link href={loginLink}>
                <h1>
                  <span className="usernm">
                    <>
                      로그인 해주세요 <i className={'bl-arr right'} />
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

          {number && (
            <button
              type="button"
              className="btn-txt"
              title="회선번호선택" /* 2022-11-23 / 접근성 추가 */
              onClick={() => {
                lineSelector.show();
              }}
              aria-haspopup="dialog" /* 2022-12-20 접근성 / aria 추가 */
              aria-controls="myActive" /* 2023-01-26 접근성 / aria-controls 와 회선팝업 id 동일하게 */
              aria-expanded="false" /* 2022-12-20 접근성 / aria 추가 */
            >
              <Xtr xtrEid={'CMMA_A11_B3-1'} xtrClick={true} xtrView={true}>
                <span className="info-number">
                  {number} <i className={classnames(['bl-arr btm', { btm: hasMultiLine }])} title="회선관리" />{' '}
                  {/* 2023-01-10 접근성 / title 추가 */}
                </span>
              </Xtr>
            </button>
          )}
          {
            // 로그인 & 타사
            loginYn && userType === 'notSKTUser' && (
              <V6Link href={logoutLink} className="btn-txt">
                <Xtr xtrEid={'CMMA_A11_B3-7'} xtrClick={true} xtrView={true}>
                  <span className="txt-login">로그아웃</span>
                </Xtr>
              </V6Link>
            )
          }
          {
            // 로그인 & 가입회선 미등록(자사)
            loginYn && userType === 'noLineUser' && (
              <>
                <V6Link href={'/common/member/line/register?type=02'} className="btn-txt">
                  <Xtr xtrEid={'CMMA_A11_B3-156'} xtrClick={true} xtrView={true}>
                    <span className="underline">회선 등록</span>
                  </Xtr>
                </V6Link>
                <V6Link href={logoutLink} className="btn-txt">
                  <Xtr xtrEid={'CMMA_A11_B3-7'} xtrClick={true} xtrView={true}>
                    <span className="txt-login">로그아웃</span>
                  </Xtr>
                </V6Link>
              </>
            )
          }
          {
            // 로그인 & 정회원
            loginYn && number && (
              <V6Link href={logoutLink} className="btn-txt">
                <Xtr xtrEid={'CMMA_A11_B3-7'} xtrClick={true} xtrView={true}>
                  <span className="txt-login">로그아웃</span>
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
                    <Xtr xtrEid={'CMMA_A11_B3-140'} xtrClick={true} xtrView={true}>
                      <span className="underline">간편 로그인</span>
                    </Xtr>
                  </V6Link>
                )}
                <V6Link href={signUpLink} className="btn-txt">
                  <Xtr xtrEid={'CMMA_A11_B3-139'} xtrClick={true} xtrView={true}>
                    <span className="underline">회원가입</span>
                  </Xtr>
                </V6Link>
              </>
            )
          }
        </div>

        {/* 아이콘메뉴 */}
        <ul className="info-items">
          {isApp() && loginYn && loginType !== 'S' && (
            <>
              <li>
                <Xtr xtrEid={'CMMA_A11_B3-2'} xtrClick={true} xtrView={true}>
                  <button
                    type="button"
                    className="btn-icon"
                    onClick={() => {
                      callBridgeApi({ command: 'freeSMS' });
                    }}
                  >
                    <i className="ic-free-msg" aria-hidden="true" />
                    <span className="hidden">문자메세지</span>
                  </button>
                </Xtr>
              </li>
              <li>
                <V6Link href={`/common/notify?tid=${userId}`}>
                  <Xtr xtrEid={'CMMA_A11_B3-3'} xtrClick={true} xtrView={true} className="btn-icon">
                    <i className="ic-alarm" aria-hidden="true" />
                    <span className="hidden">알림</span>
                  </Xtr>
                </V6Link>
              </li>
            </>
          )}
          {(loginYn || (!loginYn && isApp())) && (
            <li>
              <V6Link href="/main/menu/settings" title="설정">
                <Xtr xtrEid={'CMMA_A11_B3-4'} xtrClick={true} xtrView={true} className="btn-icon">
                  <i className="ic-settg" aria-hidden="true" />
                  <span className="hidden">설정</span>
                </Xtr>
              </V6Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export const NavHeaderInfo = React.memo(navHeader);
