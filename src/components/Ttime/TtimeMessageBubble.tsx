import React, { useEffect, useState } from 'react';
import V6Link from '../Common/V6Link';
import Xtr from '../Common/Xtr';

interface TtimeItemBoxProps {
  message: any;
  scrollToCard: any;
  svcMgmtNum: string;
  className: string;
}

interface Message {
  msg: string;
  mainAltmsgPhrs: string;
  linkUrl: string;
  rccardId: string;
  oferStcCd: string;
}

export function TtimeMessageBubble({ message, scrollToCard, svcMgmtNum, className }: TtimeItemBoxProps) {
  const [displayMsg, setDeiplayMsg] = useState<Message>();
  const [displayYn, setDisplayYn] = useState<boolean>(false);

  useEffect(() => {
    const messageKey = Object.keys(message);
    let messageArr = [];
    messageKey.map((key) => {
      if (message[key]?.items?.length > 0) {
        message[key].items.map((item) => {
          if (item.statusCode === 'SUCCESS') {
            messageArr.push(item);
          }
        });
      }
    });

    if (messageArr.length > 0) {
      const randomFlag = Math.floor(Math.random() * (messageArr.length - 0) + 0);
      // 7일간 설정한지 체크
      if (localStorage.getItem(`${svcMgmtNum}_messageBubble_${messageArr[randomFlag].mainAltmsgPhrs}`)) {
        const hiddenDate = new Date(
          localStorage.getItem(`${svcMgmtNum}_messageBubble_${messageArr[randomFlag].mainAltmsgPhrs}`),
        );
        const today = new Date();

        if (hiddenDate.getTime() < today.getTime()) {
          setDeiplayMsg(messageArr[randomFlag]);
          setDisplayYn(true);
        }
      } else {
        setDeiplayMsg(messageArr[randomFlag]);
        setDisplayYn(true);
      }
    }
  }, []);

  function closeBtnClicked() {
    const today = new Date();
    const hiddenDate = new Date(today);

    // 정책: X버튼 클릭 시 7일간 보지 않음
    hiddenDate.setDate(today.getDate() + 7);
    localStorage.setItem(`${svcMgmtNum}_messageBubble_${displayMsg.mainAltmsgPhrs}`, hiddenDate.toString());

    setDisplayYn(false);
  }

  return (
    <>
      {displayMsg && displayYn && (
        <article className={`card-main-notification ${className}`}>
          {displayMsg.linkUrl ? (
            <Xtr xtrEid={displayMsg.oferStcCd} xtrClick={true} xtrView={true}>
              <div
                onClick={() => {
                  closeBtnClicked();
                  location.href = displayMsg.linkUrl;
                }}
              >
                <a title="메세지알림">
                  <i className="ic-alarm-notice">
                    <span className="hidden">메세지(new)</span>
                  </i>
                  {displayMsg.msg}
                </a>
              </div>
            </Xtr>
          ) : (
            <div
              onClick={() => {
                // 클릭 시에도 엑스 버튼 클릭과 동일하게 7일간 비게시 처리 및 영역 삭제
                scrollToCard(displayMsg.rccardId);
                closeBtnClicked();
              }}
            >
              <Xtr xtrEid={displayMsg.oferStcCd} xtrClick={true} xtrView={true}>
                <V6Link>
                  <i className="ic-alarm-notice" />
                  {displayMsg.msg}
                </V6Link>
              </Xtr>
            </div>
          )}
          <button onClick={closeBtnClicked} type="button">
            <i className="ic-tbar-cls" />
            <span className="hidden">닫기</span>
          </button>
        </article>
      )}
    </>
  );
}
