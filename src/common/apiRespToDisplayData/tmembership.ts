/*
text: '할인형',
rank: 'SILVER',
btnType: 'barcode',
disabled: true,
btnName: '이용정지',
descText: `고객님의 카드는 ${'이용정지 상태'}로 이용하실 수  없습니다.`,
descSubText: null,

"loginType" : {
  "type" : "string",
  "description" : "로그인 형태, E: 간편로그인 T: TID 로그인"
},

  일반
  {
    "respCode": 0,
    "mbrTypCd": "01",
    "mbrGrCd": "V",
    "mbrStCd": "AC"
  }

  점검중
  {
    respCode: 1004,
    block: {
      startDate: 'YYYYMMDDHHmm', endDate: 'YYYYMMDDHHmm'
    }
  }

  respCode: NO_MEMBERSHIP_CARD:3025,카드발급정보 없음
  mbrGrCd: V: VIP, G: 골드, S: 실버, O: 자사 Lite, L: 타사 Lite
  mbrTypCd : 01: 할인형 02: 적립형
  mbrStCd : AC:사용중, ST:일시정지, UP:미납정지, TG:해지
*/

import { MembershipProps } from '../../components/My/MyMembership';
import { formatYYYYMMDDHHmm } from '../utils';

export type TMembershipDisplayType =
  | '일반'
  | '미가입'
  | '이용정지'
  | '해지신청됨'
  | '간편로그인'
  | '서비스점검'
  | '노출안함';

export const CardGrCdToGradeMap = {
  V: 'VIP',
  G: 'GOLD',
  S: 'SILVER',
  O: 'LITE',
  L: 'LITE',
};

export default (respParam: any, myInfo: any) => {
  const resp = respParam || {};
  let compProps: MembershipProps = null;

  if (myInfo?.svcInfo?.loginType === 'S') {
    compProps = { displayType: '간편로그인' };
  } else if (resp?.respCode === 1004) {
    const from = resp.block.fromDtm;
    const to = resp.block.toDtm;
    compProps = { displayType: '서비스점검', 점검fromTo: `${formatYYYYMMDDHHmm(from)} ~ ${formatYYYYMMDDHHmm(to)}` };
  } else if (resp?.respCode === 3025) {
    compProps = { displayType: '미가입' };
  } else if (resp?.respCode === 3045) {
    compProps = { displayType: '해지신청됨' };
  } else if (!resp || resp.respCode !== 0) {
    compProps = { displayType: '노출안함' };
  } else if (resp.mbrStCd === 'AC') {
    compProps = { displayType: '일반' };
  } else {
    // resp.mbrStCd === "ST" || resp.mbrStCd === "UP" || resp.mbrStCd === "TG"
    compProps = { displayType: '이용정지' };
  }
  const membershipType = resp.mbrTypCd === '01' ? '할인형' : '적립형';
  const grade = CardGrCdToGradeMap[resp.mbrGrCd] || resp.mbrGrCd;

  const { otbNum, otbAvailableYn } = resp;

  compProps = { ...compProps, membershipType, grade, barcode: otbNum, isOtb: otbAvailableYn === 'Y' };

  return {
    compProps,
  };
};
