import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BottomSheetTerms } from './BottomSheetTerms';

export default {
  title: 'Modal/BottomSheetTerms',
  component: BottomSheetTerms,
  argTypes: {},
} as ComponentMeta<typeof BottomSheetTerms>;

const Template: ComponentStory<typeof BottomSheetTerms> = function fun(args) {
  return <BottomSheetTerms {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
  bannerInfo: {
    bnnrFilePathNm: '/images/banner/agree_pop_banner.png',
    bnnrImgAltCtt: '이미지 alt',
    imgLinkTrgtClCd: '1',
    billYn: 'Y',
    imgLinkUrl: 'https://www.naver.com',
    oferStcCd: '00000000',
  } /* 230921 [MOZOP002-29936] 추가 */,
  title: '다양한 혜택 정보를 받으시려면<br>고객님의 동의가 필요합니다.' /* 230927 [MOZOP002-29936] 문구 수정 */,
  agreeList: [
    {
      id: 'agree-0',
      name: 'T world 개인정보 수집 이용 동의(선택)',
      value: 'N',
    },
    {
      id: 'agree-1',
      name: 'T world 광고성 정보 수신 동의(선택)',
      value: 'N',
    },
  ],
  pushAgree: {
    id: 'agree-2',
    name: '<strong>T 알림(Push) 동의</strong>하고<br />상품/서비스 등 혜택 정보를 받아 보세요.',
    value: 'N',
  },
};

/* 230921 [MOZOP002-29936] : start */
export const 배너가_없을_경우 = Template.bind({}); // 배너가 없을 경우
배너가_없을_경우.args = {
  isOpen: true,
  bannerInfo: undefined,
  title: '다양한 혜택 정보를 받으시려면<br>고객님의 동의가 필요합니다.' /* 230927 [MOZOP002-29936] 문구 수정 */,
  agreeList: [
    {
      id: 'agree-3',
      name: 'T world 개인정보 수집 이용 동의(선택)',
      value: 'N',
    },
    {
      id: 'agree-4',
      name: 'T world 광고성 정보 수신 동의(선택)' /* 230927 [MOZOP002-29936] 문구 수정 */,
      value: 'N',
    },
  ],
  pushAgree: {
    id: 'agree-2',
    name: '<strong>T 알림(Push) 동의</strong>하고<br />상품/서비스 등 혜택 정보를 받아 보세요.',
    value: 'N',
  },
};

export const 배너가_있을_경우 = Template.bind({}); // 배너가 있을 경우
배너가_있을_경우.args = {
  isOpen: true,
  bannerInfo: {
    bnnrFilePathNm: '/images/banner/agree_pop_banner.png',
    bnnrImgAltCtt: '이미지 alt',
    imgLinkTrgtClCd: '1',
    billYn: 'N',
    imgLinkUrl: '',
    oferStcCd: '00000000',
  } /* 230921 [MOZOP002-29936] 추가 */,
  title: '다양한 혜택 정보를 받으시려면<br>고객님의 동의가 필요합니다.' /* 230927 [MOZOP002-29936] 문구 수정 */,
  agreeList: [
    {
      id: 'agree-5',
      name: 'T world 개인정보 수집 이용 동의(선택)',
      value: 'N',
    },
    {
      id: 'agree-6',
      name: 'T world 광고성 정보 수신 동의(선택)' /* 230927 [MOZOP002-29936] 문구 수정 */,
      value: 'N',
    },
  ],
  pushAgree: {
    id: 'agree-2',
    name: '<strong>T 알림(Push) 동의</strong>하고<br />상품/서비스 등 혜택 정보를 받아 보세요.',
    value: 'N',
  },
};
/* 230921 [MOZOP002-29936] : end */
