import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';
import { ImageRounded } from '../Picture/ImageRounded';
import XtrAw from '../Common/XtrAw';
import V6Link from '../Common/V6Link';

export interface MainItemBoxProps {
  tTimeSlide: any;
}

export function MainTtimeSlide({ tTimeSlide }: MainItemBoxProps) {
  return (
    <article className="card-main-content t-time">
      <h2
        dangerouslySetInnerHTML={{
          __html: `가볍게 즐기는 T-time`,
        }}
      />
      <p>
        하나씩 꺼내보는 유익한 혜택과 정보!
        <br />
        10분으로 즐겨보는 T월드 타임
      </p>

      <Swiper
        className="list-grid-thumbnail-visual"
        slidesPerView="auto"
        spaceBetween={10}
        freeMode={true}
        modules={[FreeMode]}
      >
        {tTimeSlide?.contentList.map((tTimeContent, index: number) => (
          <SwiperSlide key={index}>
            <XtrAw appEid={``} webEid={``} xtrClick={true} xtrView={true}>
              <V6Link href={tTimeContent.contentUrl} newWindow="BROWSER">
                <ImageRounded src={tTimeContent.thmbImgUrl} width="140" height="100" alt="" />{' '}
                <div className="text-area">
                  <strong>{tTimeContent.contentTitle}</strong>
                  <span>{tTimeContent.contentTime}분 소요</span>
                </div>
              </V6Link>
            </XtrAw>
          </SwiperSlide>
        ))}
      </Swiper>

      <XtrAw appEid={``} webEid={``} xtrClick={true} xtrView={true}>
        <V6Link href="#none" newWindow="BROWSER">
          <div className={'link-rounded-large'}>더 많은 정보 보기</div>
        </V6Link>
      </XtrAw>
    </article>
  );
}
