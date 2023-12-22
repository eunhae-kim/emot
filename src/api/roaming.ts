import axios from 'axios';
import { callApi } from '../common/callApi';
import { getConfig } from './common';
import { V6_API_BASE_URL, V6_PRIVATE_API_BASE_URL } from '../common/const';
import { isServer } from '../common/utils';

export async function getMccCode(twm: string) {
  const data = await callApi({
    baseUrl: isServer() ? V6_PRIVATE_API_BASE_URL[global.LDSP] : V6_API_BASE_URL[global.LDSP],
    method: 'get',
    headers: {
      Authorization: twm,
      SessionUpdatedAt: '1',
      'x-session-key': twm,
      'x-session-updated': '1',
    },
    url: '/roaming-mode',
  });

  return data;
}
