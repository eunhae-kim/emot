import { callApi } from '../../common/callApi';
import { getConfig } from '../common';

export async function getPromotionDraw() {
  return await callApi({
    method: 'get',
    headers: getConfig().headers,
    url: '/benefit/ttime/promotion/draw',
  });
}

export async function postPromotionDraw(ids: string) {
  return await callApi({
    method: 'post',
    headers: getConfig().headers,
    url: '/benefit/ttime/promotion/draw',
    data: { drawId: ids },
  });
}
