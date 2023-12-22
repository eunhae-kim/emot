import React from 'react';
import Head from 'next/head';
import { TtimeLayout } from '../../components/Layout/TtimeLayout';
import TtimePromotionCont from '../../container/ttime/TtimePromotionCont';
import { isApp } from '../../js/commonUtil';

export default function Promotion() {
  return (
    <>
      <Head>
        <meta property="og:title" content="T 타임 런칭 이벤트" />
        <meta property="og:description" content="T 타임 이야기 읽고 컵을 모으면 럭키박스 선물이 팡팡!" />
        <meta property="og:image" content="https://cdnm.tworld.co.kr/img/dummy/kakao_share.jpg?1692839509718" />
      </Head>
      <TtimeLayout
        headerConfig={{
          title: 'T 타임 런칭 이벤트',
          isShowTitle: false,
          isBackBtn: true,
          buttons: [
            {
              type: 'share',
              props: {},
            },
          ],
        }}
      >
        <TtimePromotionCont />
      </TtimeLayout>
    </>
  );
}
