import React, { useContext, useEffect, useState } from 'react';

// 스토리북 import
import { Layout } from '../../components/en/Layout/Layout';

// 로그인 가입정보
import { NavHeaderInfo } from '../../components/en/Fullmenu/NavHeaderInfo';

// 전체메뉴
import { NavFullMenu } from '../../components/en/Fullmenu/NavFullMenu';
import { Default as setNavFullMenu } from '../../components/en/Fullmenu/NavFullMenu.stories';

// Footer 하단
import { NavAppFooter } from '../../components/en/Fullmenu/NavAppFooter';
import { Footer as setNavAppFooter } from '../../components/en/Fullmenu/NavAppFooter.stories';
import BottomNav from '../../container/BottomNav';
import { getDisplayName, getDisplayNumber, getServiceName } from '../../js/commonUtil';
import { AppContext } from '../../context/AppContext';
import { HeaderInfo } from '../../js/types';
import myApiRespToDisplayData from '../../common/apiRespToDisplayData/my';

//2022-12-21 접근성 / Head title 추가
import Head from 'next/head';

export default function FullMenu() {
  const [headerInfo, setHeaderInfo] = useState<HeaderInfo>(null);

  const appContext = useContext(AppContext);
  const [myInfo] = appContext.myInfo;
  const [userType] = appContext.userType;

  useEffect(() => {
    if (myInfo && userType) {
      const svcInfo = myInfo.svcInfo;
      const name = getServiceName(svcInfo.svcAttrCd, 'EN');
      const number = getDisplayNumber(svcInfo);
      const myDisplayData = myApiRespToDisplayData(myInfo);
      const header = {
        ...headerInfo,
        name,
        number,
        loginYn: true,
        loginType: svcInfo.loginType,
        userType,
        hasMultiLine: myDisplayData.hasMultiLine,
        isPps: svcInfo?.svcAttrCd === 'M2',
        isWired: myDisplayData?.선택회선?.group === 's',
      };
      setHeaderInfo(header);
    } else if (myInfo && Object.keys(myInfo).length === 0) {
      const header = { loginYn: false };
      setHeaderInfo(header);
    }
  }, [myInfo, userType]);

  return (
    <Layout addClass="fullmenu">
      {/* 2022-12-21 접근성 / Head title 추가 */}
      {/* 2023-02-01 접근성 / html 추가 */}
      <html lang="en" />
      <Head>
        <title>menu</title>
      </Head>

      {/* 스크롤업 시 nav-full-menu fixed 추가 */}
      <div className="nav-full-menu">
        {headerInfo && <NavHeaderInfo {...headerInfo} />}

        {/* 전체메뉴 */}
        <NavFullMenu
          title={setNavFullMenu.args.title}
          fullNavList={setNavFullMenu.args.fullNavList}
          edited={setNavFullMenu.args.edited}
        />

        {/* 하단 Footer */}
        <NavAppFooter
          title={setNavAppFooter.args.title}
          customerTitle={setNavAppFooter.args.customerTitle}
          customerText={setNavAppFooter.args.customerText}
          customerLink={setNavAppFooter.args.customerLink}
          customerText2={setNavAppFooter.args.customerText2}
          customerLink2={setNavAppFooter.args.customerLink2}
          customerText3={setNavAppFooter.args.customerText3}
          customerLink3={setNavAppFooter.args.customerLink3}
          customerTelTitle={setNavAppFooter.args.customerTelTitle}
          customerTelTExt={setNavAppFooter.args.customerTelTExt}
          customerTelLink={setNavAppFooter.args.customerTelLink}
          customerTelTExt2={setNavAppFooter.args.customerTelTExt2}
          customerTelLink2={setNavAppFooter.args.customerTelLink2}
          gname={setNavAppFooter.args.gname}
          gicon={setNavAppFooter.args.gicon}
          gltd={setNavAppFooter.args.gltd}
        />
        {/* .nav-footer */}
      </div>
      {/* .nav-full-menu */}

      <BottomNav tabIndex={3} showBottomSheet={'N'} lang={'EN'} />
    </Layout>
  );
}
