import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ModalLine } from './ModalLine';
import { 모바일, 인터넷_집전화_IPTV } from '../My/MyLineManagement.stories';

export default {
  title: 'Modal/ModalLine',
  component: ModalLine,
  argTypes: { onClose: { action: 'onClose' } },
} as ComponentMeta<typeof ModalLine>;

const Template: ComponentStory<typeof ModalLine> = function fun(args) {
  return <ModalLine {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  isVisible: true,
  baseUrl: '/',
  lang: 'KO',
  mobileLineList: 모바일.args.lineList,
  wiredLineList: 인터넷_집전화_IPTV.args.lineList,
  onLineSelected: (lineInfo) => {
    console.log(`회선이 선택 됐습니다.`, lineInfo);
  },
};
