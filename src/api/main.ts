import { callApi } from '../common/callApi';
import { getConfig } from './common';

export async function getMainTopBanner() {
  const data = await callApi({
    method: 'get',
    headers: getConfig().headers,
    url: '/main/banner/top',
  });
  return data;
}

export async function getSubBanner() {
  const data = await callApi({
    method: 'get',
    headers: getConfig().headers,
    url: '/main/banner/sub',
  });
  return data;
}

export async function getHotAndNew() {
  const data = await callApi({
    method: 'get',
    headers: getConfig().headers,
    url: '/main/hot-new',
  });
  return data;
}

export async function getQuickMenu() {
  const data = await callApi({
    method: 'get',
    headers: getConfig().headers,
    url: '/main/quick-menu',
  });
  return data;
}

export async function getShortcutMenu() {
  const data = await callApi({
    method: 'get',
    headers: getConfig().headers,
    url: '/main/shortcut-menu',
  });
  return data;
}

export async function getHomeCicnts() {
  const data = await callApi({
    method: 'get',
    headers: getConfig().headers,
    url: '/main/home-cicnts',
  });
  return data;
}

export async function setShortCutMenu(menuIdStr) {
  const data = await callApi({
    method: 'post',
    headers: getConfig().headers,
    url: '/main/shortcut-menu',
    data: {
      menuIdStr,
    },
  });
  return data;
}

export async function getInitShortCutMenu() {
  const data = await callApi({
    method: 'get',
    headers: getConfig().headers,
    url: '/main/shortcut-menu/init',
  });
  return data;
}

export async function getMarketingCardDefault() {
  const data = await callApi({
    method: 'get',
    headers: getConfig().headers,
    url: '/marketing-cards-default',
  });
  return data;
}

export async function getMarketingCard() {
  const data = await callApi({
    method: 'get',
    headers: getConfig().headers,
    url: '/marketing-cards',
  });
  return data;
}

export async function changeDeviceRanking(segKey, subscriptionId) {
  const data = await callApi({
    method: 'get',
    headers: getConfig().headers,
    url: '/marketing-card-device-summary',
    params: { segKey, subscriptionId },
  });
  return data;
}

export async function changeScmRanking(segKey, subscriptionId) {
  const data = await callApi({
    method: 'get',
    headers: getConfig().headers,
    url: '/marketing-card-subscription-statistics',
    params: { segKey, subscriptionId },
  });
  return data;
}

export async function getDeviceSurveyResult(surveyCode) {
  const data = await callApi({
    method: 'get',
    headers: getConfig().headers,
    url: '/device-survey',
    params: { surveyCode },
  });
  return data;
}

export async function getNotice() {
  const data = await callApi({
    method: 'get',
    headers: getConfig().headers,
    url: '/main/notice',
  });
  return data;
}

export async function getTermAgreement() {
  const data = await callApi({
    method: 'get',
    headers: getConfig().headers,
    url: '/my/agreements',
  });
  return data;
}

export async function updateTermAgreement(terms) {
  const data = await callApi({
    method: 'post',
    headers: getConfig().headers,
    url: '/my/agreements',
    data: terms,
  });
  return data;
}

export async function getMainNotice() {
  const data = await callApi({
    method: 'get',
    headers: getConfig().headers,
    url: '/main/notice/emergency',
  });
  return data;
}

// just for test
export async function tempMarketingCard() {
  const data = await callApi({
    method: 'get',
    headers: getConfig().headers,
    url: '/temp-marketing-cards-all',
  });
  return data;
}

/*
 * 약관 내용 조회(html)
 *  - stplTypCd(03): T world 개인정보 수집/이용 동의
 *  - stplTypCd(06): 광고성 정보 수신 동의
 *  - stplTypCd(15): T world 위치기반서비스 이용동의
 */
export async function getTerms(stplTypCd: '03' | '06' | '15') {
  const data = await callApi({
    method: 'get',
    headers: getConfig().headers,
    url: '/tworld-terms',
    params: {
      stplTypCd,
    },
  });
  return data;
}