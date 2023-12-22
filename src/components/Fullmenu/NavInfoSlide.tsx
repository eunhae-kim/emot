//@ts-nocheck
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, A11y } from 'swiper';

import V6Link from '../Common/V6Link';
import Xtr from '../Common/Xtr';
import { CardProps } from '../../common/types';
import XtrTos from '../Common/XtrTos';

interface BannerProps {
  bannerList: Array<CardProps>;
}

export function eventBanner({ bannerList }: BannerProps) {
  const swiperRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  function controlBannerIndicator() {
    if (isPlaying) {
      setIsPlaying(false);
      swiperRef.current.swiper.autoplay.stop();
    } else {
      setIsPlaying(true);
      swiperRef.current.swiper.autoplay.start();
    }
  }

  return (
    <div className="middle-full-banner">
      <h2 className="hidden">이벤트 배너</h2>
      <Swiper
        modules={[Autoplay, Pagination, A11y]}
        loop={bannerList?.length > 1}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          el: '.bnr-swiper-controller .swiper-pagination',
          type: 'fraction',
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className}">${index + 1}</span>`;
          },
        }}
        ref={swiperRef}
      >
        {bannerList.map((obj, index: number) => {
          switch (obj.type) {
            case 'M':
              return (
                <SwiperSlide key={index}>
                  <Xtr xtrEid={obj.oferStcCd} xtrClick={true} xtrView={true} xtrArea={'CMMA_A20_AREA2'}>
                    <V6Link
                      newWindow={obj.imgLinkTrgtClCd === '2' && 'BROWSER'}
                      href={obj.href}
                      title={`${obj.alt} ${obj.imgLinkTrgtClCd === '2' ? '모바일 웹(새창)' : ''}`}
                      billYn={obj.billYn === 'Y'}
                    >
                      <picture>
                        <img loading="lazy" src={obj.src} alt={obj.alt} width="100%" />
                      </picture>
                    </V6Link>
                  </Xtr>
                </SwiperSlide>
              );
            case 'T':
              return (
                <SwiperSlide key={index}>
                  <XtrTos
                    xtrCmpgnNum={obj.tosCmpgnNum}
                    xtrExecSchdNum={obj.tosExecSchNum}
                    xtrCellNum={obj.tosCellNum}
                    xtrMsgSerNum={obj.tosMsgSerNum}
                  >
                    <V6Link
                      newWindow={obj.imgLinkTrgtClCd === '2' && 'BROWSER'}
                      href={obj.href}
                      title={`${obj.alt}${obj.imgLinkTrgtClCd === '2' ? '(새창)' : ''}`}
                    >
                      <picture>
                        <img loading="lazy" src={obj.src} alt={obj.alt} width="100%" />
                      </picture>
                    </V6Link>
                  </XtrTos>
                </SwiperSlide>
              );
          }
        })}

        {bannerList?.length > 1 && (
          <div className="bnr-swiper-controller">
            <div className="swiper-pagination" role="tablist" />
            <button type="button" onClick={() => controlBannerIndicator()}>
              <i className={!isPlaying ? 'ic-play' : 'ic-btn-stop2'} aria-hidden="true" />
              <span className="hidden">{isPlaying ? '재생' : '정지'}</span>
            </button>
          </div>
        )}
      </Swiper>
    </div>
  );
}

export const NavInfoSlide = React.memo(eventBanner);
