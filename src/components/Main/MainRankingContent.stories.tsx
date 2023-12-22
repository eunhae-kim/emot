import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MainRankingContent } from './MainRankingContent';
import { BASE_PATH } from '../../common/const';

export default {
  title: 'Main/[MLS]통계-V컬러링(OLD_삭제예정)',
  component: MainRankingContent,
  argTypes: {},
} as ComponentMeta<typeof MainRankingContent>;

const Template: ComponentStory<typeof MainRankingContent> = function fun(args) {
  return <MainRankingContent {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  title: '6월 2째주 가장 많이 선택한 V컬러링',
  ranking: [
    {
      name: '주간 무료 인기',
      list: [
        {
          href: '/',
          name: 'That That',
          desc: '싸이(PSY)',
          src: `${BASE_PATH}/images/transparent.png`,
          alt: '',
        },
        {
          href: '/',
          name: '사랑인가 봐(사내맞선 OST 사내맞선 OST사내맞선 OST',
          desc: '멜로망스',
          src: `${BASE_PATH}/images/transparent.png`,
          alt: '',
        },
        {
          href: '/',
          name: '우리들의 블루스',
          desc: '임영웅',
          src: `${BASE_PATH}/images/transparent.png`,
          alt: '',
        },
      ],
    },
    {
      name: '주간 유료 인기',
      list: [
        {
          href: '/',
          name: '사랑인가 봐(사내맞선 OST...',
          desc: '멜로망스',
          src: `${BASE_PATH}/images/transparent.png`,
          alt: '',
        },
        {
          href: '/',
          name: '우리들의 블루스',
          desc: '임영웅',
          src: `${BASE_PATH}/images/transparent.png`,
          alt: '',
        },
        {
          href: '/',
          name: 'That That',
          desc: '싸이(PSY)',
          src: `${BASE_PATH}/images/transparent.png`,
          alt: '',
        },
      ],
    },
  ],
  linkName: 'V컬러링 전체 순위 확인하기',
};
