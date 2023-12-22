/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Lang } from '../../common/types';
import MyLink from '../Common/MyLink';

export interface MyItemProps {
  icon: boolean;
  title: string;
  fee: string;
  flag?: boolean;
  link?: string;
  lang?: Lang;
  hideUnit?: boolean;
}
export function MyItem({ icon, title, fee, flag = false, link, lang = 'KO', hideUnit }: MyItemProps) {
  return (
    <MyLink href={link}>
      <dl className="line-item">
        <dt>
          {icon && <i className="ic-info red" />}
          {title}
          {flag && lang === 'KO' && <span className="flag">전체</span>}
          {flag && lang === 'EN' && <span className="flag">ALL</span>}
        </dt>
        <dd>
          {!hideUnit && lang === 'EN' && <i className="ic-etc-fee" />}
          {fee}
          {!hideUnit && lang === 'KO' && '원'}
          <i className="bl-arr" aria-hidden="true">
            {' '}
          </i>
        </dd>
      </dl>
    </MyLink>
  );
}
