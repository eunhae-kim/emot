import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ModalPasswordInfo } from './ModalPasswordInfo';

export default {
  title: 'Modal/ModalPasswordInfo',
  component: ModalPasswordInfo,
  argTypes: {},
} as ComponentMeta<typeof ModalPasswordInfo>;

const Template: ComponentStory<typeof ModalPasswordInfo> = function fun(args) {
  return <ModalPasswordInfo {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  isVisible: true,
  lang: "KO"
};
