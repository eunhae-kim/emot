/* eslint-disable react/no-danger */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import V6Link from '../../Common/V6Link';
import Xtr from '../../Common/Xtr';
import { TWORLD_URL } from '../../../common/const';

export interface FooterPropsType {
  title: string;

  customerTitle: string;
  customerText: string | null;
  customerLink: string | null;
  customerText2: string | null;
  customerLink2: string | null;
  customerText3: string | null;
  customerLink3: string | null;

  customerTelTitle: string;
  customerTelTExt: string | null;
  customerTelLink: string | null;
  customerTelTExt2: string | null;
  customerTelLink2: string | null;

  gname: string;
  gicon: string | null;
  gltd: string | null;
}

export function NavAppFooter({
  title,

  customerTitle,
  customerText,
  customerLink,
  customerText2,
  customerLink2,
  customerText3,
  customerLink3,

  customerTelTitle,
  customerTelTExt,
  customerTelLink,
  customerTelTExt2,
  customerTelLink2,
  gname,
  gicon,
  gltd,
  ...props
}: FooterPropsType): JSX.Element {
  return (
    <div className="nav-footer">
      <ul className="f-link-en">
        <li>
          <V6Link
            href="https://www.skt-id.co.kr/member/terms/termsInfo.do?chnlId=TWDT&client_type=WEB&stplTypCd=02&frgnrClCd=F"
            //target="_blank"
            newWindow={'BROWSER'}
            className="f-link"
            rel="noreferrer"
          >
            <Xtr xtrEid={'CMMA_A10_B80_C1199-41'} xtrClick={true} xtrView={true}>
              <strong>PRIVACY POLICY</strong>
            </Xtr>
          </V6Link>
        </li>
        <li>
          <V6Link
            href={`${TWORLD_URL[global.LDSP]}/en/main/menu/settings/terms`}
            //target="_blank"
            newWindow={'BROWSER'}
            className="f-link"
            rel="noreferrer"
          >
            <Xtr xtrEid={'CMMA_A10_B80_C1199-42'} xtrClick={true} xtrView={true}>
              <strong>TERMS AND CONDITIONS &#40;KR&#41;</strong>
            </Xtr>
          </V6Link>
        </li>
        <li>
          <V6Link
            href={`${TWORLD_URL[global.LDSP]}/main/menu/settings/terms?id=68&type=a`}
            //target="_blank"
            newWindow={'BROWSER'}
            className="f-link"
            rel="noreferrer"
          >
            <Xtr xtrEid={'CMMA_A10_B80_C1199-43'} xtrClick={true} xtrView={true}>
              <strong>RESPONSIBILITY LIMITS &amp; LEGAL &#40;KR&#41;</strong>
            </Xtr>
          </V6Link>
        </li>
      </ul>

      <dl className="f-info en">
        <dt className="hidden">title</dt>
        <dd>65, Eulji-ro, Jung-gu Seoul, Republic of Korea</dd>
        <dd>CEO &amp; President Ryu Young-Sang</dd>
        <dd>Business Registration Number : 104-81-37225</dd>
        <dd>
          Customer Center{' '}
          <Xtr
            xtrEid={'CMMA_A10_B80_C1199-66'}
            as={'a'}
            href={'tel:114'}
            xtrClick={true}
            xtrView={true}
            className="f-tel"
          >
            114
          </Xtr>{' '}
          &#40;Free&#41; / &nbsp;
          <Xtr
            xtrEid={'CMMA_A10_B80_C1199-67'}
            as={'a'}
            href={'tel:080-011-6000'}
            xtrClick={true}
            xtrView={true}
            className="f-tel"
          >
            080-011-6000
          </Xtr>{' '}
          &#40;Free&#41;
        </dd>
        <dd>
          without Toll Number or{' '}
          <Xtr
            xtrEid={'CMMA_A10_B80_C1199-68'}
            as={'a'}
            href={'tel:1599-0011'}
            xtrClick={true}
            xtrView={true}
            className="f-tel"
          >
            1599-0011
          </Xtr>{' '}
          &#40;Paid&#41;
        </dd>
      </dl>

      <p className="copyright">COPYRIGHT © SK TELECOM CO., LTD. ALL RIGHTS RESERVED</p>

      <div className="f-global en">
        <Xtr xtrEid={'CMMA_A10_B80_C1199-44'} xtrClick={true} xtrView={true}>
          <V6Link href="/v6/main" title="국문 사이트 이동">
            {' '}
            {/* 2022-12-20 접근성 / title 추가 */}
            <div className="f-global-link">
              <i className={'ic-eng'} />
              <span>KOR</span>
            </div>
          </V6Link>
        </Xtr>

        {/* 2022-11-15 숨김 */}
        {/* <p className="f-ltd en">
          <button type="button">
            {gltd}
            <i className="bl-arr-bold" />
          </button>
        </p> */}
      </div>
    </div>
  );
}
