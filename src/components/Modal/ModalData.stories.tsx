import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ModalData } from './ModalData';

export default {
  title: 'Modal/ModalData',
  component: ModalData,
  argTypes: {},
} as ComponentMeta<typeof ModalData>;

const Template: ComponentStory<typeof ModalData> = function fun(args) {
  return <ModalData {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  isVisible: true,
};
