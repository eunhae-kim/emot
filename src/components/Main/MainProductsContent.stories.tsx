import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MainProductsContent } from './MainProductsContent';

export default {
  title: 'Main/[MLS]추천-단말',
  component: MainProductsContent,
  argTypes: {},
} as ComponentMeta<typeof MainProductsContent>;

const Template: ComponentStory<typeof MainProductsContent> = function fun(args) {
  return <MainProductsContent {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  deviceO2OList: [
    {
      id: '000005713',
      process_id: '7f3fa6b1-08e9-4d13-b253-850b9a0e1f9c',
      name: '갤럭시 Z 플립4 5G',
      image: 'https://m.tworld.co.kr:8443/api/v6/proxy/tdsPhoneImage/A4/A453/default/A453_001_13.png',
      color: ['E0CABF', '4B4C51', 'B1BBD4', 'B6AACB', 'FFFFFF'],
      colorNm: ['핑크골드', '그라파이트', '블루', '보라퍼플', '화이트'],
      capacity: ['256G', '512G'],
      untactYn: true,
      finalAmt: '128905',
      selSubscriptionId: 'NA00008100',
      selSubscriptionNm: '다이렉트5G 69',
      productGrpId: '000005713',
      categoryId: '20010014',
      processId: '7f3fa6b1-08e9-4d13-b253-850b9a0e1f9c',
      channelId: 'reco_hist_eqp_mdl',
    },
    {
      id: '000005432',
      process_id: '7f3fa6b1-08e9-4d13-b253-850b9a0e1f9c',
      name: '갤럭시 S22 5G',
      image: 'https://m.tworld.co.kr:8443/api/v6/proxy/tdsPhoneImage/A4/A47S/default/A47S_001_13.png',
      color: ['EBD8D4', '344C49', 'F5F4F5', '212223', 'C8BEDA'],
      colorNm: ['핑크골드', '그린', '팬텀화이트', '팬텀블랙', '보라퍼플'],
      capacity: ['256G'],
      untactYn: true,
      finalAmt: '113271',
      selSubscriptionId: 'NA00008100',
      selSubscriptionNm: '다이렉트5G 69',
      productGrpId: '000005432',
      categoryId: '20010014',
      processId: '7f3fa6b1-08e9-4d13-b253-850b9a0e1f9c',
      channelId: 'reco_hist_eqp_mdl',
    },
  ],
};
