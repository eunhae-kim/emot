import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';
import { ImageRounded } from '../Picture/ImageRounded';
import XtrAw from '../Common/XtrAw';
import V6Link from '../Common/V6Link';

export interface MainItemBoxProps {
  vColoringReco: any;
  onClickConversion: any;
}

export function MainVisualSlide({ vColoringReco, onClickConversion }: MainItemBoxProps) {
  return (
    <article className="card-main-content">
      <h2
        dangerouslySetInnerHTML={{
          __html: `고객님이 좋아하는 #${vColoringReco.ctgNm} 영상으로<br />V컬러링을 꾸며볼까요?`,
        }}
      />
      <Swiper
        className="list-grid-thumbnail-visual"
        slidesPerView="auto"
        spaceBetween={6}
        freeMode={true}
        modules={[FreeMode]}
      >
        {vColoringReco.cntsList.map((vColoring, index: number) => (
          <SwiperSlide key={index}>
            <XtrAw appEid={`CMMA_A20-${index + 29}`} webEid={`MWMA_A20-${index + 111}`} xtrClick={true} xtrView={true}>
              <V6Link href={vColoring.cntsUrl} newWindow="BROWSER">
                <ImageRounded src={vColoring.thmbImgUrl} width="120" height="201" alt="" />{' '}
                {/* 2022-12-21 접근성 / 중복 설명으로 alt 제거 */}
                <span>{vColoring.cntsNm}</span>
                <em>{vColoring.artistNm === '' || vColoring.artistNm === 'null' ? 'V 컬러링' : vColoring.artistNm}</em>
              </V6Link>
            </XtrAw>
          </SwiperSlide>
        ))}
      </Swiper>

      <XtrAw appEid={'CMMA_A20-49'} webEid={'MWMA_A20-131'} xtrClick={true} xtrView={true}>
        <V6Link href={vColoringReco.ctgRnkUrl} newWindow="BROWSER">
          <div
            onClick={() => {
              onClickConversion('vcolor_001');
            }}
            className={'link-rounded-large'}
          >
            V 컬러링 더 보기
          </div>
        </V6Link>
      </XtrAw>
    </article>
  );
}
