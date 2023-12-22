import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TtimeCurrentInfo } from './TtimeCurrentInfo';

export default {
  title: 'T-time/TtimeCurrentInfo',
  component: TtimeCurrentInfo,
  argTypes: {},
} as ComponentMeta<typeof TtimeCurrentInfo>;

const Template: ComponentStory<typeof TtimeCurrentInfo> = function fun(args) {
  return <TtimeCurrentInfo {...args} />;
};

export const TID로그인 = Template.bind({});
TID로그인.args = { userName: '한민지', loginType: 'T', savedStroyNum: 0, readStroyNum: 0, collectedCupNum: 0 };

// T타임-T타임현황 비로그인 시
export const 로그아웃 = Template.bind({});
로그아웃.args = { userName: null, loginType: 'N', savedStroyNum: 0, readStroyNum: 0, collectedCupNum: 0 };

// T타임-T타임현황 간편로그인 시
export const 간편로그인 = Template.bind({});
간편로그인.args = { userName: '한민지', loginType: 'S', savedStroyNum: 0, readStroyNum: 0, collectedCupNum: 0 };
