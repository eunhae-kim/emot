import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TtimeToast } from './TtimeToast';

export default {
  title: 'T-time/TtimeToast',
  component: TtimeToast,
  argTypes: {},
} as ComponentMeta<typeof TtimeToast>;

const Template: ComponentStory<typeof TtimeToast> = function fun(args) {
  return <TtimeToast {...args} />;
};

// 회선변경 토스트 팝업
export const 이야기안내_토스트팝업 = Template.bind({});
이야기안내_토스트팝업.args = {
  isShow: true,
  message: '이야기를 다 읽으셨군요!',
  type: 'storyGuide',
};

// 회선변경 토스트 팝업
export const 로그인안내_토스트팝업 = Template.bind({});
로그인안내_토스트팝업.args = {
  isShow: true,
  message: '로그인하고 다양한 컵을 모아보세요',
  type: 'loginGuide',
};
