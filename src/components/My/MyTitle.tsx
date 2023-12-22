/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-unresolved */
import React from 'react';

import { Tooltip } from '../Tooltip/Tooltip';
import { 남은_데이터 as setTooltip, 실시간_이용요금 as setTooltip2 } from '../Tooltip/Tooltip.stories';
import { Lang } from '../../common/types';
import { replaceParamsInString } from '../../common/utils';

export enum TitleType {
  남은데이터 = '남은데이터',
  남은통화 = '남은통화',
  남은문자 = '남은문자',
  무선_일반 = '무선_일반',
  무선_통합청구_대표회선 = '무선_통합청구_대표회선',
  무선_통합청구_일반회선 = '무선_통합청구_일반회선',
  유선통합청구대표회선 = '유선통합청구대표회선',
  유선통합청구일반회선 = '유선통합청구일반회선',
  유선공통 = '유선공통',
  MY유선회선 = 'MY유선회선',
  PPS_남은데이터 = 'PPS_남은데이터',
  PPS_남은요금 = 'PPS_남은요금',
  // 오류 발생해서 레이블을 명확히 알수 없을 떄 사용
  ERR남은데이터통화 = 'ERR남은데이터통화',
  ERR요금정보 = 'ERR요금정보',

  EN_남은데이터 = 'EN_남은데이터',
  EN_남은통화 = 'EN_남은통화',
  EN_남은문자 = 'EN_남은문자',

  EN_무선_일반 = 'EN_무선_일반',
  EN_무선_통합청구_대표회선 = 'EN_무선_통합청구_대표회선',
  EN_무선_통합청구_일반회선 = 'EN_무선_통합청구_일반회선',

  // 오류 발생해서 레이블을 명확히 알수 없을 떄 사용
  EN_ERR남은데이터통화 = 'EN_ERR남은데이터통화',
  EN_ERR요금정보 = 'EN_ERR요금정보',
}

export interface MyTitleProps {
  icon: string | null;
  moduleTitle: string | null;
  tooltipData: boolean;
  tooltipFee: boolean;
  wholeTag: boolean;
}

