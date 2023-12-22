import React, { Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';
import TtimeHeader, { TtimeHeaderProps } from '../Ttime/TtimeHeader';
import { isApp } from '../../js/commonUtil';
import { callBridgeApi } from '../../common/utils';
import { TtimeModalFullScreen } from '../Ttime/TtimeModalFullScreen';
import useModal from '../../hooks/useModal';
import { AppContext } from '../../context/AppContext';
import { save, share as postShare, unsave } from '../../api/ttime/story';
import useTtimeContext from '../../hooks/useTtimeContext';
import BottomNav from '../../container/BottomNav';

type TtimeLayoutButton =
  | { type: 'info' }
  | { type: 'share'; props: { id: string | number } }
  | { type: 'save'; props: { id: string | number; saveYn: 'Y' | 'N'; setSaveYn: Dispatch<SetStateAction<'Y' | 'N'>> } };
export interface TtimeLayoutProps {
  headerConfig: {
    isBackBtn?: boolean;
    title?: string;
    buttons?: TtimeLayoutButton[];
  };
  bottomNavConfig?: {
    isShowBottomNav: boolean;
  };
  children: ReactNode;
}

export function TtimeLayout({ children, headerConfig, bottomNavConfig }: TtimeLayoutProps) {
  const { isBackBtn, title, buttons = [] } = headerConfig;
  const { isShowBottomNav } = bottomNavConfig || { isShowBottomNav: true };
  const [headerButtonList, setHeaderButtonList] = useState<TtimeHeaderProps['headerButtonList']>([]);
  const { modalFullScreen } = useModal();

  const appContext = useContext(AppContext);
  const { loginInfo } = appContext;
  const { fetchTtimeData } = useTtimeContext();

  const isTidLogin = loginInfo === 'T';

  // 티타임 페이지에서 스크롤을 위해 body에 공통적으로 클래스 주입
  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    isShowBottomNav === false && document.body.classList.add('reset-overflow');
    return () => {
      // eslint-disable-next-line no-unused-expressions
      isShowBottomNav === false && document.body.classList.remove('reset-overflow');
    };
  }, []);

  // 티타임 공통 헤더 버튼 설정
  useEffect(() => {
    const buttonList: TtimeHeaderProps['headerButtonList'] = [];
    buttons.forEach((button) => {
      switch (button.type) {
        // 공유하기 버튼
        case 'share':
          buttonList.push({
            type: 'share',
            isVisible: isApp(), // 앱에서만 표출
            onClick: () => {
              // TID 로그인된 사용자만 공유하기 기록 API 호출
              if (isTidLogin) {
                postShare(button.props.id).then();
              }
              callBridgeApi({ command: 'share', params: { content: window.location.href } });
            },
          });
          break;
        // 저장하기 버튼
        case 'save':
          // TID 로그인이 아니면 저장하기 버튼 노출 안함
          if (!isTidLogin) break;
          buttonList.push({
            type: button.props.saveYn === 'Y' ? 'save active' : 'save',
            onClick: () => {
              if (button.props.saveYn === 'Y') {
                unsave({ rid: { storyId: button.props.id as number } }).then(() => {
                  button.props.setSaveYn('N');
                });
              } else {
                save({ rid: { storyId: button.props.id as number } }).then(() => {
                  button.props.setSaveYn('Y');
                });
              }
            },
          });
          break;
        // T타임 안내 버튼
        case 'info':
          buttonList.push({
            type: 'info',
            onClick: () => {
              modalFullScreen.show({
                isOpen: true,
                onClose: () => {
                  fetchTtimeData();
                  modalFullScreen.close();
                },
                title: 'T 타임 안내',
                contentType: 'reactNode',
                content: <TtimeModalFullScreen isOpen />,
              });
            },
          });
          break;
        default:
      }
    });

    setHeaderButtonList(buttonList);
  }, [headerConfig]);

  return (
    <>
      <TtimeHeader isBack={isBackBtn} title={title} headerButtonList={headerButtonList} />
      {children}
      <BottomNav show={isShowBottomNav} showBottomSheet="N" tabIndex={-1} />
    </>
  );
}
