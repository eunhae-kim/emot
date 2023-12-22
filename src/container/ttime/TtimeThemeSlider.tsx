import { useEffect, useState } from 'react';
import { ThemeStoryContent } from '../../components/Ttime/ThemeStoryContent';
import { TtimeTheme } from '../../common/types';
import getThemeList from '../../api/ttime/themes';

export type TtimeThemeSliderProps = {
  onThemeSelect: (theme: TtimeTheme) => void;
};

export function TtimeThemeSlider({ onThemeSelect }: TtimeThemeSliderProps) {
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

  return <>{themeList && <ThemeStoryContent onThemeSelect={onThemeSelect} themeList={themeList} />}</>;
}
