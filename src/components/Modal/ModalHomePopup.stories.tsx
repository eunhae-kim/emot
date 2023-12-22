import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ModalHomePopup } from './ModalHomePopup';

export default {
  title: 'Modal/ModalHomePopup',
  component: ModalHomePopup,
  argTypes: {},
} as ComponentMeta<typeof ModalHomePopup>;

const Template: ComponentStory<typeof ModalHomePopup> = function fun(args) {
  return <ModalHomePopup {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
  type: '7',
};