import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { TtimeModalFullScreen } from './TtimeModalFullScreen';

export default {
  title: 'T-time/TtimeModalFullScreen',
  component: TtimeModalFullScreen,
  argTypes: {},
} as ComponentMeta<typeof TtimeModalFullScreen>;

const Template: ComponentStory<typeof TtimeModalFullScreen> = function fun(args) {
  return <TtimeModalFullScreen {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
};
