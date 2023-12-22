import React from 'react';
import { MyTroom } from '../../container/ttime/MyTroom';
import { MyTroomCupList } from '../../container/ttime/MyTroomCupList';
import useTtimeContext from '../../hooks/useTtimeContext';
import { TtimeLayout } from '../../components/Layout/TtimeLayout';
import TtimeBanner from '../../container/ttime/TtimeBanner';

export default function Troom() {
  const { ttimeUserInfo } = useTtimeContext();

  return (
    <TtimeLayout headerConfig={{ title: 'T 타임 룸' }}>
      <div className="tTime-container">
        {ttimeUserInfo.userName && (
          <>
            <MyTroom ttimeUserInfo={ttimeUserInfo} />
            <TtimeBanner bannerType="troom" />
            <MyTroomCupList ttimeUserInfo={ttimeUserInfo} />
          </>
        )}
      </div>
    </TtimeLayout>
  );
}
