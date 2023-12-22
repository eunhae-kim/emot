/* eslint-disable react/no-danger */
import React from 'react';

import { MyLineInfo } from '../My/MyLineInfo';
import { 단일회선 as setMyLineInfo } from '../My/MyLineInfo.stories';

import { MyTitle, TitleType } from '../My/MyTitle';

import { MyGraph } from '../My/MyGraph';
import { 남은_데이터 as setMyGraph } from '../My/MyGraph.stories';

import { MyVolume } from '../My/MyVolume';
import { 실시간_이용요금 as setMyVolume2 } from '../My/MyVolume.stories';

import { MyItem } from '../My/MyItem';
import {
  실시간_이용요금 as setMyItem,
  콘텐츠_이용료 as setMyItem2,
  지난달_청구요금 as setMyItem3,
} from '../My/MyItem.stories';

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

export interface ModalMyProps {
  onLineSelectorOpen?: () => void;
}

export function ModalMy({ onLineSelectorOpen }: ModalMyProps) {
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
          <MyLineInfo {...setMyLineInfo.args} onLineSelectorOpen={onLineSelectorOpen} />
          <div className="card-bottom-content">
            <div className="my-line-info">
              <div className="my-box">
                <MyTitle type={TitleType.남은데이터} />
                <MyGraph {...setMyGraph.args} />
              </div>
              <div className="my-box">
                <MyTitle type={TitleType.무선_일반} />

                <MyVolume over1={setMyVolume2.args.over1} overUnit1={setMyVolume2.args.overUnit1} />
                {/* start 22-11-22 기간 추가 / */}
                <div className="my-period">22. 11 .01 ~ 22. 11. 30</div>
                {/* end 22-11-22 기간 추가 / */}

                <div className="fee-list">
                  <MyItem {...setMyItem.args} />
                  <MyItem {...setMyItem2.args} />
                  <MyItem {...setMyItem3.args} />
                </div>
              </div>
            </div>
          </div>

          <MyQuickMenu {...setMyQuickMenu.args} />

          <MyMembership {...setMyMembership.args} />
          <MySubscribe {...setMySubscribe.args} />

          <MyJoinInfo {...setMyJoinInfo1.args} />

          <MyJoinInfo {...setMyJoinInfo2.args} />
        </div>
      </div>
    </main>
  );
}
