import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import BottomSheetSortFilter from './BottomSheetSortFilter';

export default {
  title: 'T-time/BottomSheetSortFilter',
  component: BottomSheetSortFilter,
  argTypes: {},
} as ComponentMeta<typeof BottomSheetSortFilter>;

const Template: ComponentStory<typeof BottomSheetSortFilter> = function fun(args) {
  return <BottomSheetSortFilter {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
  selectedSort: { title: '최신순', key: 'createDatetime', sort: 'desc' },
  onSort: (sort) => alert(`onSort 콜백 호출 (sort: ${JSON.stringify(sort)})`),
};
