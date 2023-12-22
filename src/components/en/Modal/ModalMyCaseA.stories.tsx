import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ModalMyCaseA } from './ModalMyCaseA';

export default {
  title: 'Modal/ModalMyCaseA_EN',
  component: ModalMyCaseA,
  argTypes: {},
} as ComponentMeta<typeof ModalMyCaseA>;

const Template: ComponentStory<typeof ModalMyCaseA> = function fun(args) {
  return <ModalMyCaseA {...args} />;
};

export const Default = Template.bind({});
Default.args = {};
