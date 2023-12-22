import { getCookie } from '../js/commonUtil';

export const getConfig = () => {
  return {
    timeout: 2500,
    headers: {
      Authorization: getCookie('TWM') ? getCookie('TWM') : '',
      SessionUpdatedAt: getCookie('SessionUpdatedAt') ? getCookie('SessionUpdatedAt') : '',
      'x-session-key': getCookie('TWM') ? getCookie('TWM') : '',
      'x-session-updated': getCookie('SessionUpdatedAt') ? getCookie('SessionUpdatedAt') : '',
    },
  };
};
