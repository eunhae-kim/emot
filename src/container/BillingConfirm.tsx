import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { callBridgeApi } from '../common/utils';
import { Confirm } from '../components/Modal/Confirm';

export interface BillingConfirmProps {
  isOpen?: boolean;
  onClose?: () => void;
  destinationUrl: string;
}

export default function BillingConfirm({ isOpen, onClose, destinationUrl }: BillingConfirmProps) {
  const appContext = useContext(AppContext);
  const { netfunnel } = appContext;
  const [language] = appContext.language;

  return (
    <Confirm
      isOpen={isOpen}
      message={
        language === 'KO'
          ? '이 페이지는 데이터 무료 혜택이 적용되지 않습니다.'
          : 'Data charges will be incurred when visiting this page.'
      }
      onClickCancel={() => {
        // push bridge페이지일 경우 main으로 이동하는 로직 추가
        if (window.location.pathname === '/v6/push') {
          location.href = '/v6/main';
        } else onClose();
      }}
      onClickConfirm={() => {
        onClose();
        netfunnel.do(destinationUrl, () => {
          callBridgeApi({
            command: 'openUrl',
            params: {
              type: 1,
              href: destinationUrl,
            },
          });
        });
      }}
    />
  );
}
