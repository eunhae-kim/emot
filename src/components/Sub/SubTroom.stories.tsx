import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SubTroom from './SubTroom';
import { BASE_PATH } from '../../common/const';

export default {
  title: 'T-time/(검수용)T타임룸 페이지',
  component: SubTroom,
  argTypes: {},
} as ComponentMeta<typeof SubTroom>;

const Template: ComponentStory<typeof SubTroom> = function fun(args) {
  return <SubTroom {...args} />;
};

// 모은컵_있음 리스트
const cupList = [
  {
    id: 1,
    title: '친구와 처음 함께하는 컵',
    displayAosYn: 'Y',
    displayIosYn: 'Y',
    displayMwYn: 'Y',
    thumbnailImgUrl:
      'https://s3-tworld-dev-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com/adminupload/product/18763/29093/1159428366.png',
    thumbnailImgAlt: 'string',
    bigTumbnailImgUrl:
      'https://s3-tworld-dev-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com/adminupload/product/18763/29093/1159428366.png',
    bigTumbnailImgAlt: 'string',
    lockedTumbnailImgUrl:
      'https://s3-tworld-dev-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com/adminupload/product/18763/29093/1159428366.png',
    lockedTumbnailImgAlt: 'string',
    bigLockedTumbnailImgUrl:
      'https://s3-tworld-dev-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com/adminupload/product/18763/29093/1159428366.png',
    bigLockedTumbnailImgAlt: 'string',
    guide: 'guide',
    tip: 'tip',
    sequence: 1,
    createDatetime: '2023-07-14 22:40:37',
    updateDatetime: '2023-07-14 22:40:37',
    ownYn: 'Y',
    popupYn: 'Y',
  },
  {
    id: 2,
    title: 'T-time을 탐구중인 호기심 많은 컵',
    displayAosYn: 'Y',
    displayIosYn: 'Y',
    displayMwYn: 'Y',
    thumbnailImgUrl:
      'https://s3-tworld-dev-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com/adminupload/product/18763/29093/1159428366.png',
    thumbnailImgAlt: 'string',
    bigTumbnailImgUrl:
      'https://s3-tworld-dev-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com/adminupload/product/18763/29093/1159428366.png',
    bigTumbnailImgAlt: 'string',
    lockedTumbnailImgUrl:
      'https://s3-tworld-dev-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com/adminupload/product/18763/29093/1159428366.png',
    lockedTumbnailImgAlt: 'string',
    bigLockedTumbnailImgUrl:
      'https://s3-tworld-dev-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com/adminupload/product/18763/29093/1159428366.png',
    bigLockedTumbnailImgAlt: 'string',
    guide: 'guide',
    tip: 'tip',
    sequence: 2,
    createDatetime: '2023-07-14 22:40:37',
    updateDatetime: '2023-07-14 22:40:37',
    ownYn: 'Y',
    popupYn: 'N',
  },
  {
    id: 3,
    title: '이야기가 담긴 컵',
    displayAosYn: 'Y',
    displayIosYn: 'Y',
    displayMwYn: 'Y',
    thumbnailImgUrl:
      'https://s3-tworld-dev-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com/adminupload/product/18763/29093/1159428366.png',
    thumbnailImgAlt: 'string',
    bigTumbnailImgUrl:
      'https://s3-tworld-dev-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com/adminupload/product/18763/29093/1159428366.png',
    bigTumbnailImgAlt: 'string',
    lockedTumbnailImgUrl:
      'https://s3-tworld-dev-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com/adminupload/product/18763/29093/1159428366.png',
    lockedTumbnailImgAlt: 'string',
    bigLockedTumbnailImgUrl:
      'https://s3-tworld-dev-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com/adminupload/product/18763/29093/1159428366.png',
    bigLockedTumbnailImgAlt: 'string',
    guide: 'guide',
    tip: 'tip',
    sequence: 3,
    createDatetime: '2023-07-14 22:40:37',
    updateDatetime: '2023-07-14 22:40:37',
    ownYn: 'Y',
    popupYn: 'N',
  },
  {
    id: 4,
    title: '달달한 꿀차 미니 컵',
    displayAosYn: 'Y',
    displayIosYn: 'Y',
    displayMwYn: 'Y',
    thumbnailImgUrl:
      'https://s3-tworld-dev-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com/adminupload/product/18763/29093/1159428366.png',
    thumbnailImgAlt: 'string',
    bigTumbnailImgUrl:
      'https://s3-tworld-dev-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com/adminupload/product/18763/29093/1159428366.png',
    bigTumbnailImgAlt: 'string',
    lockedTumbnailImgUrl:
      'https://s3-tworld-dev-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com/adminupload/product/18763/29093/1159428366.png',
    lockedTumbnailImgAlt: 'string',
    bigLockedTumbnailImgUrl:
      'https://s3-tworld-dev-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com/adminupload/product/18763/29093/1159428366.png',
    bigLockedTumbnailImgAlt: 'string',
    guide: 'guide',
    tip: 'tip',
    sequence: 4,
    createDatetime: '2023-07-14 22:40:37',
    updateDatetime: '2023-07-14 22:40:37',
    ownYn: 'N',
    popupYn: 'N',
  },
  {
    id: 5,
    title: '따뜻한 핫초코 미니 컵',
    displayAosYn: 'Y',
    displayIosYn: 'Y',
    displayMwYn: 'Y',
    thumbnailImgUrl:
      'https://s3-tworld-dev-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com/adminupload/product/18763/29093/1159428366.png',
    thumbnailImgAlt: 'string',
    bigTumbnailImgUrl:
      'https://s3-tworld-dev-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com/adminupload/product/18763/29093/1159428366.png',
    bigTumbnailImgAlt: 'string',
    lockedTumbnailImgUrl:
      'https://s3-tworld-dev-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com/adminupload/product/18763/29093/1159428366.png',
    lockedTumbnailImgAlt: 'string',
    bigLockedTumbnailImgUrl:
      'https://s3-tworld-dev-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com/adminupload/product/18763/29093/1159428366.png',
    bigLockedTumbnailImgAlt: 'string',
    guide: 'guide',
    tip: 'tip',
    sequence: 5,
    createDatetime: '2023-07-14 22:40:37',
    updateDatetime: '2023-07-14 22:40:37',
    ownYn: 'N',
    popupYn: 'N',
  },
];

