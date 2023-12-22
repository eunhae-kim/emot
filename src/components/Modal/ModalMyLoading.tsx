/* eslint-disable react/no-danger */
import React from 'react';

import { MyLineInfo } from '../My/MyLineInfo';
import { 단일회선 as setMyLineInfo } from '../My/MyLineInfo.stories';

import { MyTitle, TitleType } from '../My/MyTitle';

import { Message } from '../My/Message';
import { 예외_CASE_LOADING as setMessage } from '../My/Message.stories';

import { MyQuickMenu } from '../My/MyQuickMenu';
import { MY_퀵메뉴 as setMyQuickMenu } from '../My/MyQuickMenu.stories';

import { MyMembership } from '../My/MyMembership';
import { 기본 as setMyMembership } from '../My/MyMembership.stories';

import { MySubscribe } from '../My/MySubscribe';
import { Default as setMySubscribe } from '../My/MySubscribe.stories';

import { MyJoinInfo } from '../My/MyJoinInfo';
import {
  모바일_가입_정보 as setMyJoinInfo1,
  인터넷_전화_IPTV_가입_정보 as setMyJoinInfo2,
} from '../My/MyJoinInfo.stories';

export interface ModalMyLoadingProps {}

export function ModalMyLoading({ ...props }: ModalMyLoadingProps) {
  const isOpen = true;

  return (
    <main className="container myweb" id="contents">
      /* role, aria-modal 접근성 추가 */
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
                <MyTitle type={TitleType.남은데이터} />
                <Message {...setMessage.args} />
              </div>
              <div className="my-box">
                <MyTitle type={TitleType.무선_일반} />
                <Message {...setMessage.args} />
              </div>
            </div>
          </div>

          <MyQuickMenu thumbList={setMyQuickMenu.args.thumbList} />

          <MyMembership {...setMyMembership.args.text} />
          <MySubscribe subscribeList={setMySubscribe.args.subscribeList} />

          <MyJoinInfo joinTitle={setMyJoinInfo1.args.joinTitle} itemList={setMyJoinInfo1.args.itemList} />

          <MyJoinInfo joinTitle={setMyJoinInfo2.args.joinTitle} itemList={setMyJoinInfo2.args.itemList} />
        </div>
      </div>
    </main>
  );
}
