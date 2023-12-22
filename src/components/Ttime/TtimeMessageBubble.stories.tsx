import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TtimeMessageBubble } from './TtimeMessageBubble';

export default {
  title: 'Ttime/Ttime-메세지버블',
  component: TtimeMessageBubble,
  argTypes: {},
} as ComponentMeta<typeof TtimeMessageBubble>;

const Template: ComponentStory<typeof TtimeMessageBubble> = function fun(args) {
  return <TtimeMessageBubble {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  message: {
    CARD_RULE: {
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
  },
  className: 'tTime',
};
