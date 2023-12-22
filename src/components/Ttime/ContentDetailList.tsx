import React from 'react';
import { ImageRounded } from '../Picture/ImageRounded';
import { BASE_PATH } from '../../common/const';

export interface StoryContentProps {
  /**
   * isRead: 이야기 읽음 여부
   * isChecked: 북마크 체크 여부
   */
  isRead: boolean;
  isChecked: boolean;
  name: string;
  tag1: string;
  tag2: string;
  tag3: string;
  imageUrl: string;
}

export interface ContentDetailListProps {
  storyList?: Array<StoryContentProps>;
}

export function ContentDetailList({ storyList }: ContentDetailListProps) {
  return (
    <article className="content-list-area">
      <h2 className="tit">
        T 타임 이야기 더보기
        {/* T 타임 이야기 더 보기 타이틀 아이콘추가 2023.08.08 */}
        <i className="bl-arr-bold right" aria-hidden="true" />
      </h2>

      {/* 리스트 영역 */}
      <ul className="story-list">
        {storyList?.map((item: any, index: number) => (
          <li key={index}>
            <a href="#none">
              <div className="thumb-item">
                {/* 안읽은 이야기일 경우 불렛 추가 */}
                {!item.isRead && (
                  <span className="bullet">
                    <span className="hidden">안읽은 이야기</span>
                  </span>
                )}
                <ImageRounded src={item.imageUrl} width="56" height="56" alt="" />
                <div className="text-area">
                  <strong className="tit">{item.name}</strong>
                  <div className="tag-box">
                    <span className="tag">{item.tag1}</span>
                    <span className="tag">{item.tag2}</span>
                    <span className="tag">{item.tag3}</span>
                  </div>
                </div>
                {/* 저장하기 버튼 활성화시 클래스 active 추가 */}
                <button type="button" className={item.isChecked ? 'btn-bookmark active' : 'btn-bookmark'}>
                  <span className="hidden">저장하기</span>
                </button>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </article>
  );
}
