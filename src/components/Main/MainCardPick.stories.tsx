import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MainCardPick } from './MainCardPick';
import { BASE_PATH } from '../../common/const';

export default {
  title: 'Main/HOT & NEW',
  component: MainCardPick,
  argTypes: {},
} as ComponentMeta<typeof MainCardPick>;

const Template: ComponentStory<typeof MainCardPick> = function fun(args) {
  return <MainCardPick {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  rankList: [
    {
      list: [
        {
          bnnrId: '12',
          bnnrNm: '배너이름',
          bnnrImgUrl: `${BASE_PATH}/images/main/aType.png`,
          bnnrImgAltCtt: '혜택가득 갤럭시 S23 사전예약',
          bnnrLinkUrl: 'https://www.naver.com',
          billYn: 'Y',
          expsSeq: '1',
        },
        {
          bnnrId: '8',
          bnnrNm: '배너이름',
          bnnrImgUrl: `${BASE_PATH}/images/main/bType.png`,
          bnnrImgAltCtt: '혜택가득 갤럭시 S23 사전예약',
          bnnrLinkUrl: 'https://www.naver.com',
          billYn: 'Y',
          expsSeq: '6',
        },
        {
          bnnrId: '5',
          bnnrNm: '배너이름',
          bnnrImgUrl: `${BASE_PATH}/images/main/bType.png`,
          bnnrImgAltCtt: '혜택가득 갤럭시 S23 사전예약',
          bnnrLinkUrl: 'https://www.naver.com',
          billYn: 'Y',
          expsSeq: '5',
        },
        {
          bnnrId: '2',
          bnnrNm: '배너이름',
          bnnrImgUrl: `${BASE_PATH}/images/main/aType.png`,
          bnnrImgAltCtt: '혜택가득 갤럭시 S23 사전예약',
          bnnrLinkUrl: 'https://www.naver.com',
          billYn: 'N',
          expsSeq: '2',
        },
      ],
      xtr: [
        { app: 75, web: 157 },
        { app: 80, web: 162 },
        { app: 79, web: 161 },
        { app: 76, web: 158 },
      ],
    },
    {
      list: [
        {
          bnnrId: '1',
          bnnrNm: '배너이름',
          bnnrImgUrl: `${BASE_PATH}/images/main/aType.png`,
          bnnrImgAltCtt: '혜택가득 갤럭시 S23 사전예약',
          bnnrLinkUrl: 'https://www.naver.com',
          billYn: 'Y',
          expsSeq: '3',
        },
        {
          bnnrId: '6',
          bnnrNm: '배너이름',
          bnnrImgUrl: `${BASE_PATH}/images/main/bType.png`,
          bnnrImgAltCtt: '혜택가득 갤럭시 S23 사전예약',
          bnnrLinkUrl: 'https://www.naver.com',
          billYn: 'Y',
          expsSeq: '8',
        },
        {
          bnnrId: '13',
          bnnrNm: '배너이름',
          bnnrImgUrl: `${BASE_PATH}/images/main/bType.png`,
          bnnrImgAltCtt: '혜택가득 갤럭시 S23 사전예약',
          bnnrLinkUrl: 'https://www.naver.com',
          billYn: 'Y',
          expsSeq: '7',
        },
        {
          bnnrId: '4',
          bnnrNm: '배너이름',
          bnnrImgUrl: `${BASE_PATH}/images/main/aType.png`,
          bnnrImgAltCtt: '혜택가득 갤럭시 S23 사전예약',
          bnnrLinkUrl: 'https://www.naver.com',
          billYn: 'N',
          expsSeq: '4',
        },
      ],
      xtr: [
        { app: 77, web: 159 },
        { app: 82, web: 164 },
        { app: 81, web: 163 },
        { app: 78, web: 160 },
      ],
    },
  ],
};
