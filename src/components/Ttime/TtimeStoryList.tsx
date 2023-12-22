import React, { useEffect, useState, useRef } from 'react';
import { InView } from 'react-intersection-observer';
import { ImageRounded } from '../Picture/ImageRounded';
import { TtimeStoryBannerInfo } from '../../container/ttime/TtimeStroyListCont';
import { TtimeStory } from '../../common/types';
import V6Link from '../Common/V6Link';
import { BASE_PATH } from '../../common/const';

export interface TtimeStoryListProps {
  storyList?: Array<TtimeStory>;
  orderByText?: string;
  themeTitle: string;
  themeTitleClickHref?: string;
  onLastStoryVisible?: () => void;
  onSortOptionClick?: () => void;
  onSaveClick?: (storyId: number) => Promise<void>;
  bannerInfo?: TtimeStoryBannerInfo;
  showListHeader?: boolean;
  showStoryCountHeader?: boolean;
  useStoryNotFoundScreen?: number;
  totalStoryCount?: number;
  storyListType?: 'saved' | 'read' | undefined;
}

export function TtimeStoryList({
  storyList,
  orderByText,
  themeTitle,
  themeTitleClickHref,
  onLastStoryVisible,
  onSortOptionClick,
  onSaveClick,
  bannerInfo,
  showListHeader = true,
  showStoryCountHeader = false,
  useStoryNotFoundScreen,
  totalStoryCount,
  storyListType = undefined,
}: TtimeStoryListProps) {
  const emptyStoryText = () => {
    const text = '이야기가 없습니다.';
    if (storyListType === 'saved') {
      return `저장한 ${text}`;
    }
    if (storyListType === 'read') {
      return `다 읽은 ${text}`;
    }
    return text;
  };
  return (
    <article className="tTime-story-list-content">
      {/* 상단 필터 영역 */}
      {showListHeader && (
        <div className="list-head">
          {themeTitleClickHref ? (
            <V6Link href={themeTitleClickHref}>
              <h2 className="tit">
                {themeTitle}
                <i className="bl-arr-bold right" aria-hidden="true" />
              </h2>
            </V6Link>
          ) : (
            <h2 className="tit">{themeTitle}</h2>
          )}

          <div className="select-option-box">
            {orderByText && (
              <button type="button" className="btn-list-filter" onClick={onSortOptionClick}>
                <i className="ic-filter" aria-hidden="true" />
                <em>{orderByText}</em>
              </button>
            )}
          </div>
        </div>
      )}
      {showStoryCountHeader && totalStoryCount > 0 && (
        <div className="list-head">
          <span className="story-count-title">
            총 <strong className="count-result">{totalStoryCount}</strong>개
          </span>
        </div>
      )}
      {storyList?.length < 1 && useStoryNotFoundScreen === 1 && (
        <div className="story-list-none">
          <i className="ic-warn" aria-hidden="true" />
          <p className="result-text">{emptyStoryText()}</p>
          <span className="sub-text">T 타임에서 다양한 이야기를 즐겨보세요.</span>
        </div>
      )}

      {/* 이야기 리스트 */}
      <ul className="story-list">
        {storyList?.map((item: any, index: number) => (
          // 같은 항목이라도 스토리가 몇개일때 랜더 됐는지에 따라서 InView 컴포넌트가 다르게 생성 되어야 함
          <React.Fragment key={`${item.id}_${storyList.length}`}>
            <li>
              <InView
                threshold={0.99}
                onChange={
                  index === storyList.length - 1
                    ? (inView) => {
                        if (!inView) return;
                        if (onLastStoryVisible) onLastStoryVisible();
                      }
                    : null
                }
              >
                <V6Link href={`${BASE_PATH}/ttime/story?id=${item.id}`}>
                  <div className={`thumb-item ${onSaveClick ? '' : 'no-bookmark'}`}>
                    {/* 안읽은 이야기일 경우 불렛 추가 */}
                    {item.readYn === 'N' && (
                      <span className="bullet">
                        <span className="hidden">안읽은 이야기</span>
                      </span>
                    )}
                    <ImageRounded src={item.thumbnailImgUrl} width="56" height="56" alt="" />
                    <div className="text-area">
                      <strong id="storyListitem" className="tit">
                        {item.title}
                      </strong>
                      <div className="tag-box">
                        {item.tags.map((tag) => (
                          <span className="tag" key={tag.id}>
                            #{tag.title}
                          </span>
                        ))}
                      </div>
                    </div>
                    {/* 저장하기 버튼 활성화시 클래스 active 추가 */}
                    {onSaveClick && (
                      <button
                        type="button"
                        className={item.savedYn === 'Y' ? 'btn-bookmark active' : 'btn-bookmark'}
                        onClick={(e) => {
                          onSaveClick(item.id);
                          e.preventDefault();
                        }}
                      >
                        <span className="hidden">저장하기</span>
                      </button>
                    )}
                  </div>
                </V6Link>
              </InView>
            </li>

            {/* 리워드 띠배너 */}
            {bannerInfo && index === Math.floor(storyList.length / 2) - 1 && (
              <li key={`${JSON.stringify(bannerInfo)}_${storyList.length}`} className="banner-area">
                <a href={bannerInfo.targetUrl}>
                  <img src={bannerInfo.imgUrl} alt="" width="100%" />
                </a>
              </li>
            )}
          </React.Fragment>
        ))}
      </ul>
    </article>
  );
}
