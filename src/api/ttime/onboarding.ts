import { callApi } from '../../common/callApi';
import { getConfig } from '../common';

export default async function postOnboarding() {
  return await callApi({
    method: 'post',
    headers: getConfig().headers,
    url: '/benefit/ttime/onboarding',
  });
}
