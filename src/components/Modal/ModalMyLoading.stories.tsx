import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ModalMyLoading } from './ModalMyLoading';

export default {
  title: 'Modal/ModalMyLoading',
  component: ModalMyLoading,
  argTypes: {},
} as ComponentMeta<typeof ModalMyLoading>;

const Template: ComponentStory<typeof ModalMyLoading> = function fun(args) {
  return <ModalMyLoading {...args} />;
};

export const Default = Template.bind({});
Default.args = {};
