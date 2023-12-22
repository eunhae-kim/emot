import React from 'react';
import { BASE_PATH } from '../../common/const';
import { TtimeCup } from '../../common/types';
import V6Link from '../Common/V6Link';

export interface CupTypeProps {
  userName: string;
  savedStroyNum: number;
  readStroyNum: number;
  cupInfo?: TtimeCup;
}

export function TroomCupTypeContent({ userName, savedStroyNum, readStroyNum, cupInfo }: CupTypeProps) {
  console.log('cupInfo', JSON.stringify(cupInfo));
  return (
    <div className="troom-typeinfo-content">
      {/* 컵 유형정보 안내 영역 */}
      {cupInfo ? (
        // 모은 컵이 있는 경우
        <div className="cup-info">
          <img src={cupInfo.bigTumbnailImgUrl} className="cup-img" width="120" height="120" alt="" />
          <div className="text-area">
            <span className="user-name">{`요즘 ${userName} 님이 T 타임 즐긴`}</span>
            <strong className="cup-name">{cupInfo.title}</strong>
          </div>
        </div>
      ) : (
        // 모은 컵이 없는 경우
        <div className="cup-info">
          <img src={`${BASE_PATH}/images/sub/ic-cup00.png`} className="cup-img" width="120" height="120" alt="" />
          <div className="text-area">
            <span className="user-name">{`${userName} 님`}</span>
            <strong className="cup-name">T 타임을 함께할 컵을 모아보세요</strong>
          </div>
        </div>
      )}

      {/* 이야기 안내 영역 */}
      <div className="story-info">
        <ul className="info-list">
          <li>
            <V6Link href={`${BASE_PATH}/ttime/storyMoa?tabId=saved`}>
              <span className="list-tit">저장한 이야기</span>
              <span className="num">
                <em>{savedStroyNum}</em>개
                <i className="bl-arr-bold right" aria-hidden="true" />
              </span>
            </V6Link>
          </li>
          <li>
            <V6Link href={`${BASE_PATH}/ttime/storyMoa?tabId=read`}>
              <span className="list-tit">다 읽은 이야기</span>
              <span className="num">
                <em>{readStroyNum}</em>개
                <i className="bl-arr-bold right" aria-hidden="true" />
              </span>
            </V6Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
