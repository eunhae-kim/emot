import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MyTitle, TitleType } from './MyTitle';

export default {
  title: 'My/EN_Title',
  component: MyTitle,
  argTypes: {},
} as ComponentMeta<typeof MyTitle>;

const Template: ComponentStory<typeof MyTitle> = function fun(args) {
  return <MyTitle {...args} />;
};
// 남은 데이터
export const 남은_데이터 = Template.bind({});
남은_데이터.args = {
  type: TitleType.남은데이터,
};
// 남은 통화
export const 남은_통화 = Template.bind({});
남은_통화.args = {
  type: TitleType.남은통화,
};
// 남은 문자
export const 남은_문자 = Template.bind({});
남은_문자.args = {
  type: TitleType.남은문자,
};

// 실시간 이용요금
export const 실시간_이용요금 = Template.bind({});
실시간_이용요금.args = {
  type: TitleType.지난달청구요금,
};
