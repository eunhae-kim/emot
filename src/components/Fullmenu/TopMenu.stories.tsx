import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TopMenu } from './TopMenu';

export default {
  title: 'Fullmenu/TopMenu',
  component: TopMenu,
  argTypes: {},
} as ComponentMeta<typeof TopMenu>;

const Template: ComponentStory<typeof TopMenu> = function fun(args) {
  return <TopMenu {...args} />;
};

export const Primary = Template.bind({});
Primary.args = {
  quickMenuList: [
    {
      menuId: 'M000570',
      menuNm: 'T 멤버십',
      menuUrl: '/membership/submain',
      iconPath:
        'https://s3-tworld-stg-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com/adminupload/quickMenu/25767/1360/1613142574.jpg',
      oferStcCd: 'CMMA_A11_B3-158',
      exUrlNotiYn: 'N',
      simpleLoginYn: 'Y',
    },
    {
      menuId: 'M000439',
      menuNm: 'T 로밍',
      menuUrl: '/product/roaming',
      iconPath:
        'https://s3-tworld-stg-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com/adminupload/quickMenu/25767/1360/502170320.jpg',
      oferStcCd: 'CMMA_A11_B3-159',
      exUrlNotiYn: 'N',
      simpleLoginYn: 'Y',
    },
    {
      menuId: 'M000197',
      menuNm: '실시간 잔여량',
      menuUrl: '/myt-data/hotdata',
      iconPath:
        'https://s3-tworld-stg-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com/adminupload/quickMenu/25767/1360/1616458706.jpg',
      oferStcCd: 'CMMA_A11_B3-160',
      exUrlNotiYn: 'N',
      simpleLoginYn: 'Y',
    },
    {
      menuId: 'M000605',
      menuNm: '매장 찾기',
      menuUrl: '/customer/store/search',
      iconPath:
        'https://s3-tworld-stg-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com/adminupload/quickMenu/25767/1360/502155200.jpg',
      oferStcCd: 'CMMA_A11_B3-161',
      exUrlNotiYn: 'N',
      simpleLoginYn: 'Y',
    },
    {
      menuId: 'M000192',
      menuNm: 'English',
      menuUrl: '/en/main/home',
      iconPath:
        'https://s3-tworld-stg-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com/adminupload/quickMenu/25767/1360/502061289.jpg',
      oferStcCd: 'CMMA_A11_B3-153',
      exUrlNotiYn: 'N',
      simpleLoginYn: 'Y',
    },
  ],
};
