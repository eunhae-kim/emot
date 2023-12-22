import React from 'react';
import Barcode from 'react-jsbarcode';
import { BASE_PATH } from '../../common/const';
import MyLink from '../Common/MyLink';
import { isApp } from '../../js/commonUtil';
import { TMembershipDisplayType } from '../../common/apiRespToDisplayData/tmembership';
import XtrAw from '../Common/XtrAw';

export interface MembershipProps {
  displayType: TMembershipDisplayType;
  membershipType?: '할인형' | '적립형';
  grade?: string;
  barcode?: string;
  isOtb?: boolean;
  otbRenewableFrom?: number;
  otbLifetimeLeft?: number;
  점검fromTo?: string;
  reloadData?: () => void;
}

const formatBarcode = (barcode: string) => {
  if (typeof barcode !== 'string' || barcode.length !== 16) {
    return barcode;
  }

  return barcode.match(/(.{4})/g).join('-');
};

const secToMmss = (sec: number) => {
  const m = Math.floor(sec / 60);
  const s = sec % 60;

  return `${`0${m}`.slice(-2)}:${`0${s}`.slice(-2)}`;
};

export function MyMembership({
  displayType,
  membershipType,
  grade,
  barcode,
  isOtb,
  otbRenewableFrom,
  otbLifetimeLeft,
  reloadData,
  점검fromTo,
}: MembershipProps) {
  if (displayType === '노출안함') return null;

  const compXtrType = displayType === '일반' && !isOtb ? 'OTB서버오류' : displayType;

  return (
    <XtrAw
      appEid={
        {
          일반: 'CMMA_A24-119',
          OTB서버오류: 'CMMA_A24-123',
          이용정지: 'CMMA_A24-124',
          해지신청됨: 'CMMA_A24-126',
          간편로그인: 'CMMA_A24-128',
          서비스점검: 'CMMA_A24-130',
          미가입: 'CMMA_A24-131',
        }[compXtrType]
      }
      webEid={
        {
          일반: 'MWMA_A24-133',
          OTB서버오류: 'MWMA_A24-137',
          이용정지: 'MWMA_A24-138',
          해지신청됨: 'MWMA_A24-140',
          간편로그인: 'MWMA_A24-142',
          서비스점검: 'MWMA_A24-144',
          미가입: 'MWMA_A24-145',
        }[compXtrType]
      }
    >
      <div className="card-bottom-content">
        <div className="my-membership-layer">
          <div className="my-state">
            <div className="membership">
              <div className="logo">
                <XtrAw appEid="CMMA_A24-147" webEid="MWMA_A24-148">
                  <MyLink href="/membership/history">
                    <img src={`${BASE_PATH}/images/banner/my-membership-logo_new.png`} alt="T Membership" />
                  </MyLink>
                </XtrAw>
              </div>

              {['일반', '이용정지', '해지신청됨'].indexOf(displayType) > -1 && (
                <XtrAw
                  appEid={
                    {
                      일반: 'CMMA_A24-120',
                      OTB서버오류: '',
                      이용정지: 'CMMA_A24-125',
                      해지신청됨: 'CMMA_A24-127',
                    }[compXtrType]
                  }
                  webEid={
                    {
                      일반: 'MWMA_A24-134',
                      OTB서버오류: '',
                      이용정지: 'MWMA_A24-139',
                      해지신청됨: 'MWMA_A24-141',
                    }[compXtrType]
                  }
                >
                  <MyLink href="/membership/history">
                    <span className="info-text">
                      <img
                        src={`${BASE_PATH}/images/icon/icon_${
                          membershipType === '할인형' ? 'discount' : 'collect'
                        }.png`}
                        alt={membershipType}
                      />{' '}
                      <em className="sub">{grade}</em>
                    </span>
                  </MyLink>
                </XtrAw>
              )}
              {displayType === '간편로그인' && (
                <XtrAw appEid="CMMA_A24-129" webEid="MWMA_A24-143">
                  <MyLink className="login" href={`/common/tid/login?target=/v6/main&app=${isApp() ? 'Y' : 'N'}`}>
                    로그인 하기
                  </MyLink>
                </XtrAw>
              )}
            </div>

            {displayType === '일반' && ((isOtb && otbLifetimeLeft > 0) || !isOtb) && (
              <div className="barcode-area">
                <div className="barcode-inr">
                  <Barcode
                    value={barcode}
                    // @ts-ignore
                    renderer="image"
                    style={{ width: '100%' }}
                    options={{ displayValue: false, margin: 0, width: 5, height: 100 }}
                  />
                </div>
                <div className="barcode_info">
                  {isOtb && (
                    <>
                      {otbLifetimeLeft <= otbRenewableFrom && (
                        <XtrAw appEid="CMMA_A24-121" webEid="MWMA_A24-135">
                          <button className="time_refresh" type="button" onClick={reloadData}>
                            <span className="hidden">새로고침</span>
                          </button>
                        </XtrAw>
                      )}
                      <div className="time">{secToMmss(otbLifetimeLeft)}</div>
                    </>
                  )}
                  <p>{formatBarcode(barcode)}</p>
                </div>
              </div>
            )}

            {displayType === '이용정지' && (
              <div className="barcode-area disabled">
                <img src={`${BASE_PATH}/images/icon/icon_barcode.png`} alt="T멤버십 바코드" />
                <div className="barcode_info">
                  T 멤버십 카드가 일시정지 되었습니다. <br />
                  일시정지 취소는 SKT 고객센터(114)로 문의해 주세요.
                </div>
              </div>
            )}

            {displayType === '해지신청됨' && (
              <div className="barcode-area disabled">
                <img src={`${BASE_PATH}/images/icon/icon_barcode.png`} alt="T멤버십 바코드" />
                <div className="barcode_info">
                  해지 신청일로부터 30일 안에는 포인트 사용만 할 수 있고 포인트 할인, 적립은 하실 수 없습니다. <br />
                  30일 안에 해지 신청을 취소하실 수 있습니다.
                </div>
              </div>
            )}

            {displayType === '미가입' && (
              <div className="barcode-area disabled hiding">
                <div className="barcode-inr">
                  <img src={`${BASE_PATH}/images/icon/icon_barcode.png`} alt="T멤버십 바코드" />
                </div>
                <div className="barcode-area no_membership">
                  <p>T 멤버십을 신청하시고 혜택을 이용해 보세요.</p>
                  <XtrAw appEid="CMMA_A24-132" webEid="MWMA_A24-146">
                    <MyLink href="/membership/benefit/brand">혜택 보러가기</MyLink>
                  </XtrAw>
                </div>
              </div>
            )}

            {displayType === '서비스점검' && (
              <div className="barcode-area disabled">
                <div className="barcode-inr">
                  <img src={`${BASE_PATH}/images/icon/icon_barcode.png`} alt="T멤버십 바코드" />
                </div>
                <div className="barcode_info">
                  현재 서비스 점검 중입니다. <br />
                  {점검fromTo}
                </div>
              </div>
            )}

            {displayType === '간편로그인' && (
              <div className="barcode-area disabled">
                <div className="barcode-inr">
                  <img src={`${BASE_PATH}/images/icon/icon_barcode.png`} alt="T멤버십 바코드" />
                </div>
                <div className="barcode_info">
                  현재 간편 로그인 상태예요. <br />T 멤버십은 T 아이디 로그인 후 조회할 수 있습니다.
                </div>
              </div>
            )}

            {displayType === '일반' && isOtb && otbLifetimeLeft === 0 && (
              <div className="barcode-area hiding">
                <div className="barcode-inr">
                  <img src={`${BASE_PATH}/images/icon/icon_barcode.png`} alt="T멤버십 바코드" />
                  <div className="barcode_info">
                    <div className="time">00:00</div>
                    <p>0000 0000 0000 0000</p>
                  </div>
                </div>

                <div className="guide_area">
                  <XtrAw appEid="CMMA_A24-122" webEid="MWMA_A24-136">
                    <button className="borcode_refresh" type="button" onClick={reloadData}>
                      <span className="hidden">새로고침</span>
                      <span>
                        바코드 유효 시간이 지났습니다. <br />
                        새로고침 해주세요.
                      </span>
                    </button>
                  </XtrAw>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </XtrAw>
  );
}

/*
    <div className="card-bottom-content">
    <div className="my-membership-info">
      <div className="my-state">
        <div className="membership">
          <p className="logo">
            <img src={`${BASE_PATH}/images/banner/my-membership-logo.png`} alt="T Membership" />
          </p>
          <span className="info-text">
            {text}
            <i className="sub">{rank}</i>
          </span>
        </div>
        <Barcode value="ABC123" options={{ format: 'code128' }} />
        {otbLifetimeLeft}
        <XtrAw
          appEid={btnType === 'barcode' ? 'CMMA_A24-18' : 'CMMA_A24-19'}
          webEid={btnType === 'barcode' ? 'MWMA_A24-50' : 'MWMA_A24-51'}
          xtrView
          xtrClick
        >
          <MyLink href={link} className={`btn-${`${btnType} ${disabled ? `disabled` : ``}`}`}>
            {btnName}
          </MyLink>
        </XtrAw>
      </div>
      {descText && (
        <p className="remark">
          <i className="ic-warn2" />
          <span dangerouslySetInnerHTML={{ __html: descText }} />
        </p>
      )}
      {descSubText && (
        <p className="remark">
          <span className="sub">{descSubText}</span>
        </p>
      )}
    </div>
  </div>
*/
