import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MiddleFullBannerSlide } from './MiddleFullBannerSlide';
import {BASE_PATH} from "../../common/const";

export default {
  title: 'Common/공통베너',
  component: MiddleFullBannerSlide,
  argTypes: {},
} as ComponentMeta<typeof MiddleFullBannerSlide>;

const Template: ComponentStory<typeof MiddleFullBannerSlide> = function fun(args) {
  return <MiddleFullBannerSlide {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  cardList: [
    {
      src: `${BASE_PATH}/images/thumbnail/middle-banner.png`,
      alt: '',
      href: '/',
    },
    {
      src: `${BASE_PATH}/images/thumbnail/middle-banner.png`,
      alt: '',
      href: '/',
    },
    {
      src: `${BASE_PATH}/images/thumbnail/middle-banner.png`,
      alt: '',
      href: '/',
    },
  ],
};
