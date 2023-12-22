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
  displayType: '일반',
  membershipType: '할인형',
  grade: 'VIP',
  barcode: '0000111122223333',
  isOtb: true,
  otbRenewableFrom: 1 * 60,
  otbLifetimeLeft: 20 * 60,
  reloadData: () => null,
  점검fromTo: '',
};
export const 기본_적립형 = Template.bind({});
기본_적립형.args = {
  displayType: '일반',
  membershipType: '적립형',
  grade: 'SILVER',
  barcode: '0000111122223333',
  isOtb: true,
  otbRenewableFrom: 1 * 60,
  otbLifetimeLeft: 20 * 60,
  reloadData: () => null,
  점검fromTo: '',
};
export const 유효시간_1분미만 = Template.bind({});
유효시간_1분미만.args = {
  displayType: '일반',
  membershipType: '할인형',
  grade: 'VIP',
  barcode: '0000111122223333',
  isOtb: true,
  otbRenewableFrom: 1 * 60,
  otbLifetimeLeft: 59,
  reloadData: () => null,
  점검fromTo: '',
};
export const OTB서버오류 = Template.bind({});
OTB서버오류.args = {
  displayType: '일반',
  membershipType: '할인형',
  grade: 'VIP',
  barcode: '0000111122223333',
  isOtb: false,
  otbRenewableFrom: 1 * 60,
  otbLifetimeLeft: 20 * 60,
  reloadData: () => null,
  점검fromTo: '',
};
// CASE 1. 멤버십 미가입
export const 멤버십_미가입 = Template.bind({});
멤버십_미가입.args = {
  displayType: '미가입',
  membershipType: '할인형',
  grade: 'VIP',
  barcode: '0000111122223333',
  isOtb: true,
  otbRenewableFrom: 1 * 60,
  otbLifetimeLeft: 20 * 60,
  reloadData: () => null,
  점검fromTo: '',
};

// CASE 2. 멤버십 이용정지
export const 멤버십_이용정지 = Template.bind({});
멤버십_이용정지.args = {
  displayType: '이용정지',
  membershipType: '할인형',
  grade: 'VIP',
  barcode: '0000111122223333',
  isOtb: true,
  otbRenewableFrom: 1 * 60,
  otbLifetimeLeft: 20 * 60,
  reloadData: () => null,
  점검fromTo: '',
};

// CASE 3. 간편 로그인
export const 간편_로그인 = Template.bind({});
간편_로그인.args = {
  displayType: '간편로그인',
  membershipType: '할인형',
  grade: 'VIP',
  barcode: '0000111122223333',
  isOtb: true,
  otbRenewableFrom: 1 * 60,
  otbLifetimeLeft: 20 * 60,
  reloadData: () => null,
  점검fromTo: '',
};

// 예외 CASE 1. 서비스 점검
export const 서비스_점검 = Template.bind({});
서비스_점검.args = {
  displayType: '서비스점검',
  membershipType: '할인형',
  grade: 'VIP',
  barcode: '0000111122223333',
  isOtb: true,
  otbRenewableFrom: 1 * 60,
  otbLifetimeLeft: 20 * 60,
  reloadData: () => null,
  점검fromTo: '2023.08.11.12.34 ~ 2023.08.11.13.54 ',
};
export const 해지신청됨 = Template.bind({});
해지신청됨.args = {
  displayType: '해지신청됨',
  membershipType: '할인형',
  grade: 'VIP',
  barcode: '0000111122223333',
  isOtb: true,
  otbRenewableFrom: 1 * 60,
  otbLifetimeLeft: 20 * 60,
  reloadData: () => null,
  점검fromTo: '',
};
