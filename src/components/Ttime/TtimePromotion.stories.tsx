import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import TtimePromotion from './TtimePromotion';

export default {
  title: 'T-time/TtimePromotion',
  component: TtimePromotion,
  argTypes: {},
} as ComponentMeta<typeof TtimePromotion>;

const Template: ComponentStory<typeof TtimePromotion> = function fun(args) {
  return <TtimePromotion {...args} />;
};

export const Default = Template.bind({});
Default.args = {};
