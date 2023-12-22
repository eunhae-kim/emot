import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TtimeStoryList } from './TtimeStoryList';
import { BASE_PATH } from '../../common/const';

export default {
  title: 'T-time/TtimeStoryList',
  component: TtimeStoryList,
  argTypes: {},
} as ComponentMeta<typeof TtimeStoryList>;

const Template: ComponentStory<typeof TtimeStoryList> = function fun(args) {
  return <TtimeStoryList {...args} />;
};

export const Default = Template.bind({});

// T타임-이야기 리스트
Default.args = {
  storyList: [
    {
      id: 1,
      readYn: 'Y',
      savedYn: 'Y',
      title: '티백 주제명 표기합니다.', //2023.08.16수정
      tags: [
        { id: 1, title: '#해시태그1' },
        { id: 2, title: '#해시태그2' },
        { id: 3, title: '#해시태그3' },
      ],

      thumbnailImgUrl: `${BASE_PATH}/images/sub/tTime-list-thumb01.png`,
    },
    {
      id: 2,
      readYn: 'N',
      savedYn: 'Y',
      title:
        '티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다. 티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다. 티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.',
      tags: [
        { id: 1, title: '#해시태그1' },
        { id: 2, title: '#해시태그2' },
      ],
      thumbnailImgUrl: `${BASE_PATH}/images/sub/tTime-list-thumb01.png`,
    },
    {
      id: 3,
      readYn: 'Y',
      savedYn: 'N',
      title:
        '티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다. 티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다. 티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.',
      tags: [{ id: 1, title: '#해시태그1' }],
      thumbnailImgUrl: `${BASE_PATH}/images/sub/tTime-list-thumb01.png`,
    },
    {
      id: 4,
      readYn: 'N',
      savedYn: 'N',
      title:
        '티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다. 티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다. 티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.',
      tags: [
        { id: 1, title: '#해시태그1' },
        { id: 2, title: '#해시태그2' },
        { id: 3, title: '#해시태그3' },
      ],
      thumbnailImgUrl: `${BASE_PATH}/images/sub/tTime-list-thumb01.png`,
    },
    {
      id: 5,
      readYn: 'Y',
      savedYn: 'Y',
      title:
        '티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다. 티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다. 티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.',
      tags: [
        { id: 1, title: '#해시태그1' },
        { id: 2, title: '#해시태그2' },
        { id: 3, title: '#해시태그3' },
      ],
      thumbnailImgUrl: `${BASE_PATH}/images/sub/tTime-list-thumb01.png`,
    },
    {
      id: 6,
      readYn: 'Y',
      savedYn: 'Y',
      title:
        '티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다. 티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다. 티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.',
      tags: [
        { id: 1, title: '#해시태그1' },
        { id: 2, title: '#해시태그2' },
        { id: 3, title: '#해시태그3' },
      ],
      thumbnailImgUrl: `${BASE_PATH}/images/sub/tTime-list-thumb01.png`,
    },
    {
      id: 7,
      readYn: 'Y',
      savedYn: 'Y',
      title:
        '티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다. 티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다. 티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.',
      tags: [
        { id: 1, title: '#해시태그1' },
        { id: 2, title: '#해시태그2' },
        { id: 3, title: '#해시태그3' },
      ],
      thumbnailImgUrl: `${BASE_PATH}/images/sub/tTime-list-thumb01.png`,
    },
    {
      id: 8,
      readYn: 'Y',
      savedYn: 'Y',
      title:
        '티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다. 티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다. 티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.',
      tags: [
        { id: 1, title: '#해시태그1' },
        { id: 2, title: '#해시태그2' },
        { id: 3, title: '#해시태그3' },
      ],
      thumbnailImgUrl: `${BASE_PATH}/images/sub/tTime-list-thumb01.png`,
    },
    {
      id: 9,
      readYn: 'Y',
      savedYn: 'Y',
      title:
        '티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다. 티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다. 티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.',
      tags: [
        { id: 1, title: '#해시태그1' },
        { id: 2, title: '#해시태그2' },
        { id: 3, title: '#해시태그3' },
      ],
      thumbnailImgUrl: `${BASE_PATH}/images/sub/tTime-list-thumb01.png`,
    },
    {
      id: 10,
      readYn: 'Y',
      savedYn: 'Y',
      title:
        '티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다. 티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다. 티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.',
      tags: [
        { id: 1, title: '#해시태그1' },
        { id: 2, title: '#해시태그2' },
        { id: 3, title: '#해시태그3' },
      ],
      thumbnailImgUrl: `${BASE_PATH}/images/sub/tTime-list-thumb01.png`,
    },
    {
      id: 11,
      readYn: 'Y',
      savedYn: 'Y',
      title:
        '티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다. 티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다. 티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.',
      tags: [
        { id: 1, title: '#해시태그1' },
        { id: 2, title: '#해시태그2' },
        { id: 3, title: '#해시태그3' },
      ],
      thumbnailImgUrl: `${BASE_PATH}/images/sub/tTime-list-thumb01.png`,
    },
  ],
  orderByText: '최신순',
  themeTitle: '전체',
  onLastStoryVisible: () => {
    console.log('load more');
  },
  bannerInfo: {
    targetUrl: `https://tworld.co.kr`,
    imgUrl: `${BASE_PATH}/images/banner/tTime-banner.jpg`,
  },
  onSortOptionClick: () => {
    console.log('Sort Option Clicked');
  },
};

export const 이야기_없음 = Template.bind({});
이야기_없음.args = {
  storyList: [],
};
