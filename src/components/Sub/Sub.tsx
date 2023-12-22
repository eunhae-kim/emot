import React from 'react';
import { TtimeMessageBubble } from '../Ttime/TtimeMessageBubble';
import { TtimeListContent } from '../Ttime/TtimeListContent';
import { TtimePersonalArea } from '../Ttime/TtimePersonalArea';

export interface TtimeSubProps {
  message: any;
  isLogin: boolean;
  tTimeList: any;
}

export default function Sub({ message, isLogin, tTimeList }: TtimeSubProps) {
  return (
    <>
      {/* T-time Message Bubble */}
      <TtimeMessageBubble message={message} scrollToCard={``} svcMgmtNum={``} className="tTime" />

      {/* T-time 개인화 영역 */}
      <TtimePersonalArea isLogin={isLogin} />

      {/* T-time 리스트 */}
      <TtimeListContent tTimeList={tTimeList} />
    </>
  );
}
