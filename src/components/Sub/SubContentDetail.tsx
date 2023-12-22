import React from 'react';
import { TtimeToast } from '../Ttime/TtimeToast';
import BottomSheetLogin from '../Ttime/BottomSheetLogin';
import { ContentDetailList } from '../Ttime/ContentDetailList';
import { ContentDetailNotiAgree } from '../Ttime/ContentDetailNotiAgree';
import { ContentDetailTag } from '../Ttime/ContentDetailTag';
import TtimeHeader, { HeaderButton } from '../Ttime/TtimeHeader';

export interface SubContentDetailProps {
  TNotiAgree: boolean; // T알림동의 여부
  isTtimeToast: boolean;
  isLogin: boolean;
  storyList?: Array<any>;
}

export default function SubContentDetail({ TNotiAgree, isTtimeToast, isLogin, storyList }: SubContentDetailProps) {
  const headerButtons: HeaderButton[] = [
    { type: 'save', onClick: () => console.log('save') },
    { type: 'share', onClick: () => console.log('share') },
  ];

  return (
    <>
      {/* 로그인안내 바텀시트 */}
      {isTtimeToast && <TtimeToast isShow={true} message="이야기를 다 읽으셨군요!" />}

      {/* 로그인안내 바텀시트 */}
      {!isLogin && <BottomSheetLogin />}

      {/* T타임 Header */}
      <TtimeHeader isBack={true} headerButtonList={headerButtons} />

      {/* 검수용 임시 container */}
      <div className="tTime-container tTime-container-detail">
        {/* 검수용 임시 스크롤 영역 */}
        <div className="scroll-test">스크롤 확인용입니다.</div>

        {/* 태그 영역 */}
        <ContentDetailTag tags={['태그1', '태그2', '태그3']} />

        {/* T알림 동의 안내 영역 */}
        {!TNotiAgree && <ContentDetailNotiAgree />}

        {/* T 타임 이야기 더보기 리스트 영역 */}
        <ContentDetailList storyList={storyList} />
      </div>
    </>
  );
}
