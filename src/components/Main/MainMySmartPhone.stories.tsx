import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MainMySmartPhone } from './MainMySmartPhone';

export default {
  title: 'Main/[MLS]추천-요금제',
  component: MainMySmartPhone,
  argTypes: {},
} as ComponentMeta<typeof MainMySmartPhone>;

const Template: ComponentStory<typeof MainMySmartPhone> = function fun(args) {
  return <MainMySmartPhone {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  planData: {
    id: 'NA00007789',
    name: '5GX 플래티넘',
    type: 'fee_prod',
    props: {
      curr_prod_data_gb: 97656.2490234375,
      curr_prod_id: 'NA00006405',
      curr_prod_nm: '5GX플래티넘',
      curr_prod_prc: 125000,
      data_sojin_rate_over_80_yn: 'Y',
      fee_chg_filter_yn: 'N',
      pred_daily_sojin_rate: [
        0.000009450000094500001, 0.000019430000194300002, 0.000021090000210900002, 0.0000266500002665,
        0.0000268700002687, 0.000054220000542200005, 0.00006919000069190001, 0.0000900600009006, 0.00009764000097640001,
        0.00010180000101800001, 0.00016933000169330002, 0.00017270000172700002, 0.00020401000204010002,
        0.0002055700020557, 0.00021727000217270002, 0.00022768000227680002, 0.00022969000229690003,
        0.00030576000305760004, 0.00031458000314580004, 0.00033080000330800005, 0.0003397200033972, 0.0003448500034485,
        0.0003567600035676, 0.0003660200036602, 0.00037701000377010006, 0.00039309000393090006, 0.00039903000399030004,
        0.00041157000411570007,
      ],
      pred_daily_usage_gb: [
        0.9228515625, 1.8974609375, 2.0595703125, 2.6025390625, 2.6240234375, 5.294921875, 6.7568359375, 8.794921875,
        9.53515625, 9.94140625, 16.5361328125, 16.865234375, 19.9228515625, 20.0751953125, 21.2177734375, 22.234375,
        22.4306640625, 29.859375, 30.720703125, 32.3046875, 33.17578125, 33.6767578125, 34.83984375, 35.744140625,
        36.8173828125, 38.3876953125, 38.9677734375, 40.1923828125,
      ],
      pred_month_sojin_rate: 0.00041157000411570007,
      pred_month_usage_gb: 40.1923828125,
      price: 125000,
      rank: 1,
      score: 0.957,
    },
    process_id: '4ec247cf-8e0f-430f-a536-74d393512aac',
  },
};
