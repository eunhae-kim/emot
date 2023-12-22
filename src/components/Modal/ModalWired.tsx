/* eslint-disable react/no-danger */
import React from 'react';

import { MyLineInfo } from '../My/MyLineInfo';
import { 유선회선 as setMyLineInfo } from '../My/MyLineInfo.stories';

import { MyTitle, TitleType } from '../My/MyTitle';

import { MyVolume } from '../My/MyVolume';
import { MY_유선회선 as setMyVolume } from '../My/MyVolume.stories';

import { MyItem } from '../My/MyItem';
import { 미납요금_발생 as setMyItem } from '../My/MyItem.stories';

import { MyQuickMenu } from '../My/MyQuickMenu';
import { MY_퀵메뉴_유선회선 as setMyQuickMenu } from '../My/MyQuickMenu.stories';

import { MyJoinInfo } from '../My/MyJoinInfo';
import { 유선_가입정보_유선회선 as setMyJoinInfo } from '../My/MyJoinInfo.stories';

export interface ModalWiredProps {
  isOpen: boolean;
  isWeb: boolean;
}

export function ModalWired({ isOpen, isWeb, ...props }: ModalWiredProps) {
  return (
    /* role, aria-modal 접근성 추가 */
    <main className="container myweb" id="contents">
      <div aria-hidden={!isOpen} className={`overlay ${isOpen ? 'active' : ''}`} role="dialog" aria-modal="true">
        <div className="layer-type-detail">
          <div className="my-web-btn">
            <button className="my-btn-close" id="closeMyBtn">
              <i className="ic-tbar-cls" />
              <span className="hidden">내 정보 닫기</span>
            </button>
          </div>
          <MyLineInfo {...setMyLineInfo.args} />
          <div className="card-bottom-content">
            <div className="my-line-info">
              <div className="my-box">
                <MyTitle type={TitleType.MY유선회선} />
                <MyVolume over1={setMyVolume.args.over1} overUnit1={setMyVolume.args.overUnit1} />
                <div className="fee-list">
                  <MyItem icon={setMyItem.args.icon} title={setMyItem.args.title} fee={setMyItem.args.fee} />
                </div>
              </div>
            </div>
          </div>

          <MyQuickMenu thumbList={setMyQuickMenu.args.thumbList} />

          <MyJoinInfo joinTitle={setMyJoinInfo.args.joinTitle} itemList={setMyJoinInfo.args.itemList} />
        </div>
      </div>
    </main>
  );
}
