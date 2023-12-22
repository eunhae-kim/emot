import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';
import { BASE_PATH } from '../../common/const';
import { getRoamingImg } from '../../js/commonUtil';
import { LinkRounded } from '../Link/LinkRounded';
import XtrAw from '../Common/XtrAw';

export interface RoamingRankProps {
  title: string;
  roamingRanking: Array<any>;
  onClickConversion?: any;
}

export function RoamingRanking({ title, roamingRanking, onClickConversion }: RoamingRankProps) {
  return (
    <article className="card-main-content overflow">
      <h2 dangerouslySetInnerHTML={{ __html: title }} />
      <Swiper
        className="list-grid-thumbnail-items"
        slidesPerView="auto"
        spaceBetween={20}
        freeMode={true}
        modules={[FreeMode]}
      >
        {roamingRanking.map((roaming, index: number) => (
          <SwiperSlide key={index}>
            <a>
              <picture>
                {/* 2022-12-21 접근성 / 중복 설명으로 alt값 제거 */}
                <img loading="lazy" src={`${BASE_PATH}/images/state/${getRoamingImg(roaming.country)}`} alt="" />
              </picture>
              <span>{roaming.country_kr}</span>
              <em>{`평균 여행일수 ${Math.round(roaming.days)}일`}</em>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
      <XtrAw
        appEid={'CMMA_A20-28'}
        webEid={'MWMA_A20-110'}
        xtrClick={true}
        xtrView={true}
        onClick={async () => {
          await onClickConversion('roaming_001');
        }}
      >
        <LinkRounded to="/product/roaming/fee" size="large" label={'로밍 요금제 더 보기'} />
      </XtrAw>
    </article>
  );
}

export const MainItemsSlide = React.memo(RoamingRanking);
