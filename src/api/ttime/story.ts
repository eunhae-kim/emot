import moment from 'moment';
import { callApi } from '../../common/callApi';
import { getConfig } from '../common';
import { ApiParams } from '../../common/types';

export type GetListDataParams = {
  tagId?: number;
};
export type PostSaveUnsaveDataParams = {
  storyId: number;
};
export const list = async function (apiParams?: ApiParams & { params: GetListDataParams }) {
  return callApi({
    method: 'get',
    headers: getConfig().headers,
    url: `/benefit/ttime/stories?time=${moment().format('HHmmss')}`,
    ...apiParams,
  });
};

export const save = async function (apiParams: ApiParams & { rid: PostSaveUnsaveDataParams }) {
  return callApi({
    method: 'post',
    headers: getConfig().headers,
    url: `/benefit/ttime/stories/${apiParams.rid.storyId}/save`,
    ...apiParams,
  });
};

export const unsave = async function (apiParams: ApiParams & { rid: PostSaveUnsaveDataParams }) {
  return callApi({
    method: 'post',
    headers: getConfig().headers,
    url: `/benefit/ttime/stories/${apiParams.rid.storyId}/unsave`,
    ...apiParams,
  });
};

export const story = async function (storyId: number | string) {
  return callApi({
    method: 'get',
    headers: getConfig().headers,
    url: `/benefit/ttime/stories/${storyId}`,
  });
};

export const readComplete = async function (storyId: number | string) {
  return callApi({
    method: 'post',
    headers: getConfig().headers,
    url: `/benefit/ttime/stories/${storyId}`,
  });
};

export const share = async function (storyId: number | string) {
  return callApi({
    method: 'post',
    headers: getConfig().headers,
    url: `/benefit/ttime/stories/${storyId}/share`,
  });
};

export const view = async function (storyId: number | string) {
  return callApi({
    method: 'post',
    headers: getConfig().headers,
    url: `/benefit/ttime/stories/${storyId}/view`,
  });
};
