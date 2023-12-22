/* eslint-disable react/no-danger */
import React from 'react';

import { MyLineInfo } from '../../My/MyLineInfo';
import { 단일회선_EN as setMyLineInfo } from '../../My/MyLineInfo.stories';

import { MyTitle, TitleType } from '../My/MyTitle';

import { MyGraph } from '../../My/MyGraph';
import { 남은_데이터_EN as setMyGraph } from '../../My/MyGraph.stories';

import { Message } from '../../My/Message';
import { 예외_무선_CASE_A as setMessage } from '../My/Message.stories';

import { MyQuickMenu } from '../My/MyQuickMenu';
import { MY_영문_퀵메뉴 as setMyQuickMenu } from '../My/MyQuickMenu.stories';

import { MyToast } from '../../My/MyToast';
import { 회선변경_토스트_팝업_영문 as setMyToast } from '../../My/MyToast.stories';

export interface ModalMyProps {}

export function ModalMyWirelessCaseA({ ...props }: ModalMyProps) {
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
              <MyGraph {...setMyGraph.args} />
            </div>
            <div className="my-box">
              <MyTitle type={TitleType.지난달청구요금} />
              <Message {...setMessage.args} />
            </div>
          </div>
        </div>

        <MyQuickMenu thumbList={setMyQuickMenu.args.thumbList} />
      </div>
      <MyToast message={setMyToast.args.message} />
    </div>
  );
}
