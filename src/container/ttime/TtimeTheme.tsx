import { useEffect, useState } from 'react';
import { TtimeThemeList } from '../../components/Ttime/TtimeThemeList';

import getThemeList from '../../api/ttime/themes';
import { TtimeTheme } from '../../common/types';

export function TtimeTheme() {
  const [themeList, setThemeList] = useState<TtimeTheme[]>();

  useEffect(() => {
    (async () => {
      try {
        const response = await getThemeList();
        setThemeList(response.data.themeList);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return <TtimeThemeList themeList={themeList} />;
}
