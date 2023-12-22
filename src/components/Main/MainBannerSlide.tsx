// @ts-nocheck
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import V6Link from '../Common/V6Link';
import Xtr from '../Common/Xtr';
import XtrTos from '../Common/XtrTos';

export function MainBannerSlide({ bannerList }) {
  const swiperRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const minHeight = typeof window === 'object' ? document.body.clientWidth / 2.233 : '100px';

  function controlBannerIndicator() {
    if (isPlaying) {
      setIsPlaying(false);
      swiperRef.current.swiper.autoplay.stop();
    } else {
      setIsPlaying(true);
      swiperRef.current.swiper.autoplay.start();
    }
  }

  function swiperChange(elem) {
    const currentIndex = elem.activeIndex;
    const realIndex = elem.realIndex;

    elem.slides.forEach((element, idx) => {
      element.setAttribute('role', 'tabpanel');
      if (idx === currentIndex) {
        element.querySelector('a').setAttribute('tabIndex', 0);
        element.querySelector('a').setAttribute('aria-hidden', false);
      } else {
        element.querySelector('a').setAttribute('tabIndex', -1);
        element.querySelector('a').setAttribute('aria-hidden', true);
      }
    });
    setTimeout(() => {
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

  return (
    <>
      {bannerList.length > 0 ? (
        bannerList.length > 1 ? (
          <article className="card-main-banner common-content-visual">
            <Swiper
              modules={[Autoplay, Pagination]}
              loop
              pagination={pagination}
              ref={swiperRef}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              onSlideChange={(swiper) => {
                swiperChange(swiper);
              }}
            >
              {bannerList.map((obj, index: number) => {
                switch (obj.type) {
                  case 'M':
                    return (
                      <SwiperSlide key={index} style={{ minHeight }} role="tab">
                        <Xtr xtrEid={obj.oferStcCd} xtrClick={true} xtrView={true} xtrArea={'CMMA_A20_AREA1'}>
                          <V6Link
                            newWindow={obj.imgLinkTrgtClCd === '2' && 'BROWSER'}
                            href={obj.href}
                            title={`${obj.alt}${obj.imgLinkTrgtClCd === '2' ? '(새창)' : ''}`}
                            billYn={obj.billYn === 'Y'}
                          >
                            <img src={obj.src} width="100%" alt={obj.alt} />
                          </V6Link>
                        </Xtr>
                      </SwiperSlide>
                    );
                  case 'T':
                    return (
                      <SwiperSlide key={index} style={{ minHeight }} role="tab">
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
                            <img src={obj.src} width="100%" alt={obj.alt} />
                          </V6Link>
                        </XtrTos>
                      </SwiperSlide>
                    );
                }
              })}

              <div className="visual-swiper-controller">
                <div className="btn-controller">
                  <button type="button" onClick={() => controlBannerIndicator()}>
                    <i className={!isPlaying ? 'ic-play' : 'ic-btn-stop2'} aria-hidden="true" />
                    <span className="hidden">{isPlaying ? '정지' : '재생'}</span>
                  </button>
                </div>
              </div>
            </Swiper>
          </article>
        ) : (
          <article className="card-main-banner">
            {bannerList[0] &&
              (bannerList[0].type === 'M' ? (
                <Xtr xtrEid={bannerList[0].oferStcCd} xtrClick={true} xtrView={true}>
                  <V6Link
                    href={bannerList[0].href}
                    newWindow={bannerList[0].imgLinkTrgtClCd === '2' && 'BROWSER'}
                    title={`${bannerList[0].alt}${bannerList[0].imgLinkTrgtClCd === '2' ? '(새창)' : ''}`}
                    billYn={bannerList[0].billYn === 'Y'}
                  >
                    <img src={bannerList[0].src} width="100%" alt={bannerList[0].alt} />
                  </V6Link>
                </Xtr>
              ) : (
                <XtrTos
                  xtrCmpgnNum={bannerList[0].tosCmpgnNum}
                  xtrExecSchdNum={bannerList[0].tosExecSchNum}
                  xtrCellNum={bannerList[0].tosCellNum}
                  xtrMsgSerNum={bannerList[0].tosMsgSerNum}
                >
                  <V6Link
                    newWindow={bannerList[0].imgLinkTrgtClCd === '2' && 'BROWSER'}
                    href={bannerList[0].href}
                    title={`${bannerList[0].alt}${obj.imgLinkTrgtClCd === '2' ? '(새창)' : ''}`}
                  >
                    <img src={bannerList[0].src} width="100%" alt={bannerList[0].alt} />
                  </V6Link>
                </XtrTos>
              ))}
          </article>
        )
      ) : (
        <article className="card-main-banner common-content-visual">
          <span className="no-img" />
        </article>
      )}
    </>
  );
}
