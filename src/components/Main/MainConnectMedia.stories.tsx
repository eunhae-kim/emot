/* eslint-disable */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { GameInfo, MainConnectMedia } from './MainConnectMedia';

export default {
  title: 'Main/[과제]에이닷미디어연계',
  component: MainConnectMedia,
  argTypes: {},
} as ComponentMeta<typeof MainConnectMedia>;

const ScheduledGame: GameInfo = {
  status: 'SCHEDULED',
  stadiumCode: 'JS',
  time: '오후 6:30',
  team1: {
    code: 'OB',
    score: 0,
  },
  team2: {
    code: 'WO',
    score: 0,
  },
  progress: {
    inning: 1,
    topBottom: 'T',
  },
};

const InProgressGame: GameInfo = {
  status: 'IN_PROGRESS',
  stadiumCode: 'SJ',
  time: '오후 6:30',
  team1: {
    code: 'SK',
    score: 5,
  },
  team2: {
    code: 'HT',
    score: 4,
  },
  progress: {
    inning: 5,
    topBottom: 'B',
  },
};

const EndedGame: GameInfo = {
  status: 'ENDED',
  stadiumCode: 'SW',
  time: '오후 6:30',
  team1: {
    code: 'SS',
    score: 99,
  },
  team2: {
    code: 'KT',
    score: 98,
  },
  progress: {
    inning: 1,
    topBottom: 'T',
  },
};

const CanceledGame: GameInfo = {
  status: 'CANCELED',
  stadiumCode: 'EL',
  time: '오후 6:30',
  team1: {
    code: 'NC',
    score: 0,
  },
  team2: {
    code: 'LT',
    score: 0,
  },
  progress: {
    inning: 1,
    topBottom: 'T',
  },
};

const Template: ComponentStory<typeof MainConnectMedia> = function fun(args) {
  return <MainConnectMedia {...args} />;
};

export const 게임_1개일때 = Template.bind({});
게임_1개일때.args = {
  gameList: [InProgressGame],
  title: '지금 프로야구 경기중이에요!',
  subject: 'SKT 고객이라면 <em class="point">에이닷</em>에서 데이터 걱정없이 보세요',
  buttonText: '에이닷 프로야구 생중계 보러 가기',
};

export const 게임_2개일때 = Template.bind({});
게임_2개일때.args = {
  gameList: [InProgressGame, ScheduledGame],
  title: '지금 준플레이오프 경기중이에요!',
  subject: 'SKT 고객이라면 <em class="point">에이닷</em>에서 데이터 걱정없이 보세요',
  buttonText: '에이닷 프로야구 생중계 보러 가기',
};

export const 게임_3개이상 = Template.bind({});
게임_3개이상.args = {
  gameList: [InProgressGame, ScheduledGame, EndedGame, CanceledGame],
  title: '지금 프로야구 경기 중이에요!',
  subject: 'SKT 고객이라면 <em class="point">에이닷</em>에서 데이터 걱정없이 보세요',
  buttonText: '에이닷 프로야구 생중계 보러 가기',
};

export const 경기종료_하이라이트 = Template.bind({});
경기종료_하이라이트.args = {
  gameLength: [EndedGame, EndedGame, EndedGame],
  title: '오늘 한국시리즈 결과 알려드릴게요',
  subject: '다음 경기 일정도 <em class="point">에이닷</em>에서 확인해보세요',
  buttonText: '에이닷 프로야구 바로가기',
  highlightText: '스피드 하나는 한화가 1등, 문동주에 김서현까지 온다. 역대 첫 150㎞ 선발진 결과는?',
};

export const 경기취소 = Template.bind({});
경기취소.args = {
  gameLength: 2,
  title: '오늘 프로야구 경기는 취소됐어요',
  subject: '대신 <em class="point">에이닷</em>이 지난 경기 하이라이트를 보여 드릴게요.',
  buttonText: '에이닷 프로야구 바로가기',
};

export const 컨펌_에이닷이동 = Template.bind({});
컨펌_에이닷이동.args = {
  gameLength: 1,
  title: 'SKT 고객이라면 <em class="point">에이닷</em>에서 데이터 걱정없이 보세요',
  subject: 'SKT 고객이라면 <em class="point">에이닷</em>에서 데이터 걱정없이 보세요',
  buttonText: '에이닷 프로야구 생중계 보러 가기',
  isOpen: true,
};
