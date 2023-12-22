import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ModalMyWirelessCaseA } from './ModalMyWirelessCaseA';

export default {
  title: 'Modal/EN_ModalMyWirelessCaseA',
  component: ModalMyWirelessCaseA,
  argTypes: {},
} as ComponentMeta<typeof ModalMyWirelessCaseA>;

const Template: ComponentStory<typeof ModalMyWirelessCaseA> = function fun(args) {
  return <ModalMyWirelessCaseA {...args} />;
};

export const Default = Template.bind({});
Default.args = {};
