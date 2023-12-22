import React, { useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { ModalDispatchContext, ModalStateContext } from '../context/ModalContext';
import { AppContext } from '../context/AppContext';

export default function Modals() {
  const appContext = useContext(AppContext);
  const [isMenuEditYn] = appContext.isMenuEditYn;
  const { openedModals, openedOverlayModals } = useContext(ModalStateContext);
  const { close, closeOverlay } = useContext(ModalDispatchContext);

  // 하단 네비게이션 컨트롤: 열려있는 모달 배열 길이가 0보다 크면 하단 네비게이션 숨기기
  useEffect(() => {
    if (window.$tw === undefined) return;
    if (window.location === undefined) return;
    // 다음 페이지에서는 모달에 따른 하단 네비게이션 컨트롤 하지 않음
    if (['/v6/survey', '/v6/push', '/v6/404'].some((path) => window.location.pathname.startsWith(path))) return;

    // 메뉴바로가기 편집 화면에서 bottom navi 예외 처리를 위한 임시코드(메뉴바로가기를 모달로 변경 예정이며 변경 후에는 본코드 삭제)
    if (isMenuEditYn) return;

    if (openedModals.length > 0 || openedOverlayModals.length > 0) {
      window.$tw.bottomNav$api.hide();
    } else {
      window.$tw.bottomNav$api.show();
    }
  }, [openedModals, openedOverlayModals]);

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
            close(Component);
            closeOverlay(Component);
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
