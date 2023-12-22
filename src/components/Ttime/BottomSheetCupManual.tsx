import React from 'react';
import { TtimeCup } from '../../common/types';

export interface ModalTeacupProps {
  isOpen?: boolean;
  onClose?: () => void;
  cupInfo: TtimeCup;
}

export default function BottomSheetCupManual({ isOpen, onClose, cupInfo }: ModalTeacupProps) {
  return (
    <div aria-hidden={!isOpen} className="overlay-modal" onClick={onClose}>
      <div className="BottomSheet modal-content-transition" onClick={(e) => e.stopPropagation()}>
        <div className="cup-manual">
          {/* 바텀시트 타이틀 */}
          {cupInfo.ownYn === 'Y' && cupInfo.popupYn == 'N' && (
            <h2 className="modal-title">새로운 컵을 획득하셨어요!</h2>
          )}
          {cupInfo.ownYn === 'Y' && cupInfo.popupYn === 'Y' && <h2 className="modal-title">컵을 소개합니다!</h2>}
          {cupInfo.ownYn === 'N' && <h2 className="modal-title">곧 만날 수 있어요!</h2>}

          {/* 바텀시트 닫기버튼 */}
          <button type="button" className="modal-closed" title="닫기" onClick={onClose}>
            <i className="ic-tbar-cls" aria-hidden="true" />
            <span className="hidden">닫기</span>
          </button>

          {/* 바텀시트 컨텐츠 */}
          <div className="modal-content">
            <img
              src={cupInfo.ownYn === 'Y' ? cupInfo.bigTumbnailImgUrl : cupInfo.bigLockedTumbnailImgUrl}
              className="cup-img"
              width="125"
              height="125"
              alt={cupInfo.ownYn === 'Y' ? cupInfo.bigTumbnailImgAlt : cupInfo.bigLockedTumbnailImgAlt}
            />

            <strong className="cup-name">{cupInfo.title}</strong>
            <p
              className="cup-info"
              dangerouslySetInnerHTML={{
                __html: cupInfo.ownYn === 'Y' ? cupInfo.guide : cupInfo.tip,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
