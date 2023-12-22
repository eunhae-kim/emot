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
  title: '정보 동의를 하시면 더 나은 통신생활을 위해 맞춤 정보를 제공해드려요',
  agreeList: [
    {
      id: 'agree-0',
      name: '[선택] 이동전화 고객 혜택 제공을 위한 개인정보 수집 이용 동의',
      value: 'N',
    },
    {
      id: 'agree-1',
      name: '[선택] 광고성 정보 수신 동의',
      value: 'N',
    },
    {
      id: 'agree-2',
      name: '[선택] 상품, 서비스 등 정보/혜택 푸시 알림',
      value: 'N',
    },
  ],
};
