import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MyMembershipNEW } from './MyMembershipNEW';

export default {
  title: 'MY/멤버십 모듈 NEW',
  component: MyMembershipNEW,
  argTypes: {},
} as ComponentMeta<typeof MyMembershipNEW>;

const Template: ComponentStory<typeof MyMembershipNEW> = function fun(args) {
  return <MyMembershipNEW {...args} />;
};

// 기본
export const 기본 = Template.bind({});
기본.args = {

};