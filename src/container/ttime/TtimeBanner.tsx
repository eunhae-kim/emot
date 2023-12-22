import React, { useEffect, useState } from 'react';
import V6Link from '../../components/Common/V6Link';
import XtrAw from '../../components/Common/XtrAw';
import { getTroomBanner, getTtimeMainBanner } from '../../api/ttime/banner';

interface TtimeBannerProps {
  bannerType: 'main' | 'mainList' | 'troom';
}

interface V6LinkCompProps {
  bannerInfo: any;
}

function V6LinkComp({ bannerInfo }: V6LinkCompProps) {
  return (
    <XtrAw appEid={bannerInfo.oferStcCd} webEid={bannerInfo.oferStcCd} xtrClick xtrView>
      <V6Link
        // eslint-disable-next-line no-script-url
        href={bannerInfo.imgLinkUrl ?? 'javascript:;'}
        billYn={bannerInfo.billYn}
        newWindow={bannerInfo.imgLinkTrgtClCd === '2' && 'BROWSER'}
      >
        <img src={bannerInfo.bnnrFilePathNm} alt={bannerInfo.bnnrImgAltCtt} width="100%" />
      </V6Link>
    </XtrAw>
  );
}

function TtimeBanner({ bannerType }: TtimeBannerProps) {
  const [bannerInfo, setBannerInfo] = useState<any>(undefined);

  useEffect(() => {
    const bannerApi = bannerType === 'main' || bannerType === 'mainList' ? getTtimeMainBanner : getTroomBanner;
    bannerApi()
      .then((response) => {
        // 여러개의 배너가 있을때는 최신등록 배너를 선택
        const selectedBanner = response.data.bannerList.reduce((max: any, obj: any) => {
          return obj.bnnrSeq > max.bnnrSeq ? obj : max;
        }, response.data.bannerList[0]);
        setBannerInfo(selectedBanner);
      })
      .catch(() => {
        console.error('ttime banner error');
      });
  }, []);

  return (
    <div>
      {bannerInfo && (
        <div>
          {bannerType === 'mainList' ? (
            <li key={`${JSON.stringify(bannerInfo)}`} className="banner-area">
              <V6LinkComp bannerInfo={bannerInfo} />
            </li>
          ) : (
            <div className="banner-area btm-border">
              <V6LinkComp bannerInfo={bannerInfo} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TtimeBanner;
