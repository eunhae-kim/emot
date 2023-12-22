import { useContext } from 'react';
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
  const { open, close, openOverlay, closeOverlay } = useContext(ModalDispatchContext);
  const { openedModals, openedOverlayModals } = useContext(ModalStateContext);

  // 모달이 열려있는지 확인
  const isVisible = (Component) => {
    // openedModals 에서는 배열의 가장 앞쪽 컴포넌트를 확인
    // openedOverlayModals 에서는 배열의 가장 뒤쪽 컴포넌트를 확인
    return _.findIndex(openedModals, { Component }) === 0 || openedOverlayModals.length > 0
      ? _.findLastIndex(openedOverlayModals, { Component }) === openedOverlayModals.length - 1
      : false;
  };

  // 선택약관 모달
  const termsAgreement: Modal = {
    show: () => {
      open(TermsAgreement, {});
    },
    close: () => {
      close(TermsAgreement);
    },
    isVisible: () => isVisible(TermsAgreement),
  };

  // 긴급공지 모달
  const emergency: ModalWithProps<ModalEmergencyProps> = {
    show: (props: ModalEmergencyProps) => {
      open(ModalEmergency, props);
    },
    close: () => {
      close(ModalEmergency);
    },
    isVisible: () => isVisible(ModalEmergency),
  };

  // 소문자앱 업그레이드 모달
  const newApp: Modal = {
    show: () => {
      open(ModalNewApp, {});
    },
    close: () => {
      close(ModalNewApp);
    },
    isVisible: () => isVisible(ModalNewApp),
  };

  // 웹뷰 버전 업그레이드 모달
  const webViewUpgrade: ModalWithProps<ModalErrorProps> = {
    show: (props: ModalErrorProps) => {
      open(ModalError, props);
    },
    close: () => {
      close(ModalError);
    },
    isVisible: () => isVisible(ModalError),
  };

  // 데이터 선물하기 모달
  const dataGift: ModalWithProps<DataGiftLayerProps> = {
    show: (props) => {
      open(DataGiftLayer, props);
    },
    close: () => {
      close(DataGiftLayer);
    },
    isVisible: () => isVisible(DataGiftLayer),
  };

  // 데이터 리필 모달
  const dataRefill: Modal = {
    show: () => {
      open(DataRefillLayer, {});
    },
    close: () => {
      close(DataRefillLayer);
    },
    isVisible: () => isVisible(DataRefillLayer),
  };

  // 회선 선택 모달
  const lineSelector: Modal = {
    show: () => {
      open(LineSelector, {});
    },
    close: () => {
      close(LineSelector);
    },
    isVisible: () => isVisible(LineSelector),
  };

  // 회선 비밀번호 설정 모달
  const passwordInfo: ModalWithProps<PasswordInfoLayerProps> = {
    show: (props) => {
      openOverlay(PasswordInfoLayer, props);
    },
    close: () => {
      closeOverlay(PasswordInfoLayer);
    },
    isVisible: () => isVisible(PasswordInfoLayer),
  };

  // 회선 비밀번호 입력 모달
  const lineSelectorPassword: ModalWithProps<LineSelectPwLayerProps> = {
    show: (props) => {
      openOverlay(LineSelectPwLayer, props);
    },
    close: () => {
      closeOverlay(LineSelectPwLayer);
    },
    isVisible: () => isVisible(LineSelectPwLayer),
  };

  // 컨펌 모달
  const confirm: ModalWithProps<ConfirmProps> = {
    show: (props) => {
      openOverlay(Confirm, props);
    },
    close: () => {
      closeOverlay(Confirm);
    },
    isVisible: () => isVisible(Confirm),
  };

  // Billing 컨펌 모달
  const billingConfirm: ModalWithProps<BillingConfirmProps> = {
    show: (props) => {
      openOverlay(BillingConfirm, props);
    },
    close: () => {
      closeOverlay(BillingConfirm);
    },
    isVisible: () => isVisible(BillingConfirm),
  };

  // 전체화면 모달 (현재 선택약관 내용 상세보기에서 사용중)
  const modalFullScreen: ModalWithProps<ModalFullScreenProps> = {
    show: (props: ModalFullScreenProps) => {
      openOverlay(ModalFullScreen, props);
    },
    close: () => {
      closeOverlay(ModalFullScreen);
    },
    isVisible: () => isVisible(ModalFullScreen),
  };

  // 연령대 선택(BottomSheetAge) 모달
  const bottomSheetAge: ModalWithProps<BottomSheetAgeProps> = {
    show: (props: BottomSheetAgeProps) => {
      open(BottomSheetAge, props);
    },
    close: () => {
      close(BottomSheetAge);
    },
    isVisible: () => isVisible(BottomSheetAge),
  };

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
  };
}
