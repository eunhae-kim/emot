/* eslint-disable import/no-unresolved */
import React from 'react';
import classNames from 'classnames';
import { ICON_CLASS } from './MyLineManagement';
import { guessLang, myRedirect } from '../../common/utils';
import MyLink from '../Common/MyLink';
import XtrAw from '../Common/XtrAw';

export interface MyLineProps {
  lineName: string;
  itemName?: string;
  hasMultiLine?: boolean;
  icon?: string;
  itemNameLink?: string;
  onLineSelectorOpen?: () => void;
  isLineSelectorOpen?: boolean;
  messageOnly?: boolean;
}

export function MyLineInfo({
  lineName,
  hasMultiLine,
  itemNameLink,
  icon,
  itemName = '',
  onLineSelectorOpen = () => {},
  isLineSelectorOpen,
  messageOnly,
}: MyLineProps) {
  return (
    <div className="card-bottom-info">
      {messageOnly && (
        <div className="my-line-user">
          <button type="button" className="my-state">
            가입하신 회선이 없어요.
          </button>
        </div>
      )}
      {!messageOnly && (
        <div className="my-line-user">
          {/* aria-controls="" 에 연결된 팝업 id  추가 부탁드립니다 */}
          <XtrAw
            as="button"
            id="openLineSelector"
            appEid={guessLang() === 'KO' ? 'CMMA_A24-1' : 'CMMA_A10_B134-1'}
            webEid={guessLang() === 'KO' ? 'MWMA_A24-33' : 'MWMA_A10_B134-15'}
            xtrView
            xtrClick
            type="button"
            className="my-number"
            onClick={(e) => {
              e.preventDefault();

              if (hasMultiLine) {
                onLineSelectorOpen();
              } else {
                myRedirect(`${guessLang() === 'EN' ? '/en' : ''}/common/member/line`);
              }
            }}
            aria-haspopup="dialog"
            aria-controls="myActive"
            aria-expanded={isLineSelectorOpen}
            title="회선관리"
          >
            {lineName}
            {typeof hasMultiLine === 'boolean' && (
              <i className={classNames(['bl-arr-bold', { right: hasMultiLine === false }])} aria-hidden="true" />
            )}
          </XtrAw>
          {itemName && (
            <XtrAw
              as="div"
              appEid={guessLang() === 'KO' ? 'CMMA_A24-2' : 'CMMA_A10_B134-2'}
              webEid={guessLang() === 'KO' ? 'MWMA_A24-34' : 'MWMA_A10_B134-16'}
              xtrView
              xtrClick
              className="my-goods"
            >
              {ICON_CLASS[icon] && <i className={ICON_CLASS[icon]} aria-hidden="true" />}
              <MyLink href={itemNameLink} className="text">
                {itemName}
              </MyLink>
            </XtrAw>
          )}
        </div>
      )}
    </div>
  );
}
