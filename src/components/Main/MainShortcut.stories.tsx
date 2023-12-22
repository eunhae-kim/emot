import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MainShortcut } from './MainShortcut';

export default {
  title: 'Main/ShortCut Menu',
  component: MainShortcut,
  argTypes: {},
} as ComponentMeta<typeof MainShortcut>;

const Template: ComponentStory<typeof MainShortcut> = function fun(args) {
  return <MainShortcut {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  shortCutMenuList: [
    {
      menuUrl: '/myt-data/submain',
      menuId: 'M000194',
      iconPath: 'https://cdnm.tworld.co.krnull',
      menuNm: '나의 데이터/통화',
    },
    {
      menuUrl: '/myt-data/submain',
      menuId: 'M000194',
      iconPath: 'https://cdnm.tworld.co.krnull',
      menuNm: '나의 데이터/통화',
    },
  ],
};
