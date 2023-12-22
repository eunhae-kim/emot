import '../../scss/bottom-nav.scss';
// import '../../scss/app.scss';
import 'core-js/actual';
import React from 'react';
import ReactDOM from 'react-dom';
import BottomNav, { BottomNavContainerProps, LDSP_TYPE, ShowBottomSheet } from '../../container/BottomNav';
import { koNormal } from '../Fullmenu/NavBottom.stories';
import { Lang } from '../../common/types';
import axios from 'axios';
import { isApp } from '../../js/commonUtil';
import { TWORLD_APP_URL, TWORLD_URL } from '../../common/const';

axios.defaults.withCredentials = true;

if (typeof window.$tw === 'undefined') {
  window.$tw = {};
}

window.$tw.bottomNav = new (class {
  navContainerDiv: any;
  bottomNavProps: BottomNavContainerProps;

  constructor() {}

  init({
    isTworld = true,
    show = true,
    zIndex = 25,
    showBottomSheet = 'N',
    lang = 'KO',

    ldsp = 'GREEN',
    tworldUrl = null,

    ...props
  }: BottomNavContainerProps) {
    if (isTworld) {
      // 티월드에서는 tworldUrl이 없는게 정상 (상대경로 사용)
    } else {
      if (typeof tworldUrl !== 'string') {
        if (isApp()) {
          tworldUrl = TWORLD_APP_URL[ldsp];
        } else {
          tworldUrl = TWORLD_URL[ldsp];
        }
      }
    }

    this.bottomNavProps = {
      isStandalone: true,
      ldsp,
      isTworld,
      show,
      showBottomSheet,
      tworldUrl,
      lang,
      zIndex,
      ...props,
    };

    this.render();
  }

  render() {
    this.navContainerDiv = document.createElement('div');
    document.body.appendChild(this.navContainerDiv);

    ReactDOM.render(<BottomNav {...this.bottomNavProps} />, this.navContainerDiv);
  }

  show() {
    this.navContainerDiv.style.display = 'block';
    window.$tw.bottomNav$api.show();
  }

  hide() {
    this.navContainerDiv.style.display = 'none';
    window.$tw.bottomNav$api.hide();
  }
})();
