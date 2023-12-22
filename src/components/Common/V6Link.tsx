import Link from 'next/link';
import React, { forwardRef, useContext, useEffect, useRef, useState } from 'react';
import { BASE_PATH, SKTUNIVERSE_URL } from '../../common/const';
import { callBridgeApi, toFullUrl } from '../../common/utils';
import { isApp, isBillingExceptionUrl } from '../../js/commonUtil';
import { AppContext } from '../../context/AppContext';
import useModal from '../../hooks/useModal';

export type NewWindowType = 'IN_APP' | 'BROWSER';

export type V6LinkProps = {
  href: string;
  newWindow?: NewWindowType;
  myToMainWebView?: boolean;
  children?: React.ReactNode;
  billYn?: boolean;
} & any;

export default forwardRef(({ href, newWindow, myToMainWebView, billYn, ...otherProps }: V6LinkProps, ref) => {
  const anchorProps = { href, ...otherProps, ref };

  const appContext = useContext(AppContext);
  if (!appContext) {
    return <a {...anchorProps}></a>;
  }
  const netfunnel = appContext.netfunnel;

  // 과금 팝업 관련
  const [isUnlimit] = appContext.isUnlimit;
  const { billingConfirm } = useModal();
  const getNetworkType = appContext.getNetworkType;

  const [shouldUseNetfunnel, setShouldUseNetfunnel] = useState(false);

  let linkComp;

  useEffect(() => {
    setShouldUseNetfunnel(typeof netfunnel.getActionId(href) === 'string');
  }, [href]);

  let appContextRef = useRef<any>();
  appContextRef.current = appContext;

  if (newWindow) {
    if (isApp()) {
      if (newWindow === 'IN_APP') {
        linkComp = (
          <a
            {...anchorProps}
            onClick={(e) => {
              e.preventDefault();
              netfunnel.do(href, () => {
                callBridgeApi({
                  command: 'openUrl',
                  params: {
                    type: 0,
                    href,
                  },
                });
              });
            }}
          ></a>
        );
      } else {
        // billYn이 없으면 billingExceptionalUrl 인지 판단
        if (billYn === null || billYn === undefined) {
          billYn = !isBillingExceptionUrl(href);
        }
        linkComp = (
          <>
            <a
              {...anchorProps}
              onClick={(e) => {
                e.preventDefault();
                getNetworkType();
                setTimeout(() => {
                  const [isWifi] = appContextRef.current.isWifi;
                  if (isWifi || isUnlimit || !billYn) {
                    netfunnel.do(href, () => {
                      callBridgeApi({
                        command: 'openUrl',
                        params: {
                          type: 1,
                          href,
                        },
                      });
                    });
                  } else {
                    billingConfirm.show({
                      destinationUrl: href,
                    });
                  }
                }, 500);
              }}
            />
          </>
        );
      }

      return linkComp;
    } else {
      anchorProps.target = '_blank';

      //FIXME: 접근성 심사 동안만 SHOP_URL 새창 이동
      if (shouldUseNetfunnel) {
        linkComp = (
          <a
            {...anchorProps}
            onClick={(e) => {
              e.preventDefault();
              netfunnel.do(href, () => {
                window.open(href, '_blank');
              });
            }}
          ></a>
        );

        return linkComp;
      }
    }
  }

  if (isApp() && myToMainWebView) {
    let fullUrl = toFullUrl(href);

    linkComp = (
      <a
        {...anchorProps}
        onClick={(e) => {
          e.preventDefault();
          if (fullUrl && fullUrl.startsWith(SKTUNIVERSE_URL[global.LDSP])) {
            const [encryptSsoId] = appContextRef.current.encryptSsoId;
            if (encryptSsoId) {
              const appendUrl = new URL(fullUrl);
              appendUrl.searchParams.append('enc_sso_login_id', encryptSsoId);
              fullUrl = appendUrl.href;
            }
          }
          netfunnel.do(href, () => {
            callBridgeApi({
              command: 'closeMyAndOpenUrl',
              params: {
                href: fullUrl,
              },
            });
          });
        }}
      ></a>
    );

    return linkComp;
  }

  // 넷퍼널을 써야 되는 경우만 onClick을 javascript로 처리하고 나머지는 plain A 태그 사용하도록
  if (shouldUseNetfunnel) {
    anchorProps.onClick = (e) => {
      e.preventDefault();

      netfunnel.do(href, () => {
        window.location.href = href;
      });
    };
  }

  const rxStartsWithBasePath = new RegExp(`^${BASE_PATH}$|^${BASE_PATH}/`);

  // v6 하위 경로인가?
  // my 레이어 관련 링크일 경우도 속한 레이어등 정리 위해서 a태그 사용
  if (rxStartsWithBasePath.exec(href) && !myToMainWebView) {
    let relUrl = href.replace(rxStartsWithBasePath, '/');
    linkComp = (
      <Link href={relUrl}>
        <a {...otherProps}></a>
      </Link>
    );
  } else if (href && href.startsWith(SKTUNIVERSE_URL[global.LDSP])) {
    // T우주 URL의 경우 encryptSsoId 추가
    linkComp = (
      <a
        {...anchorProps}
        onClick={(e) => {
          e.preventDefault();
          const [encryptSsoId] = appContextRef.current.encryptSsoId;
          if (encryptSsoId) {
            const appendUrl = new URL(href);
            appendUrl.searchParams.append('enc_sso_login_id', encryptSsoId);
            href = appendUrl.href;
          }
          window.location.href = href;
        }}
      />
    );
  } else {
    linkComp = <a {...anchorProps}></a>;
  }

  return linkComp;
});
