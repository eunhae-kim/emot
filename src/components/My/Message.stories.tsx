import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Message } from './Message';

export default {
  title: 'My/예외 메시지',
  component: Message,
  argTypes: {},
} as ComponentMeta<typeof Message>;

const Template: ComponentStory<typeof Message> = function fun(args) {
  return <Message {...args} />;
};

// a예외 case 조회불가 error a-1
export const 예외_CASE_A_1 = Template.bind({});
예외_CASE_A_1.args = {
  loading: false,
  exIcon: 'ic-warn',
  exTit: '조회할 수 없음',
  exSubTit: '안정적으로 실시간 조회를 하실 수 있도록 조회 횟수를 제한하고 있습니다.',
  exBtnRefresh: false,
  exAddClass: false,
  exBtnView: false,
};
export const 예외_CASE_A_2 = Template.bind({});
예외_CASE_A_2.args = {
  loading: false,
  exIcon: 'ic-warn',
  exTit: '조회할 수 없음',
  exSubTit: '이번 달 혹은 지난달에 기존 요금제로 다시 변경하신 이력이 있습니다.',
  exBtnRefresh: false,
  exAddClass: false,
  exBtnView: false,
};
export const 예외_CASE_A_3 = Template.bind({});
예외_CASE_A_3.args = {
  loading: false,
  exIcon: 'ic-warn',
  exTit: '조회할 수 없음',
  exSubTit: '이번 달 혹은 지난달에 회선을 정지하신 이력이 있습니다.',
  exBtnRefresh: false,
  exAddClass: false,
  exBtnView: false,
};
// a예외 case 조회불가 error a-4
export const 예외_CASE_A_4 = Template.bind({});
예외_CASE_A_4.args = {
  loading: false,
  exIcon: 'ic-warn',
  exTit: '조회할 수 없음',
  exSubTit: '조회할 수 있는 항목이 없습니다.',
  exBtnRefresh: false,
  exAddClass: false,
  exBtnView: false,
};
export const 예외_CASE_A_5 = Template.bind({});
예외_CASE_A_5.args = {
  loading: false,
  exIcon: 'ic-warn',
  exTit: '조회할 수 없음',
  exSubTit: '고객님이 법정대리인으로 등록된 자녀 회선이 아닙니다.',
  exBtnRefresh: false,
  exAddClass: false,
  exBtnView: false,
};

// a예외 case 조회불가 error a-6
export const 예외_CASE_A_6 = Template.bind({});
예외_CASE_A_6.args = {
  loading: false,
  exIcon: 'ic-warn',
  exTit: '조회할 수 없음',
  exSubTit: '오류가 발생했습니다. 다시 시도해 주세요.',
  exBtnRefresh: true,
  exAddClass: false,
  exBtnView: false,
};

export const 예외_미정의 = Template.bind({});
예외_미정의.args = {
  loading: false,
  exIcon: 'ic-warn',
  exTit: '조회할 수 없음',
  exSubTit: '오류가 발생했습니다. (코드: CODE)',
  exBtnRefresh: true,
  exAddClass: false,
  exBtnView: false,
};

// b예외 case b-1
export const 예외_CASE_B_1 = Template.bind({});
예외_CASE_B_1.args = {
  loading: false,
  exIcon: 'ic-warn',
  exTit: '잠시 후 다시 이용해 주세요.',
  exSubTit: '안정적인 서비스 이용을 위하여 월 N회만 조회하실 수 있습니다.',
  exBtnRefresh: false,
  exAddClass: true,
  exBtnView: false,
};
// b예외 case b-2
export const 예외_CASE_B_2 = Template.bind({});
예외_CASE_B_2.args = {
  loading: false,
  exIcon: 'ic-warn',
  exTit: '잔여량 조회 서비스를 이용하실 수 없습니다.',
  exSubTit: '이번 달 혹은 지난달에 기존 요금제로 다시 변경하신 이력이 있습니다.',
  exBtnRefresh: false,
  exAddClass: true,
  exBtnView: false,
};
// b예외 case b-4
export const 예외_CASE_B_4 = Template.bind({});
예외_CASE_B_4.args = {
  loading: false,
  exIcon: 'ic-warn',
  exTit: '잔여량 조회 서비스를 이용하실 수 없습니다.',
  exSubTit: '조회할 수 있는 항목이 없습니다.',
  exBtnRefresh: false,
  exAddClass: true,
  exBtnView: false,
};
// b예외 case b-6
export const 예외_CASE_B_6 = Template.bind({});
예외_CASE_B_6.args = {
  loading: false,
  exIcon: 'ic-warn',
  exTit: '잔여량 조회 서비스를 이용하실 수 없습니다.',
  exSubTit: '오류가 발생했습니다. 다시 시도해 주세요.',
  exBtnRefresh: true,
  exAddClass: true,
  exBtnView: false,
};

