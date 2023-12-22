import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TtimePersonalArea } from './TtimePersonalArea';

export default {
  title: 'Ttime/Ttime-개인화 영역',
  component: TtimePersonalArea,
  argTypes: {},
} as ComponentMeta<typeof TtimePersonalArea>;

const Template: ComponentStory<typeof TtimePersonalArea> = function fun(args) {
  return <TtimePersonalArea {...args} />;
};

export const Login = Template.bind({});
Login.args = {
  isLogin: true,
};

export const NoLogin = Template.bind({});
NoLogin.args = {
  isLogin: false,
};
