import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Confirm } from './Confirm';

export default {
  title: 'Modal/Confirm',
  component: Confirm,
  argTypes: {},
} as ComponentMeta<typeof Confirm>;

const Template: ComponentStory<typeof Confirm> = function fun(args) {
  return <Confirm {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
  title: '메뉴 바로가기 추가',
  message: '메뉴 바로가기는 최대 20개까지<br /> 추가할 수 있습니다.',
};

export const NoTitle = Template.bind({});
NoTitle.args = {
  isOpen: true,
  title: null,
  message: '메뉴 바로가기는 최대 20개까지<br /> 추가할 수 있습니다.',
};
