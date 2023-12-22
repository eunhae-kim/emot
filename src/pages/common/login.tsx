import { useEffect } from 'react';
import { deleteCookie, getCookie, setCookie } from '../../js/commonUtil';

export default function MauDummyPage() {
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const encodedTargetUrl = searchParams.get('target');

    setCookie('XTLOGINID', getCookie('XTLOGINIDCopy'));
    setCookie('XTLID', getCookie('XTLIDCopy'));
    setCookie('XTUID', getCookie('XTUIDCopy'));

    if (encodedTargetUrl) {
      setTimeout(() => {
        deleteCookie('TWM');
        window.location.replace(encodedTargetUrl);
      }, 500);
    }
  }, []);

  return <></>;
}
