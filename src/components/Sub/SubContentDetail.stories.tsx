import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SubContentDetail from './SubContentDetail';
import { BASE_PATH } from '../../common/const';

export default {
  title: 'T-time/(검수용)컨텐츠상세 페이지',
  component: SubContentDetail,
  argTypes: {},
} as ComponentMeta<typeof SubContentDetail>;

const Template: ComponentStory<typeof SubContentDetail> = function fun(args) {
  return <SubContentDetail {...args} />;
};

// 컨텐츠 상세-이야기 리스트(최대 3개)
const storyList = [
  {
    isRead: true,
    isChecked: true,
    name: '티백 주제명 표기합니다.', //2023.08.16수정
    tag1: '#해시태그1',
    tag2: '#해시태그2',
    tag3: '#해시태그3',
    imageUrl: `${BASE_PATH}/images/sub/tTime-list-thumb01.png`,
  },
  {
    isRead: false,
    isChecked: false,
    name: '티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다. 티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다. 티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.',
    tag1: '#해시태그1',
    tag2: '#해시태그2',
    tag3: '#해시태그3',
    imageUrl: `${BASE_PATH}/images/sub/tTime-list-thumb01.png`,
  },
  {
    isRead: true,
    isChecked: true,
    name: '티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다. 티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다. 티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.',
    tag1: '#해시태그1',
    tag2: '#해시태그2',
    tag3: '#해시태그3',
    imageUrl: `${BASE_PATH}/images/sub/tTime-list-thumb02.png`,
  },
];

export const 로그인_T알림동의 = Template.bind({});
로그인_T알림동의.args = {
  TNotiAgree: true,
  isTtimeToast: true,
  isLogin: true,
  storyList: storyList,
};

export const 로그인_T알림미동의 = Template.bind({});
로그인_T알림미동의.args = {
  TNotiAgree: false,
  isTtimeToast: true,
  isLogin: true,
  storyList: storyList,
};

export const 비로그인 = Template.bind({});
비로그인.args = {
  TNotiAgree: false,
  isTtimeToast: false,
  isLogin: false,
  storyList: storyList,
};
