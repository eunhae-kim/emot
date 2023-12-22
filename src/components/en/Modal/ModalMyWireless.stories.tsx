import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ModalMyWireless } from './ModalMyWireless';

export default {
  title: 'Modal/EN_ModalMyWireless',
  component: ModalMyWireless,
  argTypes: {},
} as ComponentMeta<typeof ModalMyWireless>;

const Template: ComponentStory<typeof ModalMyWireless> = function fun(args) {
  return <ModalMyWireless {...args} />;
};

export const Default = Template.bind({});
Default.args = {};
