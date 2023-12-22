import React from 'react';
import V6Link from '../Common/V6Link';
import XtrAw from '../Common/XtrAw';

export function ContentDetailNotiAgree() {
  return (
    <article className="content-noti-agree-area">
      <h2 className="hidden">T알림 동의 안내 영역</h2>
      <p>
        T 타임을 즐기고 계시군요!
        <br />
        새로운 이야기도 놓치지 말고 받아 보세요.
      </p>
      <XtrAw appEid="CMMA_A23_B121_C1419_D4439-1" webEid="CMMA_A23_B121_C1419_D4439-1" xtrClick xtrView>
        <V6Link href="/main/menu/settings/notification">
          <div className="link-rounded-large">T알림 설정 바로가기</div>
        </V6Link>
      </XtrAw>
    </article>
  );
}
