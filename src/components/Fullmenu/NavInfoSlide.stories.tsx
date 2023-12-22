import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { NavInfoSlide } from './NavInfoSlide';

export default {
  title: 'Fullmenu/이벤트 배너(sub)',
  component: NavInfoSlide,
  argTypes: {},
} as ComponentMeta<typeof NavInfoSlide>;

const Template: ComponentStory<typeof NavInfoSlide> = function fun(args) {
  return <NavInfoSlide {...args} />;
};

export const Single = Template.bind({});
export const Multiple = Template.bind({});
Single.args = {
  bannerList: [
    {
      src: 'https://s3-tworld-stg-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com/adminupload/bnnr/25767/1360/287578634.jpg',
      alt: '환경을 위한 행복한 습관 happy habit',
      href: 'https://www.happyhabit.co.kr/#main',
      imgLinkTrgtClCd: '2',
      oferStcCd: 'CMMA_A11_B3-202',
    },
  ],
};
Multiple.args = {
  bannerList: [
    {
      src: 'https://s3-tworld-stg-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com/adminupload/bnnr/25767/1360/287578634.jpg',
      alt: '환경을 위한 행복한 습관 happy habit',
      href: 'https://www.happyhabit.co.kr/#main',
      imgLinkTrgtClCd: '2',
      oferStcCd: 'CMMA_A11_B3-202',
    },
    {
      src: 'https://s3-tworld-stg-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com/adminupload/bnnr/25767/1360/1932109766.jpg',
      alt: 'AI, 시각장애인의 눈이 되다',
      href: 'https://www.youtube.com/watch?v=S33d6lonATY',
      imgLinkTrgtClCd: '2',
      oferStcCd: 'CMMA_A11_B3-203',
    },
    {
      src: 'https://s3-tworld-stg-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com/adminupload/bnnr/25767/1360/1668165476.jpg',
      alt: "독거 어르신의 안녕과 건강을 위한 'AI 돌봄' 서비스",
      href: 'http://happyconnect.co.kr/',
      imgLinkTrgtClCd: '2',
      oferStcCd: 'CMMA_A11_B3-204',
    },
  ],
};
