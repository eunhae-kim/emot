/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import V6Link from '../Common/V6Link';
import { ConfirmProps } from '../Modal/Confirm';
import { isApp } from '../../js/commonUtil';
import XtrAw from '../Common/XtrAw';
import useModal from '../../hooks/useModal';

export interface MenuProps {
  new: any;
  // icon: string | null;
  text: string | null;
  imgUrl: string;
  isNew: boolean;
  confirmProps?: ConfirmProps;
  link?: string;
  exUrlNotiYn: string;
  oferStcCd: string;
}
export interface MenuListProps {
  thumbList: Array<MenuProps>;
}
export function MyQuickMenu({ thumbList }: MenuListProps) {
  const { confirm } = useModal();

  const linkContents = (obj) => (
    <>
      <span className="icon-usual">
        <img src={obj.imgUrl} alt={obj.text} />
      </span>
      <span className="text">{obj.text}</span>
    </>
  );

  return (
    <div className="card-bottom-menu">
      <div className="my-menu">
        <ul className="my-list">
          {thumbList.map((obj, index: number) => (
            <li key={index} className={obj.new ? `item new` : `item`}>
              {obj.confirmProps ? (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a
                  href="#"
                  title={obj.text}
                  className="my-thumb"
                  onClick={(e) => {
                    e.preventDefault();
                    confirm.show(obj.confirmProps);
                  }}
                >
                  {linkContents(obj)}
                </a>
              ) : (
                <XtrAw appEid={obj.oferStcCd} webEid={obj.oferStcCd} xtrClick xtrView>
                  <V6Link
                    myToMainWebView
                    newWindow={obj.exUrlNotiYn === 'Y' && isApp() && 'BROWSER'}
                    href={obj.link}
                    className="my-thumb"
                  >
                    {linkContents(obj)}
                  </V6Link>
                </XtrAw>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
