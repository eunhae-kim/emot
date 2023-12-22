import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MainWrapContent } from './MainWrapContent';

export default {
  title: 'Main/[MLS]추천-보안',
  component: MainWrapContent,
  argTypes: {},
} as ComponentMeta<typeof MainWrapContent>;

const Template: ComponentStory<typeof MainWrapContent> = function fun(args) {
  return <MainWrapContent {...args} />;
};

export const 캡스홈 = Template.bind({});
export const T안심보안 = Template.bind({});

캡스홈.args = {
  type: 'home',
};

T안심보안.args = {
  type: 'store',
};
