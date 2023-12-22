import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SurveyStep10 } from './SurveyStep10';

export default {
  title: 'Survey/Survey/서베이완료_Case매칭단말없음',
  component: SurveyStep10,
  argTypes: {},
} as ComponentMeta<typeof SurveyStep10>;

const Survey10: ComponentStory<typeof SurveyStep10> = function fun() {
  return <SurveyStep10 />;
};

export const 서베이완료_Case매칭단말없음 = Survey10.bind({});
