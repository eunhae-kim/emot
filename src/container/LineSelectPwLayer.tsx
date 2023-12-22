import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { ModalPassword } from '../components/Modal/ModalPassword';
import { guessLang } from '../common/utils';

export type LineSelectPwLayerProps = {
  isOpen?: boolean;
  lineDisplayData: any;
  incorrectPwCnt: number;
  onInputComplete: (string) => void;
  onClose?: () => void;
};

export default function LineSelectPwLayer({
  isOpen,
  lineDisplayData,
  incorrectPwCnt,
  onInputComplete,
  onClose,
}: LineSelectPwLayerProps) {
  const lang = guessLang();

  // 초기 마운트때 포커스등 처리 있어서 일단 isVisible&&로 스르륵 노출 애니메이션 포기하고 마운트 자체를 컨트롤
  return (
    <ModalPassword
      onClose={onClose}
      isVisible={isOpen}
      lang={lang}
      lineDisplayData={lineDisplayData}
      incorrectPwCnt={incorrectPwCnt}
      onInputComplete={onInputComplete}
    />
  );
}
