import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Modal } from './Modal';

export default {
  title: 'Modal/Modal',
  component: Modal,
  argTypes: {},
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = function fun(args) {
  return <Modal {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
  title: '팝업',
  message: '메뉴 바로가기는 최대 20개까지<br /> 추가할 수 있습니다.',
};
