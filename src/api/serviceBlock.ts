import { callApi } from '../common/callApi';
import { V6_API_BASE_URL, V6_PRIVATE_API_BASE_URL } from '../common/const';
import { ApiParams } from '../common/types';
import { isServer } from '../common/utils';

export default async function (apiParams: ApiParams) {
  return await callApi({
    baseUrl: isServer() ? V6_PRIVATE_API_BASE_URL[global.LDSP] : V6_API_BASE_URL[global.LDSP],
    url: `/service-block`,
    ...apiParams,
  });
}
