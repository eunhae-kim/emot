import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SurveyStep3 } from './SurveyStep3';

export default {
  title: 'Survey/Survey/서베이_STEP3',
  component: SurveyStep3,
  argTypes: {},
} as ComponentMeta<typeof SurveyStep3>;

const Survey03: ComponentStory<typeof SurveyStep3> = function fun(args) {
  return <SurveyStep3 {...args} />;
};

export const 서베이_STEP3 = Survey03.bind({});
