import React, { MutableRefObject, useCallback, useContext } from 'react';
import { AppContext } from '../../context/AppContext';

export interface ConfirmProps {
  isOpen: boolean;
  onClose?: () => void;
  title?: string;
  message?: string;
  onClickCancel?: any;
  onClickConfirm?: any;
  cancelBtnName?: string;
  confirmBtnName?: string;
  isEndPopUp?: boolean;
  confirmRef?: MutableRefObject<HTMLElement>;
  isExitApp?: boolean; // 컴포넌트에서 사용하진 않고, useModal.tsx에서 앱종료 confirm 인지를 판단하기 위해 사용
}

export function Confirm({
  isOpen,
  onClose,
  title,
  message,
  onClickCancel,
  onClickConfirm,
  cancelBtnName,
  confirmBtnName,
  isEndPopUp,
  confirmRef,
  isExitApp = false,
}: ConfirmProps) {
  // 2022-12-15 접근성 / 포커스 이동위한 스크립트 추가
  const focusItem = useCallback(
    (ref) => {
      if (isOpen && ref) {
        ref.focus();
      }
    },
    [isOpen],
  );
  const appContext = useContext(AppContext);
  const [language] = appContext.language;
  const isConfirm = !!onClickCancel;

  return (
    <div
      ref={(r) => {
        if (confirmRef) confirmRef.current = r;
      }}
      aria-hidden={!isOpen}
      className="overlay-modal"
      onClick={onClose ?? onClickCancel}
    >
      <div ref={focusItem} tabIndex={-1} className="confirm-item">
        <div className={isConfirm ? 'Confirm' : 'Alert'} onClick={(e) => e.stopPropagation()}>
          <div className="txt-area">
            {title && <strong className="title" dangerouslySetInnerHTML={{ __html: title }} />}
            <p className="message" dangerouslySetInnerHTML={{ __html: message }} />
          </div>
          <div className="btn-area">
            {isConfirm && (
              <button type="button" className="disagree" onClick={onClickCancel ?? onClose}>
                {cancelBtnName ?? (language === 'KO' ? '취소' : 'Cancel')}
              </button>
            )}
            <button type="button" className="agree" onClick={onClickConfirm ?? onClose}>
              {confirmBtnName ?? (isEndPopUp ? '종료' : language === 'KO' ? '확인' : 'Okay')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
