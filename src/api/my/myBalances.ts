import { callApi } from '../../common/callApi';
import { getConfig } from '../common';
import { ApiParams } from '../../common/types';

export type DataParams = {
  onlyRemainedYn: string;
};
export default async function (apiParams: ApiParams & { params: DataParams }) {
  return await callApi({
    url: `/my/balances`,
    ...apiParams,
  });
}
