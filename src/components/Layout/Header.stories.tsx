import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Header } from './Header';

export default {
  title: 'Layout/Header',
  component: Header,
  argTypes: {},
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = function fun(args) {
  return <Header />;
};

export const Large = Template.bind({});
Large.args = {};

export const Medium = Template.bind({});
Medium.args = {};

export const Small = Template.bind({});
Small.args = {};
