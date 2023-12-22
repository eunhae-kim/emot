/* eslint-disable react/no-danger */
import React, { useState } from 'react';

export interface MainItemBoxProps {
  isOpen: boolean;
  setShowAlert: any;
  title?: string;
  message: string;
}

export function Alert({ isOpen, setShowAlert, title, message }: MainItemBoxProps) {
  return (
    <div aria-hidden={!isOpen} className={`overlay ${isOpen ? 'active' : ''}`}>
      <div className="Alert">
        <div className="txt-area">
          {title && <strong className="title">{title}</strong>}
          <p className="message" dangerouslySetInnerHTML={{ __html: message }} />
        </div>
        <div className="btn-area">
          <button type="button" className="agree" onClick={() => setShowAlert(false)}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
