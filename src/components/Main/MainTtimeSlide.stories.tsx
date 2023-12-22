import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MainTtimeSlide } from './MainTtimeSlide';

export default {
  title: 'Main/[신규]-Ttime',
  component: MainTtimeSlide,
  argTypes: {},
} as ComponentMeta<typeof MainTtimeSlide>;

const Template: ComponentStory<typeof MainTtimeSlide> = function fun(args) {
  return <MainTtimeSlide {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  tTimeSlide: {
    contentList: [
      {
        contentUrl: '#none',
        thmbImgUrl:
          'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/9833/14413/ff5f5765cd31ae28d0f9ed17bbb6169c',
        contentTitle: '티백 주제명 표기',
        contentTime: '60',
      },
      {
        contentUrl: '#none',
        thmbImgUrl:
          'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/9833/14413/ff5f5765cd31ae28d0f9ed17bbb6169c',
        contentTitle:
          '제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다',
        contentTime: '60',
      },
      {
        contentUrl: '#none',
        thmbImgUrl:
          'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/9833/14413/ff5f5765cd31ae28d0f9ed17bbb6169c',
        contentTitle:
          '제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다',
        contentTime: '60',
      },
      {
        contentUrl: '#none',
        thmbImgUrl:
          'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/9833/14413/ff5f5765cd31ae28d0f9ed17bbb6169c',
        contentTitle:
          '제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다',
        contentTime: '60',
      },
      {
        contentUrl: '#none',
        thmbImgUrl:
          'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/9833/14413/ff5f5765cd31ae28d0f9ed17bbb6169c',
        contentTitle:
          '제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다',
        contentTime: '60',
      },
      {
        contentUrl: '#none',
        thmbImgUrl:
          'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/9833/14413/ff5f5765cd31ae28d0f9ed17bbb6169c',
        contentTitle:
          '제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다',
        contentTime: '60',
      },
      {
        contentUrl: '#none',
        thmbImgUrl:
          'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/9833/14413/ff5f5765cd31ae28d0f9ed17bbb6169c',
        contentTitle:
          '제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다',
        contentTime: '60',
      },
    ],
  },
};
