import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MainTtimeContent } from './MainTtimeContent';
import { BASE_PATH } from '../../common/const';

export default {
  title: 'Main/T타임',
  component: MainTtimeContent,
  argTypes: {},
} as ComponentMeta<typeof MainTtimeContent>;

const Template: ComponentStory<typeof MainTtimeContent> = function fun(args) {
  return <MainTtimeContent {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  isLocalImage: true,
  ttimeStoryList: [
    {
      id: 1,
      title: '요즘 T factory의 뜨거운 이슈',
      thumbnailImgUrl: `${BASE_PATH}/images/main/tTimeMain-thumb1.png`,
      thumbnailImgAlt: 'img alt 1',
    },
    {
      id: 2,
      title: 'T 우주로! 새로운 취미 찾기',
      thumbnailImgUrl: `${BASE_PATH}/images/main/tTimeMain-thumb2.png`,
      thumbnailImgAlt: 'img alt 2',
    },
    {
      id: 3,
      title:
        'T 멤버십 최고의 루틴 공개! 제 12일T 멤버십 최고의 루틴 공개! 제 12일T 멤버십 최고의 루틴 공개! 제 12일T멤버십 최고의 루틴 공개! 제 12일T 멤버십 최고의 루틴 공개! 제 12일T 멤버십 최고의 루틴 공개! 제 12일',
      thumbnailImgUrl: `${BASE_PATH}/images/main/tTimeMain-thumb3.png`,
      thumbnailImgAlt: 'img alt 3',
    },
  ],
};
