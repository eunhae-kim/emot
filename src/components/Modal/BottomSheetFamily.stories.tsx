import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BottomSheetFamily } from './BottomSheetFamily';

export default {
  title: 'Modal/BottomSheetFamily',
  component: BottomSheetFamily,
  argTypes: {},
} as ComponentMeta<typeof BottomSheetFamily>;

const Template: ComponentStory<typeof BottomSheetFamily> = function fun(args) {
  return <BottomSheetFamily {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
  title: 'Family SITE',
  cardList: [
    {
      id: 'Family-0',
      name: 'T-world Biz',
      href: '//b2b.T world.co.kr/cs/main.bc',
    },
    {
      id: 'Family-1',
      name: 'Korean',
      href: '//m.T world.co.kr/',
    },
    {
      id: 'Family-2',
      name: 'NUGU',
      href: '//www.younghandong.com/',
    },
    {
      id: 'Family-3',
      name: 'You can be anything you want when you are 0',
      href: '//www.younghandong.com/',
    },
    {
      id: 'Family-4',
      name: 'Creating the Age of Hyper-Innovation for YOU',
      href: '//www.sktinsight.com/113540',
    },
    {
      id: 'Family-5',
      name: 'SK shieldus',
      href: '//www.skshieldus.com/',
    },
  ],
};
