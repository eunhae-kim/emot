import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SubTtime from './SubTtime';
import { BASE_PATH } from '../../common/const';

export default {
  title: 'T-time/(검수용)T타임 페이지',
  component: SubTtime,
  argTypes: {},
} as ComponentMeta<typeof SubTtime>;

const Template: ComponentStory<typeof SubTtime> = function fun(args) {
  return <SubTtime {...args} />;
};

// T타임-테마별이야기 리스트
const themeList = [
  {
    id: 1,
    title: '아이폰',
    iconImageUrl: 'https://cdn-icons-png.flaticon.com/512/1002/1002375.png',
    iconImageAlt: 'string',
    subTitle: 'string',
    sequence: 1,
  },
  {
    id: 2,
    title: '안드로이드',
    iconImageUrl: 'https://cdn-icons-png.flaticon.com/512/1002/1002375.png',
    iconImageAlt: '안드로이드 이미지 설명',
    subTitle: '서브 타이틀',
    sequence: 2,
  },
  {
    id: 6,
    title: '달달한 꿀차',
    iconImageUrl: 'https://cdn-icons-png.flaticon.com/512/1002/1002375.png',
    iconImageAlt: '달달하쥬',
    subTitle: '달달하쥬',
    sequence: 3,
  },
];

// T타임-로그인 시
export const Login = Template.bind({});
Login.args = {
  userName: '한민지',
  loginType: 'T',
  savedStroyNum: 0,
  readStroyNum: 0,
  collectedCupNum: 0,
  themeList,
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

// T타임-비로그인 시
export const NoLogin = Template.bind({});
NoLogin.args = {
  userName: null,
  loginType: 'N',
  savedStroyNum: 0,
  readStroyNum: 0,
  collectedCupNum: 0,
  themeList,
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

// T타임-간편로그인 시
export const EasyLogin = Template.bind({});
EasyLogin.args = {
  userName: '한민지',
  loginType: 'S',
  savedStroyNum: 0,
  readStroyNum: 0,
  collectedCupNum: 0,
  themeList,
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
