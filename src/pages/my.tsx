/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useState } from 'react';

import { Layout } from '../components/Layout/Layout';
import LineSelector from '../container/LineSelector';
import My from '../container/My';
import { AppContext } from '../context/AppContext';
import BottomNav from '../container/BottomNav';
import { isApp } from '../js/commonUtil';

export default function BottomSheet() {
  return (
    <Layout addClass={isApp() ? '' : 'myweb'}>
      <html lang="ko" />
      <My />
    </Layout>
  );
}
