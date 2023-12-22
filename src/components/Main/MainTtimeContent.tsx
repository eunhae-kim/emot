import React from 'react';
import V6Link from '../Common/V6Link';
import { TtimeStory } from '../../common/types';
import XtrAw from '../Common/XtrAw';

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
        {ttimeStoryList.map((item: TtimeStory, index) => (
          <li key={item.id}>
            <XtrAw appEid={`CMMA_A20-${453 + index}`} webEid={`CMMA_A20-${453 + index}`} xtrClick xtrView>
              <V6Link href={`/v6/ttime/story?id=${item.id}`}>
                <img
                  src={item.thumbnailImgUrl}
                  className="thumb-img"
                  width="56"
                  height="56"
                  alt={item.thumbnailImgAlt}
                />
                <div className="tit-wrap">
                  <strong className="tit">{item.title}</strong>
                  <i className="bl-arr-bold right" aria-hidden="true" />
                </div>
              </V6Link>
            </XtrAw>
          </li>
        ))}
      </ul>

      <XtrAw appEid="CMMA_A20-456" webEid="CMMA_A20-456" xtrClick xtrView>
        <V6Link href={`/v6/ttime/main`}>
          <div className="link-rounded-large">T 타임 더 즐기기</div>
        </V6Link>
      </XtrAw>
    </article>
  );
}
