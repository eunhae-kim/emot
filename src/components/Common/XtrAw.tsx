import React, { useEffect, useState } from 'react';
import Xtr, { XtrProps } from './Xtr';
import { isApp } from '../../js/commonUtil';

export type XtrAwProps = XtrProps & {
  appEid: string;
  webEid: string;
  xtrEid: undefined;
};

// 앱/웹 eid 코드 쉽게 할당 할 수 있도록 Xtr을 Wrapping 해 준 컴포넌트
export default function ({ appEid, webEid, ...props }: XtrAwProps) {
  const [xtrEid, setXtrEid] = useState(appEid);

  useEffect(() => {
    if (!isApp()) {
      setXtrEid(webEid);
    }
  }, []);

  return <Xtr {...props} xtrEid={xtrEid} />;
}
