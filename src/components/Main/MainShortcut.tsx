import React from 'react';
import { titleProps } from '../../js/commonUtil';
import V6Link from '../Common/V6Link';

interface ShortCutMenu {
  menuUrl: string;
  menuId: string;
  iconPath: string;
  menuNm: string;
  exUrlNotiYn: string;
}

interface shortCutList {
  shortCutMenuList: Array<ShortCutMenu>;
  toggleState: any;
  isOverFlow: boolean;
  toggleTab: any;
  setMenuEditYn: any;
}

export function MainShortcut({ shortCutMenuList, toggleState, isOverFlow, toggleTab, setMenuEditYn }: shortCutList) {
  return (
    <>
      <button
        type="button"
        title="메뉴바로가기"
        aria-pressed={toggleState}
        className={`btn-toggle-menu-items ${toggleState === true ? 'active' : ''}`}
        onClick={() => toggleTab(!toggleState)}
      >
        {isOverFlow && <i className="bl-arr-bold" aria-hidden="true" />}
        <span className="hidden">메뉴 바로가기</span>
      </button>

      <ul id="menuItems" className={`list-grid-menu-items ${toggleState ? 'active' : ''}`}>
        {shortCutMenuList.length > 0 ? (
          <>
            {shortCutMenuList.map((shortCut, index: number) => (
              <li key={index}>
                <V6Link
                  href={shortCut.menuUrl}
                  newWindow={shortCut.exUrlNotiYn === 'Y' && 'BROWSER'}
                  title={titleProps(shortCut.menuUrl)}
                  className={`link-rounded-medium`}
                >
                  {shortCut.menuNm}
                </V6Link>
              </li>
            ))}
          </>
        ) : (
          <li>
            <button
              type="button"
              className="btn-rounded-dotted"
              onClick={() => {
                setMenuEditYn(true);
              }}
            >
              <i className="icon-plus" /> 자주 찾는 메뉴 추가
            </button>
          </li>
        )}
      </ul>
    </>
  );
}
