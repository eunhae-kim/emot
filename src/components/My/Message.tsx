/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import classnames from 'classnames';
import V6Link from '../Common/V6Link';
import { guessLang } from '../../common/utils';

export interface MessageProps {
  loading: boolean;
  exIcon: 'ic-qck-myfee' | 'ic-inspect' | 'ic-warn';
  exTit: string | null;
  exSubTit: string | null;
  exBtnRefresh: boolean;
  exAddClass: boolean;
  exBtnView?: boolean;
  showLineSelector?: () => void;
  showTworldHomeLink?: boolean;
}

export function Message({
  loading,
  exIcon,
  exTit,
  exSubTit,
  exBtnRefresh,
  exAddClass,
  exBtnView = false,
  showLineSelector = null,
  showTworldHomeLink = false,
}: MessageProps) {
  return (
    <>
      {loading ? (
        <div className="message-announce">
          <div className="loading">
            <div className="loader">
              <div className="spinner_loading">
                <div className="line" />
                <div className="line" />
                <div className="line" />
                <div className="line" />
                <div className="line" />
                <div className="line" />
                <div className="line" />
                <div className="line" />
                <div className="line" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={classnames([
            `message-announce-case`,
            { type1: exAddClass },
            { type2: !exAddClass && showTworldHomeLink },
          ])}
        >
          <div className="my-msg-exception">
            {/* 웹 접근성 aria-hidden="true" 추가 */}
            <i className={exIcon} aria-hidden="true" />
            <p className="emp-text">{exTit}</p>
            <span
              className="acc-text"
              dangerouslySetInnerHTML={{
                __html: exSubTit,
              }}
            />
            {showLineSelector && (
              <button type="button" onClick={showLineSelector} className="line-link">
                Select a Mobile Line
              </button>
            )}
            <div className="my-btn-area">
              {exBtnRefresh && (
                <button type="button" className="btn" onClick={() => window.location.reload()}>
                  {/* 웹 접근성 aria-hidden="true" 추가 */}
                  <i className="ic-refresh" aria-hidden="true" />
                  {guessLang() === 'KO' ? '새로고침' : 'Try again'}
                </button>
              )}
              {exBtnView && (
                <V6Link
                  href={guessLang() === 'KO' ? '/myt-fare' : '/en/myt-fare/billguide/guide'}
                  myToMainWebView
                  className="btn"
                >
                  {guessLang() === 'KO' ? '자세히 보기' : 'View Details'}
                </V6Link>
              )}
              {showTworldHomeLink && (
                <V6Link href="/" myToMainWebView className="btn">
                  Go to T world KOR
                </V6Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
