/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import classnames from 'classnames';
import V6Link from '../../Common/V6Link';

export interface MessageProps {
  exIcon: string | null;
  exTit: string | null;
  exSubTit: string | null;
  exBtnRefresh: boolean;
  exAddClass: boolean;
  exceptionWire: boolean;
  representLine: boolean;
  normalLine: boolean;
  exBtnView: boolean;
  selectLine: boolean;
}

export function Message({
  exIcon,
  exTit,
  exSubTit,
  exBtnRefresh,
  exAddClass,
  exceptionWire,
  representLine,
  normalLine,
  exBtnView,
  selectLine,
  ...props
}: MessageProps) {
  return (
    <>
      {exceptionWire ? (
        <>
          <div className="my-volume">
            169,300
            <span className="unit">원</span>
            <i className="bl-arr-bold right" aria-hidden="true" />
          </div>
          {normalLine && (
            <div className="message-announce-case">
              <div className="my-msg-normal">
                <p className="acc-text">
                  <em>010-98**-54</em> 에 통합 청구 되었어요.
                </p>
              </div>
            </div>
          )}
        </>
      ) : (
        <div
          className={classnames([`message-announce-case`, { type1: exAddClass }, { type2: !exAddClass && selectLine }])}
        >
          <div className="my-msg-exception">
            {/* 웹 접근성 aria-hidden="true" 추가 */}
            <i className={`${exIcon}`} aria-hidden="true" />
            <p className="emp-text">{exTit}</p>
            <span className="acc-text">{`${exSubTit}`}</span>
            {selectLine && (
              <a href="/" className="line-link">
                Select a Mobile Line
              </a>
            )}
            <div className="my-btn-area">
              {exBtnRefresh && (
                <button type="button" className="btn">
                  {/* 웹 접근성 aria-hidden="true" 추가 */}
                  <i className="ic-refresh" aria-hidden="true" />
                  Try again
                </button>
              )}
              {exBtnView && (
                <V6Link href="/en/myt-fare/billguide/guide" myToMainWebView className="btn">
                  View Details
                </V6Link>
              )}

              {selectLine && (
                <button type="button" className="btn">
                  Go to T world KOR
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
