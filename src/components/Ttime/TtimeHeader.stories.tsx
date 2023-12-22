import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import TtimeHeader from './TtimeHeader';

export default {
  title: 'T-time/TtimeHeader',
  component: TtimeHeader,
  argTypes: {},
} as ComponentMeta<typeof TtimeHeader>;

const Template: ComponentStory<typeof TtimeHeader> = function fun(args) {
  return <TtimeHeader {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  title: 'T타임 헤더',
  isBack: true,
  headerButtonList: [
    { type: 'info', onClick: () => console.log('info') },
    { type: 'save', onClick: () => console.log('save') },
    { type: 'share', onClick: () => console.log('share') },
    { type: 'close', onClick: () => console.log('close') },
  ],
};
