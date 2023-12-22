import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MainVisualSlide } from './MainVisualSlide';

export default {
  title: 'Main/[MLS]추천-V컬러링',
  component: MainVisualSlide,
  argTypes: {},
} as ComponentMeta<typeof MainVisualSlide>;

const Template: ComponentStory<typeof MainVisualSlide> = function fun(args) {
  return <MainVisualSlide {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  vColoringReco: {
    cntsList: [
      {
        cntsId: '9833',
        cntsRnk: '1',
        cntsUrl: 'https://www-qa.vcoloring.com/video/9833',
        thmbImgUrl:
          'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/9833/14413/ff5f5765cd31ae28d0f9ed17bbb6169c',
        cntsNm: 'Stay Gold',
        artistNm: '방탄소년단',
      },
      {
        cntsId: '104496',
        cntsRnk: '2',
        cntsUrl: 'https://www-qa.vcoloring.com/video/104496',
        thmbImgUrl:
          'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/104496/310711/4baeae6ecaf1533aebbb61b34ebda68c',
        cntsNm: 'Sticker',
        artistNm: 'NCT 127',
      },
      {
        cntsId: '9748',
        cntsRnk: '3',
        cntsUrl: 'https://www-qa.vcoloring.com/video/9748',
        thmbImgUrl:
          'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/9748/14774/48fb1945066c37267952b2ad2532ca64',
        cntsNm: 'Apple',
        artistNm: '여자친구 (GFRIEND)',
      },
      {
        cntsId: '49985',
        cntsRnk: '4',
        cntsUrl: 'https://www-qa.vcoloring.com/video/49985',
        thmbImgUrl:
          'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/49985/144178/b02ce69a153892582a11f7fd0c270121',
        cntsNm: '위클리(Weeekly) 수진이의 컬러링',
        artistNm: '위클리',
      },
      {
        cntsId: '103417',
        cntsRnk: '5',
        cntsUrl: 'https://www-qa.vcoloring.com/video/103417',
        thmbImgUrl:
          'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/103417/310625/54634a14a7bd94e905d9151c2a40d4f9',
        cntsNm: 'badgirlgoodgirl',
        artistNm: '미스에이',
      },
      {
        cntsId: '104332',
        cntsRnk: '6',
        cntsUrl: 'https://www-qa.vcoloring.com/video/104332',
        thmbImgUrl:
          'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/104332/310111/739856124ffcbfba17740383e8b3568c',
        cntsNm: '하늘바라기 (Feat. 하림)',
        artistNm: '정은지',
      },
      {
        cntsId: '104456',
        cntsRnk: '7',
        cntsUrl: 'https://www-qa.vcoloring.com/video/104456',
        thmbImgUrl:
          'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/104456/310747/5f9f6ddf7c2bb27d895c2bec4de5f9d9',
        cntsNm: 'AB6IX (에이비식스) 동현이의 20초 하트 챌린지',
        artistNm: 'AB6IX (에이비식스)',
      },
      {
        cntsId: '104461',
        cntsRnk: '8',
        cntsUrl: 'https://www-qa.vcoloring.com/video/104461',
        thmbImgUrl:
          'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/104461/310751/718f9fbffcc895426780a78473632c76',
        cntsNm: 'AB6IX (에이비식스) 룰루랄라 웅 직캠',
        artistNm: 'AB6IX (에이비식스)',
      },
      {
        cntsId: '104484',
        cntsRnk: '9',
        cntsUrl: 'https://www-qa.vcoloring.com/video/104484',
        thmbImgUrl:
          'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/104484/311113/de034993e96f8f2cf6628791af188d01',
        cntsNm: '[연애혁명] 모든 밤 너에게',
        artistNm: '황민현',
      },
      {
        cntsId: '50891',
        cntsRnk: '10',
        cntsUrl: 'https://www-qa.vcoloring.com/video/50891',
        thmbImgUrl:
          'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/50891/148453/96fb0cde333bf22a67af817f18bc301a',
        cntsNm: 'Zig Zag',
        artistNm: 'Weeekly (위클리)',
      },
      {
        cntsId: '50094',
        cntsRnk: '11',
        cntsUrl: 'https://www-qa.vcoloring.com/video/50094',
        thmbImgUrl:
          'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/50094/144699/4632e6af0266a748529bcdfc31c25b33',
        cntsNm: '위클리(Weeekly) 재희의 컬러링',
        artistNm: '위클리',
      },
      {
        cntsId: '103418',
        cntsRnk: '12',
        cntsUrl: 'https://www-qa.vcoloring.com/video/103418',
        thmbImgUrl:
          'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/103418/311133/c8db1090a81219b413c14cb92f24de4d',
        cntsNm: 'Lovesickgirl',
        artistNm: 'BLACKPINK',
      },
      {
        cntsId: '104455',
        cntsRnk: '13',
        cntsUrl: 'https://www-qa.vcoloring.com/video/104455',
        thmbImgUrl:
          'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/104455/310745/688c456e020d7992b1b3c252ac8e777c',
        cntsNm: 'AB6IX (에이비식스) 웅이의 20초 하트 챌린지',
        artistNm: 'AB6IX (에이비식스)',
      },
      {
        cntsId: '104460',
        cntsRnk: '14',
        cntsUrl: 'https://www-qa.vcoloring.com/video/104460',
        thmbImgUrl:
          'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/104460/310749/effad575d9d1cb9c973f9248241c3575',
        cntsNm: 'AB6IX (에이비식스) 룰루랄라 단체 직캠',
        artistNm: 'AB6IX (에이비식스)',
      },
      {
        cntsId: '104476',
        cntsRnk: '15',
        cntsUrl: 'https://www-qa.vcoloring.com/video/104476',
        thmbImgUrl:
          'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/104476/310739/3ef47dd89a2764d14a669e5e8b30bc77',
        cntsNm: 'After School (SKT Jump Ver.)',
        artistNm: 'Weeekly (위클리)',
      },
    ],
    ctgRnkUrl: 'https://www-qa.vcoloring.com/search/ranking#idol',
    ctgNm: '아이돌',
    processId: '5d542b3e-777f-4307-a18e-3260a819ab92',
    id: '9',
    channelId: 'reco_vcolor_category',
  },
};
