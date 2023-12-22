import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ModalMy } from './ModalMy';

export default {
  title: 'Modal/ModalMy',
  component: ModalMy,
  argTypes: {},
} as ComponentMeta<typeof ModalMy>;

const Template: ComponentStory<typeof ModalMy> = function fun(args) {
  return <ModalMy {...args} />;
};

export const Default = Template.bind({});
Default.args = {};
