import { callApi } from '../common/callApi';
import { getConfig } from './common';

// [MLS] Conversion API
export async function callConversion(userId, channelId, processId, itemId, type, id?, surveyId?) {
  const data = await callApi({
    method: 'get',
    headers: getConfig().headers,
    url: `/mls-conversion?channelId=${channelId}&processId=${processId}&itemId=${itemId}&type=${type}${
      id ? `&id=${id}` : ''
    }${userId ? `&userId=${userId}` : ''}${surveyId ? `&surveyId=${surveyId}` : ''}`,
  });
  return data;
}
