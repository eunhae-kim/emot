import { callApi } from '../common/callApi';

export default async function () {
  return await callApi({
    url: '/update-session',
  });
}
