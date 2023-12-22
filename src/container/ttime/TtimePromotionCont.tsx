import React, { useCallback, useContext, useEffect, useState } from 'react';
import TtimePromotion from '../../components/Ttime/TtimePromotion';
import { TtimeCup } from '../../common/types';
import { getPromotionDraw, postPromotionDraw } from '../../api/ttime/promotion';
import { getCups } from '../../api/ttime/cups';
import useModal from '../../hooks/useModal';
import { AppContext } from '../../context/AppContext';

interface TtimePromotionContProps {
  headerPadding?: boolean;
}
function TtimePromotionCont({ headerPadding = true }: TtimePromotionContProps) {
  const [cupInfo, setCupInfo] = useState<TtimeCup[]>([]);
  const [drawInfo, setDrawInfo] = useState<string[]>([]);
  const { confirm } = useModal();
  const appContext = useContext(AppContext);
  const { loginInfo } = appContext;

  const settingDrawInfo = () => {
    getPromotionDraw().then((res) => {
      setDrawInfo(res.data.drawList);
    });
  };

  const settingCupInfo = () => {
    getCups().then((res) => {
      setCupInfo(res.data.cupList);
    });
  };

  useEffect(() => {
    try {
      // 컵정보 획득
      settingCupInfo();

      // TID 로그인 케이스에서만 정보 호출
      if (loginInfo === 'T') {
        // 응모 결과 획득
        settingDrawInfo();
      }
    } catch (e) {
      console.error('TtimePromotion data fetch error');
    }
  }, []);

  // 경품 응모 함수
  const drawCallback = useCallback((ids: string) => {
    postPromotionDraw(ids)
      .then((res) => {
        if (res.respCode === 0) {
          confirm.show({
            isOpen: true,
            title: '응모가 완료되었습니다.',
            message: '당첨자 발표는 2023년 12월 6일입니다.',
          });
        } else {
          confirm.show({
            isOpen: true,
            title: '응모에 실패했습니다.',
            message: `${res.respMsg}(${res.respCode})`,
          });
        }
      })
      .catch(() => {
        console.error('TtimePromotion draw error');
      })
      .finally(() => {
        settingDrawInfo();
      });
  }, []);

  return (
    <TtimePromotion cupInfo={cupInfo} drawInfo={drawInfo} drawCallback={drawCallback} headerPadding={headerPadding} />
  );
}

export default TtimePromotionCont;
