import React from 'react';
import V6Link from '../Common/V6Link';
import XtrAw from '../Common/XtrAw';
import { ImageRounded } from '../Picture/ImageRounded';

export interface MpStatisticsProps {
  membershipType: '01' | '02';
  mpStatistics: Array<any>;
  title: string;
  onClickConversion?: any;
}

export function MainNoWrapContent({ membershipType, mpStatistics, title, onClickConversion }: MpStatisticsProps) {
  const type = membershipType === '01' ? 'DISCOUNT_MEMBER' : 'SAVING_MEMBER';

  return (
    <article className="card-main-content">
      <h2 dangerouslySetInnerHTML={{ __html: title }} />
      <ul className="list-grid-thumbnail-nowrap">
        {mpStatistics.map((mp, index: number) => (
          <li key={index}>
            <XtrAw
              appEid={`CMMA_A20-${24 + index}`}
              webEid={`MWMA_A20-${106 + index}`}
              xtrClick={true}
              xtrView={true}
              onClick={async () => {
                await onClickConversion('membership_001');
              }}
            >
              <V6Link href={`/membership/benefit/brand-benefit?brandId=${mp.id}&memberType=${type}`}>
                <ImageRounded src={mp.cardImgUrl} alt="" width="100%" height="105" />{' '}
                {/* 2023-02-13 접근성 / alt 내용 제거 */}
                <p className="thumbnail">
                  <strong>{mp.name}</strong>
                  <span className="thumb-txt">
                    {mp.benefitType === 'DISCOUNT' ? <i className="ic-benefit" /> : <i className="ic-point" />}
                    <span dangerouslySetInnerHTML={{ __html: mp.benefitDescription }} />
                  </span>
                </p>
              </V6Link>
            </XtrAw>
          </li>
        ))}
      </ul>
    </article>
  );
}
