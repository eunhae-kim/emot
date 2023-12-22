import { callApi } from '../../common/callApi';
import { ApiParams } from '../../common/types';

export default async function (apiParams?: ApiParams) {
  return callApi({
    url: `/api/netfunnel/info`,
    baseUrl: ``,
    ...apiParams,
  });
}
