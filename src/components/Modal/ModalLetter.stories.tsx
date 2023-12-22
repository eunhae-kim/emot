import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ModalNewApp } from './ModalNewApp';

export default {
  title: 'Modal/ModalNewApp',
  component: ModalNewApp,
  argTypes: {},
} as ComponentMeta<typeof ModalNewApp>;

const Template: ComponentStory<typeof ModalNewApp> = function fun(args) {
  return <ModalNewApp {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
  title: '팝업',
  message: '소문자 유도 팝업',
};