// c예외 CASE c. 데이터/통화 단독 모듈 적용
export const 예외_CASE_C = Template.bind({});
예외_CASE_C.args = {
  loading: false,
  exIcon: 'ic-warn',
  exTit: '서비스 점검 중입니다.',
  exSubTit: '잠시 후 다시 이용해주세요.  YYYY. M. D. H:M ~ YYYY. M. D. H:M',
  exBtnRefresh: false,
  exAddClass: false,
  exBtnView: false,
};
// d예외 CASE d. 데이터/통화 & 요금 통합 모듈 적용
export const 예외_CASE_D = Template.bind({});
예외_CASE_D.args = {
  loading: false,
  exIcon: 'ic-warn',
  exTit: '서비스 점검 중입니다.  잠시 후 다시 이용해 주세요.',
  exSubTit: 'YYYY. M. D. H:M ~ YYYY. M. D. H:M',
  exBtnRefresh: false,
  exAddClass: true,
  exBtnView: false,
};

// 예외 CASE e. 데이터/통화 단독 모듈 적용 Loading
export const 예외_CASE_LOADING = Template.bind({});
예외_CASE_LOADING.args = {
  loading: true,
  exIcon: null,
  exTit: null,
  exSubTit: null,
  exBtnRefresh: false,
  exAddClass: true,
  exBtnView: false,
};

// 유선 CASE 2. SK브로드밴드 가입회선
export const 유선_SK브로드밴드 = Template.bind({});
유선_SK브로드밴드.args = {
  loading: false,
  exIcon: 'ic-warn',
  exTit: '조회할 수 없음',
  exSubTit: 'SK브로드밴드에서 가입한 회선입니다.  SK브로드밴드 홈페이지를 이용해 주세요.',
  exBtnRefresh: false,
  exAddClass: false,
  exBtnView: false,
};
// 유선 CASE 3-1. 통합청구 대표회선
export const 유선_통합청구_대표회선 = Template.bind({});
유선_통합청구_대표회선.args = {
  loading: false,
  exIcon: null,
  exTit: null,
  exSubTit: null,
  exBtnRefresh: false,
  exAddClass: true,
  exBtnView: false,
};

// 유선 CASE 2-2. 통합청구 일반회선
export const 유선_통합청구_일반회선 = Template.bind({});
유선_통합청구_일반회선.args = {
  loading: false,
  exIcon: null,
  exTit: null,
  exSubTit: null,
  exBtnRefresh: false,
  exAddClass: true,
  exBtnView: false,
};
// 예외 CASE 1. 무선_서비스_점검
export const 무선_서비스_점검 = Template.bind({});
무선_서비스_점검.args = {
  loading: false,
  exIcon: 'ic-inspect',
  exTit: '서비스 점검 중입니다.',
  exSubTit: '잠시 후 다시 이용해주세요.  YYYY. M. D. H:M ~ YYYY. M. D. H:M',
  exBtnRefresh: false,
  exAddClass: true,
  exBtnView: false,
};

// 예외 CASE 4-1. 무선_조회불가 / 유선_조회불가
export const 조회불가_노출데이터_없음 = Template.bind({});
조회불가_노출데이터_없음.args = {
  loading: false,
  exIcon: 'ic-qck-myfee',
  exTit: '청구 내역 없음',
  exSubTit: '이번 달에 청구된 요금이 없습니다.',
  exBtnRefresh: false,
  exAddClass: false,
  exBtnView: true,
};

// 예외 CASE 4-2. 무선_조회불가 / 유선_조회불가
export const 조회불가_신규_가입이력_없음 = Template.bind({});
조회불가_신규_가입이력_없음.args = {
  loading: false,
  exIcon: 'ic-qck-myfee',
  exTit: '청구 내역 없음',
  exSubTit: '최근 6개월 내 청구된 요금이 없습니다.',
  exBtnRefresh: false,
  exAddClass: false,
  exBtnView: true,
};
