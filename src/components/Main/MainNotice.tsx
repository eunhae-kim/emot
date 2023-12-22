import React from 'react';
import V6Link from '../Common/V6Link';
import { Swiper, SwiperSlide } from 'swiper/react';

export function MainNotice({ noticeList }) {
  return (
    <article className="card-main-notice">
      <Swiper className="mySwiper">
        {noticeList &&
          noticeList.map((n, i: number) => (
            <SwiperSlide key={i}>
              <V6Link href={n.ntcLinkUrl}>
                <em>공지 사항</em>
                <span>{n.ntcTitNm}</span>
              </V6Link>
            </SwiperSlide>
          ))}
      </Swiper>
    </article>
  );
}
