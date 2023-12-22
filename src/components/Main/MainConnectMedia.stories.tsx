/* eslint-disable */       
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MainConnectMedia } from './MainConnectMedia';

export default {
  title: 'Main/에이닷미디어연계',
  component: MainConnectMedia,
  argTypes: {},
} as ComponentMeta<typeof MainConnectMedia>;

const Template: ComponentStory<typeof MainConnectMedia> = function fun(args) {
  return <MainConnectMedia {...args} />;
};

export const 경기중_1개일때 = Template.bind({});
경기중_1개일때.args = {
  gameLength: 1,
  title: '지금 프로야구 경기중이에요!',
  subject: 'SKT 고객이라면 <em class="text-point">에이닷</em>에서 데이터 걱정없이 보세요',
  buttonText: '에이닷 프로야구로 생중계 보러 가기',
};

export const 경기중_2개일때 = Template.bind({});
경기중_2개일때.args = {
  gameLength: 2,
  title: '지금 준플레이오프 경기중이에요!',
  subject: 'SKT 고객이라면 <em class="text-point">에이닷</em>에서 데이터 걱정없이 보세요',
  buttonText: '에이닷 프로야구로 생중계 보러 가기',
};

export const 경기중_3개이상 = Template.bind({});
경기중_3개이상.args = {
  gameLength: 3,
  title: '지금 프로야구 경기중이에요!',
  subject: 'SKT 고객이라면 <em class="text-point">에이닷</em>에서 데이터 걱정없이 보세요',
  buttonText: '에이닷 프로야구로 생중계 보러 가기',
};

export const 경기종료_하이라이트 = Template.bind({});
경기종료_하이라이트.args = {
  gameLength: 3,
  title: '오늘 한국시리즈 결과 알려드릴게요',
  subject: '다음 경기 일정도 <em class="text-point">에이닷</em>에서 확인해보세요',
  buttonText: '에이닷 프로야구 바로가기',
  highlight: true,
};

export const 경기취소 = Template.bind({});
경기취소.args = {
  gameLength: 2,
  title: '오늘 프로야구 경기는 취소됐어요',
  subject: '대신 지난 경기 하이라이트 <em class="text-point">에이닷</em>이 보여드려요',
  buttonText: '에이닷 프로야구 바로가기',
};
