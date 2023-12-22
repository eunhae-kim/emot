import { callApi } from '../../common/callApi';
import { ApiParams } from '../../common/types';
import { sleep } from '../../common/utils';

export type InternalDataParams = {
  count: number;
  prevMonthYn: string;
};

export type DataParams = {
  prevMonthYn: string;
};
/*
          "amount" : {
            "type" : "string",
            "description" : "이용요금"
          },
          "prevMonth" : {
            "type" : "string",
            "description" : "전월"
          },
          "contents" : {
            "type" : "string",
            "description" : "컨텐츠이용료"
          },
          "payment" : {
            "type" : "string",
            "description" : "소액결제"
          },
          "respCode" : {
            "type" : "number"
          },
          "currMonth" : {
            "type" : "string",
            "description" : "당월"
          }
*/
/*
prev=N
{
  "respCode": 0
}
{
  "respCode": 0,
  "amount": "74,550",
  "prevMonth": "9",
  "currMonth": "10"
}

prev=Y
{
  "respCode": 0,
  "amount": "93,693",
  "prevMonth": "9",
  "currMonth": "10"
}
*/
export const fetchBills = async function (apiParams: ApiParams & { params: InternalDataParams }) {
  return await callApi({
    url: `/my/bills`,
    ...apiParams,
  });
};
/*
export const callWithRetry = async function(apiParams: ApiParams & {params: DataParams}) {
  const MAX_RETRY_CNT = 4;

  // callApi에서 setter 호출하지 않고 나중에 취합해서 호출하기 위해서 뺴서 따로 보관
  const setter = apiParams.setter;
  delete apiParams.setter;

  let resp;
  for(let retryCnt=0; retryCnt<MAX_RETRY_CNT; retryCnt++){
    const finalReqParams = _.merge(apiParams, {timeout: 2500, params: {count: retryCnt}});
    resp = await fetchBills(finalReqParams);

    await sleep(2500);

    // 정상 응답 받으면 break;
    if(resp && resp.respCode === 0 && resp.amount){
      break;
    }

    // 1002: 타임아웃 발생 시에도 MAX_RETRY_CNT 내에서는 계속 시도
    if(resp && resp.respCode !== 0 && resp.respCode !== 1002){
      break;
    }
  }

  setter && setter(resp);

  return resp;
}
*/
