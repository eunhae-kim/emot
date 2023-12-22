import React from 'react';
import V6Link from '../Common/V6Link';

import { ImageRounded } from '../Picture/ImageRounded';
import { TtimeTheme } from '../../common/types';
import XtrAw from '../Common/XtrAw';

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
            <XtrAw appEid="CMMA_A23_B121_C1419-8" webEid="CMMA_A23_B121_C1419-8" xtrClick xtrView>
              <V6Link href={`/v6/ttime/theme?id=${theme.id}`}>
                <ImageRounded src={theme.iconImageUrl} width="24" height="24" alt={theme.iconImageAlt} />
                <strong className="tit">{theme.title}</strong>
              </V6Link>
            </XtrAw>
          </li>
        ))}
      </ul>
    </article>
  );
}
