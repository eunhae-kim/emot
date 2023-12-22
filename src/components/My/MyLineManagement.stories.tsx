import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { LineGroupType, LineIcon, MyLineManagement } from './MyLineManagement';

export default {
  title: 'MY/회선관리',
  component: MyLineManagement,
  argTypes: {},
} as ComponentMeta<typeof MyLineManagement>;

const Template: ComponentStory<typeof MyLineManagement> = function fun(args) {
  return <MyLineManagement {...args} />;
};

export const 모바일 = Template.bind({});
모바일.args = {
  title: '모바일',
  groupType: LineGroupType.MOBILE,
  baseUrl: '/',
  lineList: [
    {
      icon: LineIcon.모바일,
      lineLabel: 'iPhone 12',
      lineIdText: '010-21**-33**',
      is기준: true,
      is선택: true,
      svcMgmtNum: 12345671,
    },
    {
      icon: LineIcon.모바일,
      lineLabel: '선불폰',
      lineIdText: '010-21**-33**',
      is자녀: true,
      svcMgmtNum: 12345672,
    },
    {
      icon: LineIcon.모바일,
      lineLabel: 'T Pocket fi',
      lineIdText: '010-21**-33**',
      svcMgmtNum: 12345673,
    },
  ],
};

export const 인터넷_집전화_IPTV = Template.bind({});
인터넷_집전화_IPTV.args = {
  title: '인터넷/집전화/IPTV',
  groupType: LineGroupType.WIRED,
  lineList: [
    {
      icon: LineIcon.집전화,
      lineLabel: '집전화',
      lineIdText: '경기 하**********',
      svcMgmtNum: 12345681,
    },
    {
      icon: LineIcon.인터넷,
      lineLabel: '인터넷',
      lineIdText: '경기 하**********',
      svcMgmtNum: 12345682,
    },
    {
      icon: LineIcon.IPTV,
      lineLabel: '인터넷',
      lineIdText: '경기 하**********',
      svcMgmtNum: 12345683,
    },
  ],
};
