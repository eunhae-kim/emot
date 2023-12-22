import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Tooltip } from './Tooltip';

export default {
  title: 'MY/Tooltip',
  component: Tooltip,
  argTypes: {},
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = function fun(args) {
  return <Tooltip {...args} />;
};

export const 남은_데이터 = Template.bind({});
남은_데이터.args = {
  message:
    '남은 데이터는 사용하지 않은 기본 제공 데이터, 충전 데이터, 리필 데이터, 선물 받은 데이터와 T 가족모아데이터를 합한 양입니다',
};

export const 실시간_이용요금 = Template.bind({});
실시간_이용요금.args = {
  message:
    '이번 달 1일부터 현재까지의 휴대폰 요금입니다.  청구 시점에 할인/공제가 적용되는 경우, 실제 요금안내서  금액과 다를 수 있습니다.',
};
