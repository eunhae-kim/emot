import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SurveyStep9 } from './SurveyStep9';

export default {
  title: 'Survey/Survey/서베이완료_Case서버통신장애',
  component: SurveyStep9,
  argTypes: {},
} as ComponentMeta<typeof SurveyStep9>;

const Survey09: ComponentStory<typeof SurveyStep9> = function fun(args) {
  return <SurveyStep9 {...args} />;
};

export const 서베이완료_Case서버통신장애 = Survey09.bind({});
