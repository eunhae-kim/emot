import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeStoryContent } from './ThemeStoryContent';

export default {
  title: 'T-time/ThemeStoryContent',
  component: ThemeStoryContent,
  argTypes: {},
} as ComponentMeta<typeof ThemeStoryContent>;

const Template: ComponentStory<typeof ThemeStoryContent> = function fun(args) {
  return <ThemeStoryContent {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  themeList: [
    {
      id: 5,
      title: '혜택 꿀 정보',
      iconImageUrl:
        'https://s3-tworld-dev-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com/adminupload/common/13502/92900/1821964526.png\t',
      iconImageAlt: '혜택 꿀 정보',
      themeImageUrl:
        'https://s3-tworld-dev-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com/adminupload/common/13502/92900/1073157051.png\t',
      themeImageAlt: '혜택 꿀 정보',
      borderColor: '#ffb800',
      backgroundColor: '#fafaf5',
      subTitle: '달달하게 꿀차가 고백하는',
      sequence: 1,
    },
    {
      id: 1,
      title: '흥미로운 수다',
      iconImageUrl:
        'https://s3-tworld-dev-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com/adminupload/common/13502/92900/1617732854.png',
      iconImageAlt: '흥미로운 수다',
      themeImageUrl:
        'https://s3-tworld-dev-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com/adminupload/common/13502/92900/238747660.png',
      themeImageAlt: '흥미로운 수다',
      borderColor: '#79abf2',
      backgroundColor: '#dee8f5',
      subTitle: '톡톡 재미 가득 소다가 들려주는',
      sequence: 2,
    },
    {
      id: 2,
      title: '통신생활 안내서',
      iconImageUrl:
        'https://s3-tworld-dev-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com/adminupload/common/13502/92900/1546093174.png',
      iconImageAlt: '통신생활 안내서',
      themeImageUrl:
        'https://s3-tworld-dev-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com/adminupload/common/13502/92900/2090009731.png',
      themeImageAlt: '통신생활 안내서',
      borderColor: '#916e57',
      backgroundColor: '#ffe7c6',
      subTitle: '다채로운 원두 커피가 안내하는',
      sequence: 3,
    },
    {
      id: 6,
      title: '스마트한 IT 지식',
      iconImageUrl:
        'https://s3-tworld-dev-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com/adminupload/common/13502/92900/956294544.png\t',
      iconImageAlt: '스마트한 IT 지식',
      themeImageUrl:
        'https://s3-tworld-dev-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com/adminupload/common/13502/92900/1882993121.png',
      themeImageAlt: '스마트한 IT 지식',
      borderColor: '#a24cd2',
      backgroundColor: '#f8f4fa',
      subTitle: '스마트함 펄펄한 버블티가 알려주는',
      sequence: 4,
    },
  ],
};
