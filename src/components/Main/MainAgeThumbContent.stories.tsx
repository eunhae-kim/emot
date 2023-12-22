import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MainAgeThumbContent } from './MainAgeThumbContent';
import { BASE_PATH } from '../../common/const';

export default {
  title: 'Main/[MLS]통계-단말',
  component: MainAgeThumbContent,
  argTypes: {},
} as ComponentMeta<typeof MainAgeThumbContent>;

const Template: ComponentStory<typeof MainAgeThumbContent> = function fun(args) {
  return <MainAgeThumbContent {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  seg: '모두',
  deviceRanking: [
    {
      capacity: ['256G', '512G'],
      color: ['5A5F58', 'F9F5EA', 'EADEE8', '27282A'],
      colorNm: ['그린', '크림', '라벤더', '팬텀블랙'],
      image: 'https://m.tworld.co.kr:8443/api/v6/proxy/tdsPhoneImage/A4/A4KX/default/A4KX_001_13.png',
      name: '갤럭시 S23 울트라 5G',
      productGrpId: '000005934',
      categoryId: '20010014',
      finalAmt: '139814',
      selSubscriptionId: 'NA00008100',
      selSubscriptionNm: '다이렉트5G 69',
    },
    {
      capacity: ['128G'],
      color: ['1E222B', '31394D', 'F9FAFB'],
      colorNm: ['블랙', '블루', '화이트'],
      image: 'https://m.tworld.co.kr:8443/api/v6/proxy/tdsPhoneImage/A3/A3XH/default/A3XH_001_13.png',
      name: '갤럭시 퀀텀3',
      productGrpId: '000005592',
      categoryId: '20010014',
      finalAmt: '93352',
      selSubscriptionId: 'NA00008100',
      selSubscriptionNm: '다이렉트5G 69',
    },
    {
      capacity: ['256G', '512G'],
      color: ['B1BBD4', 'FFFFFF', '4B4C51', 'E0CABF', 'B6AACB'],
      colorNm: ['블루', '화이트', '그라파이트', '핑크골드', '보라퍼플'],
      image: 'https://m.tworld.co.kr:8443/api/v6/proxy/tdsPhoneImage/A4/A453/default/A453_001_13.png',
      name: '갤럭시 Z 플립4 5G',
      productGrpId: '000005713',
      categoryId: '20010014',
      finalAmt: '128905',
      selSubscriptionId: 'NA00008100',
      selSubscriptionNm: '다이렉트5G 69',
    },
  ],
};
