/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';
import { Icon } from '../consts';
import MyLink from '../Common/MyLink';
import chooseLineApi from '../../api/my/chooseLine';
import { myRedirect } from '../../common/utils';
import { isApp } from '../../js/commonUtil';
import XtrAw, { XtrAwProps } from '../Common/XtrAw';

// export type JoinInfoIcon = Icon.CALENDAR | Icon.DISCOUNT | Icon.PLAN | Icon.INTERNET | Icon.TELEPHONE | Icon.IP_TV;

export interface MyItemsProps {
  icon: Icon;
  name: string;
  text: string;
  link?: string;
  svcInfo?: any;
  xtrAwProps: XtrAwProps;
}
export interface MyJoinInfoProps {
  joinTitle: string;
  itemList: Array<MyItemsProps>;
}

export function MyJoinInfo({ joinTitle, itemList }: MyJoinInfoProps) {
  const changeLineAndRedirect = async ({ url, svcMgmtNum }) => {
    let targetUrl = url;
    let resp;
    try {
      resp = await chooseLineApi({
        data: { svcMgmtNum },
      });
    } catch (e) {
      //
    }

    if (resp?.respCode === 0) {
      targetUrl += '?line_change=Y';
    } else {
      targetUrl += '?line_change=F';
    }
    myRedirect(targetUrl);
    // 앱에서는 링크가 메인 웹뷰에서 열리고 My 화면은 별도 웹뷰에 그대로 남아 있어서 회선 변경 된 상태로 리프레시 해 줌
    // PC에서는 동일 페이지에서 이동이라 위의 myRedirect를 씹어버릴 수 있어 reload 하지 않음
    if (isApp()) {
      window.location.reload();
    }
  };

  return (
    <div className="card-bottom-content">
      <h2>
        {joinTitle}
        <span className="number">{itemList.length}개</span>
      </h2>
      <Swiper className="swiper-per" slidesPerView="auto" spaceBetween={3} freeMode modules={[FreeMode]}>
        {itemList.map((obj, index: number) => (
          <SwiperSlide className="item" key={index}>
            <XtrAw {...obj.xtrAwProps}>
              {obj?.svcInfo?.svcMgmtNum && (
                <a
                  href={obj.link}
                  onClick={(e) => {
                    e.preventDefault();
                    changeLineAndRedirect({ url: obj.link, svcMgmtNum: obj.svcInfo.svcMgmtNum });
                  }}
                >
                  <i className={obj.icon} />
                  <span className="cl-name">{obj.name}</span>
                  <span className="cl-state">{obj.text}</span>
                </a>
              )}
              {!obj?.svcInfo?.svcMgmtNum && (
                <MyLink href={obj.link}>
                  <i className={obj.icon} />
                  <span className="cl-name">{obj.name}</span>
                  <span className="cl-state">{obj.text}</span>
                </MyLink>
              )}
            </XtrAw>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
