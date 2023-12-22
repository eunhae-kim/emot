import React, { useEffect, useState } from 'react';
import { getHomeCicnts } from '../../api/main';
import { MainInfoSlide } from '../../components/Main/MainInfoSlide';

export function MobileGuide() {
  const [homeCicnts, setHomeCicnts] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getHomeCicnts();
      if (response.respCode === 0) {
        setHomeCicnts(response.cicntsList);
      }
    })();
  }, []);

  return homeCicnts && homeCicnts.length > 0 && <MainInfoSlide homeCicnts={homeCicnts} />;
}
