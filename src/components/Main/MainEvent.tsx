import React from 'react';
import { BASE_PATH } from '../../common/const';
import XtrAw from '../Common/XtrAw';
import { LinkRounded } from '../Link/LinkRounded';

export interface planProps {
  onClickConversion?: any;
}

export function MainEvent({ onClickConversion }: planProps) {
  return (
    <article className="card-main-content">
      <h2 dangerouslySetInnerHTML={{ __html: '복잡한 인터넷 상품, 바로 찾아 드려요' }} />
      {/* <p className="sub-title">{subTitle}</p> */}
      <picture className="event-picture">
        <img
          loading="lazy"
          src={`${BASE_PATH}/images/banner/main-banner-04.png`}
          alt={'결합상품'}
          width="100%"
          height=""
        />
      </picture>
      <XtrAw
        as={'div'}
        appEid={'CMMA_A20-10'}
        webEid={'MWMA_A20-92'}
        xtrClick={true}
        xtrView={true}
        onClick={async () => {
          await onClickConversion('broadband_001');
        }}
      >
        <LinkRounded to={'/product/wireplan/submain/survey'} size="large" label={'내게 맞는 인터넷/B tv 상품 찾기'} />
        {/* [MOZOP002-26851] 인터넷, IPTV 상품 리스트 내 그룹 변경 및 IPTV 메뉴명 변경 요청 */}
      </XtrAw>
    </article>
  );
}
