import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';

import { BottomSheetTerms } from '../components/Modal/BottomSheetTerms';
// import { Confirm } from '../components/Modal/Confirm';
import { getTermAgreement } from '../api/main';
import { isApp } from '../js/commonUtil';
import { isLoggedIn } from '../common/utils';

export default function ({ onClose }) {
  const appContext = useContext(AppContext);
  const [agreeList, setAgreeList] = useState([]);
  const [myInfo] = appContext.myInfo;

  useEffect(() => {
    if (!isLoggedIn(myInfo)) return;

    (async () => {
      const data = await getTermAgreement();

      if (!data) return;
      const list = [
        {
          id: 'twdInfoRcvAgreeYn',
          name: '[선택] T world 고객 혜택 제공을 위한 개인정보 수집 이용 동의',
          value: data.twdInfoRcvAgreeYn,
          href: '',
        },
        {
          id: 'twdAdRcvAgreeYn',
          name: '[선택] 광고성 정보 수신 동의',
          value: data.twdAdRcvAgreeYn,
          href: '',
        },
      ];

      if (isApp()) {
        list.push({
          id: 'tNotiInfoRcvAgreeYn',
          name: '[선택] 상품, 서비스 등 정보/혜택 푸시 알림',
          value: data.tNotiInfoRcvAgreeYn,
          href: '',
        });
      }

      const termList = list.filter((term) => term.value === 'N');
      setAgreeList(termList);
    })();
  }, [JSON.stringify(myInfo)]);

  return (
    <BottomSheetTerms
      isOpen
      title="선택 약관에 동의하시면 더 나은 통신 <br> 생활을 위해 맞춤 정보를 제공해 드려요."
      agreeList={agreeList}
      getClosed={onClose}
    />
  );
}
