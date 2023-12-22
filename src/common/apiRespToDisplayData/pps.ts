import moment from 'moment'
import {comma, commaIfNumber} from "../utils";
/*
        "properties" : {
          "obEndDt" : {
            "type" : "string",
            "description" : "발신/사용기간(사용종료일자)"
          },
          "remained" : {
            "type" : "string",
            "description" : "잔여데이터(MB)"
          },
          "dataOnlyYn" : {
            "type" : "string",
            "description" : "데이터 전용요금여부"
          },
          "prodAmt" : {
            "type" : "string",
            "description" : "카드잔액(원)"
          },
          "inbEndDt" : {
            "type" : "string",
            "description" : "수신/데이터유지기간"
          },
          "respCode" : {
            "type" : "number"
          },
          "dataYn" : {
            "type" : "string",
            "description" : "데이터사용여부"
          },
          "numEndDt" : {
            "type" : "string",
            "description" : "번호유지기간"
          }

  prodAmt : "50000", //카드잔액(원)(데이터전용요금제 : 카드잔여데이터MB)
  remained : "100",//잔여데이터(MB)
  obEndDt : "20180501", //발신/사용기간(사용종료일자 YYYYMMDD)
  inbEndDt : "20180531",//수신/데이터유지기간(YYYYMMDD)
  numEndDt : "20180531",//번호유지기간(YYYYMMDD)
  dataYn : "Y",//데이터 사용 여부
  dataOnlyYn : "N" //데이터 전용 요금 여부(Y/N)

*/

export type PpsDispalyData = {
  사용가능금액: string,
  사용가능데이터: string,
  apiResp: any
}

export default (apiResp: any):PpsDispalyData => {
  let 사용가능금액 = null;
  let 사용가능데이터 = null;

  if(apiResp.dataYn === "Y"){
    사용가능데이터 = commaIfNumber(apiResp.remained);
  }
  if(apiResp.dataOnlyYn === "N"){
    사용가능금액 = commaIfNumber(apiResp.prodAmt);
  }

  return {
    사용가능금액,
    사용가능데이터,
    apiResp
  }

}
