import moment from 'moment';
/*
"properties" : {
          "respCode" : {
            "type" : "number"
          },
          "products" : {
            "type" : "array",
            "items" : {
              "title" : "subscriptionProduct",
              "type" : "object",
              "properties" : {
                "termRsvDt" : {
                  "type" : "string",
                  "description" : "해지예약일자"
                },
                "svcStCd" : {
                  "type" : "string",
                  "description" : "서비스상태코드,AC:사용중/TG:일반해지/SP:정지 등 "
                },
                "nxtCycDt" : {
                  "type" : "string",
                  "description" : "다음결제일"
                },
                "termRsvYn" : {
                  "type" : "string",
                  "description" : "해지예약여부"
                },
                "susvcAuthStCd" : {
                  "type" : "string",
                  "description" : "인증상태,01. 미인증, 02.인증요청, 03. 인증완료, 04.인증실패 "
                },
                "prodNm" : {
                  "type" : "string",
                  "description" : "상품표시이름"
                }
              },
              "description" : "subscriptionProduct"
            }
          }
*/

import { MyJoinInfoProps } from '../../components/My/MyJoinInfo';
import { Icon } from '../../components/consts';
import { formatDate1, formatYYYYMMDDHHmm } from '../utils';
import { MySubscribeProps } from '../../components/My/MySubscribe';
import { BASE_PATH } from '../const';

export default (resp: any) => {
  /*
  const resp = {
    "respCode" : 0,
    "products" : [
      {
        // 해지예약일자
        "termRsvDt" : "20221231",
        // 서비스상태코드,AC:사용중/TG:일반해지/SP:정지 등
        "svcStCd" : "AC",
        // 다음결제일
        "nxtCycDt" : "20221105",
        // 해지예약여부
        "termRsvYn" : "Y",
        // 인증상태,01. 미인증, 02.인증요청, 03. 인증완료, 04.인증실패
        "susvcAuthStCd" : "04",
        // 상품표시이름
        "prodNm" : "Wavve 앤 데이터 구독"
      }
    ]
  };
  */
  const compProps = {
    subscribeList: [],
  } as MySubscribeProps;

  if (resp.products && resp.products.length > 0) {
    resp.products.forEach((info) => {
      let descText = '';
      if (info.termRsvYn === 'Y' && info.termRsvDt) {
        // 혜지예약
        descText = `${formatDate1(info.termRsvDt, true)} 해지 예정`;
      } else if (info.nxtCycDt) {
        descText = `${formatDate1(info.nxtCycDt, true)} 결제 예정`;
      }
      /*
      {
        src: `${BASE_PATH}/images/logo-universe.png`,
        text: '우주패스 all',
        date: '22.05.30 결제예정',
      },
      {
        src: `${BASE_PATH}/images/logo-Wavve.png`,
        text: 'Wavve 앤 데이터 구독',
        date: '22.05.30 결제예정',
      },
      */
      compProps.subscribeList.push({
        src: info.iconImgPath,
        text: info.prodNm,
        date: descText, // '22.05.30 결제예정',
      });
    });
  }

  return {
    compProps,
  };
};
