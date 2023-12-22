import '../../scss/bottom-nav.scss';
// import '../../scss/app.scss';
import 'core-js/actual';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import _ from 'lodash';
import BottomNav, { BottomNavContainerProps, BottomNavStandaloneProps } from '../../container/BottomNav';
import { isApp } from '../../js/commonUtil';
import { TWORLD_APP_URL, TWORLD_URL } from '../../common/const';
import v5SvcInfoApi from '../../api/v5/svcInfo';

_.noConflict();
axios.defaults.withCredentials = true;

if (typeof window.$tw === 'undefined') {
  window.$tw = {};
}

window.$tw.bottomNav = new (class {
  navContainerDiv: any;

  bottomNavProps: BottomNavContainerProps;

  // 서비스에서 호출하는 함수. 디폴트 값을 명시 해 둔다.
  init(props: BottomNavStandaloneProps) {
    this._init(props);
  }

  async _init({
    apiType: apiTypeParam = 'NONE',
    show = true,
    zIndex = 25,
    showBottomSheet = 'N',
    lang = 'KO',

    ldsp = 'GREEN',

    ..._props
  }: BottomNavStandaloneProps) {
    // @ts-ignore
    window.LDSP = ldsp;

    const props = _props;
    let tworldUrl = '';

    // tworld URL 설정
    if (apiTypeParam === 'V6') {
      // 티월드에서는 tworldUrl이 없는게 정상 (상대경로 사용)
    } else if (isApp()) {
      tworldUrl = TWORLD_APP_URL[ldsp];
    } else {
      tworldUrl = TWORLD_URL[ldsp];
    }

    // svcInfo 설정 (V6는 컴포넌트 내부에 로직이 포함되어 있음)
    if (apiTypeParam === 'V5') {
      const svcInfoResp = await v5SvcInfoApi();
      const svcInfo = svcInfoResp?.result;

      if (svcInfo) {
        props.myInfo = {
          svcInfo,
        };
      } else {
        props.myInfo = {};
      }
    } else if (apiTypeParam === 'NONE') {
      // myInfo 값 bypass
    }

    // BottomNav 컴포넌트로 넘길 props를 생성
    this.bottomNavProps = {
      isStandalone: true,
      isTworld: apiTypeParam === 'V6',
      ldsp,
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
    window.$tw.bottomNav$api.show(true);
  }

  hide() {
    this.navContainerDiv.style.display = 'none';
    window.$tw.bottomNav$api.hide(true);
  }
})();
