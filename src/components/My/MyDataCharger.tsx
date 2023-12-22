/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useRef } from 'react';
import MyLink from '../Common/MyLink';
import { ConfirmProps } from '../Modal/Confirm';
import useModal from '../../hooks/useModal';

export interface MyDataProps {
  icon: string;
  text: string;
  coupon: string | null;
  link: string;
  showConfirm?: ConfirmProps;
}
export interface MyDataListProps {
  title: string | null;
  List: Array<MyDataProps>;
}

export function MyDataCharger({ title, List, ...props }: MyDataListProps) {
  const { confirm } = useModal();
  const lastElmRef = useRef<HTMLElement>();

  useEffect(() => {
    console.log('lastElmRef', lastElmRef);
  }, []);

  const linkContents = (obj) => (
    <>
      {/* e: 웹접근성 a 링크 title 부가 설명 추가 */}
      <i className={obj.icon} aria-hidden="true" />
      <span className="text">{obj.text}</span>
      <span className="range">
        {obj.coupon && <span className="number">{obj.coupon}</span>}
        <i className="bl-arr-bold right" aria-hidden="true" />
      </span>
    </>
  );

  return (
    <div className="item-bottom-content">
      {title && <h3 className="sub-title">{title}</h3>}
      <ul className="item-type-list">
        {List.map((obj, index: number) => (
          <li className="item" key={index}>
            {!obj.showConfirm && <MyLink href={obj.link}>{linkContents(obj)}</MyLink>}
            {obj.showConfirm && (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <a
                href="#"
                title={obj.text}
                onClick={(e) => {
                  e.preventDefault();
                  confirm.show(obj.showConfirm);
                }}
              >
                {linkContents(obj)}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
