import React from 'react';

export interface TtimeModalFullScreenProps {
  isOpen: boolean;
}

export function TtimeModalFullScreen({ isOpen }: TtimeModalFullScreenProps) {
  return (
    <div aria-hidden={!isOpen} className="overlay-modal">
      <div className="ModalFullScreen modal-content-transition tTime">
        <div className="modal-content">
          <div className="tTime-guide">
            <div className="main-box">
              <strong>
                T world와 함께 <br />T 타임을 즐겨 보세요.
              </strong>
              <p>
                통신생활을 더 알차게 즐길 수 있는
                <br />
                다양하고 유익한 정보를 제공해 드립니다.
              </p>
            </div>

            <ul className="guide-list">
              <li>
                <p>T 타임이 제공하는 이야기를 읽어 보세요. 이야기를 읽다 보면 컵을 모을 수 있어요.</p>
              </li>
              <li>
                <p>T 타임 룸에서 내가 읽은 이야기와 모은 컵을 확인해 보세요.</p>
              </li>
              <li>
                <p>새로운 이야기와 다양한 이벤트를 준비하고 있으니 기대해 주세요!</p>
              </li>
            </ul>

            <ul className="dot-list">
              <li>T 타임 콘텐츠는 SK텔레콤 온라인 채널(블로그, YouTube 등) 운영 가이드라인을 따릅니다.</li>
              <li>알림 서비스에 동의하시면 T 타임 관련 알림을 받으실 수 있습니다.</li>
              <li>
                안내 내용은 T 타임 화면의
                <i className="ic-info" aria-hidden="true" />
                버튼을 누르면 언제든 다시 보실 수 있습니다.
              </li>
              <li>경우에 따라 사전 안내 없이 서비스가 변경될 수 있습니다.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
