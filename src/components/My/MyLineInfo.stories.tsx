import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MyLineInfo } from './MyLineInfo';

export default {
  title: 'MY/회선정보',
  component: MyLineInfo,
  argTypes: {},
} as ComponentMeta<typeof MyLineInfo>;

const Template: ComponentStory<typeof MyLineInfo> = function fun(args) {
  return <MyLineInfo {...args} />;
};
// 단일회선
export const 단일회선 = Template.bind({});
단일회선.args = {
  lineName: '010-98**-54**',
  hasMultiLine: true,
  icon: 'ic-etc-disk',
  itemName: '5GX플래티넘',
};
// 다회선
export const 다회선 = Template.bind({});
다회선.args = {
  lineName: '010-98**-54**',
  hasMultiLine: false,
  icon: 'ic-etc-disk',
  itemName: '뉴 T끼리 맞춤형(200분+700mb)',
};
// 요금제2줄
export const 요금제2줄 = Template.bind({});
요금제2줄.args = {
  lineName: '010-98**-54**',
  hasMultiLine: false,
  icon: 'ic-etc-disk',
  itemName: '뉴 T끼리 맞춤형(200분+700mb)',
};
// 유선회선
export const 유선회선 = Template.bind({});
유선회선.args = {
  lineName: '서울 용*****',
  hasMultiLine: false,
  icon: 'ic-etc-global',
  itemName: 'T Giga+Wifi',
};

// 준회원 등록회선 없음
export const 준회원_등록회선_없음 = Template.bind({});
준회원_등록회선_없음.args = {
  lineName: '회선을 등록해 주세요.',
  itemName: '회선 등록',
  itemNameLink: '/common/member/line',
};

// 준회원 보유회선 없음
export const 준회원_보유회선_없음 = Template.bind({});
준회원_보유회선_없음.args = {
  messageOnly: true,
  lineName: '가입하신 회선이 없어요.',
};

// 단일회선
export const 단일회선_EN = Template.bind({});
단일회선_EN.args = {
  lineName: '010-98**-54**',
  arrow: 'bl-arr-bold right',
  icon: 'ic-etc-disk',
  itemName: '5GX Platinum',
};
// 다회선
export const 다회선_EN = Template.bind({});
다회선_EN.args = {
  lineName: '010-98**-54**',
  arrow: 'bl-arr-bold',
  icon: 'ic-etc-disk',
  itemName: '5GX Platinum',
};
// 요금제2줄
export const 요금제2줄_EN = Template.bind({});
요금제2줄_EN.args = {
  lineName: '010-98**-54**',
  arrow: 'bl-arr-bold',
  icon: 'ic-etc-disk',
  itemName: 'New T DIY(150mins + 250MB)',
};
