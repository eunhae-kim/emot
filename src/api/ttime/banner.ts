import { callApi } from '../../common/callApi';
import { getConfig } from '../common';

export async function getTtimeMainBanner() {
  return await callApi({
    method: 'get',
    headers: getConfig().headers,
    url: '/benefit/ttime/banner/main',
  });
}

export async function getTroomBanner() {
  return await callApi({
    method: 'get',
    headers: getConfig().headers,
    url: '/benefit/ttime/banner/troom',
  });
}
