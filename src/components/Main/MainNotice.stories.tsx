import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MainNotice } from './MainNotice';

export default {
  title: 'Main/공지사항',
  component: MainNotice,
  argTypes: {},
} as ComponentMeta<typeof MainNotice>;

const Template: ComponentStory<typeof MainNotice> = function fun(args) {
  return <MainNotice {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  noticeList: [
    {
      bltnStaDtm: null,
      ntcTitNm: 'TMAP 데이터요금제 종료 안내',
      bltnSeq: '1',
      bltnEndDtm: null,
      ntcId: '21957',
      ntcLinkUrl: '/customer/svc-info/notice/view?ntcId=21957',
    },
  ],
};
