import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { NavHeaderInfo } from './NavHeaderInfo';

export default {
  title: 'Fullmenu/로그인정보',
  component: NavHeaderInfo,
  argTypes: {},
} as ComponentMeta<typeof NavHeaderInfo>;

const Template: ComponentStory<typeof NavHeaderInfo> = function fun(args) {
  return <NavHeaderInfo {...args} />;
};

// 로그인(정회원)
export const Primary = Template.bind({});
Primary.args = {
  name: "한민지",
  number: "010-57**-68**",
  loginYn:  true
};

// 미로그인 회원가입
export const 미로그인 = Template.bind({});
미로그인.args = {
  name: null,
  number: null,
  loginYn: false
};