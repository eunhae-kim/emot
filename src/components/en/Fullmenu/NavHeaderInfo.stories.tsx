import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { NavHeaderInfo } from './NavHeaderInfo';

export default {
  title: 'en/Fullmenu/로그인정보',
  component: NavHeaderInfo,
  argTypes: {},
} as ComponentMeta<typeof NavHeaderInfo>;

const Template: ComponentStory<typeof NavHeaderInfo> = function fun(args) {
  return <NavHeaderInfo {...args} />;
};

// 공통_단일 회선 보유
export const Primary = Template.bind({});
Primary.args = {
  viewtype: '공통_단일 회선 보유',
  name: 'Mobile',
  number: '010-98**-54**',
  arrow: 'bl-arr btm',
  target: null,
  logintype: 'Sign out',
};

// 준회원 보유회선 없음
export const 준회원 = Template.bind({});
준회원.args = {
  viewtype: '로그인_준회원',
  name: 'No Registered Lines',
  number: null,
  arrow: null,
  target: null,
  logintype: 'Sign out',
};

// 미로그인
export const 미로그인 = Template.bind({});
미로그인.args = {
  viewtype: '미로그인 화면',
  name: 'Please sign in',
  number: null,
  arrow: 'bl-arr',
  target: 'Simple Sign in',
  logintype: 'Register',
};

// PPS 회선 혹은 유선회선
export const 가입회선_미등록 = Template.bind({});
가입회선_미등록.args = {
  viewtype: 'PPS 회선 혹은 유선회선',
  name: 'Access Unavailable',
  number: null,
  arrow: null,
  target: 'Your Lines may access on the',
  logintype: 'T world KOR',
};
