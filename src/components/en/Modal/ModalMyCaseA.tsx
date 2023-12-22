/* eslint-disable react/no-danger */
import React from 'react';

import { MyLineInfo } from '../../My/MyLineInfo';
import { 단일회선_EN as setMyLineInfo } from '../../My/MyLineInfo.stories';

import { MyTitle, TitleType } from '../My/MyTitle';

import { Message } from '../../My/Message';
import { 예외_CASE_A_1 as setMessage } from '../My/Message.stories';

import { MyVolume } from '../../My/MyVolume';
import { 실시간_이용요금_EN as setMyVolume2 } from '../../My/MyVolume.stories';

import { MyItem } from '../../My/MyItem';
import {
  실시간_이용요금_EN as setMyItem,
  콘텐츠_이용료_EN as setMyItem2,
  지난달_청구요금_EN as setMyItem3,
} from '../../My/MyItem.stories';

import { MyQuickMenu } from '../My/MyQuickMenu';
import { MY_영문_퀵메뉴 as setMyQuickMenu } from '../My/MyQuickMenu.stories';

export interface ModalMyProps {}

export function ModalMyCaseA({ ...props }: ModalMyProps) {
  const isOpen = true;

  return (
    /* role, aria-modal 접근성 추가 */
    <div aria-hidden={!isOpen} className={`overlay ${isOpen ? 'active' : ''}`} role="dialog" aria-modal="true">
      <div className="layer-type-detail">
        <MyLineInfo {...setMyLineInfo.args} />
        <div className="card-bottom-content">
          <div className="my-line-info">
            <div className="my-box">
              <MyTitle type={TitleType.남은데이터} />
              <Message {...setMessage.args} />
            </div>
            <div className="my-box">
              <MyTitle type={TitleType.지난달청구요금} />
              <MyVolume {...setMyVolume2.args} />
              <div className="fee-list">
                <MyItem {...setMyItem.args} />
                <MyItem {...setMyItem2.args} />
                <MyItem {...setMyItem3.args} />
              </div>
            </div>
          </div>
        </div>

        <MyQuickMenu thumbList={setMyQuickMenu.args.thumbList} />
      </div>
    </div>
  );
}
