import React from 'react';

export interface MembershipNEWProps {
  text: string | null;
}

export function MyMembershipNEW({ text }: MembershipNEWProps) {
  return (
    <>
      {/* ### 멤버십 케이스별 모듈 ### */}
        {/* Case 1. OTB 정상 동작 상태  */}
        <div className="card-bottom-content">
          <div className="my-membership-layer">
            <div className="my-state">
              <div className="membership">
                <div className="logo">
                  <img src="/images/banner/my-membership-logo_new.png" alt="T Membership"/>
                </div>
                <a href="#">
                  <span className="info-text"><img src="/images/icon/icon_discount.png" alt="할인형"/> <em className="sub">VIP</em></span>
                </a>
              </div>
              <div className="barcode-area">
              <div className="barcode-inr"><img src="/images/icon/icon_barcode.png" alt="T멤버십 바코드"/></div>
                <div className="barcode_info">
                  <div className="time">09:59</div>
                  <p>2496 5530 4263 1514</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* //Case 1. OTB 정상 동작 상태  */}

        {/* Case 1-1. OTB 유효 시간 1분 미만  */}
        <div className="card-bottom-content">
          <div className="my-membership-layer">
            <div className="my-state">
              <div className="membership">
                <div className="logo">
                  <img src="/images/banner/my-membership-logo_new.png" alt="T Membership"/>
                </div>
                <a href="#">
                  <span className="info-text"><img src="/images/icon/icon_discount.png" alt="할인형"/> <em className="sub">VIP</em></span>
                </a>
              </div>
              <div className="barcode-area">
                <div className="barcode-inr"><img src="/images/icon/icon_barcode.png" alt="T멤버십 바코드"/></div>
                <div className="barcode_info">
                  <button className="time_refresh" type="button"><span className="hidden">새로고침</span></button>
                  <div className="time">00:59</div>
                  <p>2496 5530 4263 1514</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* //Case 1-1. OTB 유효 시간 1분 미만  */}

        {/* Case 1-2. OTB 유효 시간 만료 */}
        <div className="card-bottom-content">
          <div className="my-membership-layer">
            <div className="my-state">
              <div className="membership">
                <div className="logo">
                <img src="/images/banner/my-membership-logo_new.png" alt="T Membership"/>
                </div>
                <a href="#">
                <span className="info-text"><img src="/images/icon/icon_collect.png" alt="적립형"/> <em className="sub">SILVER</em></span>
                </a>
              </div>
              
              <div className="barcode-area hiding">
                <div className="barcode-inr">
                  <img src="/images/icon/icon_barcode.png" alt="T멤버십 바코드"/>
                  <div className="barcode_info">
                    <div className="time">09:59</div>
                    <p>2496 5530 4263 1514</p>
                  </div>
                </div>

                <div className="guide_area">
                  <button className="borcode_refresh" type="button">
                    <span className="hidden">새로고침</span>
                    <span>바코드 유효 시간이 지났습니다. <br/>새로고침 해주세요.</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
        {/* //Case 1-2. OTB 유효 시간 만료 */}

        {/* Case 2. OTB 서버 오류  */}
        <div className="card-bottom-content">
          <div className="my-membership-layer">
            <div className="my-state">
              <div className="membership">
                <div className="logo">
                  <img src="/images/banner/my-membership-logo_new.png" alt="T Membership"/>
                </div>
                <a href="#">
                  <span className="info-text"><img src="/images/icon/icon_discount.png" alt="할인형"/> <em className="sub">VIP</em></span>
                </a>
              </div>
              <div className="barcode-area">
              <div className="barcode-inr"><img src="/images/icon/icon_barcode.png" alt="T멤버십 바코드"/></div>
                <div className="barcode_info">
                  <p>7777 7777 7777 7777</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* //Case 2. OTB 서버 오류  */}

        {/* Case 3. 멤버십 일시정지 상태  */}
        <div className="card-bottom-content">
          <div className="my-membership-layer">
            <div className="my-state">
              <div className="membership">
                <div className="logo">
                  <img src="/images/banner/my-membership-logo_new.png" alt="T Membership"/>
                </div>
                <a href="#">
                  <span className="info-text"><img src="/images/icon/icon_collect.png" alt="적립형"/> <em className="sub">SILVER</em></span>
                </a>
              </div>
              <div className="barcode-area disabled">
              <div className="barcode-inr"><img src="/images/icon/icon_barcode.png" alt="T멤버십 바코드"/></div>
                <div className="barcode_info">
                  T 멤버십 카드가 일시정지 되었습니다. <br/>
                  일시정지 취소는 SKT 고객센터(114)로 문의해 주세요.
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* //Case 3. 멤버십 일시정지 상태  */}

        {/* Case 4. 멤버십 해지신청 상태  */}
        <div className="card-bottom-content">
          <div className="my-membership-layer">
            <div className="my-state">
              <div className="membership">
                <div className="logo">
                  <img src="/images/banner/my-membership-logo_new.png" alt="T Membership"/>
                </div>
                <a href="#">
                  <span className="info-text"><img src="/images/icon/icon_discount.png" alt="할인형"/> <em className="sub">VIP</em></span>
                </a>
              </div>
              <div className="barcode-area disabled">
              <div className="barcode-inr"><img src="/images/icon/icon_barcode.png" alt="T멤버십 바코드"/></div>
                <div className="barcode_info">
                  해지 신청일로부터 30일 안에는 포인트 사용만 할 수 있고
                  포인트 할인, 적립은 하실 수 없습니다. <br/>
                  30일 안에 해지 신청을 취소하실 수 있습니다.
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* //Case 4. 멤버십 해지신청 상태  */}

        {/* Case 5. 간편 로그인 상태 */}
        <div className="card-bottom-content">
          <div className="my-membership-layer">
            <div className="my-state">
              <div className="membership">
                <div className="logo">
                  <img src="/images/banner/my-membership-logo_new.png" alt="T Membership"/>
                </div>
                <a className="login" href="#">
                  로그인 하기
                </a>
              </div>
              <div className="barcode-area disabled">
              <div className="barcode-inr"><img src="/images/icon/icon_barcode.png" alt="T멤버십 바코드"/></div>
                <div className="barcode_info">
                  현재 간편 로그인 상태예요. <br/>
                  T 멤버십은 T 아이디 로그인 후 조회할 수 있습니다.
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* //Case 5. 간편 로그인 상태 */}

        {/* Case 6. 서비스 점검 (API 차단) */}
        <div className="card-bottom-content">
          <div className="my-membership-layer">
            <div className="my-state">
              <div className="membership">
                <div className="logo">
                  <img src="/images/banner/my-membership-logo_new.png" alt="T Membership"/>
                </div>
              </div>
              <div className="barcode-area disabled">
              <div className="barcode-inr"><img src="/images/icon/icon_barcode.png" alt="T멤버십 바코드"/></div>
                <div className="barcode_info">
                  현재 서비스 점검 중입니다. <br/>
                  YY. MM. DD. HH:MM ~ YY. MM. DD. HH:MM
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* //Case 6. 서비스 점검 (API 차단) */}

        {/* Case 7. 멤버십 미가입 */}
        <div className="card-bottom-content">
          <div className="my-membership-layer">
            <div className="my-state">
              <div className="membership">
                <div className="logo">
                <img src="/images/banner/my-membership-logo_new.png" alt="T Membership"/>
                </div>
              </div>
              <div className="barcode-area disabled hiding">
                <div className="barcode-inr">
                  <img src="/images/icon/icon_barcode.png" alt="T멤버십 바코드"/>
                </div>
                <div className="barcode-area no_membership">
                    <p>T 멤버십을 신청하시고 혜택을 이용해 보세요.</p>
                    <a href="#">혜택 보러가기</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* //Case 7. 멤버십 미가입 */}
        
        {/* ### 멤버십 케이스별 모듈 ### */}
    </>
  );
}

