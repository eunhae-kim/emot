import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MyQuickMenu } from './MyQuickMenu';

export default {
  title: 'MY/EN_회선별 Quick Menu',
  component: MyQuickMenu,
  argTypes: {},
} as ComponentMeta<typeof MyQuickMenu>;

const Template: ComponentStory<typeof MyQuickMenu> = function fun(args) {
  return <MyQuickMenu {...args} />;
};

export const MY_영문_퀵메뉴 = Template.bind({});
MY_영문_퀵메뉴.args = {
  thumbList: [
    {
      icon: 'ic-qck-mydata',
      text: 'My Data/Talk/Text',
      new: false,
      link: '/en/myt-data/hotdata',
      xtrAwProps: {
        appEid: 'CMMA_A10_B134-11',
        webEid: 'MWMA_A10_B134-25',
        xtrView: true,
        xtrClick: true,
      },
    },
    {
      icon: 'ic-qck-myfee',
      text: 'My Bills',
      new: false,
      link: '/en/myt-fare/submain',
      xtrAwProps: {
        appEid: 'CMMA_A10_B134-12',
        webEid: 'MWMA_A10_B134-26',
        xtrView: true,
        xtrClick: true,
      },
    },
    {
      icon: 'ic-qck-myinfo',
      text: 'My Information',
      new: false,
      link: '/en/myt-join/submain',
      xtrAwProps: {
        appEid: 'CMMA_A10_B134-13',
        webEid: 'MWMA_A10_B134-27',
        xtrView: true,
        xtrClick: true,
      },
    },
  ],
};
