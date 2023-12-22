import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TtimeThemeList } from './TtimeThemeList';
import { BASE_PATH } from '../../common/const';

export default {
  title: 'T-time/TtimeThemeList',
  component: TtimeThemeList,
  argTypes: {},
} as ComponentMeta<typeof TtimeThemeList>;

const Template: ComponentStory<typeof TtimeThemeList> = function fun(args) {
  return <TtimeThemeList {...args} />;
};

export const Default = Template.bind({});
// T타임-테마별이야기 리스트
Default.args = {
  themeList: [
    {
      id: 1,
      title: '아이폰',
      iconImageUrl: 'https://cdn-icons-png.flaticon.com/512/1002/1002375.png',
      iconImageAlt: 'string',
      subTitle: 'string',
      sequence: 1,
    },
    {
      id: 2,
      title: '안드로이드',
      iconImageUrl: 'https://cdn-icons-png.flaticon.com/512/1002/1002375.png',
      iconImageAlt: '안드로이드 이미지 설명',
      subTitle: '서브 타이틀',
      sequence: 2,
    },
    {
      id: 6,
      title: '달달한 꿀차',
      iconImageUrl: 'https://cdn-icons-png.flaticon.com/512/1002/1002375.png',
      iconImageAlt: '달달하쥬',
      subTitle: '달달하쥬',
      sequence: 3,
    },
  ],
};
