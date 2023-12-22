import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ModalEmergency } from './ModalEmergency';

export default {
  title: 'Modal/ModalEmergency',
  component: ModalEmergency,
  argTypes: {},
} as ComponentMeta<typeof ModalEmergency>;

const Template: ComponentStory<typeof ModalEmergency> = function fun(args) {
  return <ModalEmergency {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
  title: '사과의 말씀 드립니다',
  message: '장애 공지 팝업',
};
