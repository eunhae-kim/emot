import React, { useCallback, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y } from 'swiper';
import { ImageRounded } from '../Picture/ImageRounded';
import V6Link from '../Common/V6Link';
import XtrAw from '../Common/XtrAw';

export interface MainItemBoxProps {
  vcolorRanking: any;
  onClickConversion?: any;
}

export function MainRankingSlide({ vcolorRanking, onClickConversion }: MainItemBoxProps) {
  const [, updateState] = useState<any>();
  const forceUpdate = useCallback(() => updateState({}), []);
  const [vcolorArrForDisplay, setVcolorArrForDisplay] = useState([]);

  useEffect(() => {
    const vcolorRank = vcolorRanking.cntsList;
    const displayArr = [];
    for (let i = 0; i < 5; i++) {
      const arr = vcolorRank.slice(4 * i, 4 * i + 4);
      displayArr.push({ list: arr });
    }
    setVcolorArrForDisplay(displayArr);
    forceUpdate();
  }, []);

  {
    /* 2023-02-21 접근성: swiper 기능 추가 */
  }
  function swiperChange(elem) {
    const currentIndex = elem.activeIndex;
    const realIndex = elem.realIndex;

    // elem.$el[0].querySelector('.swiper-pagination-bullet-active').setAttribute('aria-selected', true)
    elem.slides.forEach((element, idx) => {
      element.setAttribute('role', 'tabpanel');
      if (idx === currentIndex) {
        element.setAttribute('tabIndex', 0);
        element.setAttribute('aria-hidden', false);
      } else {
        element.setAttribute('tabIndex', -1);
        element.setAttribute('aria-hidden', true);
      }
    });
    setTimeout(() => {
      elem.$el[0].querySelector('.swiper-pagination').setAttribute('role', 'tablist');
      elem.$el[0].querySelectorAll('.swiper-pagination-bullet').forEach((page, idx) => {
        page.setAttribute('aria-selected', idx === realIndex);
      });
    }, 0);
  }
  function swiperInit(elem) {
    setTimeout(() => {
      const currentIndex = elem.activeIndex;
      const realIndex = elem.realIndex;

      elem.$el[0].querySelector('.swiper-pagination-bullet-active').setAttribute('aria-selected', true);
      elem.slides.forEach((element, idx) => {
        element.setAttribute('role', 'tabpanel');
        if (idx === currentIndex) {
          element.setAttribute('tabIndex', 0);
          element.setAttribute('aria-hidden', false);
        } else {
          element.setAttribute('tabIndex', -1);
          element.setAttribute('aria-hidden', true);
        }
      });
      elem.$el[0].querySelector('.swiper-pagination').setAttribute('role', 'tablist');
      elem.$el[0].querySelectorAll('.swiper-pagination-bullet').forEach((page, idx) => {
        page.setAttribute('aria-selected', idx === realIndex);
      });
    }, 0);
  }

  const pagination = {
    clickable: true,
    renderBullet: (index) => {
      return `<button class="swiper-pagination-bullet" tabIndex="0" aria-label="Go to slide ${
        index + 1
      }" role="tab"><span class="hidden">${index + 1}</span></button>`;
    },
  };
  {
    /* // 2023-02-21 접근성: swiper 기능 추가 */
  }

  return (
    <article className="card-main-content">
      <h2 dangerouslySetInnerHTML={{ __html: '오늘 가장 많이 선택한 V 컬러링' }} />
      {/* 2023-02-21 접근성: swiper 기능 추가 */}
      <Swiper
        className="card-thumbnail-area"
        modules={[Pagination]}
        slidesPerView="auto"
        pagination={pagination}
        spaceBetween={20}
        onSwiper={(swiper) => {
          swiperInit(swiper);
        }}
        onSlideChange={(swiper) => {
          swiperChange(swiper);
        }}
      >
        {/* // 2023-02-21 접근성: swiper 기능 추가 */}
        {vcolorArrForDisplay.map((objs, i: number) => (
          <SwiperSlide key={i}>
            {objs.list.map((obj, index: number) => (
              <XtrAw
                appEid={`CMMA_A20-${50 + i * 4 + index}`}
                webEid={`MWMA_A20-${132 + i * 4 + index}`}
                xtrClick={true}
                xtrView={true}
                key={index}
                className="ranking-list"
                onClick={async () => {
                  await onClickConversion('vcolor_002');
                }}
              >
                {/* 2022-12-23 접근성 / 의미없는 태그 생성으로 key + className 위치변경 */}
                <V6Link newWindow={'BROWSER'} href={obj.cntsUrl} title={'V컬러링 모바일 웹 (새창)'}>
                  <ImageRounded src={obj.thmbImgUrl} width="90" height="60" alt="" />
                  {/* 2022-12-21 접근성 / 중복 설명으로 altr값 제거 */}
                  <span>
                    <strong>
                      <em>{i * 4 + index + 1}</em>
                      {obj.cntsNm}
                    </strong>
                    {obj.artistNm !== '' && obj.artistNm !== 'null' ? (
                      <span className="ranking-singer" dangerouslySetInnerHTML={{ __html: obj.artistNm }} />
                    ) : (
                      <span className="ranking-singer">V 컬러링</span>
                    )}
                  </span>
                </V6Link>
              </XtrAw>
            ))}
          </SwiperSlide>
        ))}
      </Swiper>
      <XtrAw
        appEid={'CMMA_A20-70'}
        webEid={'MWMA_A20-152'}
        xtrClick={true}
        xtrView={true}
        onClick={async () => {
          await onClickConversion('vcolor_002');
        }}
      >
        <V6Link newWindow={'BROWSER'} href={vcolorRanking.ctgRnkUrl} title={`V컬러링 모바일 웹 (새창)`}>
          <div className={`link-rounded-large`}>V 컬러링 더 보기</div>
        </V6Link>
      </XtrAw>
    </article>
  );
}
