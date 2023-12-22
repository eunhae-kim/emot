import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ContentDetailTag } from './ContentDetailTag';

export default {
  title: 'T-time/ContentDetailTag',
  component: ContentDetailTag,
  argTypes: {},
} as ComponentMeta<typeof ContentDetailTag>;

const Template: ComponentStory<typeof ContentDetailTag> = function fun(args) {
  return <ContentDetailTag {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  tags: ['태그1길게들어가면어떻게되는건징', '따끈따끈따끈핫핫뉴스', '오오오오오오오오오오오오', '태그4'],
};
