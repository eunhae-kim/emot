import moment from 'moment';
import { callApi } from '../../common/callApi';
import { getConfig } from '../common';

export default async function getTtimeUserInfo() {
  return await callApi({
    method: 'get',
    headers: getConfig().headers,
    url: `/benefit/ttime/user?time=${moment().format('HHmmss')}`,
  });
}
