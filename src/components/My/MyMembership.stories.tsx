import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MyMembership } from './MyMembership';
import { isApp } from '../../js/commonUtil';

export default {
  title: 'MY/멤버십 모듈',
  component: MyMembership,
  argTypes: {},
} as ComponentMeta<typeof MyMembership>;

const Template: ComponentStory<typeof MyMembership> = function fun(args) {
  return <MyMembership {...args} />;
};
// 기본
export const 기본 = Template.bind({});
기본.args = {
  text: '할인형',
  rank: 'SILVER',
  btnType: 'barcode',
  disabled: false,
  btnName: 'T멤버십 이용내역',
  descText: null,
  descSubText: null,
  link: '/membership/history',
};

// CASE 1. 멤버십 미가입
export const 멤버십_미가입 = Template.bind({});
멤버십_미가입.args = {
  text: 'T 멤버십을 신청하고 혜택을 이용해보세요.',
  rank: null,
  btnType: 'basic',
  disabled: false,
  btnName: '혜택 보기',
  descText: null,
  descSubText: null,
  link: '/membership/benefit/brand',
};

// CASE 2. 멤버십 이용정지
export const 멤버십_이용정지 = Template.bind({});
멤버십_이용정지.args = {
  text: '할인형',
  rank: '',
  btnType: 'barcode',
  disabled: true,
  btnName: '이용정지',
  descText: `고객님의 카드는 <b>이용정지 상태</b>로 이용하실 수 없습니다.`,
  descSubText: null,
};

// CASE 3. 간편 로그인
export const 간편_로그인 = Template.bind({});
간편_로그인.args = {
  text: '현재 간편 로그인 상태에요.',
  rank: null,
  btnType: 'basic',
  disabled: false,
  btnName: '로그인 하기',
  descText: 'T 멤버십은 T아이디 로그인 후 조회할 수 있습니다.',
  descSubText: null,
  link: `/common/tid/login?target=/v6/main&app=${isApp() ? 'Y' : 'N'}`,
};

// 예외 CASE 1. 서비스 점검
export const 서비스_점검 = Template.bind({});
서비스_점검.args = {
  text: '현재 서비스 검검 중입니다.',
  rank: null,
  btnType: 'basic',
  disabled: false,
  btnName: null,
  descText: null,
  descSubText: 'YYY.MM.DD.HH.MM ~ YYYY.MM.DD.HH.MM ',
};
