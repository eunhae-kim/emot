import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TroomCupTypeContent } from './TroomCupTypeContent';
import { BASE_PATH } from '../../common/const';

export default {
  title: 'T-time/TroomCupTypeContent',
  component: TroomCupTypeContent,
  argTypes: {},
} as ComponentMeta<typeof TroomCupTypeContent>;

const Template: ComponentStory<typeof TroomCupTypeContent> = function fun(args) {
  return <TroomCupTypeContent {...args} />;
};

export const 모은컵_있음 = Template.bind({});
모은컵_있음.args = {
  userName: '홍길동',
  savedStroyNum: 1,
  readStroyNum: 2,
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
};

export const 모은컵_없음 = Template.bind({});
모은컵_없음.args = {
  userName: '홍길동',
  savedStroyNum: 0,
  readStroyNum: 0,
  cupInfo: null,
};
