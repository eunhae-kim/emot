import axios from 'axios';
import { callApi } from '../common/callApi';
import { isApp } from '../js/commonUtil';
import { getConfig } from './common';
import { V6_API_BASE_URL, V6_PRIVATE_API_BASE_URL } from '../common/const';
import { isServer } from '../common/utils';

// export async function issueTWM() {
//   const channel = isApp() ? "mobile-app" : "mobile-web";
//   const { data } = await axios.get(`${process.env.NEXT_PUBLIC_PRIVATE_SERVER_URL}/issue-twm`, { params: {channel}, ...getConfig()});
//   return data;
// }

export async function issueTWM() {
  const data = await callApi({
    baseUrl: isServer() ? V6_PRIVATE_API_BASE_URL[global.LDSP] : V6_API_BASE_URL[global.LDSP],
    method: 'get',
    headers: getConfig().headers,
    url: '/issue-twm',
  });

  return data;
}
