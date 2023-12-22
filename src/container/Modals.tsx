import React, { useContext, useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useRouter } from 'next/router';
import { ModalDispatchContext, ModalStateContext } from '../context/ModalContext';
import { disableScroll, enableScroll, isAndroid, isIos } from '../js/commonUtil';
import { PAGES_WITHOUT_BOTTOM_NAVI } from '../common/const';

export default function Modals() {
  const { openedModals, openedOverlayModals } = useContext(ModalStateContext);
  const { close, clearModals } = useContext(ModalDispatchContext);
  const [isDocumentHidden, setIsDocumentHidden] = useState(false);
  const router = useRouter();

  // body의 overflow: hidden 이 아닌 방식으로 스크롤 방지
  function touchMoveEventHandler(type: 'add' | 'remove') {
    const osVersion = window.navigator.userAgent?.match(/\|osVersion:([.0-9]*)\|/);
    // ios 12 이하 버전에서 overflow: hidden이 적용 되지 않아서 강제로 스크롤 이벤트 분기처리(추후 최소 지원버전 변경되면 삭제)
    if (isIos() === false || (osVersion && parseInt(osVersion[1].split('.')[0], 10) > 12) || osVersion === null) {
      return;
    }

    const initialScrollY = window.scrollY;
    if (type === 'add') {
      disableScroll(initialScrollY);
    } else if (type === 'remove') {
      enableScroll(initialScrollY);
    }
  }

  // 모달 띄워져 있을때 다른 페이지 이동시 스크롤 활성화
  useEffect(() => {
    router.beforePopState(({ as, options }) => {
      // 모달 닫을때 현재 스크롤 위치를 유지하기 위한 코드
      if (router.basePath + router.asPath === as) {
        // eslint-disable-next-line no-param-reassign
        options.scroll = false;
      }

      // 안드로이드 아닐 경우 뒤로가기 시 모달 전체 닫기
      if (!isAndroid()) {
        clearModals();
      }
      return true;
    });

    return () => {
      router.beforePopState(() => true);
    };
  }, [router.query]);

  // 하단 네비게이션 컨트롤: 열려있는 모달 배열 길이가 0보다 크면 하단 네비게이션 숨기기
  useEffect(() => {
    if (openedModals.length > 0 || openedOverlayModals.length > 0) {
      window.onpopstate = () => {
        window.onBack();
      };
    } else {
      window.onpopstate = () => {};
    }

    let doNotBottomNaviControl = false;
    if (window.$tw === undefined) return;
    if (window.location === undefined) return;
    // 다음 페이지에서는 모달에 따른 하단 네비게이션 컨트롤 하지 않음
    if (PAGES_WITHOUT_BOTTOM_NAVI.includes(window.location.pathname)) {
      doNotBottomNaviControl = true;
    }

    if (openedModals.length > 0 || openedOverlayModals.length > 0) {
      document.body.style.overflow = 'hidden';
      touchMoveEventHandler('add');
      if (doNotBottomNaviControl === false) window.$tw.bottomNav$api.hide(undefined, true);
    } else {
      document.body.style.overflow = '';
      touchMoveEventHandler('remove');
      if (doNotBottomNaviControl === false) window.$tw.bottomNav$api.show();
    }
  }, [JSON.stringify(openedModals), JSON.stringify(openedOverlayModals), isDocumentHidden]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsDocumentHidden(true);
      } else {
        setIsDocumentHidden(false);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      touchMoveEventHandler('remove');
    };
  }, []);

  return (
    // react-transition-group을 사용하여 모달에 애니메이션 효과를 주어 렌더링
    <TransitionGroup>
      {/* 모달이 여러개 표출되는 상황에서 순차적으로 한개씩 표출 하기 위한 slice, overlay 허용한 모달 표출을 위한 filter */}
      {openedModals
        .slice(0, 1)
        .concat(openedOverlayModals)
        .map((modal) => {
          const { Component, props } = modal;
          const { onSubmit, onClose, ...restProps } = props;

          const onCloseDefault = () => {
            close(Component, modal.isOverlay);
          };

          const handleSubmit = async () => {
            if (typeof onSubmit === 'function') {
              await onSubmit();
            }
            onClose();
          };

          return (
            <CSSTransition key={Component} classNames="modal-transition" timeout={300}>
              <Component
                {...restProps}
                isOpen
                onClose={onClose ?? onCloseDefault}
                getClosed={onClose ?? onCloseDefault}
                onSubmit={handleSubmit}
              />
            </CSSTransition>
          );
        })}
    </TransitionGroup>
  );
}
