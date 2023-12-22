import React, { useRef } from 'react';
import TtimeHeader, { HeaderButton } from '../Ttime/TtimeHeader';

export interface ModalFullScreenProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  /**
   * iframeSrcDoc: html string을 iframe에 넣어줌
   * iframeSrc: url 주소로 iframe에 html을 넣어줌
   * innerHtml: dangerouslySetInnerHTML을 사용하여 html을 넣어줌(style 영향도 있음, 사용시 주의)
   * text: 일반 텍스트
   * reactNode: 텍스트랑 표출 방식은 같으나 contentType은 일단 구분함
   */
  contentType: 'iframeSrcDoc' | 'iframeSrc' | 'innerHtml' | 'text' | 'reactNode';
  content: string | React.ReactNode;
}

export function ModalFullScreen({ isOpen, onClose, title, contentType, content }: ModalFullScreenProps) {
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const iframeRef = useRef(null);

  const handleOnLoad = () => {
    const iframe = iframeRef.current;
    const contentDocument = iframe.contentWindow.document.documentElement;
    const height = contentDocument.scrollHeight;
    const titleHeight = titleRef.current?.clientHeight;
    iframe.style.height = `${height + titleHeight}px`;
  };

  const headerButtons: HeaderButton[] = [{ type: 'close', onClick: onClose }];

  return (
    <div aria-hidden={!isOpen} className="overlay-modal">
      <div className="ModalFullScreen modal-content-transition">
        <div ref={titleRef}>
          <TtimeHeader isBack={false} title={title} headerButtonList={headerButtons} style={{ zIndex: 121 }} />
        </div>

        <div ref={contentRef} className="modal-content">
          {contentType === 'iframeSrcDoc' && (
            <iframe
              ref={iframeRef}
              className="modal-iframe"
              title={title}
              srcDoc={content as string}
              onLoad={handleOnLoad}
            />
          )}
          {contentType === 'iframeSrc' && (
            <iframe
              ref={iframeRef}
              className="modal-iframe"
              title={title}
              src={content as string}
              onLoad={handleOnLoad}
            />
          )}
          {contentType === 'innerHtml' && <div dangerouslySetInnerHTML={{ __html: content as string }} />}
          {contentType === 'text' && <div>{content}</div>}
          {contentType === 'reactNode' && <div>{content}</div>}
        </div>
      </div>
    </div>
  );
}
