import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ContentDetailNotiAgree } from './ContentDetailNotiAgree';

export default {
  title: 'T-time/ContentDetailNotiAgree',
  component: ContentDetailNotiAgree,
  argTypes: {},
} as ComponentMeta<typeof ContentDetailNotiAgree>;

const Template: ComponentStory<typeof ContentDetailNotiAgree> = function fun(args) {
  return <ContentDetailNotiAgree />;
};

export const Default = Template.bind({});
Default.args = {};
