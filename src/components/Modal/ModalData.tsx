/* eslint-disable react/no-danger */
import React, { MutableRefObject } from 'react';

import { MyModalTitle } from '../My/MyModalTitle';
import { 데이터_충전하기 as setMyModalTitle } from '../My/MyModalTitle.stories';

import { MyDataCharger } from '../My/MyDataCharger';
import {
  나의_보유_쿠폰_사용 as setMyDataCharger,
  선불쿠폰_구매_충전 as setMyDataCharger2,
  요금충전 as setMyDataCharger3,
} from '../My/MyDataCharger.stories';

export interface ModalDataProps {
  couponCnt?: number;
  isVisible: boolean;
  showTing?: boolean;
  onClose?: () => void;
  layerRef?: MutableRefObject<HTMLElement>;
}

export function ModalData({ onClose, isVisible, couponCnt = 5, showTing = false, layerRef }: ModalDataProps) {
  return (
    <div
      ref={(r) => {
        if (layerRef) layerRef.current = r;
      }}
      aria-hidden={!isVisible}
      className="overlay-modal"
      onClick={onClose}
    >
      <div
        id={`modalRefill`}
        className="layer-type-bottom modal-content-transition"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <MyModalTitle {...setMyModalTitle.args} onClose={onClose} />
        {/* 나의 보유 쿠폰 사용 */}
        {couponCnt > 0 && (
          <MyDataCharger
            title={setMyDataCharger.args.title}
            List={[
              {
                ...setMyDataCharger.args.List[0],
                coupon: `${couponCnt}장`,
              },
            ]}
          />
        )}
        {/* 선불쿠폰 구매·충전 */}
        <MyDataCharger title={setMyDataCharger2.args.title} List={setMyDataCharger2.args.List} />
        {/* 요금충전 */}
        {showTing && <MyDataCharger title={setMyDataCharger3.args.title} List={setMyDataCharger3.args.List} />}
      </div>
    </div>
  );
}
