import React, { useEffect, useRef, useState } from 'react';
import focusLoop from '../../common/focusLoop';
import { useActiveElement } from '../../common/utils';

export interface MainItemBoxProps {
  isOpen: boolean;
  onClose?: () => void;
  bottomSheetType: 'device' | 'scm';
  rankingSeg: any;
  setRankingSeg: any;
}

function BottomModal({ isOpen, onClose, bottomSheetType, rankingSeg, setRankingSeg }: MainItemBoxProps) {
  const layerRef = useRef<HTMLElement>(null);
  const selectedElm = useActiveElement();
  const [lastSelectedElm, setLastSelectedElm] = useState(selectedElm);

  let ageList = [];
  if (bottomSheetType === 'device') {
    ageList = [
      { id: 'age_0_99', name: '모두' },
      { id: 'age_0_12', name: '키즈' },
      { id: 'age_13_19', name: '10대' },
      { id: 'age_20_29', name: '20대' },
      { id: 'age_30_39', name: '30대' },
      { id: 'age_40_49', name: '40대' },
      { id: 'age_50_59', name: '50대' },
      { id: 'age_60_99', name: '시니어' },
    ];
  }

  if (bottomSheetType === 'scm') {
    ageList = [
      { id: 'ALL_ALL', name: '모두' },
      { id: '00_ALL', name: '키즈' },
      { id: '10_ALL', name: '10대' },
      { id: '20_ALL', name: '20대' },
      { id: '30_ALL', name: '30대' },
      { id: '40_ALL', name: '40대' },
      { id: '50_ALL', name: '50대' },
      { id: '60_ALL', name: '60대' },
      { id: '70_ALL', name: '70대' },
      { id: '80_ALL', name: '시니어' },
    ];
  }

  useEffect(() => {
    setLastSelectedElm(selectedElm);
    setTimeout(() => {
      if (layerRef.current) {
        focusLoop.setTargetLayer(layerRef.current);
      }
    }, 100);

    return () => {
      focusLoop.cleanUp();
      if (lastSelectedElm) {
        lastSelectedElm.focus();
      }
    };
  }, []);

  function setSegment(seg) {
    // API 오류 사항을 대비하여 previous segment sessionStorage에 기록
    sessionStorage.setItem(bottomSheetType === 'device' ? 'prev_deviceSeg' : 'prev_scmSeg', JSON.stringify(rankingSeg));
    setRankingSeg(seg);
    onClose();
  }

  return (
    <div
      aria-hidden={!isOpen}
      className="overlay-modal"
      role="menuAge"
      aria-labelledby="popular-btn"
      id="bottomPopularAge"
      aria-expanded={isOpen}
      ref={(r) => {
        if (layerRef) layerRef.current = r;
      }}
      onClick={onClose}
    >
      <div
        className="BottomSheet modal-content-transition"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="info-age">
          <h2 className="title">연령 선택</h2>
          <button type="button" className="modal-closed" onClick={onClose}>
            <i className="ic-tbar-cls" aria-hidden="true" />
            <span className="hidden">닫기</span>
          </button>
          <ul className="item-type-list">
            {ageList.map((obj, index: number) => (
              <li key={index} className="item">
                <span className="radio-box-modal">
                  <input
                    onClick={() => setSegment(obj)}
                    type="radio"
                    name="age"
                    id={obj.id}
                    checked={obj.id === rankingSeg.id}
                    readOnly
                  />
                  <label htmlFor={obj.id}>
                    <span className="text">{obj.name}</span>
                    <span className="range">
                      <i className="radio" />
                    </span>
                  </label>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export const BottomSheetAge = React.memo(BottomModal);
