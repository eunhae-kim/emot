import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MainSubscribeContent } from './MainSubscribeContent';

export default {
  title: 'Main/[MLS]통계-구독',
  component: MainSubscribeContent,
  argTypes: {},
} as ComponentMeta<typeof MainSubscribeContent>;

const Template: ComponentStory<typeof MainSubscribeContent> = function fun(args) {
  return <MainSubscribeContent {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  seg: '모두',
  scmRanking: {
    pckg_option_id_default_c0001: {
      categoryName: '전체',
      productList: [
        {
          prod_id: 'NM00000102',
          prod_nm: '배달의민족 구독',
          rank: 1,
          description: '대한민국 1등 배달앱',
          imageUrl:
            'https://scm-stg-an2-s3-be-image.s3.ap-northeast-2.amazonaws.com/img/ssp/contents/0003/36976/logo_배달의민족_1.png',
        },
        {
          prod_id: 'NM00000235',
          prod_nm: '현대백화점 구독',
          rank: 2,
          description: '현대백화점 30,000원 상당 혜택',
          imageUrl:
            'https://scm-stg-an2-s3-be-image.s3.ap-northeast-2.amazonaws.com/img/ssp/contents/0003/46287/현대백화점_브랜드_로고.png',
        },
        {
          prod_id: 'NM00000069',
          prod_nm: 'FLO 콘텐츠 팩 구독',
          rank: 3,
          description: '지금, 당신의 음악',
          imageUrl:
            'https://scm-stg-an2-s3-be-image.s3.ap-northeast-2.amazonaws.com/img/ssp/contents/0003/1339/flo Icon1.png',
        },
      ],
    },
    pckg_option_id_default_c0002: {
      categoryName: '라이프스타일',
      productList: [
        {
          prod_id: 'NM00000122',
          prod_nm: 'CGV_구독상품',
          rank: 1,
          description: 'CGV 상영관에서 사용 가능한 17,000원 상당 혜택 쿠폰',
          imageUrl:
            'https://scm-stg-an2-s3-be-image.s3.ap-northeast-2.amazonaws.com/img/ssp/contents/0003/6178/icon_1.png',
        },
        {
          prod_id: 'NM00000166',
          prod_nm: '클래스101 구독',
          rank: 2,
          description: '클래스101 8,000 캐시 + 클래스 5만 원 할인 쿠폰',
          imageUrl:
            'https://scm-stg-an2-s3-be-image.s3.ap-northeast-2.amazonaws.com/img/ssp/contents/0003/9206/클래스101_브랜드_로고1_1.png',
        },
        {
          prod_id: 'NM00000104',
          prod_nm: '사운드짐 구독',
          rank: 3,
          description: '사운드짐 구독',
          imageUrl:
            'https://scm-stg-an2-s3-be-image.s3.ap-northeast-2.amazonaws.com/img/ssp/contents/0003/5068/soundgym Icon1.png',
        },
      ],
    },
    pckg_option_id_default_c0003: {
      categoryName: '교통/여행',
      productList: [
        {
          prod_id: 'NM00000163',
          prod_nm: '하나투어 구독',
          rank: 1,
          description: '매월 10,000마일리지 적립, 우주고객 전용 여행 콘텐츠 제공, 여행상품 예약 시 추가 마일리지 지급',
          imageUrl:
            'https://scm-stg-an2-s3-be-image.s3.ap-northeast-2.amazonaws.com/img/ssp/contents/0003/10296/하나투어_브랜드_로고_1.png',
        },
        {
          prod_id: 'NM00000092',
          prod_nm: '모두의셔틀 구독',
          rank: 2,
          description: '집에서 회사까지, 나만의 셔틀',
          imageUrl:
            'https://scm-stg-an2-s3-be-image.s3.ap-northeast-2.amazonaws.com/img/ssp/contents/0003/11072/모두의셔틀_브랜드_로고2_1.png',
        },
        {
          prod_id: 'NM00000199',
          prod_nm: '아시아나항공 구독',
          rank: 3,
          description: '아시아나항공 할인 쿠폰+마일리지 적립 OZ 패키지',
          imageUrl:
            'https://scm-stg-an2-s3-be-image.s3.ap-northeast-2.amazonaws.com/img/ssp/contents/0003/40100/logo_아시아나항공01.png',
        },
      ],
    },
    pckg_option_id_default_c0004: {
      categoryName: '쇼핑',
      productList: [
        {
          prod_id: 'NM00000164',
          prod_nm: '동아제약 구독',
          rank: 1,
          description: '동아제약 디몰 3만 원 이상 할인 혜택',
          imageUrl:
            'https://scm-stg-an2-s3-be-image.s3.ap-northeast-2.amazonaws.com/img/ssp/contents/0003/10880/logo_동아제약디몰01.png',
        },
        {
          prod_id: 'NM00000129',
          prod_nm: 'SK스토아 구독',
          rank: 2,
          description: 'SK스토아가 드리는 20,000원 혜택 (TV쇼핑 20%할인쿠폰 2장)',
          imageUrl:
            'https://scm-stg-an2-s3-be-image.s3.ap-northeast-2.amazonaws.com/img/ssp/contents/0003/8185/41_skstoa_icon_1_1.png',
        },
        {
          prod_id: 'NM00000181',
          prod_nm: '홈플러스 구독',
          rank: 3,
          description: '신선하고 맛있는 메가푸드마켓 홈플러스 21,000원 혜택',
          imageUrl:
            'https://scm-stg-an2-s3-be-image.s3.ap-northeast-2.amazonaws.com/img/ssp/contents/0003/10266/홈플러스_브랜드_로고.png',
        },
      ],
    },
    pckg_option_id_default_c0005: {
      categoryName: '음식',
      productList: [
        {
          prod_id: 'NM00000117',
          prod_nm: '굽네치킨 구독',
          rank: 1,
          description: '굽네치킨 금액권 5천 원권 2장 ',
          imageUrl:
            'https://scm-stg-an2-s3-be-image.s3.ap-northeast-2.amazonaws.com/img/ssp/contents/0003/9135/굽네_브랜드_원형로고1_1.png',
        },
        {
          prod_id: 'NM00000184',
          prod_nm: '스윗밸런스 구독',
          rank: 2,
          description: '샐러드는 스윗밸런스! 총 40,000원 상당의 할인 혜택',
          imageUrl:
            'https://scm-stg-an2-s3-be-image.s3.ap-northeast-2.amazonaws.com/img/ssp/contents/0003/12380/스윗밸런스_브랜드_로고1.png',
        },
        {
          prod_id: 'NM00000102',
          prod_nm: '배달의민족 구독',
          rank: 3,
          description: '대한민국 1등 배달앱',
          imageUrl:
            'https://scm-stg-an2-s3-be-image.s3.ap-northeast-2.amazonaws.com/img/ssp/contents/0003/36976/logo_배달의민족_1.png',
        },
      ],
    },
    pckg_option_id_default_c0006: {
      categoryName: '콘텐츠',
      productList: [
        {
          prod_id: 'NM00000036',
          prod_nm: '원스토리 패스 구독',
          rank: 1,
          description: '5만권 이상 책과 웹툰을 한번에!',
          imageUrl:
            'https://scm-stg-an2-s3-be-image.s3.ap-northeast-2.amazonaws.com/img/ssp/contents/0003/36896/logo_원스토리패스01.png',
        },
        {
          prod_id: 'NM00000032',
          prod_nm: 'Wavve 콘텐츠 팩 구독',
          rank: 2,
          description: '즐거움의 파도를 타다!',
          imageUrl:
            'https://scm-stg-an2-s3-be-image.s3.ap-northeast-2.amazonaws.com/img/ssp/contents/0003/34761/WAVVE_브랜드_로고.png',
        },
        {
          prod_id: 'NM00000033',
          prod_nm: 'Wavve 앤 데이터 구독',
          rank: 3,
          description: '즐거움의 파도를 타다!',
          imageUrl:
            'https://scm-stg-an2-s3-be-image.s3.ap-northeast-2.amazonaws.com/img/ssp/contents/0003/34806/WAVVE_브랜드_로고_1.png',
        },
      ],
    },
    pckg_option_id_default_c0009: {
      categoryName: '카페/디저트',
      productList: [
        {
          prod_id: 'NM00000204',
          prod_nm: '달롤 구독',
          rank: 1,
          description: '달롤의 글루텐프리 디저트 2만원 혜택 (1만원 2회)',
          imageUrl:
            'https://scm-stg-an2-s3-be-image.s3.ap-northeast-2.amazonaws.com/img/ssp/contents/0003/42811/달롤_브랜드_로고_1.png',
        },
        {
          prod_id: 'NM00000161',
          prod_nm: '이디야커피 구독',
          rank: 2,
          description: '이디야멤버스 1,000원 할인쿠폰 15매(전제품 시용가능)',
          imageUrl:
            'https://scm-stg-an2-s3-be-image.s3.ap-northeast-2.amazonaws.com/img/ssp/contents/0003/9165/logo_이디야커피1.png',
        },
        {
          prod_id: 'NM00000109',
          prod_nm: '배스킨라빈스 구독',
          rank: 3,
          description: '우리동네 프리미엄 아이스크림',
          imageUrl:
            'https://scm-stg-an2-s3-be-image.s3.ap-northeast-2.amazonaws.com/img/ssp/contents/0003/5075/baskinrobins icon1_1.png',
        },
      ],
    },
  },
};
