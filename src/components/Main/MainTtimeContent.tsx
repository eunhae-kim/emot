import React from 'react';
import V6Link from '../Common/V6Link';
import { TtimeStory } from '../../common/types';
import { BASE_PATH } from '../../common/const';

export interface MainTtimeContentProps {
  ttimeStoryList: Array<TtimeStory>;
}

export function MainTtimeContent({ ttimeStoryList }: MainTtimeContentProps) {
  return (
    <article className="card-main-content tTime">
      <h2
        dangerouslySetInnerHTML={{
          __html: `T 타임으로 즐기는 꿀팁 한 모금`,
        }}
      />

      <ul className="content-list">
        {ttimeStoryList.map((item: TtimeStory) => (
          <li key={item.id}>
            <V6Link href={`/v6/ttime/story?id=${item.id}`}>
              <img src={item.thumbnailImgUrl} className="thumb-img" width="56" height="56" alt={item.thumbnailImgAlt} />
              <div className="tit-wrap">
                <strong className="tit">{item.title}</strong>
                <i className="bl-arr-bold right" aria-hidden="true" />
              </div>
            </V6Link>
          </li>
        ))}
      </ul>

      <V6Link href="/v6/ttime/main">
        <div className="link-rounded-large">T 타임 더 즐기기</div>
      </V6Link>
    </article>
  );
}
