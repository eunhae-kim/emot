import { useEffect } from 'react';
import { callBridgeApi } from '../common/utils';
import useModal from '../hooks/useModal';
import getEncryptSso from '../api/getEncryptSso';
import { SKTUNIVERSE_URL } from '../common/const';

export default function pushBridge() {
  const { billingConfirm } = useModal();

  useEffect(() => {
    (async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const encodedTargetUrl = searchParams.get('target');
      const type = searchParams.get('type');

      if (!encodedTargetUrl) {
        window.location.href = '/v6/main';
        return;
      }

      let targetUrl = decodeURIComponent(encodedTargetUrl);

      // T우주 페이지면 로그인 ID붙여 이동
      if (targetUrl.startsWith(SKTUNIVERSE_URL[global.LDSP])) {
        const userInfo = await getEncryptSso();
        let encryptSsoId;

        if (userInfo.result) {
          encryptSsoId = userInfo.result.enc_sso_login_id;
        }

        if (encryptSsoId) {
          const appendUrl = new URL(targetUrl);
          appendUrl.searchParams.append('enc_sso_login_id', encryptSsoId);
          targetUrl = appendUrl.href;
        }
      }

      switch (type) {
        case '01':
          window.location.href = targetUrl;
          break;
        case '02':
          openOutLink(targetUrl);
          break;
        case '04':
          billingConfirm.show({
            destinationUrl: targetUrl,
          });
          break;
        default:
          window.location.href = targetUrl;
          break;
      }
    })();
  }, []);

  const openOutLink = (href) => {
    callBridgeApi({
      command: 'openUrl',
      params: {
        type: 1,
        href,
      },
    });
  };
  return <></>;
}
