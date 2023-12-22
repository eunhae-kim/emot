import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MainItemsSlide } from './MainItemsSlide';

export default {
  title: 'Main/[MLS]추천-로밍',
  component: MainItemsSlide,
  argTypes: {},
} as ComponentMeta<typeof MainItemsSlide>;

const Template: ComponentStory<typeof MainItemsSlide> = function fun(args) {
  return <MainItemsSlide {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  title: '해외여행 계획 중이신가요?<br>인기 국가 별 추천 로밍 상품',
  roamingRanking: [
    { days: 4.3, rank: 1, country: 'Japan', country_kr: '일본' },
    { days: 5, rank: 2, country: 'Vietnam', country_kr: '베트남' },
    { days: 5.2, rank: 3, country: 'Thailand', country_kr: '태국' },
    { days: 16.5, rank: 4, country: 'United States', country_kr: '미국' },
    { days: 5.2, rank: 5, country: 'Philippines', country_kr: '필리핀' },
  ],
};
