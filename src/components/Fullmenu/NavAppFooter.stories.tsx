import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { NavAppFooter } from './NavAppFooter';

export default {
  title: 'Fullmenu/하단 Footer',
  component: NavAppFooter,
  argTypes: {},
} as ComponentMeta<typeof NavAppFooter>;

const Template: ComponentStory<typeof NavAppFooter> = function fun(args) {
  return <NavAppFooter {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  isLoggedIn: false,
};
