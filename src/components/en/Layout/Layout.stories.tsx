import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import '../../../../styles/app.min.css';
// import '../../../styles/swiper-bundle.min.css';
import { Layout } from './Layout';

export default {
  title: 'en/Layout/Layout',
  component: Layout,
  argTypes: {},
} as ComponentMeta<typeof Layout>;

const Template: ComponentStory<typeof Layout> = function fun(args) {
  return <Layout {...args} />;
};

export const Large = Template.bind({});
Large.args = {};