export const 모은컵_있음_배너없음 = Template.bind({});
모은컵_있음_배너없음.args = {
  isBanner: false,
  userName: '김민지',
  savedStroyNum: 9,
  readStroyNum: 99,
  cupInfo: {
    id: 3,
    title: '이야기가 담긴 컵',
    displayAosYn: 'Y',
    displayIosYn: 'Y',
    displayMwYn: 'Y',
    thumbnailImgUrl:
      'https://s3-tworld-dev-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com/adminupload/product/18763/29093/1159428366.png',
    thumbnailImgAlt: 'string',
    bigTumbnailImgUrl:
      'https://s3-tworld-dev-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com/adminupload/product/18763/29093/1159428366.png',
    bigTumbnailImgAlt: 'string',
    lockedTumbnailImgUrl:
      'https://s3-tworld-dev-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com/adminupload/product/18763/29093/1159428366.png',
    lockedTumbnailImgAlt: 'string',
    bigLockedTumbnailImgUrl:
      'https://s3-tworld-dev-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com/adminupload/product/18763/29093/1159428366.png',
    bigLockedTumbnailImgAlt: 'string',
    guide: 'guide',
    tip: 'tip',
    sequence: 3,
    createDatetime: '2023-07-14 22:40:37',
    updateDatetime: '2023-07-14 22:40:37',
    ownYn: 'Y',
    popupYn: 'N',
  },
  cupList: cupList,
  ownedCupList: [1, 2, 3],
};

export const 모은컵_있음_배너있음 = Template.bind({});
모은컵_있음_배너있음.args = {
  isBanner: true,
  userName: '김민지',
  savedStroyNum: 9,
  readStroyNum: 99,
  cupInfo: {
    id: 3,
    title: '이야기가 담긴 컵',
    displayAosYn: 'Y',
    displayIosYn: 'Y',
    displayMwYn: 'Y',
    thumbnailImgUrl:
      'https://s3-tworld-dev-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com/adminupload/product/18763/29093/1159428366.png',
    thumbnailImgAlt: 'string',
    bigTumbnailImgUrl:
      'https://s3-tworld-dev-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com/adminupload/product/18763/29093/1159428366.png',
    bigTumbnailImgAlt: 'string',
    lockedTumbnailImgUrl:
      'https://s3-tworld-dev-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com/adminupload/product/18763/29093/1159428366.png',
    lockedTumbnailImgAlt: 'string',
    bigLockedTumbnailImgUrl:
      'https://s3-tworld-dev-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com/adminupload/product/18763/29093/1159428366.png',
    bigLockedTumbnailImgAlt: 'string',
    guide: 'guide',
    tip: 'tip',
    sequence: 3,
    createDatetime: '2023-07-14 22:40:37',
    updateDatetime: '2023-07-14 22:40:37',
    ownYn: 'Y',
    popupYn: 'N',
  },
  cupList: cupList,
  ownedCupList: [1, 2, 3],
};

export const 모은컵_없음_배너있음 = Template.bind({});
모은컵_없음_배너있음.args = {
  isBanner: true,
  userName: '김민지',
  savedStroyNum: 9,
  readStroyNum: 99,
  cupInfo: null,
  cupList: cupList,
  ownedCupList: [],
};
