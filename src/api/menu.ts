import { getConfig } from './common';
import { callApi } from '../common/callApi';

export async function getMenu() {
  const data = await callApi({
    method: 'get',
    headers: getConfig().headers,
    url: `/menu`,
  });
  return data;
}

export async function getMenuBanner() {
  const data = await callApi({
    method: 'get',
    headers: getConfig().headers,
    url: `/menu/banner`,
  });
  return data;
}

export async function getQuickMenu() {
  const data = await callApi({
    method: 'get',
    headers: getConfig().headers,
    url: `/menu/quick-menu`,
  });
  return data;
}

export async function getTApp() {
  const data = await callApi({
    method: 'get',
    headers: getConfig().headers,
    url: `/menu/t-app`,
  });
  return data;
}
