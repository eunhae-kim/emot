import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import BottomSheetLogin from './BottomSheetLogin';

export default {
  title: 'T-time/BottomSheetLogin',
  component: BottomSheetLogin,
  argTypes: {},
} as ComponentMeta<typeof BottomSheetLogin>;

const Template: ComponentStory<typeof BottomSheetLogin> = function fun(args) {
  return <BottomSheetLogin {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  messageType: 'logoutUser',
};
