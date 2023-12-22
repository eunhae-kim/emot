import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ModalWired } from './ModalWired';

export default {
  title: 'Modal/ModalWired',
  component: ModalWired,
  argTypes: {},
} as ComponentMeta<typeof ModalWired>;

const Template: ComponentStory<typeof ModalWired> = function fun(args) {
  return <ModalWired {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
  isWeb: true,
};
