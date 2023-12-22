import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SurveyStep6 } from './SurveyStep6';

export default {
  title: 'Survey/Survey/서베이_STEP6',
  component: SurveyStep6,
  argTypes: {},
} as ComponentMeta<typeof SurveyStep6>;

const Survey06: ComponentStory<typeof SurveyStep6> = function fun(args) {
  return <SurveyStep6 {...args} />;
};

export const 서베이_STEP6 = Survey06.bind({});
