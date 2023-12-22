import React, { useEffect, useRef, useState } from 'react';
import axios, { CancelTokenSource } from 'axios';
import { list as storyListApi } from '../../api/ttime/story';
import { TtimeStoryList } from '../../components/Ttime/TtimeStoryList';
import { sortArrayBy, ttimeOnSaveClick } from '../../common/utils';
import useModal from '../../hooks/useModal';
import { SortObject } from '../../components/Ttime/BottomSheetSortFilter';
import useTtimeContext from '../../hooks/useTtimeContext';
import { TtimeStory } from '../../common/types';

const defaultStoryFilter = () => true;
const defaultStoryListConverter = (storyList) => storyList;

export type TtimeStoryListContProps = {
  useSort?: boolean;
  sortObject?: SortObject;
  storyFilter?: (story) => boolean;
  storyListConverter?: (storyList) => Array<TtimeStory>;
  hideSaveBtn?: boolean;
  themeId?: number;
  themeTitle?: string;
  isShowBanner?: boolean;
  storiesPerPage?: number;
  showListHeader?: boolean;
  showStoryCountHeader?: boolean;
  useStoryNotFoundScreen?: number;
  storyListType?: 'saved' | 'read' | undefined;
};

export default function TtimeStoryListCont(props: TtimeStoryListContProps) {
  const {
    useSort = true,
    sortObject = { title: '최신순', key: 'createDatetime', sort: 'desc' },
    storyFilter = defaultStoryFilter,
    storyListConverter = defaultStoryListConverter,
    hideSaveBtn = false,
    themeId = null,
    themeTitle = '전체 이야기',
    isShowBanner = false,
    storiesPerPage = 20,
    showListHeader = true,
    showStoryCountHeader = false,
    useStoryNotFoundScreen,
    storyListType = undefined,
  } = props;

  const cancelToken = useRef<CancelTokenSource>(null);

  const [toIdx, setToIdx] = useState(storiesPerPage);
  const [rawStoryList, setRawStoryList] = useState(null);
  const [filteredStoryList, setFilteredStoryList] = useState(null);
  const [storyList, setStoryList] = useState(null);

  const [selectedSort, setSelectedSort] = useState(sortObject);

  const { ttimeStorySort } = useModal();

  const { ttimeUserInfo, fetchTtimeData } = useTtimeContext();

  const storyListRef = useRef(null);

  const onLastStoryVisible = () => {
    setToIdx(toIdx + storiesPerPage);
  };

  const loadStory = () => {
    if (cancelToken.current) {
      cancelToken.current.cancel('Operation canceled due to new request.');
    }
    cancelToken.current = axios.CancelToken.source();

    storyListApi({
      params: {
        tagId: themeId,
      },
    }).then((res) => {
      setRawStoryList(res?.data?.storyList || []);
    });
  };

  // load story list
  useEffect(() => {
    const listElm = document.body.getElementsByClassName('story-list');
    if (listElm && listElm[0]) listElm[0].scrollTop = 0;

    setToIdx(storiesPerPage);
    loadStory();

    // story list에 대한 instersectionObserver 등록, 처리
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fetchTtimeData();
        }
      });
    });
    if (storyListRef.current) {
      observer.observe(storyListRef.current);
    }
    return () => {
      if (storyListRef.current) {
        observer.unobserve(storyListRef.current);
      }
    };
  }, [JSON.stringify(props)]);

  useEffect(() => {
    if (!rawStoryList) return;

    const curFilteredStoryList = JSON.parse(JSON.stringify(rawStoryList)).filter(storyFilter);
    setFilteredStoryList(curFilteredStoryList);
    const finalList = storyListConverter(curFilteredStoryList);

    if (!ttimeUserInfo.userName) {
      finalList.forEach((v: TtimeStory) => {
        // eslint-disable-next-line no-param-reassign
        v.readYn = 'Y';
      });
    }
    if (useSort) {
      sortArrayBy(finalList, selectedSort.key, selectedSort.sort === 'desc');
    }
    setStoryList(finalList);
  }, [
    JSON.stringify(rawStoryList),
    JSON.stringify(selectedSort),
    storyFilter,
    storyListConverter,
    JSON.stringify(ttimeUserInfo),
  ]);

  // API 응답 받기 전 페이지 안그리기 (로딩 화면으로 대체 가능)
  if (!storyList) return null;

  return (
    <div ref={storyListRef}>
      <TtimeStoryList
        themeTitle={themeTitle}
        storyList={storyList.slice(0, toIdx)}
        totalStoryCount={filteredStoryList?.length || 0}
        orderByText={selectedSort.title}
        onSortOptionClick={() =>
          ttimeStorySort.show({
            onSort: (sortObj) => {
              console.log('Sort Option Selected', sortObj);
              setSelectedSort(sortObj);
              ttimeStorySort.close();
            },
            selectedSort,
            isOpen: true,
          })
        }
        onSaveClick={
          !hideSaveBtn && ttimeUserInfo.userName
            ? async (storyId) => {
                await ttimeOnSaveClick(storyId, rawStoryList, setRawStoryList);
                // loadStory();
                fetchTtimeData();
              }
            : null
        }
        onLastStoryVisible={onLastStoryVisible}
        isShowBanner={isShowBanner}
        showListHeader={showListHeader}
        showStoryCountHeader={showStoryCountHeader}
        useStoryNotFoundScreen={useStoryNotFoundScreen}
        storyListType={storyListType}
      />
    </div>
  );
}
