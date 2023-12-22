import { callApi } from "../../common/callApi";
import {ApiParams} from "../../common/types";
/*
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
export default async function (apiParams:ApiParams) {
  return await callApi({
    url: `/my/contracts`,
    ...apiParams
  });
}
