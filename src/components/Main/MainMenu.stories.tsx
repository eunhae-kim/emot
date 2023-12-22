import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MainMenu } from './MainMenu';
import { BASE_PATH } from '../../common/const';

export default {
  title: 'Main/Quick Menu',
  component: MainMenu,
  argTypes: {},
} as ComponentMeta<typeof MainMenu>;

const Template: ComponentStory<typeof MainMenu> = function fun(args) {
  return <MainMenu {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  quickMenuList: [
    {
      menuId: 'M002527',
      menuNm: '메뉴이름',
      menuUrl: 'https://www.naver.com',
      iconPath: `${BASE_PATH}/images/main/quickMenuIcon.png`,
      oferStcCd: 'CMMA_A20-169',
      exUrlNotiYn: 'Y',
      simpleLoginYn: 'Y',
    },
    {
      menuId: 'M002527',
      menuNm: '메뉴이름',
      menuUrl: 'https://www.naver.com',
      iconPath: `${BASE_PATH}/images/main/quickMenuIcon.png`,
      oferStcCd: 'CMMA_A20-169',
      exUrlNotiYn: 'Y',
      simpleLoginYn: 'Y',
    },
    {
      menuId: 'M002527',
      menuNm: '메뉴이름',
      menuUrl: 'https://www.naver.com',
      iconPath: `${BASE_PATH}/images/main/quickMenuIcon.png`,
      oferStcCd: 'CMMA_A20-169',
      exUrlNotiYn: 'Y',
      simpleLoginYn: 'Y',
    },
    {
      menuId: 'M002527',
      menuNm: '메뉴이름',
      menuUrl: 'https://www.naver.com',
      iconPath: `${BASE_PATH}/images/main/quickMenuIcon.png`,
      oferStcCd: 'CMMA_A20-169',
      exUrlNotiYn: 'Y',
      simpleLoginYn: 'Y',
    },
  ],
};
