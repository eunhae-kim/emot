import React, { useEffect, useState } from 'react';
import { getMainTopBanner } from '../../api/main';
import { CardProps } from '../../common/types';
import { makeBannerList } from '../../common/utils';
import { MainBannerSlide } from '../../components/Main/MainBannerSlide';

export function MainTopBanner() {
  const [bannerList, setBannerList] = useState<Array<CardProps>>([]);

  useEffect(() => {
    (async () => {
      const response = await getMainTopBanner();
      if (response.respCode === 0) {
        setBannerList(makeBannerList(response));
      }
    })();
  }, []);

  return <MainBannerSlide bannerList={bannerList} />;
}
