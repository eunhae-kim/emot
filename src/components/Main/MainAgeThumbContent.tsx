/* eslint-disable jsx-a11y/aria-proptypes */
/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { getTDSUrl, isApp } from '../../js/commonUtil';
import V6Link from '../Common/V6Link';
import XtrAw from '../Common/XtrAw';
import { LinkRounded } from '../Link/LinkRounded';
import useModal from '../../hooks/useModal';

export interface DeviceRankingProps {
  seg: string;
  deviceRanking: Array<any>;
  onClickConversion?: any;
  rankingSeg: any;
  setRankingSeg: any;
}

export function MainAgeThumbContent({
  seg,
  deviceRanking,
  onClickConversion,
  rankingSeg,
  setRankingSeg,
}: DeviceRankingProps) {
  const { bottomSheetAge } = useModal();

  return (
    <>
      {deviceRanking.length > 0 && (
        <article className="card-main-content">
          {/* 2022-12-13 접근성 / title, aria 추가 */}
          {/* 2023-03-24 접근성 태그 수정 h2 > div */}
          <div className="title">
            <XtrAw
              as={'button'}
              appEid={'CMMA_A20-4'}
              webEid={'MWMA_A20-86'}
              xtrClick={true}
              xtrView={true}
              type="button"
              onClick={() => {
                bottomSheetAge.show({
                  isOpen: true,
                  bottomSheetType: 'device',
                  rankingSeg,
                  setRankingSeg,
                });
              }}
              className="btn-addr-bl"
              title="연령 선택"
              aria-haspopup="menuAge"
              aria-controls="bottomPopularAge"
              aria-expanded="false"
              id="popular-btn"
            >
              <span>{seg}</span>
              <i className="bl-arr-bold" aria-hidden="true" /> {/* 2023-01-10 접근성 /  aria 추가 */}
            </XtrAw>
            &nbsp;에게 인기 많은 휴대폰 Best 3
          </div>
          {/* 2023-03-24 접근성 태그 수정 h2 > div */}
          {/* 2023-03-24 추가 */}
          <h2 className="hidden">{seg} 에게 인기 많은 휴대폰 Best 3</h2>
          {/* // 2023-03-24 추가 */}
          {deviceRanking[0]?.untactYn && (
            <p
              className="sub-title"
              dangerouslySetInnerHTML={{
                __html: `<em class="point">다이렉트 플랜</em>으로 구매하면 혜택은 UP, 가격은 DOWN`,
              }} /* 2022-11-25  subtitle 추가 */
            />
          )}
          <ul className="list-grid-thumbnail-list">
            {deviceRanking.map((device, index: number) => (
              <li key={index} className="thumb-list">
                <XtrAw
                  appEid={`CMMA_A20-${index + 5}`}
                  webEid={`MWMA_A20-${index + 87}`}
                  xtrClick={true}
                  xtrView={true}
                  onClick={async () => {
                    await onClickConversion('device_002');
                  }}
                >
                  <V6Link
                    href={getTDSUrl(device.productGrpId, device.categoryId, 'topsell')}
                    className="cont"
                    title={!isApp() && 'T다이렉트 샵 모바일 웹 (새창)'}
                    newWindow={!isApp() && 'BROWSER'}
                  >
                    <span className="num">{index + 1}</span>
                    <picture className="thumbnail-rounded">
                      <div style={{ background: '#eeeef4' }}>
                        <img loading="lazy" src={device.image} alt={device.name} width="128" height="128" />
                      </div>
                    </picture>
                    <span className="scoped">
                      <em>{device.name}</em>
                      <ul className="color">
                        {device.color.map((color, index: number) => (
                          <li key={index}>
                            <em className="hidden">{device.colorNm[index]}</em>
                            <i style={{ backgroundColor: `#${color}` }} />
                          </li>
                        ))}
                      </ul>
                      <ul className="volume">
                        {device.capacity.map((capacity, index: number) => (
                          <li key={index}>
                            <em>{capacity}</em>
                          </li>
                        ))}
                      </ul>
                      {device.finalAmt !== 'INVALID' ? (
                        <>
                          <strong>{`${(device.finalAmt || '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원/월`}</strong>
                          <b>{`${device.selSubscriptionNm} 기준`}</b>
                        </>
                      ) : (
                        <strong className="type_empty_price">
                          <span className="ep_text">상품가격 확인</span>
                        </strong>
                      )}
                    </span>
                  </V6Link>
                </XtrAw>
              </li>
            ))}
          </ul>
          <XtrAw appEid="CMMA_A20-8" webEid="MWMA_A20-90" xtrClick={true} xtrView={true}>
            <LinkRounded to="/v6/survey/step1" size="large" label={'내게 맞는 스마트폰 찾기'} />
          </XtrAw>
        </article>
      )}
    </>
  );
}
