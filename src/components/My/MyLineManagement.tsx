/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Lang } from '../../common/types';
import MyLink from '../Common/MyLink';
import Xtr from '../Common/Xtr';

export enum LineGroupType {
  MOBILE = 'mobile',
  WIRED = 'wired',
}

export enum LineIcon {
  모바일,
  집전화,
  인터넷,
  IPTV,
}

export interface MyLineProps {
  lineLabel: string | null;
  // 무선: 모자이크 된 전화 번호, 유선: 모자이크 된 주소
  lineIdText: string | null;
  icon: LineIcon;
  group: string;
  고객보호_비밀번호_사용: boolean;
  is기준?: boolean;
  is자녀?: boolean;
  is선택?: boolean;
  svcInfo: any;
}
export interface MyLineListProps {
  title: string | null;
  groupType: LineGroupType;
  lang: Lang;
  lineList: Array<MyLineProps>;
  selectedLineSvcMgmtNum?: string;
  onLineSelected: (selectedLine: MyLineProps) => void;
}

export const ICON_CLASS = {
  [LineIcon.모바일]: 'ic-etc-disk',
  [LineIcon.집전화]: 'ic-etc-hphone',
  [LineIcon.인터넷]: 'ic-etc-global',
  [LineIcon.IPTV]: 'ic-etc-iptv',
};

export function MyLineManagement({
  title,
  groupType,
  lineList,
  lang,
  onLineSelected,
  selectedLineSvcMgmtNum,
}: MyLineListProps) {
  let totalCnt;
  let lineListToShow = lineList;
  if (groupType === LineGroupType.WIRED) {
    totalCnt = lineList.length;
    // 유선 서비스는 최대 99개까지만 노출
    lineListToShow = lineListToShow.slice(0, 99);
  } else {
    // 영문에서는...
    if (lang === 'EN') {
      // 자녀회선 표시 안함
      lineListToShow = lineListToShow.filter((lineInfo) => {
        return !lineInfo.is자녀;
      });
      /*
      // PPS 회선 표시 안함
      lineListToShow = lineListToShow.filter((lineInfo) => {
        return lineInfo?.svcInfo?.svcAttrCd !== 'M2';
      }); */
    } else {
      lineListToShow = lineList;
    }

    totalCnt = lineListToShow.length;
  }

  return (
    <div className="item-bottom-content" key={selectedLineSvcMgmtNum}>
      <h3 className="sub-title">
        {title}
        <span className="number">{totalCnt}</span>
      </h3>
      <ul className="item-type-list">
        {lineListToShow.map((obj, index: number) => {
          const is선택회선 = selectedLineSvcMgmtNum === obj.svcInfo?.svcMgmtNum;

          return (
            <li className="item" key={index}>
              <span className="radio-box-modal">
                {!obj.is자녀 && (
                  <input
                    type="radio"
                    name={groupType}
                    id={`${`${groupType}-${index}`}`}
                    onClick={(e) => {
                      e.preventDefault();
                      if (!is선택회선) onLineSelected(obj);
                    }}
                    defaultChecked={is선택회선}
                  />
                )}
                <label htmlFor={`${`${groupType}-${index}`}`}>
                  <i className={ICON_CLASS[obj.icon]} aria-hidden="true" />
                  <span className="text">{obj.lineLabel}</span>
                  {obj.is기준 && <span className="flag-standard">{lang === 'KO' ? '기준' : 'Main'}</span>}
                  {obj.is자녀 && <span className="flag-child">자녀</span>}
                  {!obj.is자녀 && (
                    <span className="range">
                      <i className="radio" />
                    </span>
                  )}
                </label>
              </span>
              <span className="sub">{obj.lineIdText}</span>
              {obj.is자녀 && (
                <span className="line-fee-area">
                  <MyLink
                    href={`/myt-data/submain/child-hotdata?childSvcMgmtNum=${obj.svcInfo?.svcMgmtNum}`}
                    className="btn"
                  >
                    <Xtr xtrEid="CMMA_A11-101" xtrClick xtrView>
                      실시간 잔여량
                    </Xtr>
                  </MyLink>
                  <MyLink href={`/myt-fare/billguide/child?line=${obj.svcInfo?.svcMgmtNum}`} className="btn">
                    <Xtr xtrEid="CMMA_A11-102" xtrClick xtrView>
                      이용 요금
                    </Xtr>
                  </MyLink>
                  <MyLink href={`/myt-fare/bill/hotbill/child?child=${obj.svcInfo?.svcMgmtNum}`} className="btn">
                    <Xtr xtrEid="CMMA_A11-103" xtrClick xtrView>
                      실시간 이용요금
                    </Xtr>
                  </MyLink>
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
