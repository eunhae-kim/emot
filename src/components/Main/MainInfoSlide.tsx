import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, A11y } from 'swiper';
import V6Link from '../Common/V6Link';
import { LinkRounded } from '../Link/LinkRounded';

export function MainInfoSlide({ homeCicnts }) {
  return (
    <>
      {homeCicnts && (
        <article className="card-main-content overflow">
          <h2 dangerouslySetInnerHTML={{ __html: '이럴 땐 이렇게 해 보세요' }} />
          {/* 2022-12-19 접근성 / swiper modules추가 */}
          <Swiper
            className="list-grid-thumbnail-info"
            modules={[FreeMode, A11y]}
            slidesPerView="auto" // 한 슬라이드에 보여줄 갯수
            spaceBetween={8}
            freeMode={true}
          >
            {homeCicnts.map((card, index: number) => (
              <SwiperSlide key={index}>
                <V6Link href={card.icntsLinkUrl}>
                  <picture>
                    {/* 2022-12-21 접근성 / 중복 설명으로 alt값 제거 */}
                    <img loading="lazy" src={card.mainExpsImgPathNm} alt="" width="104" height="104" />
                  </picture>
                  <span>
                    <em dangerouslySetInnerHTML={{ __html: card.mainExpsTitNm }} />
                  </span>
                </V6Link>
              </SwiperSlide>
            ))}
          </Swiper>
          <LinkRounded to="/customer/store/search" size="large" label={'매장 찾기'} />
        </article>
      )}
    </>
  );
}
