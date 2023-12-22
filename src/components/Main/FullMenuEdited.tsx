import React, { useEffect, useState } from 'react';

import { NavFullMenu } from '../Fullmenu/NavFullMenu';
import { getMenu } from '../../api/menu';
import { getInitShortCutMenu, getShortcutMenu, setShortCutMenu } from '../../api/main';
import useModal from '../../hooks/useModal';

export function FullMenuEdited({ setMenuEditYn }) {
  const { confirm } = useModal();
  const [menuList, setMenuList] = useState({});
  const [checkedMenu, setCheckedMenu] = useState([]);
  const [initialUserMenu, setInitialUserMenu] = useState([]);

  useEffect(() => {
    window.$tw.bottomNav$api.hide();

    (async () => {
      const menu = await getMenu();
      setMenuList(menu.frontMenus);

      const shortCutMenu = await getShortcutMenu();
      setInitialUserMenu(shortCutMenu.menuList);

      const arr = [];
      shortCutMenu.menuList.map((menu) => {
        arr.push(menu.menuId);
      });
      setCheckedMenu(arr);
    })();
  }, []);

  function goMain() {
    window.$tw.bottomNav$api.show();
    window.location.href = '/v6/main';
  }

  async function initMenu() {
    const response = await getInitShortCutMenu();
    const shortCutMenu = response.menuIdStr.split(',');
    const arr = [];
    shortCutMenu.map((menu) => {
      arr.push(menu);
    });
    setCheckedMenu(arr);
  }

  async function saveMenu() {
    await setShortCutMenu(checkedMenu.toString());
    goMain();
  }

  function closeMenuPopup() {
    const initialMenu = [];
    initialUserMenu.map((menu) => {
      initialMenu.push(menu.menuId);
    });

    if (checkedMenu.toString() === initialMenu.toString()) {
      goMain();
    } else {
      confirm.show({
        isOpen: true,
        isEndPopUp: true,
        message: '저장하지 않고 종료하시겠습니까?<br/>종료 시 편집한 내용이 반영되지 않습니다.',
        onClickConfirm: () => {
          confirm.close();
          goMain();
        },
        onClickCancel: confirm.close,
      });
    }
  }

  function initMenuBtnClicked() {
    confirm.show({
      isOpen: true,
      isEndPopUp: false,
      message: 'T 월드 앱에서 제공하는 기본 바로 가기로<br/> 변경하시겠습니까?',
      onClickConfirm: async () => {
        confirm.close();
        await initMenu();
      },
      onClickCancel: confirm.close,
    });
  }

  const body = document.getElementsByTagName('body')[0];
  body.classList.add('scrollLock');

  return (
    <div className="fullmenu popup-fullmenu">
      {/* 스크롤업 시 nav-full-menu fixed 추가 */}
      <div
        className="nav-full-menu edited"
        role="dialog"
        aria-modal="true"
        id="menu-edited" /* 2022-12-21 접근성 / id 와 편집 버튼 aria-controls 동일하게 */
      >
        <header className="tworld-sub-header">
          <h1>메뉴 바로 가기 편집</h1>
          <button onClick={closeMenuPopup} type="button" className="btn-type-close" title="메뉴 바로가기 닫기">
            {/* 2022-12-20 접근성 / title 추가 */}
            <i className="ic-tbar-cls" aria-hidden="true" /> {/* 2023-01-12 접근성 / aria 추가 */}
            <span className="hidden">메뉴 바로가기 닫기</span>
          </button>
        </header>

        <div className="reset-area">
          <button onClick={initMenuBtnClicked} type="button" className="btn-type-reset">
            <i className="ic-reset" />
            <span>초기화</span>
          </button>
        </div>

        <NavFullMenu checkedMenu={checkedMenu} setCheckedMenu={setCheckedMenu} menu={menuList} edited={true} />

        <div className="fixed-area-bt">
          <div className="btn-full-pop">
            <button type="button" className="btn-type-primary" onClick={saveMenu}>
              저장하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
