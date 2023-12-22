import React, { useEffect, useState } from 'react';
import { getTApp } from '../../api/menu';
import { NavAppBanner } from '../../components/Fullmenu/NavAppBanner';

export interface CardProps {
  name: string;
  src: string;
  alt: string;
  href: string;
}

export function appBannerList() {
  const [tApp, setTApp] = useState([]);

  useEffect(() => {
    (async () => {
      const tApp = await getTApp();
      if (tApp) {
        setTApp(tApp.bannerList);
      }
    })();
  }, []);

  return <>{tApp && <NavAppBanner tApp={tApp} />} </>;
}

export const TAppList = React.memo(appBannerList);
