import { callApi } from "../../common/callApi";
import {ApiParams} from "../../common/types";

export default async function (apiParams?:ApiParams) {
  return await callApi({
    url: `/my/quick-menu`,
    ...apiParams
  });
}
