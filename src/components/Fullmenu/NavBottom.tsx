/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import classnames from 'classnames';
import { menuInfoMapKo } from './NavBottom.stories';
import { loginUrl, quickLoginUrl, registerLineUrl, signUpUrl, v6TworldUrl } from '../../js/commonUtil';
import XtrAw from '../Common/XtrAw';
import Xtr from '../Common/Xtr';
import { guessLang } from '../../common/utils';

export type MenuKey = 'MY' | 'HOME' | 'SHOP' | 'BENEFIT' | 'MENU';

export type MenuInfo = {
  label: string;
  url: string;
};

export type MenuInfoMap = Partial<Record<MenuKey, MenuInfo>>;

export type BottomSheetMode =
  | 'NONE'
  | 'NORMAL'
  | 'LOGIN'
  | 'REGISTER_A_LINE'
  | 'NO_REGISTERED_LINE'
  // English Only
  | 'NO_ACCESS_LINK_TO_KOR'
  | 'NO_ACCESS_SELECT_MOBILE';

export type MyButtonAction = 'NONE' | 'MY' | 'LOGIN';

export type LandingInfo = {
  login?: string;
  simpleLogin?: string;
  signUp?: string;
  registerLine?: string;
  selectMobileLine?: string;
  korTworld?: string;
};

export interface BottomNavProps {
  lang?: 'KO' | 'EN';
  tworldUrl?: string;

  bottomSheetMode?: BottomSheetMode;
  tabIndex?: number;

  menuInfoMap?: MenuInfoMap;
  hasMultiLine?: boolean;

  zIndex?: number;

  myButtonAction: MyButtonAction;

  lineIdText?: string | null;
  quota?: string | React.Component;
  quotaText?: string;

  // givenLoginUrl?: string

  landingInfo?: LandingInfo;
}

