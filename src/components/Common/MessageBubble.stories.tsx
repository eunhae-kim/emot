import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MessageBubble, MessageBubbleType } from './MessageBubble';

export default {
  title: 'Common/메세지버블',
  component: MessageBubble,
  argTypes: {},
} as ComponentMeta<typeof MessageBubble>;

const Template: ComponentStory<typeof MessageBubble> = function fun(args) {
  return <MessageBubble {...args} />;
};

export const 메인화면 = Template.bind({});
메인화면.args = {
  type: MessageBubbleType.MAIN,
  message: '메인화면 메시지 버블입니다.',
};

export const 티타임화면 = Template.bind({});
티타임화면.args = {
  type: MessageBubbleType.TTIME,
  message: '티타임화면 메시지 버블입니다.',
};
