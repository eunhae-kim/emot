import React, { useEffect, useState } from 'react';
import { ModalError } from '../components/Modal/ModalError';
import { getBrowserInfo } from '../js/commonUtil';

export default function ({ onClose }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [mobileOs, setMobileOS] = useState(null);

  useEffect(() => {
    // iOS는 Safari version = OS version이므로, AOS만 체크
    const browserInfo = getBrowserInfo(navigator.userAgent);

    if (browserInfo.name === 'Chrome' && browserInfo.version < 64 && location.pathname !== '/v6/my') {
      setMobileOS('AOS');
      setIsOpen(true);
    } else {
      // 버전 체크 결과 이상 없을 경우 모달 닫기(모달 배열에서 제거)
      onClose();
    }
  }, []);

  return <ModalError isOpen={isOpen} getClosed={onClose} osType={mobileOs} />;
}
