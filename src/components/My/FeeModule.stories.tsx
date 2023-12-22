import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FeeModule } from './FeeModule';

export default {
  title: 'My/통합청구 일반회선',
  component: FeeModule,
  argTypes: {},
} as ComponentMeta<typeof FeeModule>;

const Template: ComponentStory<typeof FeeModule> = function fun(args) {
  return <FeeModule {...args} />;
};

// 유선 CASE 2-2. 통합청구 일반회선 message
export const 유선_통합청구_일반회선_MESSAGE = Template.bind({});
유선_통합청구_일반회선_MESSAGE.args = {
  요금메시지: '대표회선으로 청구되었어요',
};
