import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MyQuickMenu } from './MyQuickMenu';

export default {
  title: 'MY/회선별 Quick Menu',
  component: MyQuickMenu,
  argTypes: {},
} as ComponentMeta<typeof MyQuickMenu>;

const Template: ComponentStory<typeof MyQuickMenu> = function fun(args) {
  return <MyQuickMenu {...args} />;
};

/*
{
  "menuId": "M000194",
  "menuNm": "나의 데이터/통화",
  "menuUrl": "/myt-data/submain",
  "iconPath": "https://s3-tworld-stg-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com/adminupload/guide/57345/4131/1554941872.png"
},
{
  "menuId": "M000233",
  "menuNm": "나의 요금",
  "menuUrl": "/myt-fare/submain",
  "iconPath": "https://s3-tworld-stg-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com/adminupload/guide/57345/4131/1701222457.png"
},
{
  "menuId": "M000301",
  "menuNm": "나의 가입 정보",
  "menuUrl": "/myt-join/submain",
  "iconPath": "https://s3-tworld-stg-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com/adminupload/guide/57345/4131/1783536027.png"
},
{
  "menuId": "M000563",
  "menuNm": "나의 혜택/할인",
  "menuUrl": "/benefit/my",
  "iconPath": "https://s3-tworld-stg-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com/adminupload/guide/57345/4131/950325734.png"
},
{
  "menuId": "M000819",
  "menuNm": "나의 쇼핑",
  "menuUrl": "https://m.shop.tworld.co.kr/my/submain",
  "iconPath": "https://s3-tworld-stg-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.comnull"
},
{
  "menuId": "M002336",
  "menuNm": "나의 구독",
  "menuUrl": "https://m-sktuniverse.tworld.co.kr/my/home",
  "iconPath": "https://s3-tworld-stg-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com/adminupload/guide/10572/93595/132709378.png"
}
*/
export const MY_퀵메뉴 = Template.bind({});
MY_퀵메뉴.args = {
  thumbList: [
    {
      icon: 'ic-qck-mydata',
      imgUrl: '/images/storybook/my/my나의데이터통화.png',
      link: '/myt-data/submain',
      text: '나의 데이터/통화',
      isNew: false,
    },
    {
      icon: 'ic-qck-myfee',
      imgUrl: '/images/storybook/my/my나의요금.png',
      link: '/myt-fare/submain',
      text: '나의 요금',
      isNew: false,
    },
    {
      icon: 'ic-qck-myinfo',
      imgUrl: '/images/storybook/my/my나의가입정보.png',
      link: '/myt-join/submain',
      text: '나의 가입정보',
      isNew: false,
    },
    {
      icon: 'ic-qckmy-benef',
      imgUrl: '/images/storybook/my/my혜택.png',
      link: '/benefit/my',
      text: '혜택',
      isNew: false,
    },
    {
      icon: 'ic-qckmy-shop',
      imgUrl: '/images/storybook/my/my나의쇼핑.png',
      link: 'https://m.shop.tworld.co.kr/my/submain',
      text: '나의 쇼핑',
      isNew: true,
    },
    {
      icon: 'ic-qck-subsc',
      imgUrl: '/images/storybook/my/my나의구독.png',
      link: 'https://m-sktuniverse.tworld.co.kr/my/main',
      text: '나의 구독',
      isNew: false,
    },
  ],
};

export const MY_퀵메뉴_유선회선 = Template.bind({});
MY_퀵메뉴_유선회선.args = MY_퀵메뉴.args;
