import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { NavFullMenu } from './NavFullMenu';
import NavnListMy from './nav-list-my.json';
import NavnListPrdserv from './nav-list-prdserv.json';
import NavnListSuprt from './nav-list-suprt.json';

export default {
  title: 'en/Fullmenu/전체메뉴',
  component: NavFullMenu,
  argTypes: {},
} as ComponentMeta<typeof NavFullMenu>;

const Template: ComponentStory<typeof NavFullMenu> = function fun(args) {
  return <NavFullMenu {...args} />;
};

// 탭메뉴
export const Default = Template.bind({});
Default.args = {
  title: '전체메뉴',
  edited: false,
  fullNavList: [
    {
      id: 'my',
      navTitle: 'MY',
      icon: 'ic-menu-my',
      isActive: 'active',
      navList: NavnListMy,
    },
    {
      id: 'product',
      navTitle: 'Plans',
      icon: 'ic-qckmy-plan',
      isActive: null,
      navList: NavnListPrdserv,
    },
    {
      id: 'customer',
      navTitle: 'Support',
      icon: 'ic-menu-suprt',
      isActive: null,
      navList: NavnListSuprt,
    },
  ],
};
