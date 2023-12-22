/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-unresolved */
import React from 'react';

export enum TitleType {
  남은데이터 = 'Remaining Data',
  남은통화 = 'Remaining Talktime',
  남은문자 = 'Remaining Texts',
  지난달청구요금 = 'Real-time Monthly Fees',
  유선통합청구대표회선 = '유선통합청구대표회선',
  유선통합청구일반회선 = '유선통합청구일반회선',
  MY유선회선 = 'MY유선회선',
}

export interface MyTitleProps {
  icon: string | null;
  moduleTitle: string | null;
  tooltipFee: boolean;
  wholeTag: boolean;
}

const INTERNAL_TITLE_PROPS: Record<TitleType, MyTitleProps> = {
  [TitleType.남은데이터]: {
    icon: 'ic-etc-wifi',
    moduleTitle: 'Remaining Data',
    tooltipFee: false,
    wholeTag: false,
  },
  [TitleType.남은통화]: {
    icon: 'ic-etc-hphone',
    moduleTitle: 'Remaining Talktime',
    tooltipFee: false,
    wholeTag: false,
  },
  [TitleType.남은문자]: {
    icon: 'ic-etc-msg',
    moduleTitle: 'Remaining Texts',
    tooltipFee: false,
    wholeTag: false,
  },
  [TitleType.지난달청구요금]: {
    icon: 'ic-month-fee',
    moduleTitle: 'Real-time Monthly Fees',
    tooltipFee: true,
    wholeTag: false,
  },
  [TitleType.유선통합청구대표회선]: {
    icon: 'ic-etc-fee',
    moduleTitle: '지난달 청구요금',
    tooltipFee: false,
    wholeTag: true,
  },
  [TitleType.유선통합청구일반회선]: {
    icon: 'ic-etc-fee',
    moduleTitle: '지난달 청구요금',
    tooltipFee: false,
    wholeTag: false,
  },
  [TitleType.MY유선회선]: {
    icon: 'ic-etc-fee',
    moduleTitle: '5월 청구요금',
    tooltipFee: false,
    wholeTag: false,
  },
};

export function MyTitle({ type }: { type: TitleType }) {
  const { icon, moduleTitle, wholeTag } = INTERNAL_TITLE_PROPS[type];

  // console.log(arrow === undefined);
  return (
    <div className="my-info">
      <span className="my-line-title">
        {/* 웹 접근성 aria-hidden="true" 추가 */}
        <i className={`${icon}`} aria-hidden="true" />
        {moduleTitle}
      </span>
      {wholeTag ? <span className="tag">전체</span> : null}
    </div>
  );
}
