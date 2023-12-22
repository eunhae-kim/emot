import React from 'react';
import V6Link from '../Common/V6Link';
import XtrAw from '../Common/XtrAw';

export interface ModalHomePopupProps {
  isOpen: boolean;
  getClosed?: () => void;
  bannerInfo: any;
}

export function ModalHomePopup({ isOpen, getClosed, bannerInfo }: ModalHomePopupProps) {
  let displayText = '';
  let hiddenDays = 0;

  switch (bannerInfo.popupNexpsPrdCd) {
    case '1':
      displayText = '하루 동안 보지 않기';
      hiddenDays = 0;
      break;
    case '7':
      displayText = '일주일 동안 보지 않기';
      hiddenDays = 6;
      break;
    case '0':
      displayText = '다시 보지 않기';
      hiddenDays = 364;
      break;
    case 'N':
    default:
      displayText = '';
      hiddenDays = 0;
      break;
  }

  function setDisplayPeriod() {
    const today = new Date();
    const hiddenDate = new Date(today);

    // 닫기
    hiddenDate.setDate(today.getDate() + hiddenDays);
    hiddenDate.setHours(23, 59, 59);
    localStorage.setItem(`homePopupBanner${bannerInfo.bnnrSeq}`, hiddenDate.toString());
    getClosed();
  }

  return (
    <div aria-hidden={!isOpen} className="overlay-modal" onClick={getClosed}>
      <div className="layer-type-banner modal-content-transition" onClick={(e) => e.stopPropagation()}>
        <div className="container-wrap">
          <div className="container">
            <XtrAw appEid={bannerInfo.oferStcCd} webEid={bannerInfo.oferStcCd} xtrClick xtrView>
              <V6Link
                className="title"
                // eslint-disable-next-line no-script-url
                href={bannerInfo.imgLinkUrl ?? 'javascript:;'}
                billYn={bannerInfo.billYn}
                newWindow={bannerInfo.imgLinkTrgtClCd === '2' && 'BROWSER'}
              >
                <img src={bannerInfo.bnnrFilePathNm} alt={bannerInfo.bnnrImgAltCtt} />
              </V6Link>
            </XtrAw>
          </div>
          <div className="btn-area">
            <button type="button" className="check-btn" onClick={() => displayText && setDisplayPeriod()}>
              {displayText}
            </button>
            <button type="button" className="close" onClick={getClosed}>
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
