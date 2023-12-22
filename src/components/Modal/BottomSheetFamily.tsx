/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-danger */
import React from 'react';

export interface CardProps {
  id: string;
  name: string;
  href: string;
}
export interface MainItemBoxProps {
  isOpen: boolean;
  title: string;
  cardList: Array<CardProps>;
  getClosed: any;
}

export function BottomSheetFamily({ isOpen, title, cardList, getClosed, ...props }: MainItemBoxProps) {
  const setIsActive = (boolean) => getClosed(boolean);

  return (
    <div aria-hidden={!isOpen} className={`overlay ${isOpen ? 'active' : ''}`}>
      <div className="BottomSheet">
        <div className="info-age">
          <strong className="title" dangerouslySetInnerHTML={{ __html: title }} />

          {/* 2022-12-13 접근성 / title 추가 */}
          <button type="button" className="modal-closed" title="닫기" onClick={() => setIsActive(false)}>
            <i className="ic-tbar-cls" />
            <span className="hidden">닫기</span>
          </button>

          <ul className="item-type-list">
            {cardList.map((obj, index: number) => (
              <li key={index} className="item">
                <a href={obj.href} target="_blank" rel="noreferrer">
                  {obj.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
