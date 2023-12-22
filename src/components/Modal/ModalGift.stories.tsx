import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ModalGift } from './ModalGift';

export default {
  title: 'Modal/ModalGift',
  component: ModalGift,
  argTypes: {},
} as ComponentMeta<typeof ModalGift>;

const Template: ComponentStory<typeof ModalGift> = function fun(args) {
  return <ModalGift {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  isVisible: true,
};
