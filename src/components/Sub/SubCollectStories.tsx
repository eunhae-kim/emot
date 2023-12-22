import React, { useEffect, useState } from 'react';
import { CollectStories, CollectStoriesProps, TabList } from '../Ttime/CollectStories';
import TtimeHeader from '../Ttime/TtimeHeader';
import { TtimeStoryList, TtimeStoryListProps } from '../Ttime/TtimeStoryList';

export interface SubCollectStoriesProps {
  collectStoriesProps: CollectStoriesProps;
  storyListProps: Record<string, TtimeStoryListProps>;
}

export default function SubCollectStories({ collectStoriesProps, storyListProps }: SubCollectStoriesProps) {
  const [selectedTab, setSelectedTab] = useState(null);
  useEffect(() => setSelectedTab(TabList[0]), []);

  return (
    <>
      {/* T타임 Header */}
      <TtimeHeader isBack title="이야기 모아 보기" />

      {/* 검수용 임시 container */}
      <div className="tTime-container">
        {/* 테마별이야기 */}
        <CollectStories {...collectStoriesProps} selectedTab={selectedTab} onTabChanged={setSelectedTab}>
          <TtimeStoryList
            showListHeader={false}
            showStoryCountHeader
            useStoryNotFoundScreen={1}
            {...storyListProps[selectedTab?.id || 'saved']}
          />
        </CollectStories>
      </div>
    </>
  );
}
