import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MainBannerSlide } from './MainBannerSlide';
import { BASE_PATH } from '../../common/const';

export default {
  title: 'Main/메인베너(top)',
  component: MainBannerSlide,
  argTypes: {},
} as ComponentMeta<typeof MainBannerSlide>;

const Template: ComponentStory<typeof MainBannerSlide> = function fun(args) {
  return <MainBannerSlide {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  bannerList: [
    {
      src: `${BASE_PATH}/images/main/main-banner.jpeg`,
      alt: 'AI가 다 보정해 주는 쉽고 편리한 A.포토',
      href: 'https://www.naver.com',
      imgLinkTrgtClCd: '2',
      oferStcCd: 'CMMA_A20-224',
    },
    {
      src: `${BASE_PATH}/images/main/main-banner.jpeg`,
      alt: '첫 달 특별한 할인 매달 필요한 상품 집 앞으로 정기 배송',
      href: 'https://www.naver.com',
      imgLinkTrgtClCd: '1',
      oferStcCd: 'CMMA_A20-226',
    },
  ],
};
