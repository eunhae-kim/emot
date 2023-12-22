import React from 'react';
import { TroomCupTypeContent } from '../Ttime/TroomCupTypeContent';
import { TroomCupList } from '../Ttime/TroomCupList';
import { BASE_PATH } from '../../common/const';
import TtimeHeader from '../Ttime/TtimeHeader';
import { TtimeCup } from '../../common/types';

export interface SubTroomProps {
  isBanner: boolean;
  userName: string;
  savedStroyNum: number;
  readStroyNum: number;
  cupInfo: TtimeCup;
  cupList: Array<any>;
  ownedCupList: Array<number>;
}

export default function SubTroom({
  isBanner,
  userName,
  savedStroyNum,
  readStroyNum,
  cupInfo,
  cupList,
  ownedCupList,
}: SubTroomProps) {
  return (
    <>
      {/* T타임 Header */}
      <TtimeHeader isBack={true} title={'T 타임 룸'} />

      {/* 검수용 임시 container */}
      <div className="tTime-container">
        {/* T타임룸 컵 유형정보 */}
        <TroomCupTypeContent
          userName={userName}
          savedStroyNum={savedStroyNum}
          readStroyNum={readStroyNum}
          cupInfo={cupInfo}
        />

        {/* 검수용 임시 T타임룸 리워드 띠배너 */}
        {isBanner ? (
          <div className="banner-area btm-border">
            <a href="#none">
              <img src={`${BASE_PATH}/images/banner/tTime-banner.jpg`} alt="" width="100%" />
            </a>
          </div>
        ) : (
          ''
        )}

        {/* T타임룸 컵 안내 리스트 */}
        <TroomCupList userName={userName} cupList={cupList} ownedCupList={ownedCupList} />
      </div>
    </>
  );
}
