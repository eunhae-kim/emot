import axios, { AxiosRequestConfig, Method } from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';
import { getConfig } from '../api/common';
import { ApiId, CallApiParams } from './types';
import { autoLogoutNoticeUrl, deleteCookie, getCookie, isApp, setCookie } from '../js/commonUtil';
import { guessLang, isServer } from './utils';
import moment from 'moment';
import { V6_API_BASE_URL } from './const';

const ERROR_API_LIST_STORAGE_KEY = 'errorApi';

const apiStr = ({ url, method }: ApiId) => `${url} ${method}`;

const isInErroredApiList = (apiId: ApiId) => {
  if (typeof localStorage === 'undefined') {
    return true;
  }
  return (localStorage.getItem(ERROR_API_LIST_STORAGE_KEY) || '').indexOf(`<${apiStr(apiId)}>`) > -1;
};
const addToErroredApiList = (apiId: ApiId) => {
  if (isInErroredApiList(apiId)) return;

  const errorApiList = localStorage.getItem(ERROR_API_LIST_STORAGE_KEY) || '';
  localStorage.setItem(ERROR_API_LIST_STORAGE_KEY, errorApiList + `<${apiStr(apiId)}>`);
};
const removeFromErroredApiList = (apiId: ApiId) => {
  if (typeof localStorage === 'undefined') {
    return;
  }
  const errorApiList = localStorage.getItem(ERROR_API_LIST_STORAGE_KEY) || '';
  localStorage.setItem(ERROR_API_LIST_STORAGE_KEY, errorApiList.replace(`<${apiStr(apiId)}>`, ''));
};

export async function _callApi(config: AxiosRequestConfig & ApiId) {
  //console.log('_callApi:', global.LDSP, config);

  let result;

  try {
    if (isInErroredApiList(config)) {
      config.headers = { ...config.headers, 'Cache-Control': 'max-age=0' };
    }

    result = await axios(config);
  } catch (error) {
    if (error?.response?.data) {
      result = error.response;
    } else {
      result = {
        data: null,
      };
    }
  }

  // 오류 응답 발생 시, 해당 API명 기억 해 뒀다가 다음번 요청 할때 캐시 삭제 헤더 넣어줘야됨
  if (result.status !== 200) {
    addToErroredApiList(config);
  } else {
    removeFromErroredApiList(config);
  }

  return result;
}

export async function callApi(callApiParam: CallApiParams) {
  callApiParam.method = callApiParam.method || 'get';

  let baseUrl = V6_API_BASE_URL[global.LDSP];
  if (typeof callApiParam.baseUrl === 'string') {
    baseUrl = callApiParam.baseUrl;
  }

  if (callApiParam.clearApiCacheFor?.length > 0) {
    callApiParam.clearApiCacheFor.forEach((apiId) => {
      addToErroredApiList(apiId);
    });
  }

  const { data } = await _callApi({
    method: callApiParam.method,
    headers: callApiParam.headers || getConfig().headers,
    url: `${baseUrl}${callApiParam.url}`,
    data: callApiParam.data,
    params: callApiParam.params,
  });

  // respCode === 1014 (로그아웃등의 이유로) 쿠키의 TWM에 문제가 있어서 재생성 필요
  if (data && data.respCode === 1014) {
    if (isServer()) return;
    if (!window.$tw) window.$tw = { issueTwmInProgress: false };

    // 페이지에서 API 요청이 동시에 여러번 발생해도 TWM은 한번만 발급받기 위한 처리
    if (window.$tw.issueTwmInProgress) return;
    window.$tw.issueTwmInProgress = true;

    // _app에서 재발급 하도록 쿠키 삭제
    // deleteCookie('TWM');

    window.location.href = autoLogoutNoticeUrl(null, guessLang());

    // 1014 응답을 랜더에서 처리하며 오류가 발생하는 것 방지 위해서 resolve 되지 않은 primose 리턴
    return new Promise(() => {});
  }

  if (callApiParam?.setter) {
    callApiParam.setter(data);
  }

  return data;
}
