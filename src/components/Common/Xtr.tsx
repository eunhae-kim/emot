import React from 'react';
import { InView } from 'react-intersection-observer';

const viewed: Record<string, boolean> = {};

export type XtrProps = {
  as?: string;
  xtrEid: string;
  xtrClick?: boolean;
  xtrView?: boolean;
  xtrCsid?: string;
  xtrArea?: string;
} & any;

// BV 같은 이벤트는 XTR 스크립트가 로드 되기 전에 발생할수 있다.
// 이 경우 이벤트가 발생하지 않는 것을 방지하기 위해서 1초 간격으로 재시도를 해 본다.
const sendStatsWithRetry = (eid, csid, eventType, area) => {
  // @ts-ignore
  if (window?.XtractorScript?.xtrCSDummy) {
    // console.log(`sending ${eid}`);

    // @ts-ignore
    window.XtractorScript.xtrCSDummy(eid, csid, 'BV', area);
  } else {
    // console.log(`retrying ${eid} in 1sec`);

    setTimeout(() => {
      sendStatsWithRetry(eid, csid, eventType, area);
    }, 1000);
  }
};

export default ({ as = 'div', xtrEid, xtrClick = true, xtrView = true, xtrCsid, xtrArea, ...props }: XtrProps) => {
  const eid = xtrEid || '';
  const csid = xtrCsid || '';
  const area = xtrArea || '';

  const newProps = {
    threshold: 0.99, // 1으로 설정 할 경우, Android System Webview 버전 80, 81 (81미만 공통일듯. 83부터 정상 동작 확인 됨)에서
    // 첫 화면에서 바로 노출 되는 엘리먼트는 처음 뿐만 아니라 스크롤로 재노출 시에도 이벤트 발생하지 않음
    onChange: (inView: boolean, entry: any) => {
      if (!eid) return;
      if (!inView) return;
      if (!window) return;

      // view event는 동일 키에 대해서 한번만 전송
      const key = `${eid},${csid},${'BV'},${area}`;
      if (viewed[key] === true) return;
      viewed[key] = true;

      sendStatsWithRetry(eid, csid, 'BV', area);
    },
    ...props,
  };

  if (xtrClick) {
    newProps.onClick = (e) => {
      // @ts-ignore
      if (eid && window?.XtractorScript?.xtrCSDummy) {
        // @ts-ignore
        window.XtractorScript.xtrCSDummy(eid, csid, 'BC', area);
      }

      if (props.onClick) props.onClick(e);
    };
  }

  let res;
  if (xtrView && typeof IntersectionObserver !== 'undefined') {
    res = (
      // @ts-ignore
      <InView as={as} {...newProps} />
    );
  } else {
    // "React does not recognize the ... prop on a DOM element" 경고를 발생 시키지 않기 위해서 InView에서만 필요했던 속성들 제거
    delete newProps.threshold;

    res = React.createElement(as, newProps);
  }

  return res;
};
