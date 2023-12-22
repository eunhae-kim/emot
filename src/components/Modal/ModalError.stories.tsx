import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ModalError } from './ModalError';

export default {
  title: 'Modal/ModalNotice',
  component: ModalError,
  argTypes: {},
} as ComponentMeta<typeof ModalError>;

const Template: ComponentStory<typeof ModalError> = function fun(args) {
  return <ModalError {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
  title: '업그레이드 안내',
  message: '업그레이드 안내 팝업',
  osType: 'AOS'
};
