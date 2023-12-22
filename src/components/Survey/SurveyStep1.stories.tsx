import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SurveyStep1 } from './SurveyStep1';

export default {
  title: 'Survey/Survey/서베이_STEP1',
  component: SurveyStep1,
  argTypes: {},
} as ComponentMeta<typeof SurveyStep1>;

const Survey01: ComponentStory<typeof SurveyStep1> = function fun(args) {
  return <SurveyStep1 {...args} />;
};

export const 서베이_STEP1 = Survey01.bind({});
