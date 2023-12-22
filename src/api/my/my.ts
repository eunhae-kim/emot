import { callApi } from "../../common/callApi";
import {ApiParams} from "../../common/types";

export type MyParams = {
  lang: string //"KOR" | "ENG",
};

export default async function (apiParams:ApiParams & {params: MyParams}) {
  const apiResp = await callApi({
    url: `/my`,
    ...apiParams
  });

  if(!apiResp || apiResp.respCode){
    throw apiResp;
  }else{
    return apiResp;
  }
}
