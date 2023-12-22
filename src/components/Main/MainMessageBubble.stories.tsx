import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MainMessageBubble } from './MainMessageBubble';

export default {
  title: 'Main/메세지버블',
  component: MainMessageBubble,
  argTypes: {},
} as ComponentMeta<typeof MainMessageBubble>;

const Template: ComponentStory<typeof MainMessageBubble> = function fun(args) {
  return <MainMessageBubble {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  message: {
    CARD_RULE: {
      statusCode: 'SUCCESS',
      items: [
        {
          mainAltmsgPhrs: 'adt_001',
          msg: '우리 집 안전이 고민되신다면?',
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
  },
};
