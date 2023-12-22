import React, { useCallback, useEffect, useState } from 'react';
import V6Link from '../Common/V6Link';
import Xtr from '../Common/Xtr';
import { isApp, titleProps } from '../../js/commonUtil';
import useModal from '../../hooks/useModal';
import { TWORLD_URL } from '../../common/const';

export interface menu {
  menuId: string;
  menuNm: string;
  frontMenuDpth: string; // depth
  expsSeq: string; // 노출순서
  iconImgUseYn: string; // icon image 노출 여부
  iconImgFilePathNm: string; // icon image url
  menuUrl: string; // 이동 위치
  children: Array<menu>;
  oferStcCd: string; // 오퍼통계코드
  exUrlNotiYn: string; // 외부 이동 여부
}

interface menuProps {
  menu: any;
  edited: boolean;
  setCheckedMenu?: any;
  checkedMenu?: Array<string>;
}

const needBridge = ['/myt-join/myplancombine/infodiscount', '/myt-fare/bill/small'];

export function NavFullMenu({ menu, edited, setCheckedMenu, checkedMenu }: menuProps) {
  const firstDepth = Object.keys(menu);
  const menuIconImg = ['ic-menu-my', 'ic-menu-prdserv', 'ic-menu-shop', 'ic-menu-benef', 'ic-menu-suprt'];

  const [activeIndex, setActiveIndex] = useState(0);
  const { confirm } = useModal();

  const [, updateState] = useState<any>();
  const forceUpdate = useCallback(() => updateState({}), []);

  const tabClickHandler = (index: number) => {
    // 웹접근성 포커스 이동 작업 할 것
    setActiveIndex(index);
  };

  const [origin, setOrigin] = useState<string>('');
  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  function appendMenu(menuId) {
    let arr = checkedMenu;

    if (arr.includes(menuId)) {
      const filtered = arr.filter((element) => element !== menuId);
      arr = filtered;
    } else {
      if (arr.length === 20) {
        confirm.show({
          isOpen: true,
          message: '메뉴 바로 가기는<br/>최대 20개까지 추가하실 수 있습니다.',
        });
        return;
      }
      arr.push(menuId);
    }

    if (arr.length === 0) {
      confirm.show({
        isOpen: true,
        message: '메뉴 바로 가기를 모두 삭제했습니다. <br/> 메뉴 바로 가기로 T 월드 앱을 보다 편리하게 이용해 보세요.',
      });
    }

    setCheckedMenu(arr);
    forceUpdate();
  }

  return (
    <div className="nav-wrap">
      {/* 왼쪽 1Depth */}
      <ul className="nav-subject" role="tablist">
        {/* 2022-12-20 접근성 / role추가 */}
        {firstDepth.map(
          (menuId, index: number) =>
            menu[menuId].supMenuNmExpsYn === 'Y' && (
              <Xtr xtrEid={menu[menuId].oferStcCd} xtrClick={true} xtrView={true}>
                <li key={index} className={activeIndex === index ? 'active' : ''} role="presentation">
                  <button
                    type="button"
                    className="btn-icon"
                    onClick={() => tabClickHandler(index)}
                    role="tab"
                    id={`editTab_button_${index}`}
                    aria-controls={`editTab_panel_${index}`}
                    aria-selected={activeIndex === index}
                  >
                    <i className={menuIconImg[index]} aria-hidden="true" />
                    <span>{menu[menuId].menuNm}</span>
                  </button>
                </li>
              </Xtr>
            ),
        )}
      </ul>

      {/* 오른쪽 2Depth */}
      {firstDepth.map((secondDepth, index: number) => (
        <>
          <div
            key={index}
            className={`nav-sub-depth ${activeIndex === index ? 'active' : ''}`}
            role="tabpanel"
            id={`editTab_panel_${index}`}
            aria-labelledby={`editTab_button_${index}`}
          >
            <h2 className="hidden">{menu[secondDepth].menuNm}</h2>
            {menu[secondDepth].children.map((secondMenu: menu, i: number) => (
              <div key={i} className="sub-depth-li">
                {edited === false ? (
                  secondMenu.menuUrl ? (
                    <Xtr xtrEid={secondMenu.oferStcCd} xtrClick={true} xtrView={true}>
                      <V6Link
                        href={secondMenu.menuUrl}
                        newWindow={secondMenu.exUrlNotiYn === 'Y' && 'BROWSER'}
                        title={titleProps(secondMenu.menuUrl)}
                      >
                        <span className="nav-subtitle">
                          <i className="bl-arr" aria-hidden="true" />
                          {secondMenu.menuNm}
                        </span>
                      </V6Link>
                    </Xtr>
                  ) : (
                    <span className="nav-subtitle">{secondMenu.menuNm}</span>
                  )
                ) : (
                  <span className="check-box depth-1">
                    <label htmlFor={`ck-${secondMenu.menuId}-${i}`}>
                      {secondMenu.menuUrl && (
                        <>
                          <input
                            onClick={() => {
                              appendMenu(secondMenu.menuId);
                            }}
                            type="checkbox"
                            id={`ck-${secondMenu.menuId}-${i}`}
                            checked={checkedMenu.includes(secondMenu.menuId)}
                          />
                          <span className="check-ico" aria-hidden="true">
                            <i className="bl-check" />
                          </span>
                        </>
                      )}
                      {secondMenu.menuNm}
                    </label>
                  </span>
                )}
                {secondMenu.children.length > 0 && (
                  <ul className="nav-sublist">
                    {secondMenu.children.map((thirdDepth: menu, i: number) => (
                      <li key={i}>
                        {edited === false ? (
                          <Xtr xtrEid={thirdDepth.oferStcCd} xtrClick={true} xtrView={true}>
                            <V6Link
                              href={
                                isApp() && needBridge.some((item) => thirdDepth.menuUrl.includes(item))
                                  ? `${TWORLD_URL[global.LDSP]}/v6/common/login?target=${origin}${thirdDepth.menuUrl}`
                                  : thirdDepth.menuUrl
                              }
                              newWindow={thirdDepth.exUrlNotiYn === 'Y' && 'BROWSER'}
                              title={titleProps(thirdDepth.menuUrl)}
                            >
                              {thirdDepth.menuNm}
                            </V6Link>
                          </Xtr>
                        ) : (
                          <span className="check-box depth-2">
                            <label htmlFor={`cks-${thirdDepth.menuId}-${i}-${i}`}>
                              <input
                                onClick={() => {
                                  appendMenu(thirdDepth.menuId);
                                }}
                                type="checkbox"
                                id={`cks-${thirdDepth.menuId}-${i}-${i}`}
                                checked={checkedMenu.includes(thirdDepth.menuId)}
                              />
                              <span className="check-ico" aria-hidden="true">
                                <i className="bl-check" />
                              </span>
                              {thirdDepth.menuNm}
                            </label>
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </>
      ))}
    </div>
  );
}
