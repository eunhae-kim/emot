/* eslint-disable react/no-danger */
import React, { MutableRefObject } from 'react';

import { MyModalTitle } from '../My/MyModalTitle';
import { 데이터_선물하기 as setMyModalTitle } from '../My/MyModalTitle.stories';

import { MyDataCharger } from '../My/MyDataCharger';
import { 데이터_선물하기 as setMyDataCharger } from '../My/MyDataCharger.stories';
import {
  데이터_선물하기_T가족모아데이터,
  데이터_선물하기_T끼리데이터선물,
  데이터_선물하기_리필쿠폰선물,
} from '../My/MyDataChargerConst';
import { myRedirect } from '../../common/utils';

export interface ModalGiftProps {
  onClose?: () => void;
  isVisible: boolean;
  t가족모아데이터_가입가능: boolean;
  t가족모아데이터_가입됨: boolean;
  is리필쿠폰사용가능요금제: boolean;
  layerRef?: MutableRefObject<HTMLElement>;
}

export function ModalGift({
  onClose,
  isVisible,
  t가족모아데이터_가입가능,
  t가족모아데이터_가입됨,
  is리필쿠폰사용가능요금제,
  layerRef,
}: ModalGiftProps) {
  const itemList = [];
  const useT가족모아데이터 = t가족모아데이터_가입가능 || t가족모아데이터_가입됨;
  const use리필쿠폰선물 = useT가족모아데이터 && is리필쿠폰사용가능요금제;

  if (useT가족모아데이터) {
    let final데이터_선물하기_T가족모아데이터 = 데이터_선물하기_T가족모아데이터;

    if (t가족모아데이터_가입가능 && !t가족모아데이터_가입됨) {
      final데이터_선물하기_T가족모아데이터 = Object.assign({}, final데이터_선물하기_T가족모아데이터, {
        showConfirm: {
          isOpen: true,
          title: 'T가족모아 데이터',
          message: 'T가족모아 데이터에 가입해보세요! 통신비는 내려가고, 데이터량은 늘어나는 혜택을 누릴 수 있습니다.',
          cancelBtnName: '닫기',
          confirmBtnName: '가입하기',
          //onClickCancel: null,
          onClickConfirm: () => {
            myRedirect('/product/callplan?prod_id=NA00006031');
          },
        },
      });
    }

    itemList.push(final데이터_선물하기_T가족모아데이터);
  }

  itemList.push(데이터_선물하기_T끼리데이터선물);

  if (use리필쿠폰선물) {
    itemList.push(데이터_선물하기_리필쿠폰선물);
  }

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
        id={`modalGift`}
        className="layer-type-bottom modal-content-transition"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <MyModalTitle {...setMyModalTitle.args} onClose={onClose} />
        <MyDataCharger title={setMyDataCharger.args.title} List={itemList} />
      </div>
    </div>
  );
}
