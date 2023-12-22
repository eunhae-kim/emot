import React, { useEffect, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CollectStories, TabList } from './CollectStories';
import { TtimeStoryList } from './TtimeStoryList';
import { Default as defaultStoryListProps, 이야기_없음 as noStoriesStoryListProps } from './TtimeStoryList.stories';

const storyListProps = {
  saved: defaultStoryListProps.args,
  read: noStoriesStoryListProps.args,
};

export default {
  title: 'T-time/CollectStories',
  component: CollectStories,
  argTypes: {},
} as ComponentMeta<typeof CollectStories>;

const Template: ComponentStory<typeof CollectStories> = function fun(args) {
  const [selectedTab, setSelectedTab] = useState(null);
  useEffect(() => setSelectedTab(TabList[0]), []);

  return (
    <CollectStories {...args} selectedTab={selectedTab} onTabChanged={setSelectedTab}>
      <TtimeStoryList
        showListHeader={false}
        showStoryCountHeader
        useStoryNotFoundScreen={1}
        {...storyListProps[selectedTab?.id || 'saved']}
      />
    </CollectStories>
  );
};

// 이야기 모아보기 탭 리스트
export const Default = Template.bind({});
Default.args = {};
