import { useContext, useEffect, useState } from 'react';
import { TtimeCurrentInfo } from '../../components/Ttime/TtimeCurrentInfo';
import { AppContext } from '../../context/AppContext';
import useTtimeContext from '../../hooks/useTtimeContext';

export function MyTtime() {
  const appContext = useContext(AppContext);
  const loginInfo = appContext.loginInfo;
  const { ttimeUserInfo } = useTtimeContext();

  return (
    <TtimeCurrentInfo
      userName={ttimeUserInfo.userName}
      loginType={loginInfo}
      savedStroyNum={ttimeUserInfo.stories.save.length}
      readStroyNum={ttimeUserInfo.stories.read.length}
      collectedCupNum={ttimeUserInfo.cups.own.length}
    />
  );
}
