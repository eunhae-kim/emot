import Xtr from './Xtr';

export enum MessageBubbleType {
  MAIN = 'main',
  TTIME = 'tTime',
}

interface MessageBubbleProps {
  type?: MessageBubbleType;
  message: string;
  oferStcCd?: string;
  onClickMessage: () => void;
  onClickClose: () => void;
}

export function MessageBubble({ type, message, oferStcCd, onClickMessage, onClickClose }: MessageBubbleProps) {
  return (
    <article className={`card-main-notification ${type === 'tTime' ? 'tTime' : null}`}>
      <Xtr xtrEid={oferStcCd} xtrClick={true} xtrView={true}>
        <div onClick={onClickMessage}>
          <a title="메세지알림">
            <i className="ic-alarm-notice">
              <span className="hidden">메세지(new)</span>
            </i>
            {message}
          </a>
        </div>
      </Xtr>

      <button onClick={onClickClose} type="button">
        <i className="ic-tbar-cls" />
        <span className="hidden">닫기</span>
      </button>
    </article>
  );
}
