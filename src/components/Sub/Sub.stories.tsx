import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Sub from './Sub';

export default {
  title: 'Ttime/Ttime-서브페이지',
  component: Sub,
  argTypes: {},
} as ComponentMeta<typeof Sub>;

const Template: ComponentStory<typeof Sub> = function fun(args) {
  return <Sub {...args} />;
};

const message = [
  {
    statusCode: 'SUCCESS',
    items: [
      {
        mainAltmsgPhrs: 'adt_001',
        msg: 'T-time 이란?',
        custNmUseYn: null,
        linkUrl: null,
        linkUrlTrgtCd: '3',
        billYn: 'N',
        rccardId: 'adt_001',
        oferStcCd: 'CMMA_A20-220',
        statusCode: 'SUCCESS',
      },
    ],
  },
];

const tTimeList = [
  {
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
        name: '티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.티백 주제명 표기합니다. 해당 영역은 최대 2줄 입력합니다.',
        time: 'NN',
        imageUrl:
          'https://m-stg.tworld.co.kr:8443/api/v6/proxy/vcoloringContentsImage/9833/14413/ff5f5765cd31ae28d0f9ed17bbb6169c',
      },
    ],
  },
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
];

export const Login = Template.bind({});
Login.args = {
  message,
  tTimeList,
  isLogin: true,
};

export const NoLogin = Template.bind({});
NoLogin.args = {
  message,
  tTimeList,
  isLogin: false,
};
