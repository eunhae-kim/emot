import React, { useContext, useEffect, useState } from 'react';
import { MessageBubble, MessageBubbleType } from '../../components/Common/MessageBubble';
import { MyTtime } from '../../container/ttime/MyTtime';
import { TtimeTheme } from '../../container/ttime/TtimeTheme';
import TtimeStoryListCont from '../../container/ttime/TtimeStroyListCont';
import { TtimeLayout } from '../../components/Layout/TtimeLayout';
import useModal from '../../hooks/useModal';
import useTtimeContext from '../../hooks/useTtimeContext';
import { TtimeModalFullScreen } from '../../components/Ttime/TtimeModalFullScreen';
import { AppContext } from '../../context/AppContext';

export default function TtimeMain() {
  const { confirm, modalFullScreen } = useModal();
  const { ttimeUserInfo, fetchTtimeData } = useTtimeContext();
  const appContext = useContext(AppContext);
  const { loginInfo } = appContext;
  const [isMessageBubbleVisible, setIsMessageBubbleVisible] = useState<boolean>(false);

  useEffect(() => {
    /* 메시지 버블 show 여부 확인
     * 1) 닫기 버튼 클릭 여부 (localStorage ['ttime_messageBubble_close']) true => 노출 X
     * 2) 닫기 버튼 클릭 여부 (localStorage ['ttime_messageBubble_close']) false
     *    - 온보딩 진입 여부 true => 노출 X
     *    - 온보딩 진입 여부 false => 노출 O
     */

    const isCloseBtnClicked = localStorage.getItem('ttime_messageBubble_close');
    if (isCloseBtnClicked === 'true') return;

    // 비로그/간편로그인 이면 localStorage true 여부만 본다.
    if (loginInfo === 'N' || loginInfo === 'S') {
      setIsMessageBubbleVisible(true);
    }
    // T아이디 로그인이면 onBoarding 여부를 같이 본다.
    if (loginInfo === 'T' && ttimeUserInfo.onboardingYn === 'N') {
      setIsMessageBubbleVisible(true);
    }
  }, [ttimeUserInfo, loginInfo]);

  const messageBubbleCloseHandler = () => {
    confirm.show({
      isOpen: true,
      confirmBtnName: '닫기',
      cancelBtnName: '취소',
      message: '배너를 닫으시겠어요?<br/>닫기를 누르면 배너가 더 이상 노출되지 않습니다.',
      onClickCancel: () => {
        confirm.close();
      },
      onClickConfirm: () => {
        localStorage.setItem('ttime_messageBubble_close', 'true');
        confirm.close();
        setIsMessageBubbleVisible(false);
      },
    });
  };

  const messageBubbleClickHandler = () => {
    localStorage.setItem('ttime_messageBubble_close', 'true');
    setIsMessageBubbleVisible(false);

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
  };

  return (
    <TtimeLayout headerConfig={{ title: 'T 타임', buttons: [{ type: 'info' }] }}>
      <div className="tTime-container">
        {isMessageBubbleVisible && (
          <MessageBubble
            message="통신생활을 돕는 꿀팁 가득, T 타임을 소개합니다."
            type={MessageBubbleType.TTIME}
            onClickMessage={messageBubbleClickHandler}
            onClickClose={messageBubbleCloseHandler}
          />
        )}
        <MyTtime />
        <TtimeTheme />
        <TtimeStoryListCont />
      </div>
    </TtimeLayout>
  );
}
