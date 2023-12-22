import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { NavAppFooter } from './NavAppFooter';

export default {
  title: 'en/Fullmenu/하단_Footer',
  component: NavAppFooter,
  argTypes: {},
} as ComponentMeta<typeof NavAppFooter>;

const Template: ComponentStory<typeof NavAppFooter> = function fun(args) {
  return <NavAppFooter {...args} />;
};

export const Footer = Template.bind({});
Footer.args = {
  title: 'footer',

  customerTitle: '휴대폰 고객센터',
  customerText: '114',
  customerLink: 'tel:114',
  customerText2: '080-011-6000',
  customerLink2: 'tel:080-011-6000',
  customerText3: '1599-0011',
  customerLink3: 'tel:1599-0011',

  customerTelTitle: '인터넷∙집전화 고객센터',
  customerTelTExt: '080-816-2000',
  customerTelLink: 'tel:080-816-2000',
  customerTelTExt2: '1600-2000',
  customerTelLink2: 'tel:1600-2000',

  gname: 'KOR',
  gicon: 'ic-eng',
  gltd: 'Family SITE',
};
