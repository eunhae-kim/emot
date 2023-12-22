import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SurveyStep7 } from './SurveyStep7';

export default {
  title: 'Survey/Survey/서베이_결과분석중',
  component: SurveyStep7,
  argTypes: {},
} as ComponentMeta<typeof SurveyStep7>;

const Survey07: ComponentStory<typeof SurveyStep7> = function fun() {
  return <SurveyStep7 />;
};

export const 서베이_결과분석중 = Survey07.bind({});