export function NavBottom({
  lang = 'KO',
  tworldUrl = '',
  lineIdText = '',
  quota = '',
  quotaText = '',
  hasMultiLine = false,
  bottomSheetMode = 'NONE',
  myButtonAction = 'NONE',

  tabIndex,

  menuInfoMap = menuInfoMapKo,

  landingInfo = {},

  zIndex = 25,
}: BottomNavProps) {
  const selectedClass = 'on';

  const arrowIcon = classnames(['bl-arr', { btm: hasMultiLine }]);

  let bottomSheetLeft;
  let bottomSheetRight;

  let myLink = menuInfoMap.MY.url;

  if (myButtonAction === 'LOGIN') {
    myLink = landingInfo.login;
  } else if (myButtonAction === 'NONE') {
    myLink = undefined;
  }

  switch (bottomSheetMode) {
    case 'NONE':
      break;
    case 'NORMAL':
      bottomSheetLeft = (
        <a href={myLink} title="회선관리">
          {lineIdText} {hasMultiLine && <i className={arrowIcon} />}
        </a>
      );
      bottomSheetRight = (
        <span className="text">
          <strong>{quota}</strong>
          <span className="stxt">{quotaText}</span>
        </span>
      );
      break;
    case 'LOGIN':
      if (lang === 'KO') {
        bottomSheetLeft = (
          <a href={landingInfo.login}>
            로그인하기 <i className={arrowIcon} aria-hidden="true" /> {/* 2023-01-10 접근성 / aria 추가 */}
          </a>
        );
        bottomSheetRight = (
          <>
            {/*
            // 웹 바텀 네비 앱에서는 노출 안됨
            <span className="text">
              <a href="/">간편로그인</a>
            </span>
            */}
            <span className="text">
              <a href={landingInfo.signUp}>회원가입</a>
            </span>
          </>
        );
      } else {
        bottomSheetLeft = (
          <a href={landingInfo.login}>
            Please sign in <i className={arrowIcon} />
          </a>
        );
        bottomSheetRight = (
          <>
            {/*
            <span className="text">
              <a href="/">Simple Log-in</a>
            </span>
            */}
            <span className="text">
              <a href={landingInfo.signUp}>Register</a>
            </span>
          </>
        );
      }
      break;
    case 'REGISTER_A_LINE':
      if (lang === 'KO') {
        bottomSheetLeft = <>회선을 등록해 주세요.</>;
        bottomSheetRight = (
          <span className="text">
            <a href={landingInfo.registerLine}>회선 등록하기</a>
          </span>
        );
      } else {
        bottomSheetLeft = <>Please Register a Line</>;
        bottomSheetRight = (
          <span className="text">
            <a href={landingInfo.registerLine}>Register Line</a>
          </span>
        );
      }
      break;
    case 'NO_REGISTERED_LINE':
      if (lang === 'KO') {
        bottomSheetLeft = <>가입하신 회선이 없어요.</>;
      } else {
        bottomSheetLeft = <>No Registered Lines</>;
      }
      break;
    case 'NO_ACCESS_LINK_TO_KOR':
      bottomSheetLeft = <>Your Lines may access</>;
      bottomSheetRight = (
        <span className="text">
          on the <a href={landingInfo.korTworld}>T world KOR</a>
        </span>
      );
      break;
    case 'NO_ACCESS_SELECT_MOBILE':
      bottomSheetLeft = <>Access Unavailable</>;
      bottomSheetRight = (
        <span className="text">
          <a href={landingInfo.selectMobileLine}>Select a Mobile Line</a>
        </span>
      );
      break;
    default:
  }

  return (
    <div className="nav-global-bottom" style={{ zIndex }}>
      {/* 바텀시트 */}
      {bottomSheetMode !== 'NONE' && (
        <div className="g-bottom-info">
          <div className="g-line-user">
            <span className="btn-txt">
              <span className="info-number">{bottomSheetLeft}</span>
            </span>
            <div className="g-goods">{bottomSheetRight}</div>
          </div>
        </div>
      )}
      {/* .g-bottom-info */}

      {/* 바텀네비 */}
      <div className="g-bottom-nav">
        <ul className={classnames(['g-nav-list', { en: lang === 'EN' }])} role="tablist">
          {' '}
          {/* 2023-01-26 접근성 / role 추가 */}
          <li className="nav-home" role="presentation">
            {' '}
            <Xtr xtrEid={guessLang() === 'KO' ? 'MWMA_A20-237' : 'MWMA_A10_B79-100'} xtrClick>
              {/* 2023-01-12 접근성 / aria 추가 */}
              <a href={menuInfoMap.HOME.url} className="btn-icon" role="tab" aria-selected={tabIndex === 0}>
                <i className={classnames('svg-home', { [selectedClass]: tabIndex === 0 })} />{' '}
                <span className="txt">
                  <em>{menuInfoMap.HOME.label}</em>
                </span>
              </a>
            </Xtr>
          </li>
          {lang === 'KO' && (
            <li className="nav-shop" role="presentation">
              {' '}
              <Xtr xtrEid={guessLang() === 'KO' ? 'MWMA_A20-238' : ''} xtrClick>
                {/* 2023-01-12 접근성 / aria 추가 */}
                <a href={menuInfoMap.SHOP.url} className="btn-icon" role="tab" aria-selected={tabIndex === 1}>
                  <i className={classnames('svg-shop', { [selectedClass]: tabIndex === 1 })} />
                  <span className="txt">
                    <em>{menuInfoMap.SHOP.label}</em>
                  </span>
                </a>
              </Xtr>
            </li>
          )}
          <li className="myt">
            <Xtr xtrEid={guessLang() === 'KO' ? 'MWMA_A20-239' : 'MWMA_A10_B79-101'} xtrClick>
              <a href={myLink} className="btn-icon btn-my">
                <i className="svg-arr-top" />
                <span className="txt">
                  <em>{menuInfoMap.MY.label}</em>
                </span>
              </a>
            </Xtr>
          </li>
          {lang === 'KO' && (
            <li className="nav-bf" role="presentation">
              {' '}
              <Xtr xtrEid={guessLang() === 'KO' ? 'MWMA_A20-240' : ''} xtrClick>
                {/* 2023-01-12 접근성 / aria 추가 */}
                <a href={menuInfoMap.BENEFIT.url} className="btn-icon" role="tab" aria-selected={tabIndex === 2}>
                  <i className={classnames('svg-benef', { [selectedClass]: tabIndex === 2 })} />
                  <span className="txt">{menuInfoMap.BENEFIT.label}</span>
                </a>
              </Xtr>
            </li>
          )}
          <li className="nav-nemu" role="presentation">
            {' '}
            <Xtr xtrEid={guessLang() === 'KO' ? 'MWMA_A20-241' : 'MWMA_A10_B79-102'} xtrClick>
              {/* 2023-01-12 접근성 / aria 추가 */}
              <a href={menuInfoMap.MENU.url} className="btn-icon" role="tab" aria-selected={tabIndex === 3}>
                <i className={classnames('svg-menu', { [selectedClass]: tabIndex === 3 })} />
                <span className="txt">{menuInfoMap.MENU.label}</span>
              </a>
            </Xtr>
          </li>
        </ul>
      </div>
      {/* .g-bottom-nav */}
    </div>
  );
}
