import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MyVolume } from './MyVolume';

export default {
  title: 'MY/MyVolume',
  component: MyVolume,
  argTypes: {},
} as ComponentMeta<typeof MyVolume>;

const Template: ComponentStory<typeof MyVolume> = function fun(args) {
  return <MyVolume {...args} />;
};

// 남은_데이터
export const 남은_데이터 = Template.bind({});
남은_데이터.args = {
  over1: '73.5',
  overUnit1: 'GB',
  link: '/myt-fare/bill/hotbill',
};
// 실시간 이용요금
export const 실시간_이용요금 = Template.bind({});
실시간_이용요금.args = {
  over1: '39,300',
  overUnit1: '원',
  link: '/myt-fare/bill/hotbill',
};

// MY_유선회선
export const MY_유선회선 = Template.bind({});
MY_유선회선.args = {
  over1: '54,200',
  overUnit1: '원',
  link: '/myt-fare/bill/hotbill',
};

// 실시간 이용요금
export const 실시간_이용요금_EN = Template.bind({});
실시간_이용요금_EN.args = {
  over1: '169,300',
  overUnit0: '￦',
};
