import React from 'react';
import { useRouter } from 'next/router';
import XtrAw from '../Common/XtrAw';

export interface HeaderButton {
  type: 'info' | 'save' | 'save active' | 'share' | 'close';
  onClick?: () => void;
  isVisible?: boolean;
}
export interface TtimeHeaderProps {
  title?: string;
  isBack?: boolean;
  headerButtonList?: Array<HeaderButton>;
  [key: string]: any;
}

// TODO: 티타임 헤더를 공용 헤더로 옮기기(Layout 폴더 밑으로, 기존 Header는 MainHeader로 변경), css class명 및 위치도 변경
/**
 * 신규 버튼 등록을 위해서 할일
 * 1. HeaderButton interface에 버튼 타입 추가
 * 2. getButtonTitle 함수에 버튼 타입에 따른 텍스트 추가(접근성)
 * 3. css에 버튼 타입에 따른 스타일 추가(type에 prefix 'btn-' 붙여서 사용)
 */
export default function TtimeHeader({ title = '', isBack = true, headerButtonList = [], ...props }: TtimeHeaderProps) {
  const router = useRouter();

  const getButtonTitle = (type: string) => {
    switch (type) {
      case 'info':
        return '자세히 보기';
      case 'save':
        return '저장하기';
      case 'save active':
        return '저장 해제하기';
      case 'share':
        return '공유하기';
      case 'close':
        return '닫기';
      default:
        return '';
    }
  };

  return (
    <header className="tworld-sub-header tTime" {...props}>
      <div className="sub-header-inner">
        {/* 이전 버튼 */}
        {isBack && (
          <button type="button" className="btn-prev" title="이전 페이지" onClick={() => router.back()}>
            <span className="hidden">이전 페이지</span>
          </button>
        )}
        {/* header 타이틀 */}
        <h1 className="sub-header-tit">{title}</h1>
        {/* 버튼 */}
        <div className="menu-box">
          {headerButtonList.map(
            (button) =>
              (button.isVisible === undefined || button.isVisible) && (
                <>
                  {button.type === 'info' ? (
                    <XtrAw appEid="CMMA_A23_B121_C1419-2" webEid="CMMA_A23_B121_C1419-2" xtrClick xtrView>
                      <button key={button.type} type="button" className={`btn-${button.type}`} onClick={button.onClick}>
                        <span className="hidden">{getButtonTitle(button.type)}</span>
                      </button>
                    </XtrAw>
                  ) : (
                    <button key={button.type} type="button" className={`btn-${button.type}`} onClick={button.onClick}>
                      <span className="hidden">{getButtonTitle(button.type)}</span>
                    </button>
                  )}
                </>
              ),
          )}
        </div>
      </div>
    </header>
  );
}
