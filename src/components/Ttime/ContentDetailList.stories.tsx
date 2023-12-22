import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ContentDetailList } from './ContentDetailList';
import { BASE_PATH } from '../../common/const';

export default {
  title: 'T-time/ContentDetailList',
  component: ContentDetailList,
  argTypes: {},
} as ComponentMeta<typeof ContentDetailList>;

const Template: ComponentStory<typeof ContentDetailList> = function fun(args) {
  return <ContentDetailList {...args} />;
};

// 컨텐츠 상세-이야기 리스트(최대 3개)
export const Default = Template.bind({});
Default.args = {
  storyList: [
    {
      isRead: true,
      isChecked: true,
      name: '티백 주제명 표기합니다.', //2023.08.16수정
      tag1: '#해시태그1',
      tag2: '#해시태그2',
      tag3: '#해시태그3',
      imageUrl: `${BASE_PATH}/images/sub/tTime-list-thumb01.png`,
    },
    {
      isRead: false,
      isChecked: false,
      name: '티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다. 티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다. 티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.',
      tag1: '#해시태그1',
      tag2: '#해시태그2',
      tag3: '#해시태그3',
      imageUrl: `${BASE_PATH}/images/sub/tTime-list-thumb01.png`,
    },
    {
      isRead: true,
      isChecked: true,
      name: '티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다. 티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다. 티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.',
      tag1: '#해시태그1',
      tag2: '#해시태그2',
      tag3: '#해시태그3',
      imageUrl: `${BASE_PATH}/images/sub/tTime-list-thumb02.png`,
    },
  ],
};
