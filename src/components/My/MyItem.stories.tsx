import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MyItem } from './MyItem';

export default {
  title: 'MY/My Item',
  component: MyItem,
  argTypes: {},
} as ComponentMeta<typeof MyItem>;

const Template: ComponentStory<typeof MyItem> = function fun(args) {
  return <MyItem {...args} />;
};

// 실시간 이용요금
export const 실시간_이용요금 = Template.bind({});
실시간_이용요금.args = {
  icon: false,
  title: '휴대폰 결제',
  fee: '12,800',
  flag: false,
  lang: 'KO',
};
// 콘텐츠 이용료
export const 콘텐츠_이용료 = Template.bind({});
콘텐츠_이용료.args = {
  icon: false,
  title: '콘텐츠 이용료',
  fee: '9,800',
  flag: false,
  lang: 'KO',
};
// 지난달 청구요금
export const 지난달_청구요금 = Template.bind({});
지난달_청구요금.args = {
  icon: false,
  title: '지난달 청구요금',
  fee: '74,350',
  flag: true,
  lang: 'KO',
};
// 미납요금 발생
export const 미납요금_발생 = Template.bind({});
미납요금_발생.args = {
  icon: true,
  title: '미납요금 발생',
  fee: '62,250',
  flag: false,
  lang: 'KO',
};

// 실시간 이용요금
export const 실시간_이용요금_EN = Template.bind({});
실시간_이용요금_EN.args = {
  icon: false,
  title: 'Mobile Payments',
  fee: '12,800',
  flag: false,
  lang: 'EN',
};
// 콘텐츠 이용료
export const 콘텐츠_이용료_EN = Template.bind({});
콘텐츠_이용료_EN.args = {
  icon: false,
  title: 'Paid Mobile Contents',
  fee: '9,800',
  flag: false,
  lang: 'EN',
};
// 지난달 청구요금
export const 지난달_청구요금_EN = Template.bind({});
지난달_청구요금_EN.args = {
  icon: false,
  title: 'Fees Payable',
  fee: '74,350',
  flag: false,
  lang: 'EN',
};
// 무선 통합청구
export const 무선_통합청구_EN = Template.bind({});
무선_통합청구_EN.args = {
  icon: false,
  title: 'Fees Payable',
  fee: '74,350',
  flag: true,
  lang: 'EN',
};
