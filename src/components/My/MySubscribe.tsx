/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import MyLink from '../Common/MyLink';
import { SKTUNIVERSE_URL } from '../../common/const';
import XtrAw from '../Common/XtrAw';

export interface SubscribeListProps {
  src: string | null;
  text: string | null;
  date: string | null;
}
export interface MySubscribeProps {
  subscribeList: Array<SubscribeListProps>;
}

export function MySubscribe({ subscribeList }: MySubscribeProps) {
  return (
    <XtrAw appEid="CMMA_A24-20" webEid="MWMA_A24-52" xtrClick>
      <MyLink href={`${SKTUNIVERSE_URL[global.LDSP]}/my/home`} className="card-bottom-content">
        <h2>이용 중인 구독 상품</h2>
        <div className="my-subscribe">
          {subscribeList.map((obj, index: number) => (
            <dl className="my-item" key={index}>
              <dt className="s-title">
                <i className="icon-usual">
                  <img src={obj.src} alt="" />
                </i>
                <span className="text">{obj.text}</span>
              </dt>
              <dd>{obj.date}</dd>
            </dl>
          ))}
        </div>
      </MyLink>
    </XtrAw>
  );
}
