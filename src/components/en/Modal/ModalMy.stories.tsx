import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ModalMy } from '../Modal/ModalMy';

export default {
  title: 'Modal/ModalMy_EN',
  component: ModalMy,
  argTypes: {},
} as ComponentMeta<typeof ModalMy>;

const Template: ComponentStory<typeof ModalMy> = function fun(args) {
  return <ModalMy {...args} />;
};

export const Default = Template.bind({});
Default.args = {};
