import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SurveyStep8 } from './SurveyStep8';

export default {
  title: 'Survey/Survey',
  component: SurveyStep8,
  argTypes: {},
} as ComponentMeta<typeof SurveyStep8>;

const Template: ComponentStory<typeof SurveyStep8> = function fun(args) {
  return <SurveyStep8 {...args} />;
};

export const 서베이완료_성공 = Template.bind({});
서베이완료_성공.args = {
  surveyResult: [
    {
      capacity: ['128G', '256G', '512G'],
      color: ['3D5B67', '5D5C58', 'E6E7E2', 'FCECD5'],
      comp: '애플',
      image: 'https://m.tworld.co.kr:8443/api/v6/proxy/tdsPhoneImage/A2/A2GF/default/A2GF_001_13.png',
      name: 'iPhone 12 Pro',
      productGrpId: '000004793',
      categoryId: '20010014',
      spec: '균형',
      rank: 5,
      score: 0.5085054729795074,
      colorNm: ['퍼시픽블루', '그래파이트', '실버', '골드'],
    },
    {
      capacity: ['128G'],
      color: ['2C2F32', 'FFFFFF', 'FFFFFF', 'FFFFFF', 'DEE6EC', '2C4468'],
      comp: '그외',
      image: 'https://m.tworld.co.kr:8443/api/v6/proxy/tdsPhoneImage/A3/A3W7/default/A3W7_001_13.png',
      name: '홍미노트11 프로 5G',
      productGrpId: '000005553',
      categoryId: '20010014',
      spec: '고사양',
      rank: 8,
      score: 0.41814869981762626,
      colorNm: ['그라파이트그레이', '그라파이트그레이', '아틀랜틱블루', '화이트', '폴라화이트', '아틀랜틱블루'],
    },
    {
      capacity: ['256G', '512G'],
      color: ['CFD5E1', '171717'],
      comp: '삼성',
      image: 'https://m.tworld.co.kr:8443/api/v6/proxy/tdsPhoneImage/A2/A2UJ/default/A2UJ_001_13.png',
      name: '갤럭시 S21 울트라 5G_512G',
      productGrpId: '000004874',
      categoryId: '20010014',
      spec: '균형',
      rank: 9,
      score: 0.40595950661658314,
      colorNm: ['팬텀실버', '팬텀블랙'],
    },
    {
      capacity: ['128G'],
      color: ['F3F4F4', '323133', 'C9E0F5'],
      comp: '삼성',
      image: 'https://m.tworld.co.kr:8443/api/v6/proxy/tdsPhoneImage/A3/A3VU/default/A3VU_001_13.png',
      name: '삼성 갤럭시 A23 LTE',
      productGrpId: '000005532',
      categoryId: '20010001',
      spec: '실속형',
      rank: 14,
      score: 0.3786783234446988,
      colorNm: ['화이트', '블랙', '블루'],
    },
    {
      capacity: ['256G'],
      color: ['404145', 'F0F0F2', 'F5C6C0', '9B9ABA'],
      comp: '삼성',
      image: 'https://m.tworld.co.kr:8443/api/v6/proxy/tdsPhoneImage/A2/A2SP/default/A2SP_001_13.png',
      name: '갤럭시 S21 5G',
      productGrpId: '000004872',
      categoryId: '20010014',
      spec: '균형',
      rank: 16,
      score: 0.36375985088134277,
      colorNm: ['팬텀그레이', '팬텀화이트', '팬텀핑크', '팬텀바이올렛'],
    },
    {
      capacity: ['128G', '256G', '512G'],
      color: ['276888', '364936', '232A32', 'FADDD7', 'BF0012', 'FAF7F2'],
      comp: '애플',
      image: 'https://m.tworld.co.kr:8443/api/v6/proxy/tdsPhoneImage/A3/A3ZC/default/A3ZC_001_13.png',
      name: 'iPhone 13 mini',
      productGrpId: '000005272',
      categoryId: '20010014',
      spec: '고사양',
      rank: 17,
      score: 0.3625002498584338,
      colorNm: ['블루', '그린', '미드나이트', '핑크', '(Product)RED', '스타라이트'],
    },
    {
      capacity: ['256G', '512G'],
      color: ['EADEE8', '27282A', 'F9F5EA', '5A5F58'],
      comp: '삼성',
      image: 'https://m.tworld.co.kr:8443/api/v6/proxy/tdsPhoneImage/A4/A4KW/default/A4KW_001_13.png',
      name: '갤럭시 S23+ 5G',
      productGrpId: '000005933',
      categoryId: '20010014',
      spec: '고사양',
      rank: 19,
      score: 0.3535531199242377,
      colorNm: ['라벤더', '팬텀블랙', '크림', '그린'],
    },
  ],
  processId: 'Hm4YgndYM332KYrJXGWSo8TmP3dWNh9z_1677055261403',
};
