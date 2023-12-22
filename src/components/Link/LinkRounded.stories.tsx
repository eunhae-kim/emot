import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { LinkRounded } from './LinkRounded';

export default {
  title: 'Common/링크-페이지 이동',
  component: LinkRounded,
  argTypes: {
    backgroundColor: { control: 'color' },
    color: { control: 'color' },
    borderColor: { control: 'color' },
  },
} as ComponentMeta<typeof LinkRounded>;

const Template: ComponentStory<typeof LinkRounded> = function fun(args) {
  return <LinkRounded {...args} />;
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: '아이폰 13 Pro 알아보기',
};

export const Medium = Template.bind({});
Medium.args = {
  size: 'medium',
  label: '내 요금제와 비교하기',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: '온가존 플랜 알아보기',
};
