import React, { Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import TtimeHeader, { TtimeHeaderProps } from '../Ttime/TtimeHeader';
import { isApp } from '../../js/commonUtil';
import { callBridgeApi } from '../../common/utils';
import { TtimeModalFullScreen } from '../Ttime/TtimeModalFullScreen';
import useModal from '../../hooks/useModal';
import { AppContext } from '../../context/AppContext';
import { save, share as postShare, unsave } from '../../api/ttime/story';
import useTtimeContext from '../../hooks/useTtimeContext';
import BottomNav from '../../container/BottomNav';
import postOnboarding from '../../api/ttime/onboarding';
import { Layout } from './Layout';
import { TWORLD_URL } from '../../common/const';

type TtimeLayoutButton =
  | { type: 'info' }
  | { type: 'share'; props: { id?: string | number } }
  | { type: 'save'; props: { id: string | number; saveYn: 'Y' | 'N'; setSaveYn: Dispatch<SetStateAction<'Y' | 'N'>> } };
export interface TtimeLayoutProps {
  headerConfig: {
    isBackBtn?: boolean;
    title: string;
    isShowTitle?: boolean;
    buttons?: TtimeLayoutButton[];
  };
  bottomNavConfig?: {
    isShowBottomNav: boolean;
  };
  children: ReactNode;
  isShowHeader?: boolean;
}

export function TtimeLayout({ children, headerConfig, bottomNavConfig, isShowHeader = true }: TtimeLayoutProps) {
  const { isBackBtn, title, isShowTitle = true, buttons = [] } = headerConfig;
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
              // TID 로그인된 사용자이면서 이야기 id가 있을때 공유하기 기록 API 호출
              if (isTidLogin && button.props.id) {
                postShare(button.props.id).then();
              }
              const shareUrl = TWORLD_URL[global.LDSP] + window.location.pathname + window.location.search;
              callBridgeApi({ command: 'share', params: { content: shareUrl } });
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
              try {
                if (isTidLogin) {
                  postOnboarding();
                }
              } catch (e) {
                console.error(e);
              }

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
    <Layout addClass="">
      <html lang="ko" />
      <Head>
        <title>{title} &lt; Tworld</title>
      </Head>
      {isShowHeader && (
        <TtimeHeader isBack={isBackBtn} title={isShowTitle && title} headerButtonList={headerButtonList} />
      )}
      {children}
      <BottomNav show={isShowBottomNav} showBottomSheet="N" tabIndex={-1} />
    </Layout>
  );
}
