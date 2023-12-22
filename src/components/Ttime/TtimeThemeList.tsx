import React from 'react';
import V6Link from '../Common/V6Link';

import { ImageRounded } from '../Picture/ImageRounded';
import { TtimeTheme } from '../../common/types';

interface TtimeThemeListProps {
  themeList: TtimeTheme[];
}

export function TtimeThemeList({ themeList }: TtimeThemeListProps) {
  // console.table(themeList);
  return (
    <article className="tTime-theme-list-content">
      <h2 className="tit">테마별 이야기</h2>

      <ul className="theme-list">
        {themeList?.map((theme: TtimeTheme) => (
          <li key={theme.id} className="theme-item">
            <V6Link href={`/v6/ttime/theme?id=${theme.id}`}>
              <ImageRounded src={theme.iconImageUrl} width="24" height="24" alt={theme.iconImageAlt} />
              <strong className="tit">{theme.title}</strong>
            </V6Link>
          </li>
        ))}
      </ul>
    </article>
  );
}
