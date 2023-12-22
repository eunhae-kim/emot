import React, { useRef } from 'react';
import { MyModalTitle } from '../My/MyModalTitle';

export interface ModalFullScreenProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  /**
   * iframeSrcDoc: html string을 iframe에 넣어줌
   * iframeSrc: url 주소로 iframe에 html을 넣어줌
   * innerHtml: dangerouslySetInnerHTML을 사용하여 html을 넣어줌(style 영향도 있음, 사용시 주의)
   * text: 일반 텍스트
   */
  contentType: 'iframeSrcDoc' | 'iframeSrc' | 'innerHtml' | 'text';
  content: string;
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

  return (
    <div aria-hidden={!isOpen} className="overlay-modal">
      <div className="ModalFullScreen modal-content-transition">
        <div ref={titleRef}>
          <MyModalTitle title={title} arrow={false} onClose={onClose} />
        </div>
        <div ref={contentRef} className="modal-content">
          {contentType === 'iframeSrcDoc' && (
            <iframe ref={iframeRef} className="modal-iframe" title={title} srcDoc={content} onLoad={handleOnLoad} />
          )}
          {contentType === 'iframeSrc' && (
            <iframe ref={iframeRef} className="modal-iframe" title={title} src={content} onLoad={handleOnLoad} />
          )}
          {contentType === 'innerHtml' && <div dangerouslySetInnerHTML={{ __html: content }} />}
          {contentType === 'text' && <div>{content}</div>}
        </div>
      </div>
    </div>
  );
}
