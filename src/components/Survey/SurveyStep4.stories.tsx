import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SurveyStep4 } from './SurveyStep4';

export default {
  title: 'Survey/Survey/서베이_STEP4',
  component: SurveyStep4,
  argTypes: {},
} as ComponentMeta<typeof SurveyStep4>;

const Survey04: ComponentStory<typeof SurveyStep4> = function fun(args) {
  return <SurveyStep4 {...args} />;
};

export const 서베이_STEP4 = Survey04.bind({});
