import React, { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { ModalGift } from '../components/Modal/ModalGift';
import myCouponsApi from '../api/my/coupons';
import { useActiveElement } from '../common/utils';
import focusLoop from '../common/focusLoop';

export type DataGiftLayerProps = {
  isOpen?: boolean;
  t가족모아데이터_가입가능?: boolean;
  t가족모아데이터_가입됨?: boolean;
  onClose?: () => void;
};

export default function DataGiftLayer({
  isOpen,
  t가족모아데이터_가입가능 = false,
  t가족모아데이터_가입됨 = false,
  onClose,
}: DataGiftLayerProps) {
  const [is리필쿠폰사용가능요금제, setIs리필쿠폰사용가능요금제] = useState(false);

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
        setIs리필쿠폰사용가능요금제(apiResp.giftRfilProdYn === 'Y');
      },
    });

    return () => {
      focusLoop.cleanUp();
      if (lastSelectedElm) {
        lastSelectedElm.focus();
      }
    };
  }, []);

  return (
    <ModalGift
      layerRef={layerRef}
      isVisible={isOpen}
      t가족모아데이터_가입가능={t가족모아데이터_가입가능}
      t가족모아데이터_가입됨={t가족모아데이터_가입됨}
      is리필쿠폰사용가능요금제={is리필쿠폰사용가능요금제}
      onClose={onClose}
    />
  );
}