const INTERNAL_TITLE_PROPS: Record<TitleType, MyTitleProps> = {
  [TitleType.남은데이터]: {
    icon: 'ic-etc-wifi',
    moduleTitle: '남은 데이터',
    tooltipData: true,
    tooltipFee: false,
    wholeTag: false,
  },
  [TitleType.남은통화]: {
    icon: 'ic-etc-hphone',
    moduleTitle: '남은 통화',
    tooltipData: false,
    tooltipFee: false,
    wholeTag: false,
  },
  [TitleType.남은문자]: {
    icon: 'ic-etc-msg',
    moduleTitle: '남은 문자',
    tooltipData: false,
    tooltipFee: false,
    wholeTag: false,
  },
  [TitleType.무선_일반]: {
    icon: 'ic-etc-fee',
    moduleTitle: '{청구월}월 청구요금',
    tooltipData: false,
    tooltipFee: false,
    wholeTag: false,
  },
  [TitleType.무선_통합청구_대표회선]: {
    icon: 'ic-etc-fee',
    moduleTitle: '{청구월}월 청구요금',
    tooltipData: false,
    tooltipFee: false,
    wholeTag: true,
  },
  [TitleType.무선_통합청구_일반회선]: {
    icon: 'ic-etc-fee',
    moduleTitle: '{청구월}월 이용요금',
    tooltipData: false,
    tooltipFee: false,
    wholeTag: false,
  },
  [TitleType.유선공통]: {
    icon: 'ic-etc-fee',
    moduleTitle: '{청구월}월 청구요금',
    tooltipData: false,
    tooltipFee: false,
    wholeTag: false,
  },
  [TitleType.유선통합청구대표회선]: {
    icon: 'ic-etc-fee',
    moduleTitle: '{청구월}월 청구요금',
    tooltipData: false,
    tooltipFee: false,
    wholeTag: true,
  },
  [TitleType.유선통합청구일반회선]: {
    icon: 'ic-etc-fee',
    moduleTitle: '{청구월}월 이용요금',
    tooltipData: false,
    tooltipFee: false,
    wholeTag: false,
  },
  [TitleType.MY유선회선]: {
    icon: 'ic-etc-fee',
    moduleTitle: '5월 청구요금',
    tooltipData: false,
    tooltipFee: false,
    wholeTag: false,
  },
  [TitleType.ERR남은데이터통화]: {
    icon: 'ic-etc-wifi',
    moduleTitle: '남은 데이터/통화',
    tooltipData: false,
    tooltipFee: false,
    wholeTag: false,
  },
  [TitleType.ERR요금정보]: {
    icon: 'ic-etc-fee',
    moduleTitle: '청구요금',
    tooltipData: false,
    tooltipFee: false,
    wholeTag: false,
  },
  [TitleType.PPS_남은데이터]: {
    icon: 'ic-etc-wifi',
    moduleTitle: '사용할 수 있는 데이터',
    tooltipData: false,
    tooltipFee: false,
    wholeTag: false,
  },
  [TitleType.PPS_남은요금]: {
    icon: 'ic-etc-fee',
    moduleTitle: '사용할 수 있는 금액',
    tooltipData: false,
    tooltipFee: false,
    wholeTag: false,
  },

  [TitleType.EN_남은데이터]: {
    icon: 'ic-etc-wifi',
    moduleTitle: 'Remaining Data',
    tooltipData: false,
    tooltipFee: false,
    wholeTag: false,
  },
  [TitleType.EN_남은통화]: {
    icon: 'ic-etc-hphone',
    moduleTitle: 'Remaining Talktime',
    tooltipData: false,
    tooltipFee: false,
    wholeTag: false,
  },
  [TitleType.EN_남은문자]: {
    icon: 'ic-etc-msg',
    moduleTitle: 'Remaining Texts',
    tooltipData: false,
    tooltipFee: false,
    wholeTag: false,
  },
  [TitleType.EN_무선_일반]: {
    icon: 'ic-etc-fee',
    moduleTitle: 'Fees Payable',
    tooltipData: false,
    tooltipFee: false,
    wholeTag: false,
  },
  [TitleType.EN_무선_통합청구_대표회선]: {
    icon: 'ic-etc-fee',
    moduleTitle: 'Fees Payable',
    tooltipData: false,
    tooltipFee: false,
    wholeTag: true,
  },
  [TitleType.EN_무선_통합청구_일반회선]: {
    icon: 'ic-etc-fee',
    moduleTitle: 'Fees Payable',
    tooltipData: false,
    tooltipFee: false,
    wholeTag: false,
  },
  [TitleType.EN_ERR남은데이터통화]: {
    icon: 'ic-etc-wifi',
    moduleTitle: 'Remaining Data/Talktime',
    tooltipData: false,
    tooltipFee: false,
    wholeTag: false,
  },
  [TitleType.EN_ERR요금정보]: {
    icon: 'ic-etc-fee',
    moduleTitle: 'Fees',
    tooltipData: false,
    tooltipFee: false,
    wholeTag: false,
  },
};

export function MyTitle({
  type,
  lang = 'KO',
  titleParams,
}: {
  type: TitleType;
  lang?: Lang;
  titleParams?: Record<string, any>;
}) {
  const { icon, moduleTitle, tooltipData, tooltipFee, wholeTag } = INTERNAL_TITLE_PROPS[type];

  // console.log(arrow === undefined);
  return (
    <div className="my-info">
      <span className="my-line-title">
        {/* 웹 접근성 aria-hidden="true" 추가 */}
        <i className={icon} aria-hidden="true" />
        {replaceParamsInString(moduleTitle, titleParams)}
      </span>
      {tooltipData ? (
        <Tooltip message={setTooltip.args.message} />
      ) : tooltipFee ? (
        <Tooltip message={setTooltip2.args.message} />
      ) : null}
      {wholeTag && lang === 'KO' ? <span className="tag">전체</span> : null}
      {wholeTag && lang === 'EN' ? <span className="tag">ALL</span> : null}
    </div>
  );
}
