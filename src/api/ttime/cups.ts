import { callApi } from '../../common/callApi';
import { getConfig } from '../common';

export async function getCups() {
  return await callApi({
    method: 'get',
    headers: getConfig().headers,
    url: '/benefit/ttime/cups',
  });
}

export async function getCup(cupId) {
  return await callApi({
    method: 'get',
    headers: getConfig().headers,
    url: `/benefit/ttime/cups/${cupId}`,
  });
}

export async function readCup(cupId) {
  return await callApi({
    method: 'post',
    headers: getConfig().headers,
    url: `/benefit/ttime/cups/${cupId}`,
  });
}
