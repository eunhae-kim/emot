import { callApi } from '../common/callApi';
import { isServer } from '../common/utils';
import { V6_API_BASE_URL, V6_PRIVATE_API_BASE_URL } from '../common/const';

export default async function flowControl() {
  return callApi({
    baseUrl: isServer() ? V6_PRIVATE_API_BASE_URL[global.LDSP] : V6_API_BASE_URL[global.LDSP],
    url: '/flow-control',
  });
}
