/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, A11y } from 'swiper';

export interface CardProps {
  src: string;
  alt: string;
  href: string;
}
export interface MainItemBoxProps {
  cardList: Array<CardProps>;
}

export function MiddleFullBannerSlide({ cardList, ...props }: MainItemBoxProps) {
  return (
    <div className="middle-full-banner">
      {/* 2022-12-19 접근성 / swiper modules추가 */}
      <Swiper
        modules={[Autoplay, Pagination, A11y]}
        loop
        pagination={{
          type: 'fraction',
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        {cardList.map((obj: any, index: number) => (
          <SwiperSlide key={index}>
            <a href={obj.href}>
              <img src={obj.src} width="100%" height="" alt={obj.alt} />
            </a>
          </SwiperSlide>
        ))}
        <div className="bnr-swiper-controller">
          <button type="button" className="">
            <i className="ic-btn-stop2" aria-hidden='true' /> {/* 2023-01-10 접근성 / aria 추가 */}
            {/* <i className="ic-play" /> */} {/* //재생아이콘 */}
          </button>
        </div>
      </Swiper>
    </div>
  );
}
