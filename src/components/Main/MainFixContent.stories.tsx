import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MainFixContent } from './MainFixContent';

export default {
  title: 'Main/[MLS]추천-유선',
  component: MainFixContent,
  argTypes: {},
} as ComponentMeta<typeof MainFixContent>;

const Template: ComponentStory<typeof MainFixContent> = function fun(args) {
  return <MainFixContent {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  combineData: {
    numOfFamilyMembers: 1,
    maximumDiscountPrice: 17800,
  },
};
