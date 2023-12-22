import React, { useContext, useEffect, useState } from 'react';
import Head from 'next/head';

import { AppContext } from '../context/AppContext';
import { getMenu, getQuickMenu } from '../api/menu';
import { getDisplayName, getDisplayNumber } from '../js/commonUtil';

import { Layout } from '../components/Layout/Layout';
import { NavHeaderInfo } from '../components/Fullmenu/NavHeaderInfo';
import { TopMenu } from '../components/Fullmenu/TopMenu';
import { NavFullMenu } from '../components/Fullmenu/NavFullMenu';
import { NavAppFooter } from '../components/Fullmenu/NavAppFooter';

import BottomNav from '../container/BottomNav';
import { EventBanner } from '../container/EventBanner';
import { TAppList } from '../container/menu/TAppList';

import { HeaderInfo, QuickMenu } from '../js/types';
import myApiRespToDisplayData from '../common/apiRespToDisplayData/my';

export default function FullMenu() {
  const appContext = useContext(AppContext);
  const [myInfo] = appContext.myInfo;
  const [userType] = appContext.userType;
  const [menuList, setMenuList] = useState({});
  const [headerInfo, setHeaderInfo] = useState<HeaderInfo>(null);
  const [quickMenuList, setQuickMenuList] = useState<Array<QuickMenu>>(null);

  const isLoggedIn = myInfo && Object.keys(myInfo).length > 0;

  useEffect(() => {
    (async () => {
      const menu = await getMenu();
      if (menu) setMenuList(menu.frontMenus);

      const quickMenu = await getQuickMenu();
      if (quickMenu) setQuickMenuList(quickMenu.quickMenuList);
    })();
  }, []);

  useEffect(() => {
    if (myInfo && userType) {
      const svcInfo = myInfo.svcInfo;
      const name = svcInfo.nickNm ? svcInfo.nickNm : getDisplayName(svcInfo);
      const number = getDisplayNumber(svcInfo);
      const myDisplayData = myApiRespToDisplayData(myInfo);
      const header = {
        ...headerInfo,
        name,
        number,
        loginYn: true,
        loginType: svcInfo.loginType,
        userType,
        userId: svcInfo.userId,
        hasMultiLine: myDisplayData.hasMultiLine,
      };
      setHeaderInfo(header);
    } else if (myInfo && Object.keys(myInfo).length === 0) {
      const header = { loginYn: false };
      setHeaderInfo(header);
    }
  }, [myInfo, userType]);

  return (
    <Layout addClass="fullmenu">
      <html lang="ko" />
      <Head>
        <title>전체메뉴 &lt; Tworld</title>
      </Head>
      {/* 스크롤업 시 nav-full-menu fixed 추가 */}
      <div className="nav-full-menu">
        {/* 메뉴헤더 */}
        {headerInfo && <NavHeaderInfo {...headerInfo} />}

        {/* 퀵 메뉴 */}
        {quickMenuList && <TopMenu quickMenuList={quickMenuList} />}

        {/* 전체 메뉴 리스트 */}
        {menuList && <NavFullMenu menu={menuList} edited={false} />}

        {/* T 앱 */}
        <TAppList />

        {/* 서브배너 */}
        <EventBanner type={'menu'} />

        {/* 푸터 */}
        <NavAppFooter isLoggedIn={isLoggedIn} />
      </div>
      <BottomNav tabIndex={3} showBottomSheet={'N'} />
    </Layout>
  );
}
