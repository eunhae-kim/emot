import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BottomSheetAge } from './BottomSheetAge';

export default {
  title: 'Modal/BottomSheetAge',
  component: BottomSheetAge,
  argTypes: {},
} as ComponentMeta<typeof BottomSheetAge>;

const Template: ComponentStory<typeof BottomSheetAge> = function fun(args) {
  return <BottomSheetAge {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
  bottomSheetType: 'device',
  rankingSeg: {
    id: 'age_0_99',
    name: '모두',
    noReload: true,
  },
};
