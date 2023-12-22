import React, { useContext, useEffect, useState } from 'react';
import { getShortcutMenu } from '../../api/main';
import { AppContext } from '../../context/AppContext';
import { isOverflown } from '../../js/commonUtil';
import myApiRespToDisplayData from '../../common/apiRespToDisplayData/my';
import { MainShortcut } from '../../components/Main/MainShortcut';
import useModal from '../../hooks/useModal';

interface ShortCutMenu {
  menuUrl: string;
  menuId: string;
  iconPath: string;
  menuNm: string;
  exUrlNotiYn: string;
}

export function ShortCutMenu() {
  const appContext = useContext(AppContext);
  const [myInfo] = appContext.myInfo;
  const [loginYn, setLoginYn] = useState<boolean>(false);
  const [isOverFlow, setIsOverFlow] = useState<boolean>(false);
  const [isEditBtnVisible, setIsEditBtnVisible] = useState<boolean>(false);

  const [shortCutMenuList, setShortCutMenuList] = useState<Array<ShortCutMenu>>([]);

  const { fullMenuEdit } = useModal();

  useEffect(() => {
    (async () => {
      const shortCutMenu = await getShortcutMenu();
      if (shortCutMenu.respCode === 0) {
        setShortCutMenuList(shortCutMenu.menuList);
        setIsOverFlow(isOverflown({ elm: document.getElementById('menuItems'), widthBuffer: 20 }));
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (myInfo) {
        const loginYnInfo = Object.keys(myInfo).length > 0;
        setLoginYn(loginYnInfo);

        const myDisplayData = myApiRespToDisplayData(myInfo);
        if (myDisplayData && myDisplayData.선택회선) {
          setIsEditBtnVisible(true);
        }
      }
    })();
  }, [myInfo]);

  const [toggleState, setToggleState] = useState(false);
  const [, setToggleTextState] = useState('펼치기');

  const toggleTab = (boolean: boolean) => {
    // 웹접근성 포커스 이동 작업 할 것
    setToggleState(boolean);
    setToggleTextState(boolean ? '접기' : '펼치기');
  };

  return (
    <>
      {shortCutMenuList && (
        <article className="card-main-content menu-more">
          <span className="tit-menu">메뉴 바로 가기</span>
          {loginYn && shortCutMenuList.length > 0 && isEditBtnVisible && (
            // 2022-11-17 추가 <button type="button" className="btn-meun-edited disabled" > 메뉴 없는 경우 클래스에 disabled 추가 </button>
            <button
              onClick={fullMenuEdit.show}
              type="button"
              className="btn-meun-edited"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="menu-edited"
            >
              <span>편집</span>
            </button>
          )}

          <MainShortcut
            shortCutMenuList={shortCutMenuList}
            toggleState={toggleState}
            isOverFlow={isOverFlow}
            toggleTab={toggleTab}
          />
        </article>
      )}
    </>
  );
}
