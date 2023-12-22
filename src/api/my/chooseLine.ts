import {callApi} from "../../common/callApi";
import {ApiParams} from "../../common/types";

export type ChooseLineParams = {
  svcMgmtNum: string,
  svcPwd?: string
};

export default async function (apiParams: ApiParams & {data: ChooseLineParams}) {
  return await callApi({
    method: 'post',
    url: `/my/choose-line`,
    ...apiParams
  });
}
