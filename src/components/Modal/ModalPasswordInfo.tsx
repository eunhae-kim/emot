/* eslint-disable react/no-danger */
import React from 'react';
import { myRedirect } from '../../common/utils';
import { Lang } from '../../common/types';

export type ModalPasswordInfoProps = {
  isVisible: boolean;
  lang: Lang;
};

export function ModalPasswordInfo({ isVisible, lang }: ModalPasswordInfoProps) {
  return (
    <div aria-hidden={!isVisible} className="overlay-modal">
      <div className="layer-type-info">
        <div className="header-wrap">
          <h2 className="sub-title">
            {lang === 'KO' && <>고객보호 비밀번호 설정</>}
            {lang === 'EN' && <>PRIVACY PROTECTION PASSCODE SERVICE</>}
          </h2>
        </div>
        <div className="container-wrap">
          <div className="popup-inner">
            <div className="message-exception">
              <span className="msg-text">
                {lang === 'KO' && (
                  <>
                    고객보호 비밀번호를 <br /> 설정해 주세요.
                  </>
                )}
                {lang === 'EN' && (
                  <>
                    {' '}
                    Set up Privacy Protection
                    <br /> Passcode
                  </>
                )}
              </span>
              <p className="msg-text-middle">
                {lang === 'KO' && (
                  <>
                    고객보호 비밀번호 설정 후<br />
                    정상적인 이용이 가능합니다.
                  </>
                )}
                {lang === 'EN' && (
                  <>
                    No passcode set.
                    <br />
                    This service can be used after setting up
                    <br />a privacy protection passcode.
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="bt-fixed-area">
            <div className="btn-full-pop">
              <button
                type="button"
                className="btns blue"
                onClick={() => {
                  myRedirect(`${lang === 'EN' ? '/en' : ''}/myt-join/custpassword`);

                  /*
                // 앱에서는 다른 창에서 링크 이동이 발생해서 회선변경레이어/비밀번호입력레이어/비밀번호변경안내레이어가 다 남아 있을 수
                // 있어서 리프레시 => My창 열때마다 리프레시가 나을듯?
                if(isApp()){
                  setTimeout(()=>{window.location.reload()}, 0);
                }
                */
                }}
              >
                {lang === 'KO' && <>설정하기</>}
                {lang === 'EN' && <>Settings</>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
