import React, { useContext } from 'react';
import _ from 'lodash';
import { ModalDispatchContext, ModalStateContext } from '../context/ModalContext';
import { ModalFullScreen, ModalFullScreenProps } from '../components/Modal/ModalFullScreen';
import { Confirm, ConfirmProps } from '../components/Modal/Confirm';
import TermsAgreement from '../container/TermsAgreement';
import { MainItemBoxProps as ModalEmergencyProps, ModalEmergency } from '../components/Modal/ModalEmergency';
import { ModalNewApp } from '../components/Modal/ModalNewApp';
import { MainItemBoxProps as ModalErrorProps, ModalError } from '../components/Modal/ModalError';
import DataGiftLayer, { DataGiftLayerProps } from '../container/DataGiftLayer';
import DataRefillLayer from '../container/DataRefillLayer';
import LineSelector from '../container/LineSelector';
import PasswordInfoLayer, { PasswordInfoLayerProps } from '../container/PasswordInfoLayer';
import LineSelectPwLayer, { LineSelectPwLayerProps } from '../container/LineSelectPwLayer';
import BillingConfirm, { BillingConfirmProps } from '../container/BillingConfirm';
import { MainItemBoxProps as BottomSheetAgeProps, BottomSheetAge } from '../components/Modal/BottomSheetAge';
import { FullMenuEdited } from '../components/Main/FullMenuEdited';
import BottomSheetSortFilter, { BottomSheetSortFilterProps } from '../components/Ttime/BottomSheetSortFilter';
import BottomSheetLogin, { BottomSheetLoginProps } from '../components/Ttime/BottomSheetLogin';
import BottomSheetCupManual, { ModalTeacupProps } from '../components/Ttime/BottomSheetCupManual';
import { ModalHomePopup, ModalHomePopupProps } from '../components/Modal/ModalHomePopup';

interface Modal {
  show(): void;
  close: () => void;
  isVisible: () => boolean;
}
interface ModalWithProps<T> {
  show(props: T): void;
  close: () => void;
  isVisible: () => boolean;
}

export default function useModal() {
  const { open, close } = useContext(ModalDispatchContext);
  const { openedModals, openedOverlayModals } = useContext(ModalStateContext);

  // 모달이 열려있는지 확인하는 공통 함수
  const isVisible = (Component) => {
    // openedModals 에서는 배열의 가장 앞쪽 컴포넌트를 확인
    // openedOverlayModals 에서는 배열의 가장 뒤쪽 컴포넌트를 확인
    return _.findIndex(openedModals, { Component }) === 0 || openedOverlayModals.length > 0
      ? _.findLastIndex(openedOverlayModals, { Component }) === openedOverlayModals.length - 1
      : false;
  };

  // 모달 공통 함수(show, close, isVisible)를 반환
  const getModalFunctions = (Component: React.ReactNode, isOverlay: boolean) => {
    return {
      show: () => open(Component, {}, isOverlay),
      close: () => close(Component, isOverlay),
      isVisible: () => isVisible(Component),
    };
  };
  // Props가 있는 모달 공통 함수(show, close, isVisible)를 반환
  const getModalFunctionsWithProps = <T,>(Component: React.ReactNode, isOverlay: boolean) => {
    return {
      show: (props: T) => open(Component, props as object, isOverlay),
      close: () => close(Component, isOverlay),
      isVisible: () => isVisible(Component),
    };
  };

  // 선택약관 모달
  const termsAgreement: Modal = getModalFunctions(TermsAgreement, false);

  // 긴급공지 모달
  const emergency: ModalWithProps<ModalEmergencyProps> = getModalFunctionsWithProps(ModalEmergency, false);

  // 소문자앱 업그레이드 모달
  const newApp: Modal = getModalFunctions(ModalNewApp, false);

  // 웹뷰 버전 업그레이드 모달
  const webViewUpgrade: ModalWithProps<ModalErrorProps> = getModalFunctionsWithProps(ModalError, false);

  // 데이터 선물하기 모달
  const dataGift: ModalWithProps<DataGiftLayerProps> = getModalFunctionsWithProps(DataGiftLayer, false);

  // 데이터 리필 모달
  const dataRefill: Modal = getModalFunctions(DataRefillLayer, false);

  // 회선 선택 모달
  const lineSelector: Modal = getModalFunctions(LineSelector, false);

  // 회선 비밀번호 설정 모달
  const passwordInfo: ModalWithProps<PasswordInfoLayerProps> = getModalFunctionsWithProps(PasswordInfoLayer, true);

  // 회선 비밀번호 입력 모달
  const lineSelectorPassword: ModalWithProps<LineSelectPwLayerProps> = getModalFunctionsWithProps(
    LineSelectPwLayer,
    true,
  );

  // 컨펌 모달
  const confirm: ModalWithProps<ConfirmProps> = getModalFunctionsWithProps(Confirm, true);

  // Billing 컨펌 모달
  const billingConfirm: ModalWithProps<BillingConfirmProps> = getModalFunctionsWithProps(BillingConfirm, true);

  // 전체화면 모달
  const modalFullScreen: ModalWithProps<ModalFullScreenProps> = getModalFunctionsWithProps(ModalFullScreen, true);

  // 연령대 선택(BottomSheetAge) 모달
  const bottomSheetAge: ModalWithProps<BottomSheetAgeProps> = getModalFunctionsWithProps(BottomSheetAge, false);

  // 메뉴 바로 가기 편집 모달
  const fullMenuEdit: Modal = getModalFunctions(FullMenuEdited, false);

  // 티타임 이야기 정렬 모달
  const ttimeStorySort: ModalWithProps<BottomSheetSortFilterProps> = getModalFunctionsWithProps(
    BottomSheetSortFilter,
    false,
  );

  // 티타임 이야기 로그인 모달
  const ttimeStoryLogin: ModalWithProps<BottomSheetLoginProps> = getModalFunctionsWithProps(BottomSheetLogin, false);

  // 티타임 컵 모달
  const ttimeCup: ModalWithProps<ModalTeacupProps> = getModalFunctionsWithProps(BottomSheetCupManual, false);

  // 홈 팝업 배너 모달
  const homePopupBanner: ModalWithProps<ModalHomePopupProps> = getModalFunctionsWithProps(ModalHomePopup, false);

  return {
    termsAgreement,
    emergency,
    newApp,
    webViewUpgrade,
    dataGift,
    dataRefill,
    lineSelector,
    passwordInfo,
    lineSelectorPassword,
    confirm,
    billingConfirm,
    modalFullScreen,
    bottomSheetAge,
    fullMenuEdit,
    ttimeStorySort,
    ttimeStoryLogin,
    ttimeCup,
    homePopupBanner,
  };
}
