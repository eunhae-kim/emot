import { callApi } from '../../common/callApi';
import { getConfig } from '../common';

export default async function getThemeList() {
  return await callApi({
    method: 'get',
    headers: getConfig().headers,
    url: '/benefit/ttime/themes',
  });
}
