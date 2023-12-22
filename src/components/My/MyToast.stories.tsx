import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MyToast } from './MyToast';

export default {
  title: 'MY/Toast',
  component: MyToast,
  argTypes: {},
} as ComponentMeta<typeof MyToast>;

const Template: ComponentStory<typeof MyToast> = function fun(args) {
  return <MyToast {...args} />;
};

// 회선변경 토스트 팝업
export const 회선변경_토스트_팝업 = Template.bind({});
회선변경_토스트_팝업.args = {
  message: '회선이 변경되었습니다.',
};

export const 회선변경_토스트_팝업_영문 = Template.bind({});
회선변경_토스트_팝업_영문.args = {
  message: 'The line has been selected.',
};
