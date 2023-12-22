import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TtimeListContent } from './TtimeListContent';

export default {
  title: 'Ttime/Ttime-리스트',
  component: TtimeListContent,
  argTypes: {},
} as ComponentMeta<typeof TtimeListContent>;

const Template: ComponentStory<typeof TtimeListContent> = function fun(args) {
  return <TtimeListContent {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  tTimeList: {
    item0: {
      categoryName: '전체',
      productList: [
        {
          tag1: '#해시태그1',
          tag2: '#해시태그2',
          name: '티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다. 티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.',
          time: 'NN',
          imageUrl:
            'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/9833/14413/ff5f5765cd31ae28d0f9ed17bbb6169c',
        },
        {
          tag1: '#해시태그1',
          tag2: '#해시태그2',
          name: '티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.',
          time: 'NN',
          imageUrl:
            'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/9833/14413/ff5f5765cd31ae28d0f9ed17bbb6169c',
        },
        {
          tag1: '#해시태그1',
          tag2: '#해시태그2',
          name: '티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.',
          time: 'NN',
          imageUrl:
            'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/9833/14413/ff5f5765cd31ae28d0f9ed17bbb6169c',
        },
        {
          tag1: '#해시태그1',
          tag2: '#해시태그2',
          name: '티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.',
          time: 'NN',
          imageUrl:
            'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/9833/14413/ff5f5765cd31ae28d0f9ed17bbb6169c',
        },
        {
          tag1: '#해시태그1',
          tag2: '#해시태그2',
          name: '티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다. 티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.',
          time: 'NN',
          imageUrl:
            'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/9833/14413/ff5f5765cd31ae28d0f9ed17bbb6169c',
        },
        {
          tag1: '#해시태그1',
          tag2: '#해시태그2',
          name: '티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.',
          time: 'NN',
          imageUrl:
            'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/9833/14413/ff5f5765cd31ae28d0f9ed17bbb6169c',
        },
        {
          tag1: '#해시태그1',
          tag2: '#해시태그2',
          name: '티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.',
          time: 'NN',
          imageUrl:
            'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/9833/14413/ff5f5765cd31ae28d0f9ed17bbb6169c',
        },
        {
          tag1: '#해시태그1',
          tag2: '#해시태그2',
          name: '티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.',
          time: 'NN',
          imageUrl:
            'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/9833/14413/ff5f5765cd31ae28d0f9ed17bbb6169c',
        },
        {
          tag1: '#해시태그1',
          tag2: '#해시태그2',
          name: '티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다. 티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.',
          time: 'NN',
          imageUrl:
            'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/9833/14413/ff5f5765cd31ae28d0f9ed17bbb6169c',
        },
        {
          tag1: '#해시태그1',
          tag2: '#해시태그2',
          name: '티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.',
          time: 'NN',
          imageUrl:
            'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/9833/14413/ff5f5765cd31ae28d0f9ed17bbb6169c',
        },
        {
          tag1: '#해시태그1',
          tag2: '#해시태그2',
          name: '티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.',
          time: 'NN',
          imageUrl:
            'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/9833/14413/ff5f5765cd31ae28d0f9ed17bbb6169c',
        },
        {
          tag1: '#해시태그1',
          tag2: '#해시태그2',
          name: '티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.',
          time: 'NN',
          imageUrl:
            'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/9833/14413/ff5f5765cd31ae28d0f9ed17bbb6169c',
        },
        {
          tag1: '#해시태그1',
          tag2: '#해시태그2',
          name: '티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다. 티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.',
          time: 'NN',
          imageUrl:
            'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/9833/14413/ff5f5765cd31ae28d0f9ed17bbb6169c',
        },
        {
          tag1: '#해시태그1',
          tag2: '#해시태그2',
          name: '티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.',
          time: 'NN',
          imageUrl:
            'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/9833/14413/ff5f5765cd31ae28d0f9ed17bbb6169c',
        },
        {
          tag1: '#해시태그1',
          tag2: '#해시태그2',
          name: '티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.',
          time: 'NN',
          imageUrl:
            'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/9833/14413/ff5f5765cd31ae28d0f9ed17bbb6169c',
        },
        {
          tag1: '#해시태그1',
          tag2: '#해시태그2',
          name: '티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.',
          time: 'NN',
          imageUrl:
            'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/9833/14413/ff5f5765cd31ae28d0f9ed17bbb6169c',
        },
        {
          tag1: '#해시태그1',
          tag2: '#해시태그2',
          name: '티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다. 티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.',
          time: 'NN',
          imageUrl:
            'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/9833/14413/ff5f5765cd31ae28d0f9ed17bbb6169c',
        },
        {
          tag1: '#해시태그1',
          tag2: '#해시태그2',
          name: '티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.',
          time: 'NN',
          imageUrl:
            'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/9833/14413/ff5f5765cd31ae28d0f9ed17bbb6169c',
        },
        {
          tag1: '#해시태그1',
          tag2: '#해시태그2',
          name: '티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.',
          time: 'NN',
          imageUrl:
            'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/9833/14413/ff5f5765cd31ae28d0f9ed17bbb6169c',
        },
        {
          tag1: '#해시태그1',
          tag2: '#해시태그2',
          name: '티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.',
          time: 'NN',
          imageUrl:
            'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/9833/14413/ff5f5765cd31ae28d0f9ed17bbb6169c',
        },
      ],
    },
    item1: {
      categoryName: '태그명1',
      productList: [
        {
          tag1: '#해시태그1',
          tag2: '#해시태그2',
          name: '티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.',
          time: 'NN',
          imageUrl:
            'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/9833/14413/ff5f5765cd31ae28d0f9ed17bbb6169c',
        },
        {
          tag1: '#해시태그1',
          tag2: '#해시태그2',
          name: '티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.',
          time: 'NN',
          imageUrl:
            'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/9833/14413/ff5f5765cd31ae28d0f9ed17bbb6169c',
        },
        {
          tag1: '#해시태그1',
          tag2: '#해시태그2',
          name: '티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.',
          time: 'NN',
          imageUrl:
            'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/9833/14413/ff5f5765cd31ae28d0f9ed17bbb6169c',
        },
      ],
    },
    item2: {
      categoryName: '태그명2',
      productList: [
        {
          tag1: '#해시태그1',
          tag2: '#해시태그2',
          name: '티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.',
          time: 'NN',
          imageUrl:
            'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/9833/14413/ff5f5765cd31ae28d0f9ed17bbb6169c',
        },
        {
          tag1: '#해시태그1',
          tag2: '#해시태그2',
          name: '티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.',
          time: 'NN',
          imageUrl:
            'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/9833/14413/ff5f5765cd31ae28d0f9ed17bbb6169c',
        },
        {
          tag1: '#해시태그1',
          tag2: '#해시태그2',
          name: '티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.',
          time: 'NN',
          imageUrl:
            'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/9833/14413/ff5f5765cd31ae28d0f9ed17bbb6169c',
        },
      ],
    },
    item3: {
      categoryName: '태그명3',
      productList: [
        {
          tag1: '#해시태그1',
          tag2: '#해시태그2',
          name: '티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.',
          time: 'NN',
          imageUrl:
            'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/9833/14413/ff5f5765cd31ae28d0f9ed17bbb6169c',
        },
        {
          tag1: '#해시태그1',
          tag2: '#해시태그2',
          name: '티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.',
          time: 'NN',
          imageUrl:
            'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/9833/14413/ff5f5765cd31ae28d0f9ed17bbb6169c',
        },
        {
          tag1: '#해시태그1',
          tag2: '#해시태그2',
          name: '티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.',
          time: 'NN',
          imageUrl:
            'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/9833/14413/ff5f5765cd31ae28d0f9ed17bbb6169c',
        },
      ],
    },
    item4: {
      categoryName: '태그명4',
      productList: [
        {
          tag1: '#해시태그1',
          tag2: '#해시태그2',
          name: '티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.',
          time: 'NN',
          imageUrl:
            'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/9833/14413/ff5f5765cd31ae28d0f9ed17bbb6169c',
        },
        {
          tag1: '#해시태그1',
          tag2: '#해시태그2',
          name: '티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.',
          time: 'NN',
          imageUrl:
            'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/9833/14413/ff5f5765cd31ae28d0f9ed17bbb6169c',
        },
        {
          tag1: '#해시태그1',
          tag2: '#해시태그2',
          name: '티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.',
          time: 'NN',
          imageUrl:
            'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/9833/14413/ff5f5765cd31ae28d0f9ed17bbb6169c',
        },
      ],
    },
    item5: {
      categoryName: '태그명5',
      productList: [
        {
          tag1: '#해시태그1',
          tag2: '#해시태그2',
          name: '티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.',
          time: 'NN',
          imageUrl:
            'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/9833/14413/ff5f5765cd31ae28d0f9ed17bbb6169c',
        },
        {
          tag1: '#해시태그1',
          tag2: '#해시태그2',
          name: '티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.',
          time: 'NN',
          imageUrl:
            'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/9833/14413/ff5f5765cd31ae28d0f9ed17bbb6169c',
        },
        {
          tag1: '#해시태그1',
          tag2: '#해시태그2',
          name: '티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.',
          time: 'NN',
          imageUrl:
            'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/9833/14413/ff5f5765cd31ae28d0f9ed17bbb6169c',
        },
      ],
    },
    item6: {
      categoryName: '태그명6',
      productList: [
        {
          tag1: '#해시태그1',
          tag2: '#해시태그2',
          name: '티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.',
          time: 'NN',
          imageUrl:
            'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/9833/14413/ff5f5765cd31ae28d0f9ed17bbb6169c',
        },
        {
          tag1: '#해시태그1',
          tag2: '#해시태그2',
          name: '티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.',
          time: 'NN',
          imageUrl:
            'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/9833/14413/ff5f5765cd31ae28d0f9ed17bbb6169c',
        },
        {
          tag1: '#해시태그1',
          tag2: '#해시태그2',
          name: '티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.',
          time: 'NN',
          imageUrl:
            'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/9833/14413/ff5f5765cd31ae28d0f9ed17bbb6169c',
        },
      ],
    },
    item7: {
      categoryName: '태그명7',
      productList: [
        {
          tag1: '#해시태그1',
          tag2: '#해시태그2',
          name: '티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.',
          time: 'NN',
          imageUrl:
            'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/9833/14413/ff5f5765cd31ae28d0f9ed17bbb6169c',
        },
        {
          tag1: '#해시태그1',
          tag2: '#해시태그2',
          name: '티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.',
          time: 'NN',
          imageUrl:
            'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/9833/14413/ff5f5765cd31ae28d0f9ed17bbb6169c',
        },
        {
          tag1: '#해시태그1',
          tag2: '#해시태그2',
          name: '티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.',
          time: 'NN',
          imageUrl:
            'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/9833/14413/ff5f5765cd31ae28d0f9ed17bbb6169c',
        },
      ],
    },
  },
};
