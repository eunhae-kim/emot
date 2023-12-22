/* eslint-disable react/no-danger */
import React, { MutableRefObject, useContext } from 'react';

import { MyModalTitle } from '../My/MyModalTitle';

import { LineGroupType, MyLineManagement, MyLineProps } from '../My/MyLineManagement';
import { Lang } from '../../common/types';
import MyLink from '../Common/MyLink';
import { AppContext } from '../../context/AppContext';

export interface ModalLineProps {
  unregisteredCnt?: number;
  isVisible: boolean;
  lang: Lang;
  mobileLineList: Array<MyLineProps>;
  wiredLineList: Array<MyLineProps>;
  selectedLineSvcMgmtNum?: string;
  onLineSelected: (MyLineProps) => Promise<void>;
  onClose: () => void;
  layerRef?: MutableRefObject<HTMLElement>;
}

export function ModalLine({
  unregisteredCnt,
  mobileLineList,
  wiredLineList,
  selectedLineSvcMgmtNum,
  lang,
  onLineSelected,
  onClose,
  isVisible,
  layerRef,
}: ModalLineProps) {
  const appContext = useContext(AppContext);
  const isStorybook = !appContext;

  return (
    <div
      ref={(r) => {
        if (layerRef) layerRef.current = r;
      }}
      aria-hidden={!isVisible}
      className="overlay-modal"
      onClick={() => {
        onClose();
      }}
    >
      {/* 2023-01-12 접근성 / id 추가 */}
      <div
        id="myActive"
        className="layer-type-bottom modal-content-transition"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {/* enroll 미등록 회선이 있는 경우 회선 안내 추가 23-01-03 */}
        <MyModalTitle
          title={lang === 'KO' ? '회선 관리' : 'Manage My Lines'}
          arrow
          link={`${lang === 'EN' ? '/en' : ''}/common/member/line`}
          unregisteredCnt={unregisteredCnt}
          onClose={onClose}
        />

        <MyLineManagement
          title={lang === 'KO' ? '모바일' : 'Mobile'}
          groupType={LineGroupType.MOBILE}
          lineList={mobileLineList}
          selectedLineSvcMgmtNum={selectedLineSvcMgmtNum}
          onLineSelected={onLineSelected}
          lang={lang}
        />
        {lang === 'KO' && wiredLineList.length > 0 && (
          <MyLineManagement
            title="인터넷/집전화/B tv"
            groupType={LineGroupType.WIRED}
            lineList={wiredLineList}
            selectedLineSvcMgmtNum={selectedLineSvcMgmtNum}
            onLineSelected={onLineSelected}
            lang={lang}
          />
        )}
        {lang === 'KO' && (
          <div className="my-banner">
            <MyLink href="/common/member/line/skb-svc-agreement">
              {/* 접근성 alt에 이미지 텍스트와 동일 텍스트 문구 추가 */}
              <img
                src={`${isStorybook ? '' : '/v6'}/images/banner/my-banner.png`}
                alt="SK브로드밴드에서 가입한 상품이 확인되지 않으시나요?"
              />
            </MyLink>
          </div>
        )}

        {lang === 'EN' && (
          <div className="my-banner-info">
            <span className="text-en">
              You may view non-mobile lines including Internet/landline/IPTV on the Korean version of T world
            </span>
            <MyLink href="/v6/main" className="my-more">
              Go to T world KOR
            </MyLink>
          </div>
        )}
      </div>
    </div>
  );
}
