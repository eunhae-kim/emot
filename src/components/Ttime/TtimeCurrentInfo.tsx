import React, { useEffect, useRef, useState } from 'react';
import { isApp } from '../../js/commonUtil';
import V6Link from '../Common/V6Link';
import { LoginType } from '../../common/types';
import { BASE_PATH } from '../../common/const';
import useTtimeContext from '../../hooks/useTtimeContext';
import XtrAw from '../Common/XtrAw';

interface TtimeCurrentInfoProps {
  userName?: string;
  loginType: LoginType;
  savedStroyNum?: number;
  readStroyNum?: number;
  collectedCupNum?: number;
}

export function TtimeCurrentInfo({
  userName,
  loginType,
  savedStroyNum,
  readStroyNum,
  collectedCupNum,
}: TtimeCurrentInfoProps) {
  const [loginLink, setLoginLink] = useState<string>('');
  const { fetchTtimeData } = useTtimeContext();
  const myTtimeRef = useRef(null);

  const visibilityChangeHandler = () => {
    if (document.visibilityState === 'visible') {
      fetchTtimeData();
    }
  };

  useEffect(() => {
    const appYn = isApp() ? 'Y' : 'N';
    setLoginLink(`/common/tid/login?target=${location.pathname}&app=${appYn}`);
    document.addEventListener('visibilitychange', visibilityChangeHandler);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fetchTtimeData();
        }
      });
    });

    if (myTtimeRef.current) {
      observer.observe(myTtimeRef.current);
    }

    return () => {
      if (myTtimeRef.current) {
        observer.unobserve(myTtimeRef.current);
      }
    };
  }, []);

  return (
    <div className="tTime-current-info-content" ref={myTtimeRef}>
      {loginType === 'T' ? (
        <>
          {/* T아이디 로그인 시 */}
          <div className="login-area">
            <h2 className="tit">
              <XtrAw appEid="CMMA_A23_B121_C1419-4" webEid="CMMA_A23_B121_C1419-4" xtrClick xtrView>
                <V6Link href="/v6/ttime/troom">
                  <span className="user-name">{userName}</span>&nbsp;님의 T 타임 룸
                  <i className="bl-arr-bold right" aria-hidden="true" />
                </V6Link>
              </XtrAw>
            </h2>

            <ul className="info-list">
              <li>
                <XtrAw appEid="CMMA_A23_B121_C1419-5" webEid="CMMA_A23_B121_C1419-5" xtrClick xtrView>
                  <V6Link href={`${BASE_PATH}/ttime/storyMoa?tabId=saved`}>
                    <span className="list-tit">저장한 이야기</span>
                    <span className="num">
                      <em>{savedStroyNum}</em>개
                      <i className="bl-arr-bold right" aria-hidden="true" />
                    </span>
                  </V6Link>
                </XtrAw>
              </li>
              <li>
                <XtrAw appEid="CMMA_A23_B121_C1419-6" webEid="CMMA_A23_B121_C1419-6" xtrClick xtrView>
                  <V6Link href={`${BASE_PATH}/ttime/storyMoa?tabId=read`}>
                    <span className="list-tit">다 읽은 이야기</span>
                    <span className="num">
                      <em>{readStroyNum}</em>개
                      <i className="bl-arr-bold right" aria-hidden="true" />
                    </span>
                  </V6Link>
                </XtrAw>
              </li>
              <li>
                <XtrAw appEid="CMMA_A23_B121_C1419-7" webEid="CMMA_A23_B121_C1419-7" xtrClick xtrView>
                  <V6Link href="/v6/ttime/troom">
                    <span className="list-tit">모은 컵</span>
                    <span className="num">
                      <em>{collectedCupNum}</em>잔
                      <i className="bl-arr-bold right" aria-hidden="true" />
                    </span>
                  </V6Link>
                </XtrAw>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <>
          {/* T아이디 미로그인 시 */}
          <div className="no-login-area">
            {/* 간편로그인 회원일 경우 */}
            {loginType === 'S' && (
              <>
                <p>
                  현재 간편 로그인 상태예요. <br />T 타임은 T아이디 로그인 후 즐길 수 있어요.
                </p>
                <XtrAw appEid="CMMA_A23_B121_C1419-10" webEid="CMMA_A23_B121_C1419-10" xtrClick xtrView>
                  <V6Link href="/common/member/slogin/fail?target=/v6/ttime/main">
                    <button type="button" className="btn-login">
                      <span>로그인하기</span>
                    </button>
                  </V6Link>
                </XtrAw>
              </>
            )}

            {/* 비로그인 회원일 경우 */}
            {loginType === 'N' && (
              <>
                <p>
                  로그인 후 다양한 이야기를 즐기고
                  <br />
                  컵을 모아 보세요.
                </p>
                <XtrAw appEid="CMMA_A23_B121_C1419-10" webEid="CMMA_A23_B121_C1419-10" xtrClick xtrView>
                  <V6Link href={loginLink}>
                    <button type="button" className="btn-login">
                      <span>로그인하기</span>
                    </button>
                  </V6Link>
                </XtrAw>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
