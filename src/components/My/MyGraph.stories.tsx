import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { GraphType, MyGraph } from './MyGraph';

export default {
  title: 'MY/차트 항목별 표기 컬러 ',
  component: MyGraph,
  argTypes: {},
} as ComponentMeta<typeof MyGraph>;

const Template: ComponentStory<typeof MyGraph> = function fun(args) {
  return <MyGraph {...args} />;
};

// 남은 데이터
export const 남은_데이터 = Template.bind({});
남은_데이터.args = {
  mainRmTextArr: [
    {
      v: '40.5',
      unit: 'GB',
    },
  ],
  mainTotalText: '100GB',
  mainRmPct: 40.5,

  graphType: GraphType.DATA,

  familyDataRmPct: 5,
  familyDataRmText: '5GB',
  voiceSmsRmText: `4시간 53분/기본 제공`,

  lang: 'KO',
};
// 남은 통화
export const 남은_통화 = Template.bind({});
남은_통화.args = {
  mainRmTextArr: [
    {
      v: '4',
      unit: '시간',
    },
    {
      v: '35',
      unit: '분',
    },
  ],
  mainTotalText: '300분',
  mainRmPct: 40,
  graphType: GraphType.VOICE,
  smsRmText: '기본제공',

  lang: 'KO',
};
// 남은 문자
export const 남은_문자 = Template.bind({});
남은_문자.args = {
  mainRmTextArr: [
    {
      v: '56',
      unit: '건',
    },
  ],
  mainTotalText: '56',
  mainRmPct: 56,
  graphType: GraphType.SMS,

  lang: 'KO',
};

// 남은 데이터
export const 남은_데이터_EN = Template.bind({});
남은_데이터_EN.args = {
  mainRmTextArr: [
    {
      v: '40.5',
      unit: 'GB',
    },
  ],
  mainTotalText: '100GB',
  mainRmPct: 40.5,

  graphType: GraphType.DATA,

  familyDataRmPct: 5,
  familyDataRmText: '5GB',
  voiceSmsRmText: `4h 53m/Free`,

  lang: 'EN',
};
// 남은 통화
export const 남은_통화_EN = Template.bind({});
남은_통화_EN.args = {
  mainRmTextArr: [
    {
      v: '4',
      unit: 'h',
    },
    {
      v: '35',
      unit: 'm',
    },
  ],
  mainTotalText: '300m',
  mainRmPct: 40,
  graphType: GraphType.VOICE,
  smsRmText: 'Free',

  lang: 'EN',
};
// 남은 문자
export const 남은_문자_EN = Template.bind({});
남은_문자_EN.args = {
  mainRmTextArr: [
    {
      v: '56',
      unit: 'Texts',
    },
  ],
  mainTotalText: '56 Texts',
  mainRmPct: 56,
  graphType: GraphType.SMS,

  lang: 'EN',
};
