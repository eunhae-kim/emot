/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';

export interface FeeModuleProps {
  요금메시지: string;
}

export function FeeModule({ 요금메시지 }: FeeModuleProps) {
  return (
    <>
      <div className="message-announce-case">
        <div className="my-msg-normal">
          <span className="acc-text">{요금메시지}</span>
        </div>
      </div>
    </>
  );
}
