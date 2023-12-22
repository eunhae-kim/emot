import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Icon } from '../consts';
import { MyJoinInfo } from './MyJoinInfo';

export default {
  title: 'MY/가입정보 - 무선 유선',
  component: MyJoinInfo,
  argTypes: {},
} as ComponentMeta<typeof MyJoinInfo>;

const Template: ComponentStory<typeof MyJoinInfo> = function fun(args) {
  return <MyJoinInfo {...args} />;
};
// 무선_가입정보
export const 모바일_가입_정보 = Template.bind({});
모바일_가입_정보.args = {
  joinTitle: '모바일 가입 정보',
  itemList: [
    {
      icon: Icon.CALENDAR,
      name: '기기할부',
      text: '5개월 남음',
    },
    {
      icon: Icon.DISCOUNT,
      name: '요금약정 종료일',
      text: '24. 03. 20.',
    },
    {
      icon: Icon.PLAN,
      name: '요금제',
      text: '5GX플래티넘',
    },
    {
      icon: Icon.PAY_SERV,
      name: '유료 부가서비스',
      text: '2건',
    },
    {
      icon: Icon.FREE_SERV,
      name: '무료 부가서비스',
      text: '5개',
    },
    {
      icon: Icon.OPT_PROGM,
      name: '옵션/할인 프로그램',
      text: '5개',
    },
    {
      icon: Icon.COMB_PRD,
      name: '결합상품',
      text: '1개',
    },
    {
      icon: Icon.ROAMING,
      name: 'T 로밍',
      text: 'T괌사이판 국...',
    },
  ],
};
// 유선_가입정보
export const 인터넷_전화_IPTV_가입_정보 = Template.bind({});
인터넷_전화_IPTV_가입_정보.args = {
  joinTitle: '인터넷/전화/IPTV 가입 정보',
  itemList: [
    {
      icon: Icon.INTERNET,
      name: '인터넷',
      text: 'T Giga+WiFi',
    },
    {
      icon: Icon.TELEPHONE,
      name: '전화',
      text: 'T 일반전화',
    },
    {
      icon: Icon.IP_TV,
      name: 'IPTV',
      text: 'Apple TV ',
    },
    {
      icon: Icon.SECURITY,
      name: '보안',
      text: 'T 일반전화',
    },
  ],
};
// 유선_가입정보_유선회선
export const 유선_가입정보_유선회선 = Template.bind({});
유선_가입정보_유선회선.args = {
  joinTitle: '유선 가입정보',
  itemList: [
    {
      icon: Icon.PLAN,
      name: '요금제',
      text: 'T Giga+WiFi',
    },
    {
      icon: Icon.DISCOUNT,
      name: '요금약정할인',
      text: '24.3.17종료',
    },
  ],
};
