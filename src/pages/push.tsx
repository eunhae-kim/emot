import { useEffect } from 'react';

export default function pushBridge() {
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const targetUrl = searchParams.get('target');
    if (targetUrl) {
      window.location.href = decodeURIComponent(targetUrl);
    } else {
      window.location.href = '/v6/main';
    }
  }, []);

  return <></>;
}
