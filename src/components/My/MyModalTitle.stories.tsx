import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MyModalTitle } from './MyModalTitle';

export default {
  title: 'MY/Modal Title',
  component: MyModalTitle,
  argTypes: {},
} as ComponentMeta<typeof MyModalTitle>;

const Template: ComponentStory<typeof MyModalTitle> = function fun(args) {
  return <MyModalTitle {...args} />;
};

// 회선관리
export const 회선관리 = Template.bind({});
회선관리.args = {
  title: '회선 관리',
  showArrow: true,
  unregistered: 5,
};

// 데이터_충전하기
export const 데이터_충전하기 = Template.bind({});
데이터_충전하기.args = {
  title: '데이터 충전하기',
  showArrow: false,
};
// 데이터 선물하기
export const 데이터_선물하기 = Template.bind({});
데이터_선물하기.args = {
  title: '데이터 선물하기',
  showArrow: false,
};
