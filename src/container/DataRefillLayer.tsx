import React, { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { ModalData } from '../components/Modal/ModalData';
import { useActiveElement } from '../common/utils';
import myCouponsApi from '../api/my/coupons';
import focusLoop from '../common/focusLoop';

export type DataRefillLayerProps = {
  isOpen?: boolean;
  onClose?: () => void;
};

export default function DataRefillLayer({ isOpen, onClose }: DataRefillLayerProps) {
  const appContext = useContext(AppContext);
  const [myInfo] = appContext.myInfo;
  const [couponCnt, setCouponCnt] = useState(0);
  const [isTingOnline, setIsTingOnline] = useState(false);
  const [isAdult, setIsAdult] = useState(false);

  const selectedElm = useActiveElement();
  const [lastSelectedElm, setLastSelectedElm] = useState(selectedElm);

  const layerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setLastSelectedElm(selectedElm);

    setTimeout(() => {
      if (layerRef.current) {
        focusLoop.setTargetLayer(layerRef.current);
      }
    }, 100);

    myCouponsApi({
      setter: (apiResp) => {
        if (apiResp?.respCode !== 0) return;
        setCouponCnt(apiResp.copnCnt || 0);
        setIsTingOnline(apiResp.tingGiftYn === 'Y');
      },
    });

    return () => {
      focusLoop.cleanUp();
      if (lastSelectedElm) {
        lastSelectedElm.focus();
      }
    };
  }, []);

  useEffect(() => {
    if (!myInfo || !myInfo.allSvcInfo) return;
    setIsAdult(myInfo?.svcInfo?.isAdult === true);
  }, [myInfo]);

  return (
    <ModalData
      showTing={isAdult && isTingOnline}
      couponCnt={couponCnt}
      isVisible={isOpen}
      layerRef={layerRef}
      onClose={onClose}
    />
  );
}
