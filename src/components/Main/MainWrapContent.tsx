import React from 'react';
import { BASE_PATH } from '../../common/const';
import V6Link from '../Common/V6Link';
import XtrAw from '../Common/XtrAw';
import { ImageRounded } from '../Picture/ImageRounded';

interface ADTProps {
  type: string;
  onClickConversion?: any;
}

export function MainWrapContent({ type, onClickConversion }: ADTProps) {
  return (
    <>
      <article className="card-main-content">
        <h2 dangerouslySetInnerHTML={{ __html: '당신의 일상을 안전하게 지켜드려요' }} />
        <ul className="list-grid-thumbnail-wrap">
          {type === 'home' ? (
            <>
              <li key={0}>
                <XtrAw
                  appEid={'CMMA_A20-71'}
                  webEid={'MWMA_A20-153'}
                  xtrClick={true}
                  xtrView={true}
                  onClick={async () => {
                    await onClickConversion('adt_001');
                  }}
                >
                  <V6Link href={'/product/wireplan/detail/caps-home'}>
                    <ImageRounded
                      src={`${BASE_PATH}/images/thumbnail/thum-caps.jpg`}
                      alt={'home'}
                      width="68"
                      height="68"
                    />
                    <span>
                      <strong>캡스홈</strong>
                      <p
                        dangerouslySetInnerHTML={{ __html: '우리 집 안전은 물론,<br />SK텔레콤 결합할인 혜택까지!' }}
                      />
                    </span>
                  </V6Link>
                </XtrAw>
              </li>
              <li key={1}>
                <XtrAw
                  appEid={'CMMA_A20-72'}
                  webEid={'MWMA_A20-154'}
                  xtrClick={true}
                  xtrView={true}
                  onClick={async () => {
                    await onClickConversion('adt_001');
                  }}
                >
                  <V6Link href={'/product/wireplan/detail/t-security'}>
                    <ImageRounded
                      src={`${BASE_PATH}/images/thumbnail/thum-cctv.jpg`}
                      alt={'cctv'}
                      width="68"
                      height="68"
                    />
                    <span>
                      <strong>T 안심보안</strong>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: 'CCTV와 출동 경비로 안전하게<br />매장을 지켜 주는 ADT캡스 T 안심보안 ',
                        }}
                      />
                    </span>
                  </V6Link>
                </XtrAw>
              </li>
            </>
          ) : (
            <>
              <li key={0}>
                <XtrAw
                  appEid={'CMMA_A20-73'}
                  webEid={'MWMA_A20-155'}
                  xtrClick={true}
                  xtrView={true}
                  onClick={async () => {
                    await onClickConversion('adt_002');
                  }}
                >
                  <V6Link href={'/product/wireplan/detail/t-security'}>
                    <ImageRounded
                      src={`${BASE_PATH}/images/thumbnail/thum-cctv.jpg`}
                      alt={'cctv'}
                      width="68"
                      height="68"
                    />
                    <span>
                      <strong>T 안심보안</strong>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: 'CCTV와 출동 경비로 안전하게<br />매장을 지켜 주는 ADT캡스 T 안심보안 ',
                        }}
                      />
                    </span>
                  </V6Link>
                </XtrAw>
              </li>
              <li key={1}>
                <XtrAw
                  appEid={'CMMA_A20-74'}
                  webEid={'MWMA_A20-156'}
                  xtrClick={true}
                  xtrView={true}
                  onClick={async () => {
                    await onClickConversion('adt_002');
                  }}
                >
                  <V6Link href={'/product/wireplan/detail/caps-home'}>
                    <ImageRounded
                      src={`${BASE_PATH}/images/thumbnail/thum-caps.jpg`}
                      alt={'home'}
                      width="68"
                      height="68"
                    />
                    <span>
                      <strong>캡스홈</strong>
                      <p
                        dangerouslySetInnerHTML={{ __html: '우리 집 안전은 물론, <br />SK텔레콤 결합할인 혜택까지!' }}
                      />
                    </span>
                  </V6Link>
                </XtrAw>
              </li>
            </>
          )}
        </ul>
      </article>
    </>
  );
}
