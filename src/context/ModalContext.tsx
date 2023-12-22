import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { AppContext } from './AppContext';
import BottomSheetLogin from '../components/Ttime/BottomSheetLogin';
import { isAndroid } from '../js/commonUtil';

const skipHistoryBackList = [BottomSheetLogin];

/**
 * 모달의 종류는 크게 두가지
 * @interface ModalDispatch
 * @property {function} open - 모달을 open
 * @property {function} close - 모달을 close
 */
interface ModalDispatch {
  open: (Component: any, props: object, isOverlay: boolean) => void;
  close: (Component: any, isOverlay: boolean) => void;
  clearModals: () => void;
}

export const ModalDispatchContext = createContext<ModalDispatch>({
  open: () => {},
  close: () => {},
  clearModals: () => {},
});
export const ModalStateContext = createContext({ openedModals: [], openedOverlayModals: [] });

function ModalProvider({ children }) {
  const appContext = useContext(AppContext);
  const { addToOnBackHandlers } = appContext;
  const router = useRouter();

  // 여러개의 모달 open 상태를 배열로 관리
  // 중복 표출을 하면 안되는 모달을 담는 배열
  const [openedModals, setOpenedModals] = useState([]);
  // 중복 표출이 가능한 모달을 담는 배열
  const [openedOverlayModals, setOpenedOverlayModals] = useState([]);

  // modal 의 window.onBack 핸들러 (overlayModal 우선적으로 닫고, modal 닫기)
  const modalOnBackHandler = () => {
    let isOpenedOverlayModal = false;

    setOpenedOverlayModals((overlayModals) => {
      if (overlayModals.length > 0) {
        isOpenedOverlayModal = true;
        // 앱종료 모달이 떠있을때는 back 버튼 모달 닫기 무시
        const exitAppModal = _.find(overlayModals, (modal) => modal.props.isExitApp === true);
        if (exitAppModal) return overlayModals;

        const newOverlayModals = [...overlayModals];
        newOverlayModals.pop();
        return newOverlayModals;
      }
      return [...overlayModals];
    });

    // 오버레이 모달이 떠있다면 일반모달은 닫기 무시(오버레이 모달부터 다 닫아야한다.)
    if (isOpenedOverlayModal) return;

    setOpenedModals((modals) => {
      if (modals.length > 0) {
        const newModals = [...modals];
        newModals.splice(0, 1);
        return newModals;
      }
      return [...modals];
    });
  };

  useEffect(() => {
    addToOnBackHandlers({ handlerName: 'modalOnBackHandler', handlerFunction: modalOnBackHandler });
  }, []);

  const open = (Component, props, isOverlay) => {
    // only 안드로이드: 모달이 있을때 Back 버튼으로 history back 안되도록 막는 코드
    if (isAndroid()) {
      const exceptHistoryPush =
        _.findIndex(
          openedModals.concat(openedOverlayModals),
          (modal) => modal.Component === BottomSheetLogin || modal.props.isExitApp === true,
        ) > -1;
      if (!exceptHistoryPush && window.location.pathname !== '/v6/main') {
        window.history.pushState(null, '', window.location.href);
      }
    }

    if (isOverlay) {
      setOpenedOverlayModals((modals) => {
        return [...modals, { Component, props, isOverlay }];
      });
    } else {
      setOpenedModals((modals) => {
        return [...modals, { Component, props, isOverlay }];
      });
    }
  };

  const close = (Component, isOverlay) => {
    // 앱종료모달 판단을 위한 로직
    let isExitAppModal = false;
    setOpenedOverlayModals((modals) => {
      const exitAppModalFindResult = _.findIndex(modals, (modal) => modal.props.isExitApp === true);
      if (exitAppModalFindResult > -1) {
        isExitAppModal = true;
      }
      return modals;
    });

    if (
      isAndroid() &&
      !skipHistoryBackList.includes(Component) &&
      !isExitAppModal &&
      window.location.pathname !== '/v6/main'
    ) {
      // 안드로이드는 앱종료 모달과 티타임 이야기 상세 로그인 유도 바텀시트를 제외하고는 route back 으로 닫기 처리 - history 삭제를 위해
      router.back();
    } else {
      // route back 없이 모달 닫기처리(onBackHandler에도 아래와 유사한 로직이 있음)
      if (isOverlay) {
        setOpenedOverlayModals((modals) => {
          const idx = _.findLastIndex(modals, { Component });
          const newModals = [...modals];
          if (idx > -1) {
            newModals.splice(idx, 1);
          }
          return newModals;
        });
      } else {
        setOpenedModals((modals) => {
          const idx = _.findIndex(modals, { Component });
          const newModals = [...modals];
          if (idx > -1) {
            newModals.splice(idx, 1);
          }
          return newModals;
        });
      }
    }
  };

  const clearModals = () => {
    setOpenedModals([]);
    setOpenedOverlayModals([]);
  };

  // useMemo를 사용하여 dispatch가 항상 동일한 함수를 참조하도록 합니다.(불필요한 렌더링 방지)
  const dispatch = useMemo(() => ({ open, close, clearModals }), []);
  const state = useMemo(() => ({ openedModals, openedOverlayModals }), [openedModals, openedOverlayModals]);

  return (
    <ModalStateContext.Provider value={state}>
      <ModalDispatchContext.Provider value={dispatch}>{children}</ModalDispatchContext.Provider>
    </ModalStateContext.Provider>
  );
}
export default ModalProvider;
