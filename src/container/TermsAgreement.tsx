import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { BottomSheetTerms } from '../components/Modal/BottomSheetTerms';
import { getTermAgreement, getTermAgreementBanner } from '../api/main';
import { isApp } from '../js/commonUtil';
import { isLoggedIn } from '../common/utils';

export default function ({ onClose }) {
  const appContext = useContext(AppContext);
  const [agreeList, setAgreeList] = useState([]);
  const [pushAgree, setPushAgree] = useState(undefined);
  const [bannerInfo, setBannerInfo] = useState(undefined);
  const [myInfo] = appContext.myInfo;

  useEffect(() => {
    if (!isLoggedIn(myInfo)) return;

    (async () => {
      const data = await getTermAgreement();

      if (!data) return;
      const list = [
        {
          id: 'twdInfoRcvAgreeYn',
          name: 'T world 개인정보 수집 이용 동의(선택)',
          value: data.twdInfoRcvAgreeYn,
          href: '',
        },
        {
          id: 'twdAdRcvAgreeYn',
          name: 'T world 광고성 정보 수신 동의(선택)',
          value: data.twdAdRcvAgreeYn,
          href: '',
        },
      ];

      const termList = list.filter((term) => term.value === 'N');

      setAgreeList(termList);

      // 앱 푸시 수신 동의
      if (isApp() && data.tNotiInfoRcvAgreeYn === 'N') {
        setPushAgree({
          id: 'tNotiInfoRcvAgreeYn',
          name: '<strong>T 알림(Push) 동의</strong>하고<br />상품/서비스 등 혜택 정보를 받아 보세요.',
          value: data.tNotiInfoRcvAgreeYn,
          href: '',
        });
      }

      try {
        const bannerResponse = await getTermAgreementBanner();
        const selectedBanner = bannerResponse.bannerList.reduce((max: any, obj: any) => {
          return obj.expsStaDtm > max.expsStaDtm ? obj : max;
        }, bannerResponse.bannerList[0]);
        setBannerInfo(selectedBanner);
      } catch (e) {
        console.error('getTermAgreementBanner error');
      }
    })();
  }, [JSON.stringify(myInfo)]);

  return (
    <BottomSheetTerms
      isOpen
      title="다양한 혜택 정보를 받으시려면<br>고객님의 동의가 필요합니다."
      agreeList={agreeList}
      pushAgree={pushAgree}
      getClosed={onClose}
      bannerInfo={bannerInfo}
    />
  );
}
