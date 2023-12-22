import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MySubscribe } from './MySubscribe';

export default {
  title: 'MY/나의 구독',
  component: MySubscribe,
  argTypes: {},
} as ComponentMeta<typeof MySubscribe>;

const Template: ComponentStory<typeof MySubscribe> = function fun(args) {
  return <MySubscribe {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  subscribeList: [
    {
      src: 'https://scm-stg-an2-s3-be-image.s3.ap-northeast-2.amazonaws.com/img/ssp/contents/0003/36976/logo_배달의민족_1.png',
      text: '배달의민족 구독',
      date: '22. 05. 10 결제 예정',
    },
    {
      src: `https://scm-stg-an2-s3-be-image.s3.ap-northeast-2.amazonaws.com/img/ssp/contents/0003/34806/WAVVE_브랜드_로고_1.png`,
      text: 'Wavve 앤 데이터 구독',
      date: '22. 06. 20 결제 예정',
    },
    {
      src: `https://scm-stg-an2-s3-be-image.s3.ap-northeast-2.amazonaws.com/img/ssp/contents/0003/5075/baskinrobins icon1_1.png`,
      text: '배스킨라빈스 구독',
      date: '22. 07. 30 결제 예정',
    },
  ],
};
