import React, { useState } from 'react';

export type SortObject =
  | { title: '최신순'; key: 'createDatetime'; sort: 'desc' }
  | { title: '인기순'; key: 'viewCount'; sort: 'desc' }
  | { title: '저장순'; key: 'saveCount'; sort: 'desc' };

const SORT_LIST: SortObject[] = [
  { title: '최신순', key: 'createDatetime', sort: 'desc' },
  { title: '인기순', key: 'viewCount', sort: 'desc' },
  { title: '저장순', key: 'saveCount', sort: 'desc' },
];

export interface BottomSheetSortFilterProps {
  isOpen: boolean;
  onClose?: () => void;
  selectedSort: SortObject; // state 값
  onSort: (sort: SortObject) => void; // onSort 콜백에서 받은 SortObject를 호출한 곳의 selectedSort state에 저장
}

export default function BottomSheetSortFilter({ isOpen, onClose, selectedSort, onSort }: BottomSheetSortFilterProps) {
  const [selected, setSelected] = useState(selectedSort);

  const onClickRadio = (item) => {
    setSelected(item);
    onSort(item);
    onClose();
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div aria-hidden={!isOpen} className="overlay-modal" onClick={onClose}>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div className="BottomSheet modal-content-transition" onClick={(e) => e.stopPropagation()}>
        <div className="sort-filter-wrap">
          {/* 바텀시트 타이틀 */}
          <h2 className="modal-title">정렬</h2>

          {/* 바텀시트 닫기버튼 */}
          <button type="button" className="modal-closed" title="닫기" onClick={onClose}>
            <i className="ic-tbar-cls" aria-hidden="true" />
            <span className="hidden">닫기</span>
          </button>

          {/* 바텀시트 컨텐츠 */}
          <div className="modal-content">
            <ul className="item-type-list">
              {SORT_LIST.map((item) => (
                <li key={item.key} className="item">
                  <span className="radio-box-modal">
                    <input
                      type="radio"
                      name="sort-filter"
                      id={item.key}
                      checked={selected.key === item.key}
                      onChange={() => onClickRadio(item)}
                    />
                    <label htmlFor={item.key}>
                      <span className="text">{item.title}</span>
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
    </div>
  );
}
