import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SurveyStep5 } from './SurveyStep5';

export default {
  title: 'Survey/Survey/서베이_STEP5',
  component: SurveyStep5,
  argTypes: {},
} as ComponentMeta<typeof SurveyStep5>;

const Survey05: ComponentStory<typeof SurveyStep5> = function fun(args) {
  return <SurveyStep5 {...args} />;
};

export const 서베이_STEP5 = Survey05.bind({});
