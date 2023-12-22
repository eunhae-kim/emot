import moment from 'moment';
/*
        "properties" : {
          "addProdPayFreeCnt" : {
            "type" : "string",
            "description" : "유로부가서비스수"
          },
          "allotEndDt" : {
            "type" : "string",
            "description" : "할부종료일"
          },
          "agrmtDcEndDt" : {
            "type" : "string",
            "description" : "약정종료일"
          },
          "addProdPayCnt" : {
            "type" : "string",
            "description" : "무료부가서비스수"
          },
          "comProdCnt" : {
            "type" : "string",
            "description" : "결합상품수"
          },
          "roamingInfoTxt" : {
            "type" : "string",
            "description" : "로밍상품이름"
          },
          "disProdCnt" : {
            "type" : "string",
            "description" : "옵션/할인수"
          },
          "respCode" : {
            "type" : "number"
          },
          "prodNm" : {
            "type" : "string",
            "description" : "요금제이름"
          }
{
    "respCode": 0,
    "prodNm": "5GX프라임",
    "agrmtDcEndDt": "20221124",
    "allotEndDt": "20221124",
    "addProdPayFreeCnt": 11,
    "addProdPayCnt": 6,
    "comProdCnt": 0,
    "disProdCnt": 6,
    "roamingInfoTxt": ""
}
*/

import { MyJoinInfoProps } from '../../components/My/MyJoinInfo';
import { Icon } from '../../components/consts';
import { formatDate1, formatYYYYMMDDHHmm } from '../utils';

export default (resp: any) => {
  let compProps = {
    joinTitle: '모바일 가입 정보',
    itemList: [],
  } as MyJoinInfoProps;

  //20221124
  if (resp.allotEndDt) {
    //if (resp.allotEndDt >= moment().format('YYYYMMDD')) {
    if (resp.invRmn && resp.invRmn !== '0') {
      const monthsLeft = resp.invRmn;

      compProps.itemList.push({
        icon: Icon.CALENDAR,
        name: '기기할부',
        text: `${monthsLeft}개월 남음`,
        link: `/myt-join/myplancombine/infodiscount`,
        xtrAwProps: {
          appEid: 'CMMA_A24-21',
          webEid: 'MWMA_A24-53',
          xtrView: true,
          xtrClick: true,
        },
      });
    }
  }

  if (resp.agrmtDcEndDt) {
    //20221124
    const endDt = formatDate1(resp.agrmtDcEndDt, true);

    compProps.itemList.push({
      icon: Icon.DISCOUNT,
      name: '요금약정 종료일',
      text: `${endDt}`,
      link: `/myt-join/myplancombine/infodiscount`,
      xtrAwProps: {
        appEid: 'CMMA_A24-22',
        webEid: 'MWMA_A24-54',
        xtrView: true,
        xtrClick: true,
      },
    });
  }

  if (resp.prodNm) {
    compProps.itemList.push({
      icon: Icon.PLAN,
      name: '요금제',
      text: resp.prodNm,
      link: `/myt-join/submain`,
      xtrAwProps: {
        appEid: 'CMMA_A24-23',
        webEid: 'MWMA_A24-55',
        xtrView: true,
        xtrClick: true,
      },
    });
  }

  if (resp.addProdPayFreeCnt) {
    const cnt = parseInt(resp.addProdPayCnt, 10);
    if (cnt > 0) {
      compProps.itemList.push({
        icon: Icon.PAY_SERV,
        name: '유료 부가서비스',
        text: `${cnt}건`,
        link: `/myt-join/myplan`,
        xtrAwProps: {
          appEid: 'CMMA_A24-24',
          webEid: 'MWMA_A24-56',
          xtrView: true,
          xtrClick: true,
        },
      });
    }
  }

  if (resp.addProdPayFreeCnt) {
    const cnt = parseInt(resp.addProdPayFreeCnt, 10);
    if (cnt > 0) {
      compProps.itemList.push({
        icon: Icon.FREE_SERV,
        name: '무료 부가서비스',
        text: `${cnt}건`,
        link: `/myt-join/myplan`,
        xtrAwProps: {
          appEid: 'CMMA_A24-25',
          webEid: 'MWMA_A24-57',
          xtrView: true,
          xtrClick: true,
        },
      });
    }
  }

  if (resp.disProdCnt) {
    const cnt = parseInt(resp.disProdCnt, 10);
    if (cnt > 0) {
      compProps.itemList.push({
        icon: Icon.OPT_PROGM,
        name: '옵션/할인 프로그램',
        text: `${cnt}건`,
        link: `/myt-join/myplan`,
        xtrAwProps: {
          appEid: 'CMMA_A24-26',
          webEid: 'MWMA_A24-58',
          xtrView: true,
          xtrClick: true,
        },
      });
    }
  }

  if (resp.comProdCnt) {
    const cnt = parseInt(resp.comProdCnt, 10);
    if (cnt > 0) {
      compProps.itemList.push({
        icon: Icon.COMB_PRD,
        name: '결합상품',
        text: `${cnt}건`,
        link: `/myt-join/myplan`,
        xtrAwProps: {
          appEid: 'CMMA_A24-27',
          webEid: 'MWMA_A24-59',
          xtrView: true,
          xtrClick: true,
        },
      });
    }
  }

  if (resp.roamingInfoTxt) {
    compProps.itemList.push({
      icon: Icon.ROAMING,
      name: 'T 로밍',
      text: resp.roamingInfoTxt,
      link: `/product/roaming/my-use`,
      xtrAwProps: {
        appEid: 'CMMA_A24-28',
        webEid: 'MWMA_A24-60',
        xtrView: true,
        xtrClick: true,
      },
    });
  }

  return {
    compProps,
  };
};
