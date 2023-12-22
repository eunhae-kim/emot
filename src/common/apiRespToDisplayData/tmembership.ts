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

import {
  간편_로그인,
  기본,
  멤버십_미가입,
  멤버십_이용정지,
  서비스_점검,
} from '../../components/My/MyMembership.stories';
import { MembershipProps } from '../../components/My/MyMembership';
import { formatYYYYMMDDHHmm } from '../utils';

export type TMembershipDisplayType = '일반' | '미가입' | '이용정지' | '간편로그인' | '서비스점검' | '노출안함';

export const CardGrCdToRankMap = {
  V: 'VIP',
  G: 'GOLD',
  S: 'SILVER',
  O: 'LITE',
  L: 'LITE',
};

export default (resp: any, myInfo: any) => {
  let displayType: TMembershipDisplayType;
  let compProps: MembershipProps;

  if (myInfo?.svcInfo?.loginType === 'S') {
    displayType = '간편로그인';
    compProps = 간편_로그인.args;
  } else if (resp.respCode === 1004) {
    displayType = '서비스점검';
    compProps = 서비스_점검.args;
    const from = resp.block.fromDtm;
    const to = resp.block.toDtm;
    compProps = { ...compProps, descSubText: `${formatYYYYMMDDHHmm(from)} ~ ${formatYYYYMMDDHHmm(to)}` };
  } else if (resp.respCode === 3025) {
    displayType = '미가입';
    compProps = 멤버십_미가입.args;
  } else {
    if (!resp || resp.respCode !== 0) {
      displayType = '노출안함';
      compProps = null;
    } else {
      if (resp.mbrStCd === 'AC') {
        displayType = '일반';
        compProps = 기본.args;
      } else {
        // resp.mbrStCd === "ST" || resp.mbrStCd === "UP" || resp.mbrStCd === "TG"
        displayType = '이용정지';
        compProps = 멤버십_이용정지.args;
      }

      const text = resp.mbrTypCd === '01' ? '할인형' : '적립형';
      const rank = CardGrCdToRankMap[resp.mbrGrCd] || resp.mbrGrCd;
      compProps = { ...compProps, text, rank };
    }
  }

  return {
    displayType,
    compProps,
  };
};
