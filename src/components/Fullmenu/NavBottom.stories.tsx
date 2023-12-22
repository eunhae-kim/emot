import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {MenuInfoMap, NavBottom} from './NavBottom';

export default {
  title: 'Fullmenu/바텀네비',
  component: NavBottom,
  argTypes: {},
} as ComponentMeta<typeof NavBottom>;

const Template: ComponentStory<typeof NavBottom> = function fun(args) {
  return <NavBottom {...args} />;
};

export const menuInfoMapKo:MenuInfoMap = {
  MY: {
    label: 'MY',
    url: '/my',
  },
  HOME: {
    label: '홈',
    url: '/main',
  },
  SHOP: {
    label: 'T다이렉트샵',
    url: '/',
  },
  BENEFIT: {
    label: '혜택',
    url: '/benefit/main',
  },
  MENU: {
    label: '메뉴',
    url: '/menu',
  },
}

export const menuInfoMapEn:MenuInfoMap = {
  MY: {
    label: 'MY',
    url: '/en/my',
  },
  HOME: {
    label: 'HOME',
    url: '/en/main',
  },
  MENU: {
    label: 'MENU',
    url: '/en/menu',
  },
}

export const koNormal = Template.bind({});
koNormal.args = {
  lang: 'KO',
  bottomSheetMode: 'NORMAL',
  lineIdText: '010-98**-54**',
  quota: '56',
  quotaText: 'GB',
  tabIndex: 0,
  menuInfoMap: menuInfoMapKo
};

export const koLogin = Template.bind({});
koLogin.args = {
  lang: 'KO',
  bottomSheetMode: 'LOGIN',
  tabIndex: 0,
  menuInfoMap: menuInfoMapKo
};

export const enNormal = Template.bind({});
enNormal.args = {
  lang: 'EN',
  bottomSheetMode: 'NORMAL',
  lineIdText: '010-98**-54**',
  quota: '56',
  quotaText: 'Texts',
  tabIndex: 0,
  menuInfoMap: menuInfoMapEn
};

export const enLogin = Template.bind({});
enLogin.args = {
  lang: 'EN',
  bottomSheetMode: 'LOGIN',
  tabIndex: 0,
  menuInfoMap: menuInfoMapEn
};

export const enUnlimited = Template.bind({});
enUnlimited.args = {
  lang: 'EN',
  bottomSheetMode: 'NORMAL',
  lineIdText: '010-98**-54**',
  quotaText: 'Unlimited',
  tabIndex: 0,
  menuInfoMap: menuInfoMapEn
};

export const enRegisterLine = Template.bind({});
enRegisterLine.args = {
  lang: 'EN',
  bottomSheetMode: 'REGISTER_A_LINE',
  tabIndex: 0,
  menuInfoMap: menuInfoMapEn
};

export const enLinkToTworldKor = Template.bind({});
enLinkToTworldKor.args = {
  lang: 'EN',
  bottomSheetMode: 'NO_ACCESS_LINK_TO_KOR',
  tabIndex: 0,
  menuInfoMap: menuInfoMapEn
};

// 바텀시트_미적용
export const 바텀시트_미적용 = Template.bind({});
바텀시트_미적용.args = {
  lang: 'KO',
  bottomSheetMode: 'NONE',
  menuInfoMap: menuInfoMapKo
};
