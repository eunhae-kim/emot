import { useEffect, useState } from 'react';
import { getCup } from '../../api/ttime/cups';
import { TtimeCup } from '../../common/types';
import { TroomCupTypeContent } from '../../components/Ttime/TroomCupTypeContent';

export function MyTroom({ ttimeUserInfo }) {
  const [cupInfo, setCupInfo] = useState<TtimeCup>();

  useEffect(() => {
    (async () => {
      try {
        if (ttimeUserInfo.cups.own.length > 0) {
          const recentCupId = ttimeUserInfo.cups.own[ttimeUserInfo.cups.own.length - 1];
          const response = await getCup(recentCupId);
          setCupInfo(response.data.cupList[0]);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <>
      {ttimeUserInfo.cups.own.length > 0 && cupInfo && (
        <TroomCupTypeContent
          userName={ttimeUserInfo.userName}
          savedStroyNum={ttimeUserInfo.stories.save.length}
          readStroyNum={ttimeUserInfo.stories.read.length}
          cupInfo={cupInfo}
        />
      )}

      {ttimeUserInfo.cups.own.length === 0 && (
        <TroomCupTypeContent
          userName={ttimeUserInfo.userName}
          savedStroyNum={ttimeUserInfo.stories.save.length}
          readStroyNum={ttimeUserInfo.stories.read.length}
        />
      )}
    </>
  );
}
