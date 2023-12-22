import React from 'react';

export interface MainItemBoxProps {
  isOpen: boolean;
  title: string | null;
  message: string;
  getClosed: any;
}

export function Modal({ isOpen, title, message, getClosed, ...props }: MainItemBoxProps) {
  return (
    <div aria-hidden={!isOpen} className={`overlay ${isOpen ? 'active' : ''}`}>
      <div className="Modal">
        <div className="txt-area">{title !== null ? <strong className="title">{title}</strong> : null}</div>
      </div>
    </div>
  );
}
