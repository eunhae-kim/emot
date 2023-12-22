import React, { useEffect, useState } from 'react';
import { getNotice } from '../../api/main';
import { isAndroid, isApp, isIos } from '../../js/commonUtil';
import { MainNotice } from '../../components/Main/MainNotice';

export interface MainItemBoxProps {
  href: string;
  linkName: string;
}

export function Notice() {
  const [noticeList, setNoticeList] = useState(null);

  useEffect(() => {
    (async () => {
      const notice = await getNotice();
      let osType = '';

      if (isApp()) {
        if (isIos()) osType = 'I';
        if (isAndroid()) osType = 'A';
      } else {
        osType = 'M';
      }

      if (notice?.noticeList) {
        notice.noticeList.map((list) => {
          if (list.osType === osType) {
            setNoticeList(list.notice);
          }
        });
      }
    })();
  }, []);

  return noticeList && noticeList.length > 0 && <MainNotice noticeList={noticeList} />;
}
