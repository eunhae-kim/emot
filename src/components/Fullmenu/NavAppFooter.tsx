/* eslint-disable */
import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { isApp } from '../../js/commonUtil';
import V6Link from '../Common/V6Link';
import Xtr from '../Common/Xtr';

export type NavAppFooterProps = {
  isLoggedIn: boolean;
};

export function footer({ isLoggedIn }: NavAppFooterProps) {
  function menuRefundClicked() {
    const appYn = isApp() ? 'Y' : 'N';

    if (!isLoggedIn) {
      location.href = `/common/tid/login?target=/main/menu/refund&app=${appYn}`;
    } else {
      location.href = '/main/menu/refund';
    }
  }

  return (
    <div className="nav-footer">
      <div className="f-nemu">
        <ul className="f-nemu-list">
          <li>
            <Xtr xtrEid={'CMMA_A11_B3-112'} xtrClick={true} xtrView={true}>
              <V6Link href="/main/menu/settings/terms">
                <span className="f-link">이용약관</span>
              </V6Link>
            </Xtr>
          </li>
          <li>
            <Xtr xtrEid={'CMMA_A11_B3-166'} xtrClick={true} xtrView={true}>
              {/* 2023-01-26 접근성 / title 추가 */}
              <V6Link
                href="https://m.skt-id.co.kr/member/terms/termsInfo.do?chnlId=TWDT&client_type=mWEB&stplTypCd=02"
                newWindow="BROWSER"
                className="f-link"
                rel="noreferrer"
                title="T아이디 모바일웹(새창)"
              >
                <strong>개인정보 처리방침</strong>
              </V6Link>{' '}
              {/* 2023-01-12 접근성 / 중복 되는 a tag 제거 */}
            </Xtr>
          </li>
          <li>
            <Xtr xtrEid={'CMMA_A11_B3-147'} xtrClick={true} xtrView={true}>
              {/* 2023-01-26 접근성 / title 추가 */}
              <V6Link
                href="https://piuh.sktelecom.com/mobile/sts/sts-list"
                newWindow="BROWSER"
                className="f-link"
                rel="noreferrer"
                title="T아이디 모바일웹(새창)"
              >
                <strong>개인정보 이용내역</strong>
              </V6Link>
            </Xtr>
          </li>
        </ul>
        <ul className="f-nemu-list">
          <li>
            <Xtr xtrEid={'CMMA_A11_B3-113'} xtrClick={true} xtrView={true}>
              {/* <V6Link href="/main/menu/refund"> */}
              <span
                onClick={() => {
                  menuRefundClicked();
                }}
                className="f-link"
              >
                미환급금 조회
              </span>
              {/* </V6Link> */}
            </Xtr>
          </li>
          <li>
            <Xtr xtrEid={'CMMA_A11_B3-114'} xtrClick={true} xtrView={true}>
              <V6Link href="/customer/damage-info">
                <span className="f-link">이용자 피해 예방 센터</span>
              </V6Link>
            </Xtr>
          </li>
          <li>
            <Xtr xtrEid={'CMMA_A11_B3-79'} xtrClick={true} xtrView={true}>
              <V6Link href="/main/menu/settings/business-info">
                <span className="f-link">사업자 정보</span>
              </V6Link>
            </Xtr>
          </li>
        </ul>
        <ul className="f-nemu-list">
          <li>
            <Xtr xtrEid={'CMMA_A11_B3-78'} xtrClick={true} xtrView={true}>
              <V6Link href="/main/menu/settings/family-sites">
                <span className="f-link">패밀리 사이트</span>
              </V6Link>
            </Xtr>
          </li>
          <li>
            <Xtr xtrEid={'CMMA_A11_B3-138'} xtrClick={true} xtrView={true}>
              {/* 2023-01-26 접근성 / title 추가 */}
              <V6Link
                href="https://privacy.sk.com/"
                newWindow="BROWSER"
                rel="noreferrer"
                title="T아이디 모바일웹(새창)"
              >
                <span className="f-link">동의 정보 지킴이</span>
              </V6Link>{' '}
              {/* 2023-01-12 접근성 / 중복 되는 a tag 제거 */}
            </Xtr>
          </li>
          <li>
            <Xtr xtrEid={'CMMA_A11_B3-144'} xtrClick={true} xtrView={true}>
              {/* 2023-01-26 접근성 / title 추가 */}
              <V6Link
                href="https://m.privacy.sktelecom.com/main.do?result=0000&resultMessage=ok"
                newWindow="BROWSER"
                rel="noreferrer"
                title="T아이디 모바일웹(새창)"
              >
                <span className="f-link">프라이버시 센터</span>
              </V6Link>{' '}
              {/* 2023-01-12 접근성 / 중복 되는 a tag 제거 */}
            </Xtr>
          </li>
        </ul>

        {/* 위치정보 제공내역 추가로 ul tag 추가 */}
        <ul className="f-nemu-list">
          <li>
            {/* 접근성 p tag 내용을 Xtr안에 맨 뒤에 추가 onClick ~  */}
            {/* 2023-01-26 접근성 / title 추가 */}
            <Xtr xtrEid={'CMMA_A11_B3-146'} xtrClick={true} xtrView={true}>
              <V6Link
                href="https://piuh.sktelecom.com/mobile/detail/cims-detail"
                newWindow="BROWSER"
                target="_blank"
                className="f-link"
                rel="noreferrer"
                title="T아이디 모바일웹(새창)"
              >
                <strong>통신 자료 제공 내역 열람</strong>
              </V6Link>
            </Xtr>
          </li>
          {!isApp() && (
            <li>
              <a
                href="https://piuh.sktelecom.com/mobile/detail/linfo-detail"
                target="_blank"
                className="f-link"
                rel="noreferrer"
                title="T아이디 모바일웹(새창)"
              >
                {/* 2023-02-13 접근성 / 새창 추가 */}
                <strong>위치정보 제공내역 열람</strong>
              </a>
            </li>
          )}
        </ul>
      </div>

      <dl className="f-info">
        <dt>휴대폰 고객센터</dt>
        <dd>
          국번없이&nbsp;
          <Xtr xtrEid={'CMMA_A11_B3-98'} as={'a'} href={'tel:114'} xtrClick={true} xtrView={true} className="f-tel">
            114
          </Xtr>
          (무료) 또는&nbsp;
          <Xtr
            xtrEid={'CMMA_A11_B3-99'}
            as={'a'}
            href={'tel:080-011-6000'}
            xtrClick={true}
            xtrView={true}
            className="f-tel"
          >
            080-011-6000
          </Xtr>
          (무료)
        </dd>
        <dd>
          국번없이&nbsp;
          <Xtr
            xtrEid={'CMMA_A11_B3-100'}
            as={'a'}
            href={'tel:1599-0011'}
            xtrClick={true}
            xtrView={true}
            className="f-tel"
          >
            1599-0011
          </Xtr>
          (유료)
        </dd>
        <dt>인터넷∙집전화 고객센터</dt>
        <dd>
          <Xtr
            xtrEid={'CMMA_A11_B3-101'}
            as={'a'}
            href={'tel:080-816-2000'}
            xtrClick={true}
            xtrView={true}
            className="f-tel"
          >
            080-816-2000
          </Xtr>
          (무료) 또는&nbsp;
          <Xtr
            xtrEid={'CMMA_A11_B3-102'}
            as={'a'}
            href={'tel:1600-2000'}
            xtrClick={true}
            xtrView={true}
            className="f-tel"
          >
            1600-2000
          </Xtr>
          (유료)
        </dd>
        <dt>T 멤버십 마켓</dt>
        <dd>
          <Xtr
            xtrEid={'CMMA_A11_B3-103'}
            as={'a'}
            href={'tel:1599-3377'}
            xtrClick={true}
            xtrView={true}
            className="f-tel"
          >
            1599-3377
          </Xtr>
          (유료)
        </dd>
      </dl>

      <div className="f-global">
        <Xtr xtrEid={'CMMA_A11_B3-122'} xtrClick={true} xtrView={true}>
          <V6Link href="/en/main/home" title="영문 사이트 이동">
            {' '}
            {/* 2022-12-20 접근성 / title 추가 */}
            <div className="f-global-link">
              <i className={'ic-eng'} />
              <span className="eng-word">ENG</span>
            </div>
          </V6Link>
        </Xtr>
        <p className="f-ltd">SK telecom., LTD</p>
      </div>
    </div>
  );
}

export const NavAppFooter = React.memo(footer);
