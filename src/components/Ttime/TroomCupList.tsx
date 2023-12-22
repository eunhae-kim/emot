import React, { useState } from 'react';
import { readCup } from '../../api/ttime/cups';
import { TtimeCup } from '../../common/types';
import useModal from '../../hooks/useModal';

export interface TroomCupListProps {
  userName: string;
  cupList: Array<TtimeCup>;
  ownedCupList: Array<number>;
}

export function TroomCupList({ userName, cupList, ownedCupList }: TroomCupListProps) {
  const { ttimeCup } = useModal();
  const [troomCupList, setTroomCupList] = useState<TtimeCup[]>(
    // 발급중단 컵은 노출하지 않는다.(다만, 발급중단 컵을 모은 경우는 노출한다.)
    cupList.filter((cup) => cup.activeYn === 'Y' || (cup.activeYn === 'N' && cup.ownYn === 'Y')),
  );

  const cupClickHandler = async (item: TtimeCup) => {
    ttimeCup.show({
      cupInfo: item,
      isOpen: true,
      onClose: () => {
        const _troomCupList = troomCupList;
        const index = _troomCupList.findIndex((cup) => item.id === cup.id);
        _troomCupList[index].popupYn = 'Y';
        setTroomCupList(_troomCupList);
        ttimeCup.close();
      },
    });

    // ownYn === "Y" && popupYn === "N"이면 최초 클릭 메시지 생성
    if (item.ownYn === 'Y' && item.popupYn === 'N') {
      await readCup(item.id);
    }
  };

  return (
    <div className="troom-list-content">
      {/* 타이틀 */}
      {ownedCupList.length > 0 ? (
        // 모은 컵이 있는 경우
        <h2 className="tit">
          <span className="user-name">{userName}</span>님이 모은 컵은 총
          <span className="num">{`${ownedCupList.length}잔`}</span>
        </h2>
      ) : (
        // 모은 컵이 없는 경우
        <h2 className="tit">힌트를 보고 더 많은 컵을 모아보세요</h2>
      )}

      {/* 컵 안내 리스트 */}
      {/* 신규 모은 컵일 경우(ownYn==='Y' && popupYn==='N' li에 클래스 new 추가 */}
      <ul className="cup-list">
        {troomCupList.map((item, index: number) => (
          <li
            key={item.id}
            className={`list-item ${item.ownYn === 'Y' && item.popupYn === 'N' ? 'new' : ''}`}
            onClick={() => {
              cupClickHandler(item);
            }}
          >
            <button type="button" onClick={() => {}}>
              <img
                src={item.ownYn === 'Y' ? item.thumbnailImgUrl : item.lockedTumbnailImgUrl}
                className="cup-img"
                alt={item.ownYn === 'Y' ? item.thumbnailImgAlt : item.lockedTumbnailImgAlt}
              />
              <strong className="tit">
                {/* eslint-disable-next-line react/no-danger */}
                <div dangerouslySetInnerHTML={{ __html: item.titleLineBreak }} />
              </strong>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
