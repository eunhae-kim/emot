import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ModalPassword } from './ModalPassword';

export default {
  title: 'Modal/ModalPassword',
  component: ModalPassword,
  argTypes: {},
} as ComponentMeta<typeof ModalPassword>;

const Template: ComponentStory<typeof ModalPassword> = function fun(args) {
  return <ModalPassword {...args} />;
};

export const Default = Template.bind({});
Default.args = {};
