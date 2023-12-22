import React, { useEffect, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, Navigation, A11y, FreeMode } from 'swiper';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { TtimeTheme } from '../../common/types';

interface ThemeStoryProps {
  themeList: TtimeTheme[];
  onThemeSelect: (theme: TtimeTheme) => void;
}

interface StyledSwiperSlideProps {
  backgroundColor: string;
  borderColor: string;
}

const StyledSwiperSlide = styled(SwiperSlide)<StyledSwiperSlideProps>`
  &.swiper-slide-thumb-active {
    button {
      .tit {
        font-weight: 700;
      }
    }
    background-color: ${(props) => props.backgroundColor} !important;
    border: 2px solid ${(props) => props.borderColor} !important;
  }
`;

export function ThemeStoryContent({ themeList, onThemeSelect }: ThemeStoryProps) {
  const router = useRouter();
  let initialSlideIdx = 1;
  const initialSlideIdParam = router?.query.id as string;
  if (initialSlideIdParam) {
    initialSlideIdx = themeList.findIndex((theme) => theme.id === parseInt(initialSlideIdParam, 10)) + 1;
  }

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [mainSwiper, setMainSwiper] = useState(null); // 메인 슬라이드를 위한 Swiper 객체 추가
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (mainSwiper && thumbsSwiper) {
      mainSwiper.slideTo(initialSlideIdx, 0);
    }
  }, [mainSwiper, thumbsSwiper]);

  return (
    <>
      {themeList && (
        <>
          {/* 탭 카테고리 영역 */}
          <div className="tTime-theme-story-tab-wrap">
            <Swiper
              className="tab-list"
              modules={[Thumbs, FreeMode]}
              watchSlidesProgress // Swiper Thumbs
              onSwiper={(swiper) => setThumbsSwiper(swiper)} // Swiper Thumbs
              freeMode
              slidesPerView="auto"
              slidesOffsetAfter={30}
            >
              {themeList?.map((theme: TtimeTheme, index: number) => (
                <SwiperSlide
                  key={index}
                  className="tab-item"
                  style={
                    activeIndex === index
                      ? { backgroundColor: `${theme.backgroundColor}`, borderColor: `${theme.borderColor}` }
                      : {}
                  }
                  // backgroundColor={theme.backgroundColor}
                  // borderColor={theme.borderColor}
                >
                  <button type="button">
                    <img src={theme.iconImageUrl} className="tab-img" width="20" height="20" alt={theme.iconImageAlt} />
                    <strong className="tit">{theme.title}</strong>
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* 탭 컨텐츠 영역 */}
          <div className="tTime-theme-story-tab-content-wrap">
            <Swiper
              className="tab-content"
              modules={[Navigation, A11y, Thumbs]}
              navigation
              onSwiper={(swiper) => setMainSwiper(swiper)} // 메인 슬라이드를 위한 Swiper 객체 설정
              thumbs={{ swiper: thumbsSwiper }} // Swiper Thumbs
              slidesPerView={1}
              spaceBetween={20}
              loop
              autoHeight
              // 값을 지정하지않으면 바로 첫번째 슬라이드 선택 되면서 onSlideChange가 발생해서 목록이 바로 로딩됨
              initialSlide={-1}
              onSlideChange={(swiper) => {
                const activeIndex = swiper.realIndex;
                setActiveIndex(activeIndex);
                thumbsSwiper?.slideTo(activeIndex);

                const theme = themeList[activeIndex];
                onThemeSelect(theme);
                router && router.replace(`${router.pathname}?id=${theme.id}`, undefined, { shallow: true });
              }}
            >
              {themeList.map((theme: TtimeTheme, index: number) => (
                <SwiperSlide key={index} className="content-item">
                  <h3 className="hidden">{theme.title}</h3>
                  <div className="cup-info">
                    <img
                      src={theme.themeImageUrl}
                      className="cup-img"
                      width="120"
                      height="120"
                      alt={theme.themeImageAlt}
                    />
                    <div className="text-area">
                      <span className="sub-text">{theme.subTitle}</span>
                      <strong className="tit">{theme.title}</strong>
                    </div>
                    <div className="bg-box" style={{ backgroundColor: `${theme.backgroundColor}` }}>
                      <span className="hidden">컵정보 배경</span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      )}
    </>
  );
}
