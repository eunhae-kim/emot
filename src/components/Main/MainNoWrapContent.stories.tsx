import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MainNoWrapContent } from './MainNoWrapContent';
import { BASE_PATH } from '../../common/const';

export default {
  title: 'Main/[MLS]추천-멤버십',
  component: MainNoWrapContent,
  argTypes: {},
} as ComponentMeta<typeof MainNoWrapContent>;

const Template: ComponentStory<typeof MainNoWrapContent> = function fun(args) {
  return <MainNoWrapContent {...args} />;
};

export const 할인형고객 = Template.bind({});
export const 적립형고객 = Template.bind({});

할인형고객.args = {
  membershipType: '01',
  title: '상쾌한 아침을 위한 인기 혜택 리스트',
  mpStatistics: [
    {
      id: 1050,
      name: '제목',
      cardImgUrl: `${BASE_PATH}/images/main/membership.jpg`,
      benefitType: 'DISCOUNT',
      benefitDescription: '혜택 혜택 혜택 혜택 혜택 혜택',
    },
    {
      id: 1050,
      name: '제목',
      cardImgUrl: `${BASE_PATH}/images/main/membership.jpg`,
      benefitType: 'DISCOUNT',
      benefitDescription: '혜택 혜택 혜택 혜택 혜택 혜택',
    },
    {
      id: 1050,
      name: '제목',
      cardImgUrl: `${BASE_PATH}/images/main/membership.jpg`,
      benefitType: 'DISCOUNT',
      benefitDescription: '혜택 혜택 혜택 혜택 혜택 혜택',
    },
    {
      id: 1050,
      name: '제목',
      cardImgUrl: `${BASE_PATH}/images/main/membership.jpg`,
      benefitType: 'DISCOUNT',
      benefitDescription: '혜택 혜택 혜택 혜택 혜택 혜택',
    },
  ],
};

적립형고객.args = {
  membershipType: '02',
  title: '상쾌한 아침을 위한 인기 혜택 리스트',
  mpStatistics: [
    {
      id: 1050,
      name: '제목',
      cardImgUrl: `${BASE_PATH}/images/main/membership.jpg`,
      benefitType: 'SAVING',
      benefitDescription: '혜택 혜택 혜택 혜택 혜택 혜택',
    },
    {
      id: 1050,
      name: '제목',
      cardImgUrl: `${BASE_PATH}/images/main/membership.jpg`,
      benefitType: 'SAVING',
      benefitDescription: '혜택 혜택 혜택 혜택 혜택 혜택',
    },
    {
      id: 1050,
      name: '제목',
      cardImgUrl: `${BASE_PATH}/images/main/membership.jpg`,
      benefitType: 'SAVING',
      benefitDescription: '혜택 혜택 혜택 혜택 혜택 혜택',
    },
    {
      id: 1050,
      name: '제목',
      cardImgUrl: `${BASE_PATH}/images/main/membership.jpg`,
      benefitType: 'SAVING',
      benefitDescription: '혜택 혜택 혜택 혜택 혜택 혜택',
    },
  ],
};
