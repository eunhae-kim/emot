import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import _ from 'lodash';
import { AppContext } from './AppContext';

/**
 * 모달의 종류는 크게 두가지
 * @interface ModalDispatch
 * @property {function} open - 중복 표출이 불가능한 모달을 open
 * @property {function} close - 중복 표출이 불가능한 모달을 close
 * @property {function} openOverlay - 중복 표출이 가능한 모달을 open
 * @property {function} closeOverlay - 중복 표출이 가능한 모달을 close
 */
interface ModalDispatch {
  open: (Component: any, props: object) => void;
  close: (Component: any) => void;
  openOverlay: (Component: any, props: object) => void;
  closeOverlay: (Component: any) => void;
}

export const ModalDispatchContext = createContext<ModalDispatch>({
  open: () => {},
  close: () => {},
  openOverlay: () => {},
  closeOverlay: () => {},
});
export const ModalStateContext = createContext({ openedModals: [], openedOverlayModals: [] });

function ModalProvider({ children }) {
  const appContext = useContext(AppContext);
  const { addToOnBackHandlers } = appContext;

  // 여러개의 모달 open 상태를 배열로 관리
  // 중복 표출을 하면 안되는 모달을 담는 배열
  const [openedModals, setOpenedModals] = useState([]);
  // 중복 표출이 가능한 모달을 담는 배열
  const [openedOverlayModals, setOpenedOverlayModals] = useState([]);

  // modal 의 window.onBack 핸들러 (overlayModal 우선적으로 닫고, modal 닫기)
  const modalOnBackHandler = () => {
    let isOverlayModalsEmpty = true;
    setOpenedOverlayModals((overlayModals) => {
      if (overlayModals.length > 0) {
        isOverlayModalsEmpty = false;

        // 앱종료 모달이 떠있을때는 back 버튼 모달 닫기 무시
        const exitAppModal = _.find(overlayModals, (modal) => modal.props.isExitApp === true);
        if (exitAppModal) return overlayModals;

        const newOverlayModals = [...overlayModals];
        newOverlayModals.pop();
        return newOverlayModals;
      }
      isOverlayModalsEmpty = true;
      return [...overlayModals];
    });

    if (isOverlayModalsEmpty) {
      setOpenedModals((modals) => {
        if (modals.length > 0) {
          const newModals = [...modals];
          newModals.splice(0, 1);
          return newModals;
        }
        return [...modals];
      });
    }
  };

  useEffect(() => {
    addToOnBackHandlers(() => {
      modalOnBackHandler();
    });
  }, []);

  const open = (Component, props) => {
    setOpenedModals((modals) => {
      return [...modals, { Component, props }];
    });
  };

  const close = (Component) => {
    setOpenedModals((modals) => {
      const idx = _.findIndex(modals, { Component });
      const newModals = [...modals];
      if (idx > -1) {
        newModals.splice(idx, 1);
      }
      return newModals;
    });
  };

  const openOverlay = (Component, props) => {
    setOpenedOverlayModals((modals) => {
      return [...modals, { Component, props }];
    });
  };

  const closeOverlay = (Component) => {
    setOpenedOverlayModals((modals) => {
      const idx = _.findLastIndex(modals, { Component });
      const newModals = [...modals];
      if (idx > -1) {
        newModals.splice(idx, 1);
      }
      return newModals;
    });
  };

  // useMemo를 사용하여 dispatch가 항상 동일한 함수를 참조하도록 합니다.(불필요한 렌더링 방지)
  const dispatch = useMemo(() => ({ open, close, openOverlay, closeOverlay }), []);
  const state = useMemo(() => ({ openedModals, openedOverlayModals }), [openedModals, openedOverlayModals]);

  return (
    <ModalStateContext.Provider value={state}>
      <ModalDispatchContext.Provider value={dispatch}>{children}</ModalDispatchContext.Provider>
    </ModalStateContext.Provider>
  );
}
export default ModalProvider;
