import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper';
import { ImageRounded } from '../Picture/ImageRounded';
import XtrAw from '../Common/XtrAw';
import V6Link from '../Common/V6Link';

export function MainCardPick({ rankList }) {
  return (
    <article className="card-main-event hotnew">
      <h2 className="eng-word" dangerouslySetInnerHTML={{ __html: 'HOT & NEW' }} />
      <Swiper className="cardpick-thumbnail-area" slidesPerView="auto" freeMode={true} modules={[FreeMode, Pagination]}>
        {rankList.map((objs, i: number) => (
          <SwiperSlide key={i}>
            {objs.list.map(
              (obj, index: number) =>
                obj && (
                  <XtrAw
                    key={index}
                    appEid={`CMMA_A20-${rankList[i].xtr[index].app}`}
                    webEid={`MWMA_A20-${rankList[i].xtr[index].web}`}
                    xtrClick={true}
                    xtrView={true}
                  >
                    <div className="card-list">
                      <V6Link
                        href={obj.bnnrLinkUrl}
                        newWindow={obj.billYn === 'Y' ? 'BROWSER' : ''}
                        title={`${obj.bnnrImgAltCtt} ${obj.billYn === 'Y' ? '모바일 웹(새창)' : ''}`}
                      >
                        <ImageRounded
                          lazy={false}
                          src={obj.bnnrImgUrl}
                          alt={obj.bnnrImgAltCtt}
                          width="auto"
                          height="110"
                        />
                      </V6Link>
                    </div>
                  </XtrAw>
                ),
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </article>
  );
}
