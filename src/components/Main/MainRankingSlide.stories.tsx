import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MainRankingSlide } from './MainRankingSlide';
import { BASE_PATH } from '../../common/const';

export default {
  title: 'Main/[MLS]통계-V컬러링',
  component: MainRankingSlide,
  argTypes: {},
} as ComponentMeta<typeof MainRankingSlide>;

const Template: ComponentStory<typeof MainRankingSlide> = function fun(args) {
  return <MainRankingSlide {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  vcolorRanking: {
    cntsList: [
      {
        cntsId: '8',
        cntsRnk: '1',
        cntsUrl: 'https://www-qa.vcoloring.com/video/8',
        thmbImgUrl:
          'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/8/18/f1150f613c9f209a59b592990d1b6fcd',
        cntsNm: '전속력으로 달려가는 중',
        artistNm: 'TikTok',
      },
      {
        cntsId: '104465',
        cntsRnk: '2',
        cntsUrl: 'https://www-qa.vcoloring.com/video/104465',
        thmbImgUrl:
          'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/104465/311103/8840db9199d9cd356dc5b12fd9a40dea',
        cntsNm: 'DF LIVE Get the Bag (Feat. SINCE)',
        artistNm: 'SINCE',
      },
      {
        cntsId: '51296',
        cntsRnk: '3',
        cntsUrl: 'https://www-qa.vcoloring.com/video/51296',
        thmbImgUrl:
          'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/51296/150357/2ca9144d473c1c5ac89f3acf4157a213',
        cntsNm: '우리 사랑한 동안 (When We Were In Love)',
        artistNm: '에일리 (AILEE)',
      },
      {
        cntsId: '102930',
        cntsRnk: '4',
        cntsUrl: 'https://www-qa.vcoloring.com/video/102930',
        thmbImgUrl:
          'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/102930/311041/2a8be54fe5beea48feab812ff79bbd2e',
        cntsNm: 'NCT 127의 새해인사링',
        artistNm: 'NCT 127',
      },
      {
        cntsId: '104457',
        cntsRnk: '5',
        cntsUrl: 'https://www-qa.vcoloring.com/video/104457',
        thmbImgUrl:
          'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/104457/310773/df394dd75dbbbbc4dbd73c8ec392e519',
        cntsNm: '주라주라 아카펠라',
        artistNm: '셀럽파이브',
      },
      {
        cntsId: '9990',
        cntsRnk: '6',
        cntsUrl: 'https://www-qa.vcoloring.com/video/9990',
        thmbImgUrl:
          'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/9990/13570/0afe07a4586df88f9826efd406b54f38',
        cntsNm: '스튜디오장삐쭈 (장삐쭈)',
        artistNm: '장삐쭈',
      },
      {
        cntsId: '103422',
        cntsRnk: '7',
        cntsUrl: 'https://www-qa.vcoloring.com/video/103422',
        thmbImgUrl:
          'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/103422/310731/2841bd8aa0510aeac13e5d4e147bf9b4',
        cntsNm: '해피니스',
        artistNm: '레드벨벳',
      },
      {
        cntsId: '9879',
        cntsRnk: '8',
        cntsUrl: 'https://www-qa.vcoloring.com/video/9879',
        thmbImgUrl:
          'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/9879/13003/6b5a6484e20b7c70acd4830e15ddabb2',
        cntsNm: '보고싶어전화했니',
        artistNm: 'null',
      },
      {
        cntsId: '39352',
        cntsRnk: '9',
        cntsUrl: 'https://www-qa.vcoloring.com/video/39352',
        thmbImgUrl:
          'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/39352/94200/3c8a688be84f87fad4e493c275e52768',
        cntsNm: 'One Love',
        artistNm: '드림노트 (라라,미소,보니)',
      },
      {
        cntsId: '14',
        cntsRnk: '10',
        cntsUrl: 'https://www-qa.vcoloring.com/video/14',
        thmbImgUrl:
          'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/14/42/1c6788cefaa8fac45e7f556567cd4f3d',
        cntsNm: '휴가중, 전화를 받을 수 없습니다',
        artistNm: '틱톡 댄스',
      },
      {
        cntsId: '9893',
        cntsRnk: '11',
        cntsUrl: 'https://www-qa.vcoloring.com/video/9893',
        thmbImgUrl:
          'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/9893/13073/668bb2a886fae13e603f812be176eb26',
        cntsNm: '쿠키댄스',
        artistNm: 'null',
      },
      {
        cntsId: '104458',
        cntsRnk: '12',
        cntsUrl: 'https://www-qa.vcoloring.com/video/104458',
        thmbImgUrl:
          'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/104458/310775/9ed4cdb9c81e819f7031690c0d97f9cf',
        cntsNm: '다비이모님의 덕담',
        artistNm: '셀럽파이브',
      },
      {
        cntsId: '44106',
        cntsRnk: '13',
        cntsUrl: 'https://www-qa.vcoloring.com/video/44106',
        thmbImgUrl:
          'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/44106/116429/c80969759c6c929cc3f392feb25d9631',
        cntsNm: 'Spotlight',
        artistNm: 'BOBBY',
      },
      {
        cntsId: '9748',
        cntsRnk: '14',
        cntsUrl: 'https://www-qa.vcoloring.com/video/9748',
        thmbImgUrl:
          'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/9748/14774/48fb1945066c37267952b2ad2532ca64',
        cntsNm: 'Apple',
        artistNm: '여자친구 (GFRIEND)',
      },
      {
        cntsId: '104496',
        cntsRnk: '15',
        cntsUrl: 'https://www-qa.vcoloring.com/video/104496',
        thmbImgUrl:
          'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/104496/310711/4baeae6ecaf1533aebbb61b34ebda68c',
        cntsNm: 'Sticker',
        artistNm: 'NCT 127',
      },
      {
        cntsId: '47485',
        cntsRnk: '16',
        cntsUrl: 'https://www-qa.vcoloring.com/video/47485',
        thmbImgUrl:
          'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/47485/132315/fd198130dde9ed4861d7145dbbdba9cd',
        cntsNm: '던디리던 (Feat. Jessi)',
        artistNm: 'DAWN (던)',
      },
      {
        cntsId: '104396',
        cntsRnk: '17',
        cntsUrl: 'https://www-qa.vcoloring.com/video/104396',
        thmbImgUrl:
          'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/104396/309972/ceee8561a143341c6936da55bdcbeb29',
        cntsNm: '봄날',
        artistNm: '방탄소년단',
      },
      {
        cntsId: '9891',
        cntsRnk: '18',
        cntsUrl: 'https://www-qa.vcoloring.com/video/9891',
        thmbImgUrl:
          'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/9891/66470/548834a196f97d2556d1a1fb5d682092',
        cntsNm: '새벽전화방지링',
        artistNm: 'null',
      },
      {
        cntsId: '104470',
        cntsRnk: '19',
        cntsUrl: 'https://www-qa.vcoloring.com/video/104470',
        thmbImgUrl:
          'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/104470/310568/05535dddc164ada1fd8928b50d8849db',
        cntsNm: '경찰차',
        artistNm: '핑크퐁',
      },
      {
        cntsId: '102848',
        cntsRnk: '20',
        cntsUrl: 'https://www-qa.vcoloring.com/video/102848',
        thmbImgUrl:
          'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/102848/310661/579c5a2c22350300a6313726b815cf64',
        cntsNm: '모닥불 펭수 ASMR',
        artistNm: '펭수',
      },
    ],
    ctgRnkUrl: 'https://www-qa.vcoloring.com/search/ranking#current',
    ctgNm: 'top20',
  },
};
