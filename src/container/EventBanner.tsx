import React, { useEffect, useState } from 'react';
import { CardProps } from '../common/types';
import { getMenuBanner } from '../api/menu';
import { getSubBanner } from '../api/main';
import { makeBannerList } from '../common/utils';
import { NavInfoSlide } from '../components/Fullmenu/NavInfoSlide';

interface BannerProps {
  type?: 'menu' | 'main';
}

function eventBanner({ type }: BannerProps) {
  const [bannerList, setBannerList] = useState<Array<CardProps>>(null);

  useEffect(() => {
    (async () => {
      let response = null;
      if (type === 'menu') {
        response = await getMenuBanner();
      } else {
        response = await getSubBanner();
      }

      if (response.respCode === 0) {
        setBannerList(makeBannerList(response));
      }
    })();
  }, []);

  return bannerList && bannerList.length > 0 && <NavInfoSlide bannerList={bannerList} />;
}

export const EventBanner = React.memo(eventBanner);
