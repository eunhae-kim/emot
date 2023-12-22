import React, { useEffect, useState } from 'react';
import { TtimeThemeSlider } from '../../container/ttime/TtimeThemeSlider';
import { TtimeLayout } from '../../components/Layout/TtimeLayout';
import TtimeStoryListCont from '../../container/ttime/TtimeStroyListCont';
import { TtimeTheme } from '../../common/types';

export default function TtimeThemePage() {
  const [selectedTheme, setSelectedTheme] = useState<TtimeTheme>(null);

  useEffect(() => {
    // css property 사용하여 ios 모바일에서 스크롤 생기는 문제 해결
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    // 화면 리사이징 때마다 계산
    window.addEventListener('resize', () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
  });

  return (
    <TtimeLayout headerConfig={{ title: '테마별 이야기' }}>
      <article className="tTime-theme-story-content">
        <TtimeThemeSlider
          // eslint-disable-next-line @typescript-eslint/no-shadow
          onThemeSelect={(theme) => {
            setSelectedTheme(theme);
          }}
        />
        {selectedTheme?.id && <TtimeStoryListCont themeId={selectedTheme?.id} showListHeader={false} />}
      </article>
    </TtimeLayout>
  );
}
