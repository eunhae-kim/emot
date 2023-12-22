import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MyDataCharger } from './MyDataCharger';
import {
  데이터_선물하기_T가족모아데이터,
  데이터_선물하기_T끼리데이터선물,
  데이터_선물하기_리필쿠폰선물,
} from './MyDataChargerConst';

export default {
  title: 'MY/ Modal Bottom',
  component: MyDataCharger,
  argTypes: {},
} as ComponentMeta<typeof MyDataCharger>;

const Template: ComponentStory<typeof MyDataCharger> = function fun(args) {
  return <MyDataCharger {...args} />;
};

export const 나의_보유_쿠폰_사용 = Template.bind({});
나의_보유_쿠폰_사용.args = {
  title: '나의 보유 쿠폰 사용',
  List: [
    {
      icon: 'ic-refill-cpn',
      text: '리필 쿠폰',
      coupon: '6장',
      link: '/myt-data/recharge/coupon',
    },
  ],
};

export const 선불쿠폰_구매_충전 = Template.bind({});
선불쿠폰_구매_충전.args = {
  title: '선불 쿠폰 구매·충전',
  List: [
    {
      icon: 'ic-data-cpn',
      text: 'T 데이터쿠폰',
      coupon: null,
      link: '/common/util/bpcp?bpcpServiceId=0000105171',
    },
    {
      icon: 'ic-short-data',
      text: 'T 단기데이터 등록',
      coupon: null,
      link: '/common/util/bpcp?bpcpServiceId=0000105175',
    },
    {
      icon: 'ic-t-cpn',
      text: 'T 쿠폰 ',
      coupon: null,
      link: '/common/util/bpcp?bpcpServiceId=0000105151',
    },
    {
      icon: 'ic-jeju-cpn',
      text: '제주도 프리 쿠폰',
      coupon: null,
      link: '/common/util/bpcp?bpcpServiceId=0000105148',
    },
  ],
};

export const 요금충전 = Template.bind({});
요금충전.args = {
  title: '요금충전',
  List: [
    {
      icon: 'ic-qckmain-benef',
      text: '팅 요금제 충전 선물',
      coupon: null,
      link: '/myt-data/recharge/ting',
    },
  ],
};

export const 데이터_선물하기 = Template.bind({});
데이터_선물하기.args = {
  title: null,
  List: [데이터_선물하기_T가족모아데이터, 데이터_선물하기_T끼리데이터선물, 데이터_선물하기_리필쿠폰선물],
};
