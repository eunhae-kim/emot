import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MyTitle, TitleType } from './MyTitle';

export default {
  title: 'My/Title',
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
export const 무선_일반 = Template.bind({});
무선_일반.args = {
  type: TitleType.무선_일반,
};

// 유선 통합청구 대표회선
export const 유선_통합청구_대표회선 = Template.bind({});
유선_통합청구_대표회선.args = {
  type: TitleType.유선통합청구대표회선,
};

// 유선 통합청구 일반회선
export const 유선_통합청구_일반회선 = Template.bind({});
유선_통합청구_일반회선.args = {
  type: TitleType.유선통합청구일반회선,
};

// MY_유선회선
export const MY_유선회선 = Template.bind({});
MY_유선회선.args = {
  type: TitleType.MY유선회선,
};
