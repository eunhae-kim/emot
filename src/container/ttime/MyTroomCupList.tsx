import { useEffect, useState } from 'react';
import { getCups } from '../../api/ttime/cups';
import { TtimeCup } from '../../common/types';
import { TroomCupList } from '../../components/Ttime/TroomCupList';

export function MyTroomCupList({ ttimeUserInfo }) {
  const [cupList, setCupList] = useState<TtimeCup[]>();

  useEffect(() => {
    (async () => {
      try {
        const response = await getCups();
        setCupList(response.data.cupList);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <>
      {cupList && (
        <TroomCupList userName={ttimeUserInfo.userName} cupList={cupList} ownedCupList={ttimeUserInfo.cups.own} />
      )}
    </>
  );
}
