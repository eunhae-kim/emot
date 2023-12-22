import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MainInfoSlide } from './MainInfoSlide';
import { BASE_PATH } from '../../common/const';

export default {
  title: 'Main/이럴땐 이렇게 해 보세요',
  component: MainInfoSlide,
  argTypes: {},
} as ComponentMeta<typeof MainInfoSlide>;

const Template: ComponentStory<typeof MainInfoSlide> = function fun(args) {
  return <MainInfoSlide {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  homeCicnts: [
    {
      icntsId: 'B00048',
      mainExpsSeq: '1',
      mainExpsTitNm: '스팸 정보를<br>차단하고 싶어요',
      mainExpsImgPathNm: `${BASE_PATH}/images/main/mobileGuide.png`,
      mainExpsImgAltCtt: '스팸 정보를 차단하고 싶어요.',
      icntsClCd: 'B',
      repCtgCd: 'B00011',
      mwBltnYn: 'Y',
      iosMaBltnYn: 'Y',
      adrMaBltnYn: 'Y',
      rollYn: 'Y',
      scrnTypCd: 'F',
      icntsLinkUrl: '/customer/faq/do-like-this?id=B00048',
    },
    {
      icntsId: 'B00048',
      mainExpsSeq: '1',
      mainExpsTitNm: '스팸 정보를<br>차단하고 싶어요',
      mainExpsImgPathNm: `${BASE_PATH}/images/main/mobileGuide.png`,
      mainExpsImgAltCtt: '스팸 정보를 차단하고 싶어요.',
      icntsClCd: 'B',
      repCtgCd: 'B00011',
      mwBltnYn: 'Y',
      iosMaBltnYn: 'Y',
      adrMaBltnYn: 'Y',
      rollYn: 'Y',
      scrnTypCd: 'F',
      icntsLinkUrl: '/customer/faq/do-like-this?id=B00048',
    },
    {
      icntsId: 'B00048',
      mainExpsSeq: '1',
      mainExpsTitNm: '스팸 정보를<br>차단하고 싶어요',
      mainExpsImgPathNm: `${BASE_PATH}/images/main/mobileGuide.png`,
      mainExpsImgAltCtt: '스팸 정보를 차단하고 싶어요.',
      icntsClCd: 'B',
      repCtgCd: 'B00011',
      mwBltnYn: 'Y',
      iosMaBltnYn: 'Y',
      adrMaBltnYn: 'Y',
      rollYn: 'Y',
      scrnTypCd: 'F',
      icntsLinkUrl: '/customer/faq/do-like-this?id=B00048',
    },
  ],
};
