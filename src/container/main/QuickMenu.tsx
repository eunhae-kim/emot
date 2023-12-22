import React, { useEffect, useState } from 'react';
import { getQuickMenu } from '../../api/main';
import { MainMenu } from '../../components/Main/MainMenu';

interface QuickMenu {
  menuId: string;
  menuNm: string;
  menuUrl: string;
  iconPath: string;
  exUrlNotiYn: string;
  oferStcCd: string;
}

export function QuickMenu() {
  const [quickMenuList, setQuickMenuList] = useState<Array<QuickMenu>>(null);

  useEffect(() => {
    (async () => {
      const quickMenu = await getQuickMenu();
      if (quickMenu.respCode === 0) setQuickMenuList(quickMenu.quickMenuList);
    })();
  }, []);

  return quickMenuList && quickMenuList.length > 0 && <MainMenu quickMenuList={quickMenuList} />;
}
