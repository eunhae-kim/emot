import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SurveyStep2 } from './SurveyStep2';

export default {
  title: 'Survey/Survey/서베이_STEP2',
  component: SurveyStep2,
  argTypes: {},
} as ComponentMeta<typeof SurveyStep2>;

const Survey02: ComponentStory<typeof SurveyStep2> = function fun(args) {
  return <SurveyStep2 {...args} />;
};

export const 서베이_STEP2 = Survey02.bind({});
