import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SubCollectStories from './SubCollectStories';
import { Default as defaultCollectStoriesProps } from '../Ttime/CollectStories.stories';
import {
  Default as defaultStoryListProps,
  이야기_없음 as noStoriesStoryListProps,
} from '../Ttime/TtimeStoryList.stories';

export default {
  title: 'T-time/(검수용)이야기모아보기 페이지',
  component: SubCollectStories,
  argTypes: {},
} as ComponentMeta<typeof SubCollectStories>;

const Template: ComponentStory<typeof SubCollectStories> = function fun(args) {
  return <SubCollectStories {...args} />;
};

// 이야기 모아보기 탭 리스트
export const 이야기_있음 = Template.bind({});
이야기_있음.args = {
  collectStoriesProps: defaultCollectStoriesProps.args,
  storyListProps: {
    saved: defaultStoryListProps.args,
    read: noStoriesStoryListProps.args,
  },
};

export const 이야기_없음 = Template.bind({});
이야기_없음.args = {
  collectStoriesProps: defaultCollectStoriesProps.args,
  storyListProps: {
    saved: noStoriesStoryListProps.args,
    read: defaultStoryListProps.args,
  },
};
