import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ImageRounded } from './ImageRounded';
import {BASE_PATH} from "../../common/const";

export default {
  title: 'Common/썸네일-이미지',
  component: ImageRounded,
  argTypes: {
    // backgroundColor: { control: 'color' },
    // color: { control: 'color' },
    // borderColor: { control: 'color' },
  },
} as ComponentMeta<typeof ImageRounded>;

const Template: ComponentStory<typeof ImageRounded> = function fun(args) {
  return <ImageRounded {...args} />;
};

export const Large = Template.bind({});
Large.args = {
  src: `${BASE_PATH}/images/transparent.png`,
  width: '400',
  height: '400',
  alt: '',
};

export const Medium = Template.bind({});
Medium.args = {
  src: `${BASE_PATH}/images/transparent.png`,
  width: '200',
  height: '200',
  alt: '',
};

export const Small = Template.bind({});
Small.args = {
  src: `${BASE_PATH}/images/transparent.png`,
  width: '100',
  height: '100',
  alt: '',
};
