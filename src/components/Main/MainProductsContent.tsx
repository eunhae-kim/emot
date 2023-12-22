import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import { getTDSUrl, isApp } from '../../js/commonUtil';
import XtrAw from '../Common/XtrAw';

export interface DeviceO2OProps {
  deviceO2OList: Array<any>;
  onClickConversion: any;
}

export function DeviceO2OCard({ deviceO2OList, onClickConversion }: DeviceO2OProps) {
  async function deviceDetailClicked(device) {
    await onClickConversion('device_001');
    window.location.href = getTDSUrl(device.id, device.categoryId, 'reco');
  }

  return (
    <article className="card-main-content">
      <h2 dangerouslySetInnerHTML={{ __html: '이 휴대폰에 관심이 있으신가요?' }} />
      <Swiper
        className="list-grid-thumbnail-products"
        slidesPerView="auto"
        pagination={{ clickable: true }}
        modules={[Pagination]}
      >
        {/* 2022-11-28 / pagination 옵션추가 */}
        {deviceO2OList.map((device, index: number) => (
          <SwiperSlide key={index}>
            {!device?.untactYn && (
              <p
                className="sub-title"
                dangerouslySetInnerHTML={{ __html: `최근 <em class="point">${device.name}</em> 상품을 조회하셨네요` }}
              />
            )}
            {device?.untactYn && (
              <p
                className="sub-title"
                dangerouslySetInnerHTML={{
                  __html: `최근 조회하신 <em class="point">${device.name}</em> 상품을 <em class="point">다이렉트 플랜</em>으로 구매해보세요.`,
                }}
              />
            )}
            <a className="cont" title={!isApp() && 'T다이렉트 샵 모바일 웹 (새창)'}>
              <picture className="thumbnail-rounded">
                <div style={{ background: '#eeeef4' }}>
                  <img loading="lazy" src={device.image} alt={device.name} width="128" height="128" />
                </div>
              </picture>
              <span className="scoped">
                <em>{device.name}</em>
                <ul className="color">
                  {device.color.map((color, k: number) => (
                    <li key={k}>
                      <em className="hidden">{device.colorNm[k]}</em>
                      <i style={{ backgroundColor: `#${color}` }} />
                    </li>
                  ))}
                </ul>
                <ul className="volume">
                  {device.capacity.map((objs, j: number) => (
                    <li key={j}>
                      <em>{objs}</em>
                    </li>
                  ))}
                </ul>
                {/* <p dangerouslySetInnerHTML={{ __html: obj.desc }} /> */}

                {device.finalAmt !== 'INVALID' ? (
                  <>
                    <strong>{`${device.finalAmt.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원/월`}</strong>
                    <b>{`${device.selSubscriptionNm} 기준`}</b>
                  </>
                ) : (
                  <strong
                    className="type_empty_price"
                    onClick={() => {
                      deviceDetailClicked(device);
                    }}
                  >
                    <span className="ep_text">상품가격 확인</span>
                  </strong>
                )}
              </span>
            </a>
            <XtrAw webEid={`MWMA_A20-${index + 83}`} appEid={`CMMA_A20-${index + 1}`} xtrClick={true} xtrView={true}>
              <div
                className={'link-rounded-large'}
                onClick={() => {
                  deviceDetailClicked(device);
                }}
              >
                {`자세히 보기`}
              </div>
            </XtrAw>
          </SwiperSlide>
        ))}
      </Swiper>
    </article>
  );
}

export const MainProductsContent = React.memo(DeviceO2OCard);
