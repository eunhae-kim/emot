import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import BottomSheetCupManual from './BottomSheetCupManual';
import { BASE_PATH } from '../../common/const';

export default {
  title: 'T-time/BottomSheetCupManual',
  component: BottomSheetCupManual,
  argTypes: {},
} as ComponentMeta<typeof BottomSheetCupManual>;

const Template: ComponentStory<typeof BottomSheetCupManual> = function fun(args) {
  return <BottomSheetCupManual {...args} />;
};

export const 컵 = Template.bind({});
컵.args = {
  cupInfo: {
    id: 2,
    title: 'T-time을 탐구중인 호기심 많은 컵',
    thumbnailImgUrl:
      'https://s3-tworld-dev-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com/adminupload/common/13502/92900/1073157051.png',
    thumbnailImgAlt: 'string',
    bigTumbnailImgUrl:
      'https://s3-tworld-dev-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com/adminupload/common/13502/92900/1073157051.png',
    bigTumbnailImgAlt: 'string',
    lockedTumbnailImgUrl:
      'https://s3-tworld-dev-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com/adminupload/common/13502/92900/21448044.png',
    lockedTumbnailImgAlt: 'string',
    bigLockedTumbnailImgUrl:
      'https://s3-tworld-dev-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com/adminupload/common/13502/92900/21448044.png',
    bigLockedTumbnailImgAlt: 'string',
    guide: 'guide',
    tip: 'tip',
    sequence: 2,
    createDatetime: '2023-07-27 16:08:24',
    updateDatetime: '2023-07-27 16:08:24',
    ownYn: 'Y',
    popupYn: 'Y',
  },
};
