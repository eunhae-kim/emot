/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-array-index-key */
import React, { useContext } from 'react';
import MyLink from '../../Common/MyLink';
import XtrAw, { XtrAwProps } from '../../Common/XtrAw';
import { AppContext } from '../../../context/AppContext';

export interface MenuProps {
  icon: string | null;
  text: string | null;
  link: string;
  new: boolean;
  xtrAwProps?: XtrAwProps;
}
export interface MenuListProps {
  thumbList: Array<MenuProps>;
}

export function MyQuickMenu({ thumbList }: MenuListProps) {
  const appContext = useContext(AppContext);
  const isStorybook = !appContext;

  return (
    <div className="card-bottom-menu">
      <div className="my-menu">
        <ul className="my-list">
          {thumbList.map((obj, index: number) => (
            <li key={index} className={obj.new ? `item new` : `item`}>
              <XtrAw {...obj.xtrAwProps}>
                <MyLink href={obj.link} className="my-thumb">
                  <img src={`${isStorybook ? '' : '/v6'}/images/icon/${obj.icon}.png`} alt={obj.text} />
                  <span className="text">{obj.text}</span>
                </MyLink>
              </XtrAw>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
