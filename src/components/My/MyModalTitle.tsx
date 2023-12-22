/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import MyLink from '../Common/MyLink';
import { guessLang } from '../../common/utils';

export interface MyModalTitleProps {
  title: string | null;
  arrow: boolean;
  link?: string;
  unregisteredCnt?: number;
  onClose: () => void;
}
export function MyModalTitle({ title, arrow, link, unregisteredCnt, onClose }: MyModalTitleProps) {
  const titleContents = (
    <>
      <h2 className="sub-title">{title}</h2>
      {/* 웹 접근성 aria-hidden="true" 추가 */}
      {arrow && <i className="bl-arr-bold right" aria-hidden="true" />}
    </>
  );
  return (
    <div className="title-fixed">
      {link && (
        <MyLink href={link} className="link">
          {titleContents}
        </MyLink>
      )}
      {!link && <div className="link">{titleContents}</div>}
      {!!unregisteredCnt && (
        <div className="enroll-txt">
          {guessLang() === 'EN' && (
            <>
              <em className="number">{unregisteredCnt} lines</em> waiting to be registered
            </>
          )}
          {guessLang() === 'KO' && (
            <>
              아직 등록되지 않은 회선이 <em className="number">{unregisteredCnt}개</em> 있습니다
            </>
          )}
        </div>
      )}
      <button type="button" className="btn-close" onClick={onClose}>
        {/* 웹 접근성 aria-hidden="true" 추가 */}
        <i className="ic-tbar-cls" aria-hidden="true" />
        {/* s: 접근성 close를 닫기로 수정 */}
        <span className="hidden">닫기</span>
        {/* e: 접근성 close를 닫기로 수정 */}
      </button>
    </div>
  );
}
