import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Message } from './Message';

export default {
  title: 'My/EN_예외 메시지',
  component: Message,
  argTypes: {},
} as ComponentMeta<typeof Message>;

const Template: ComponentStory<typeof Message> = function fun(args) {
  return <Message {...args} />;
};

// a예외 case 조회불가 error a-1
export const 예외_CASE_A_1 = Template.bind({});
예외_CASE_A_1.args = {
  exIcon: 'ic-warn',
  exTit: 'Please try again later',
  exSubTit: 'The number of inquiries permitted is limited to ensure service stability',
  exBtnRefresh: false,
  exAddClass: false,
  exceptionWire: false,
  representLine: false,
  normalLine: false,
  selectLine: false,
  exBtnView: false,
};

// a예외 case 조회불가 error a-5
export const 예외_CASE_A_5 = Template.bind({});
예외_CASE_A_5.args = {
  exIcon: 'ic-warn',
  exTit: 'Not available',
  exSubTit: 'No data balance information available',
  exBtnRefresh: false,
  exAddClass: false,
  exceptionWire: false,
  representLine: false,
  normalLine: false,
  selectLine: false,
  exBtnView: false,
};

// a예외 case 조회불가 error a-6
export const 예외_CASE_A_6 = Template.bind({});
예외_CASE_A_6.args = {
  exIcon: 'ic-warn',
  exTit: 'Not available',
  exSubTit: 'Data balance could not be found',
  exBtnRefresh: true,
  exAddClass: false,
  exceptionWire: false,
  representLine: false,
  normalLine: false,
  selectLine: false,
  exBtnView: false,
};

// b예외 case b-1
export const 예외_CASE_B_1 = Template.bind({});
예외_CASE_B_1.args = {
  exIcon: 'ic-warn',
  exTit: 'Please try again later',
  exSubTit: 'The number of inquiries permitted is limited to ensure service stability',
  exBtnRefresh: false,
  exAddClass: true,
  exceptionWire: false,
  representLine: false,
  normalLine: false,
  selectLine: false,
  exBtnView: false,
};
// b예외 case b-2
export const 예외_CASE_B_2 = Template.bind({});
예외_CASE_B_2.args = {
  exIcon: 'ic-warn',
  exTit: 'Not available',
  exSubTit: 'You have just switched back to your current plan within the past month',
  exBtnRefresh: false,
  exAddClass: true,
  exceptionWire: false,
  representLine: false,
  normalLine: false,
  selectLine: false,
  exBtnView: false,
};
// b예외 case b-4
export const 예외_CASE_B_4 = Template.bind({});
예외_CASE_B_4.args = {
  exIcon: 'ic-warn',
  exTit: 'Not available',
  exSubTit: 'No data balance information available',
  exBtnRefresh: true,
  exAddClass: true,
  exceptionWire: false,
  representLine: false,
  normalLine: false,
  selectLine: false,
  exBtnView: false,
};
// b예외 case b-6
export const 예외_CASE_B_6 = Template.bind({});
예외_CASE_B_6.args = {
  exIcon: 'ic-warn',
  exTit: 'Not available',
  exSubTit: 'Data balance could not be found',
  exBtnRefresh: true,
  exAddClass: true,
  exceptionWire: false,
  representLine: false,
  normalLine: false,
  selectLine: false,
  exBtnView: false,
};

// c예외 CASE c. 데이터/통화 단독 모듈 적용
export const 예외_CASE_C = Template.bind({});
예외_CASE_C.args = {
  exIcon: 'ic-inspect',
  exTit: 'System under maintenance',
  exSubTit: 'Please try again later YYYY.MM.DD.HH.MM ~ YYYY.MM.DD.HH.MM',
  exBtnRefresh: false,
  exAddClass: false,
  exceptionWire: false,
  representLine: false,
  normalLine: false,
  selectLine: false,
  exBtnView: false,
};
// d예외 CASE d. 데이터/통화 & 요금 통합 모듈 적용
export const 예외_CASE_D = Template.bind({});
예외_CASE_D.args = {
  exIcon: 'ic-inspect',
  exTit: 'System under maintenance',
  exSubTit: 'Please try again later YYYY.MM.DD.HH.MM ~ YYYY.MM.DD.HH.MM',
  exBtnRefresh: false,
  exAddClass: true,
  exceptionWire: false,
  representLine: false,
  normalLine: false,
  selectLine: false,
  exBtnView: false,
};

// a예외 CASE a. 요금 모듈 유선 회선 케이스
export const 예외_무선_CASE_A = Template.bind({});
예외_무선_CASE_A.args = {
  exIcon: 'ic-inspect',
  exTit: 'System under maintenance',
  exSubTit: 'Please try again later YYYY.MM.DD.HH.MM ~ YYYY.MM.DD.HH.MM',
  exBtnRefresh: false,
  exAddClass: false,
  exceptionWire: false,
  representLine: false,
  normalLine: false,
  selectLine: false,
  exBtnView: false,
};

// 예외 CASE 4-1. 무선_조회불가
export const 조회불가_노출데이터_없음 = Template.bind({});
조회불가_노출데이터_없음.args = {
  exIcon: 'ic-qck-myfee',
  exTit: 'No Billing History',
  exSubTit: 'No billing history has been charged',
  exBtnRefresh: false,
  exAddClass: false,
  exceptionWire: false,
  representLine: false,
  normalLine: false,
  selectLine: false,
  exBtnView: true,
};

// 예외 CASE 4-2. 무선_조회불가
export const 조회불가_신규_가입이력_없음 = Template.bind({});
조회불가_신규_가입이력_없음.args = {
  exIcon: 'ic-qck-myfee',
  exTit: 'No Billing History',
  exSubTit: 'No billing history within the past 6 months',
  exBtnRefresh: false,
  exAddClass: false,
  exceptionWire: false,
  representLine: false,
  normalLine: false,
  selectLine: false,
  exBtnView: true,
};
// 예외 무선 PPS 회선
export const 무선_PPS_회선 = Template.bind({});
무선_PPS_회선.args = {
  exIcon: 'ic-warn',
  exTit: 'Access Unavailable',
  exSubTit:
    'The service for PPS and non-mobile lines are still under development.  You may access these services on the  Korean version of T world.',
  exBtnRefresh: false,
  exAddClass: false,
  exceptionWire: false,
  representLine: false,
  normalLine: false,
  selectLine: true,
  exBtnView: false,
};
