import React, { useEffect, useRef, useState } from 'react';
import axios, { CancelTokenSource } from 'axios';
import { list as storyListApi } from '../../api/ttime/story';
import { TtimeStoryList } from '../../components/Ttime/TtimeStoryList';
import { ttimeOnSaveClick } from '../../common/utils';
import useTtimeContext from '../../hooks/useTtimeContext';
import { TtimeStory } from '../../common/types';

export type EnjoyMoreTtimeStoryListContProps = {
  storyId: number;
  title?: string;
  storiesPerPage?: number;
  hideSaveBtn?: boolean;
};

export type StoryInfoForSort = {
  id: number;
  tags: Array<{ id: number }>;
};

export function sortStoryList(list: Array<any>, storyInfo: StoryInfoForSort) {
  const storyTags = storyInfo?.tags;

  const noOverlapBetweenTagLists = (tags1, tags2) => {
    if (!tags1 || !tags2 || !tags1.length || !tags2.length) return true;

    return tags1.every((tag1) => tags2.every((tag2) => tag1.id !== tag2.id));
  };

  list.sort((a, b) => {
    const themeIdA = noOverlapBetweenTagLists(a.tags, storyTags) ? 0 : 1;
    const themeIdB = noOverlapBetweenTagLists(b.tags, storyTags) ? 0 : 1;

    const readYnA = a.readYn === 'N' ? 1 : 0;
    const readYnB = b.readYn === 'N' ? 1 : 0;

    const createDatetimeA = a.createDatetime;
    const createDatetimeB = b.createDatetime;

    const sortKeyA = `${themeIdA}${readYnA}${createDatetimeA}`;
    const sortKeyB = `${themeIdB}${readYnB}${createDatetimeB}`;

    let diff = 0;
    if (sortKeyA > sortKeyB) diff = -1;
    else if (sortKeyA < sortKeyB) diff = 1;

    return diff;
  });
}

export default function EnjoyMoreTtimeStoryListCont(props: EnjoyMoreTtimeStoryListContProps) {
  const cancelToken = useRef<CancelTokenSource>(null);

  const { title = '더 많은 T 타임 즐기기', storiesPerPage = 3, storyId, hideSaveBtn = false } = props;
  const [rawStoryList, setRawStoryList] = useState([]);
  const [storyList, setStoryList] = useState([]);
  const { ttimeUserInfo, fetchTtimeData } = useTtimeContext();

  const loadStory = () => {
    if (cancelToken.current) {
      cancelToken.current.cancel('Operation canceled due to new request.');
    }
    cancelToken.current = axios.CancelToken.source();

    storyListApi({
      params: {},
    }).then((res) => {
      setRawStoryList(res?.data?.storyList || []);
    });
  };

  // load story list
  useEffect(() => {
    loadStory();
  }, [JSON.stringify(props)]);

  useEffect(() => {
    const finalList = JSON.parse(JSON.stringify(rawStoryList));
    const storyInfo = finalList.find((v) => v.id === storyId);

    // 현재 스토리는 결과에 포함 시키지 않음
    const idx = finalList.indexOf(storyInfo);
    if (idx !== -1) {
      finalList.splice(idx, 1);
    }
    if (!ttimeUserInfo.userName) {
      finalList.forEach((v: TtimeStory) => {
        // eslint-disable-next-line no-param-reassign
        v.readYn = 'Y';
      });
    }
    sortStoryList(finalList, storyInfo);
    setStoryList(finalList);
  }, [storyId, JSON.stringify(rawStoryList), JSON.stringify(ttimeUserInfo)]);

  return (
    <TtimeStoryList
      themeTitle={title}
      themeTitleClickHref="/v6/ttime/main"
      storyList={storyList.slice(0, storiesPerPage)}
      onSaveClick={
        !hideSaveBtn && ttimeUserInfo.userName
          ? // eslint-disable-next-line @typescript-eslint/no-shadow
            async (storyId) => {
              await ttimeOnSaveClick(storyId, rawStoryList, setRawStoryList);
              // loadStory();
              // fetchTtimeData();
            }
          : null
      }
    />
  );
}
