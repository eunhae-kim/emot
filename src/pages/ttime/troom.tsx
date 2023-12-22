import React from 'react';
import { BASE_PATH } from '../../common/const';
import { MyTroom } from '../../container/ttime/MyTroom';
import { MyTroomCupList } from '../../container/ttime/MyTroomCupList';
import useTtimeContext from '../../hooks/useTtimeContext';
import { TtimeLayout } from '../../components/Layout/TtimeLayout';

export default function Troom() {
  const { ttimeUserInfo } = useTtimeContext();

  return (
    <TtimeLayout headerConfig={{ title: 'T 타임 룸' }}>
      <div className="tTime-container">
        {ttimeUserInfo.userName && (
          <>
            <MyTroom ttimeUserInfo={ttimeUserInfo} />
            {/* <div className="banner-area btm-border">
              <a href="#none">
                <img src={`${BASE_PATH}/images/banner/tTime-banner.jpg`} alt="T타임 배너" width="100%" />
              </a>
            </div> */}
            <MyTroomCupList ttimeUserInfo={ttimeUserInfo} />
          </>
        )}
      </div>
    </TtimeLayout>
  );
}
