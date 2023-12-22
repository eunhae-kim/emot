/* eslint-disable jsx-a11y/aria-role */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import V6Link from '../../Common/V6Link';
import Xtr from '../../Common/Xtr';

export interface ListProps2 {
  href: string | null;
  name: string | null;
  oferStcCd: string | null;
}

export interface ListProps {
  href: string;
  subtitle: string | null;
  sublist: Array<ListProps2>;
  oferStcCd: string | null;
}

export interface NavProps {
  navTitle: string | null;
  icon: string | null;
  isActive: string | null;
  id: string | null;
  navList: Array<ListProps>;
  oferStcCd: string | null;
}

export interface NavFullMenuProps {
  title: string | null;
  edited: boolean;
  fullNavList: Array<NavProps>;
}

export function NavFullMenu({ title, fullNavList, edited, ...props }: NavFullMenuProps) {
  const [activeIndex, setActiveIndex] = useState(0); // active한 index값을 관리하는 State
  const tabClickHandler = (index: number) => {
    // 웹접근성 포커스 이동 작업 할 것
    setActiveIndex(index);
  };

  return (
    // 2022-11-23 / 접근성 추가 role=""
    <div className="nav-wrap en" role="menubox" aria-label="allmenu" aria-hidden="false">
      {/* 왼쪽 1Depth */}
      <ul className="nav-subject" role="menusubject">
        {fullNavList.map((obj, index: number) => (
          // li선택 .active 추가
          <li key={index} className={activeIndex === index ? 'active' : null} role="presentation">
            <button type="button" className="btn-icon" onClick={() => tabClickHandler(index)} role="menuitem">
              <i className={obj.icon} />
              <span>{obj.navTitle}</span>
            </button>
          </li>
        ))}
      </ul>
      {/* 오른쪽 2Depth */}
      {fullNavList.map((objs, index: number) => (
        <ul key={index} className={`nav-sub-depth ${activeIndex === index ? 'active' : ''}`} role="menu">
          {objs.navList.map((obj, i: number) => (
            <li key={i} className="sub-depth-li" role="presentation">
              {edited !== true ? (
                <Xtr xtrEid={obj.oferStcCd} xtrClick={true} xtrView={true}>
                  <V6Link href={obj.href} className="nav-subtitle" role="menuitem" title="">
                    <i className="bl-arr" aria-hidden="true" />
                    {obj.subtitle}
                  </V6Link>
                </Xtr>
              ) : (
                <span className="check-box depth-1">
                  <input type="checkbox" id={`ck-${objs.id}-${i}`} />
                  <span className="check-ico">
                    <i className="bl-check" />
                  </span>
                  <label htmlFor={`ck-${objs.id}-${i}`}>{obj.subtitle}</label>
                </span>
              )}
              {obj.sublist.length !== 0 ? (
                <ul className="nav-sublist" role="menu">
                  {obj.sublist.map((navlist, subindex: number) => (
                    <li key={subindex} role="presentation">
                      {edited !== true ? (
                        <Xtr xtrEid={navlist.oferStcCd} xtrClick={true} xtrView={true}>
                          <V6Link
                            href={navlist.href}
                            dangerouslySetInnerHTML={{ __html: navlist.name }}
                            role="menuitem"
                          />
                        </Xtr>
                      ) : (
                        <span className="check-box depth-2">
                          <input type="checkbox" id={`cks-${objs.id}-${i}-${subindex}`} />
                          <span className="check-ico">
                            <i className="bl-check" />
                          </span>
                          <label
                            htmlFor={`cks-${objs.id}-${i}-${subindex}`}
                            dangerouslySetInnerHTML={{ __html: navlist.name }}
                          />
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                ''
              )}
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
