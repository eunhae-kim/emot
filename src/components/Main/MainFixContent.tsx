import React from 'react';
import { BASE_PATH } from '../../common/const';
import V6Link from '../Common/V6Link';
import XtrAw from '../Common/XtrAw';

export interface MainItemBoxProps {
  combineData: any;
  onClickConversion?: any;
}

export function MainFixContent({ combineData, onClickConversion }: MainItemBoxProps) {
  return (
    <article className="card-main-content thumb-fix-card">
      <h2 dangerouslySetInnerHTML={{ __html: '요즘 결합은 간단하게, 할인은 더 많이!' }} />
      <p className="sub-title">휴대폰 + 인터넷 + IPTV 결합으로 월정액 할인</p>
      <ul className="list-grid-thumbnail-fix">
        <li>
          <div className="thumb-flex">
            <picture className="thumbnail-rounded">
              <img loading="lazy" src={`${BASE_PATH}/images/thumbnail/thum-plan.jpg`} alt="" width="128" height="128" />
            </picture>
            <span>
              <em>요즘가족결합</em>
              <p dangerouslySetInnerHTML={{ __html: '휴대폰 결합 회선이 늘어나면 <br> 더 커지는 할인 혜택' }} />
              <b>{`${combineData.numOfFamilyMembers}회선 + 기가인터넷 기준`}</b>
              <strong>{`월 최대 ${combineData.maximumDiscountPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원 할인`}</strong>
            </span>
          </div>
        </li>
      </ul>
      <XtrAw
        appEid={'CMMA_A20-11'}
        webEid={'MWMA_A20-93'}
        xtrClick={true}
        xtrView={true}
        onClick={async () => {
          await onClickConversion('combine_001');
        }}
      >
        <V6Link
          newWindow={'BROWSER'}
          href="https://m.shop.tworld.co.kr/exhibition/view?exhibitionId=P00000274"
          title={`T다이렉트 샵 모바일 웹 (새창)`}
        >
          <div className={`link-rounded-large`}>요즘가족결합 알아보기</div>
        </V6Link>
      </XtrAw>
    </article>
  );
}
