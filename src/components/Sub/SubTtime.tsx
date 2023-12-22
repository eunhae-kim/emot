import React from 'react';
import TtimeHeader, { HeaderButton } from '../Ttime/TtimeHeader';
import { MessageBubble, MessageBubbleType } from '../Common/MessageBubble';
import { TtimeCurrentInfo } from '../Ttime/TtimeCurrentInfo';
import { LoginType } from '../../common/types';
import { TtimeThemeList } from '../Ttime/TtimeThemeList';
import { TtimeStoryList } from '../Ttime/TtimeStoryList';
import { TtimeStoryBannerInfo } from '../../container/ttime/TtimeStroyListCont';

export interface SubTtimeProps {
  userName?: string;
  loginType: LoginType;
  savedStroyNum: number;
  readStroyNum: number;
  collectedCupNum: number;
  themeList: any;
  storyList?: Array<any>;
  orderByText?: string;
  themeTitle: string;
  onLastStoryVisible?: () => void;
  onSortOptionClick?: () => void;
  onSaveClick?: (storyId: number) => Promise<void>;
  bannerInfo?: TtimeStoryBannerInfo;
}

export default function SubTtime({
  userName,
  loginType,
  savedStroyNum,
  readStroyNum,
  collectedCupNum,
  themeList,
  storyList,
  orderByText,
  themeTitle,
  onLastStoryVisible,
  onSortOptionClick,
  onSaveClick,
  bannerInfo,
}: SubTtimeProps) {
  const headerButtons: HeaderButton[] = [{ type: 'info', onClick: () => console.log('info') }];

  return (
    <>
      {/* T타임 Header */}
      <TtimeHeader isBack title="T 타임" headerButtonList={headerButtons} />

      {/* 검수용 임시 container */}
      <div className="tTime-container">
        {/* T타임 Message Bubble */}
        <MessageBubble
          message="통신생활을 돕는 꿀팁 가득, T 타임을 소개합니다."
          type={MessageBubbleType.TTIME}
          onClickMessage={() => {}}
          onClickClose={() => {}}
        />

        {/* T타임 현황 */}
        <TtimeCurrentInfo
          userName={userName}
          loginType={loginType}
          savedStroyNum={savedStroyNum}
          readStroyNum={readStroyNum}
          collectedCupNum={collectedCupNum}
        />

        {/* T타임 테마별 이야기 */}
        <TtimeThemeList themeList={themeList} />

        {/* T타임 리스트 */}
        <TtimeStoryList
          storyList={storyList}
          orderByText={orderByText}
          themeTitle={themeTitle}
          onLastStoryVisible={onLastStoryVisible}
          onSortOptionClick={onSortOptionClick}
          onSaveClick={onSaveClick}
          bannerInfo={bannerInfo}
        />
      </div>
    </>
  );
}
