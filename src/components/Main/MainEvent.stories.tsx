import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MainEvent } from './MainEvent';

export default {
  title: 'Main/메인이벤트',
  component: MainEvent,
  argTypes: {},
} as ComponentMeta<typeof MainEvent>;

const Template: ComponentStory<typeof MainEvent> = function fun(args) {
  return <MainEvent />;
};