import focusableSelectors from 'focusable-selectors';
import { AriaRole, DetailedHTMLProps, DOMElement } from 'react';
import { ARIAProperty } from 'aria-query';

const focusableSelector = focusableSelectors.join(',');

export default new (class {
  firstElm: HTMLElement;
  lastElm: HTMLElement;
  onDomMutationHandler: () => void;
  firstElmKeyDownHandler: () => void;
  lastElmKeyDownHandler: () => void;
  observer: MutationObserver;
  targetLayer: HTMLElement;

  constructor() {
    this.onDomMutationHandler = this.onDomMutation.bind(this);
    // 서버단에서는 존재하지 않는 객체
    if (typeof MutationObserver !== 'undefined') {
      this.observer = new MutationObserver(this.onDomMutationHandler);
    }

    this.firstElmKeyDownHandler = this.firstElmKeyDown.bind(this);
    this.lastElmKeyDownHandler = this.lastElmKeyDown.bind(this);
  }

  cleanUp() {
    this.removeFirstElmEventListener();
    this.removeLastElmEventListener();
    if (this.observer) this.observer.disconnect();
    //document.querySelectorAll(focusableSelector).forEach((e) => (e.ariaHidden = 'false'));
    document.querySelectorAll('*').forEach((elm) => {
      this.ariaUnhide(elm);

      //e.removeAttribute('tabindex');
    });
  }

  onDomMutation() {
    const allFocusableElmArr = this.targetLayer.querySelectorAll(focusableSelector);
    if (allFocusableElmArr.length < 1) return;

    const firstElm = allFocusableElmArr[0] as HTMLElement;
    const lastElm = allFocusableElmArr[allFocusableElmArr.length - 1] as HTMLElement;
    this.setFirstElm(firstElm);
    this.setLastElm(lastElm);

    firstElm.focus();
    console.log('focusLoop', firstElm, lastElm);
  }

  removeFirstElmEventListener() {
    if (this.firstElm) {
      this.firstElm.removeEventListener('keydown', this.firstElmKeyDownHandler);
    }
  }
  removeLastElmEventListener() {
    if (this.lastElm) {
      this.lastElm.removeEventListener('keydown', this.lastElmKeyDownHandler);
    }
  }
  // ariaHidden 값이 이미 true라면 아무 처리도 하지 않는다.
  // 만약 ariaHidden 값이 없거나 false라면 해당 상태를 data-ariaHidden에 백업 해 두고 ariaHidden 값을 true로 변경
  // => data-ariaHidden = "none" | "false"
  ariaHide(elm: Element) {
    if (elm.tagName === 'HTML' || elm.tagName === 'HEAD' || elm.tagName === 'BODY') return;

    const ariaHidden = elm.ariaHidden || 'none';
    if (ariaHidden !== 'true') {
      elm.setAttribute('data-ariaHidden', ariaHidden);
      elm.ariaHidden = 'true';
    }
  }
  // data-ariaHidden에 설정된 값이 있다면 복원 한다.
  ariaUnhide(elm: Element) {
    const prevAriaHidden = elm.getAttribute('data-ariaHidden');
    if (!prevAriaHidden) {
      //
    } else {
      if (prevAriaHidden === 'none') {
        elm.removeAttribute('aria-hidden');
      } else {
        elm.ariaHidden = prevAriaHidden;
      }

      elm.removeAttribute('data-ariaHidden');
    }
  }
  setTargetLayer(targetElm: HTMLElement) {
    this.targetLayer = targetElm;
    this.targetLayer.ariaModal = 'true';
    // @ts-ignore
    this.targetLayer.role = 'dialog';
    //document.querySelectorAll(focusableSelector).forEach((e) => (e.ariaHidden = 'true'));
    document.querySelectorAll('*').forEach((elm) => {
      this.ariaHide(elm);
      //elm.setAttribute('tabindex', '-1');
    });

    // 레이어 포함 상위 노드에서 aria-hidden 제거
    let elm = targetElm;
    while (elm) {
      this.ariaUnhide(elm);
      elm = elm.parentElement;
    }
    // 레이어 하위 노드에서 aria-hidden 제거
    targetElm.querySelectorAll('*').forEach((elm) => {
      this.ariaUnhide(elm);
      //elm.ariaHidden = 'false';
      //elm.removeAttribute('tabindex');
    });

    if (this.observer) {
      this.observer.observe(targetElm, { childList: true, subtree: true });

      this.onDomMutationHandler();
    }
  }
  setFirstElm(elm: HTMLElement) {
    this.removeFirstElmEventListener();
    this.firstElm = elm;
    if (!this.firstElm) return;
    this.firstElm.addEventListener('keydown', this.firstElmKeyDownHandler);
  }
  setLastElm(elm: HTMLElement) {
    this.removeLastElmEventListener();
    this.lastElm = elm;
    if (!this.lastElm) return;
    this.lastElm.addEventListener('keydown', this.lastElmKeyDownHandler);
  }
  firstElmKeyDown(e) {
    if (e.keyCode === 9 && e.shiftKey) {
      this.lastElm.focus();
      e.preventDefault();
    }
  }
  lastElmKeyDown(e) {
    if (e.keyCode === 9 && !e.shiftKey) {
      this.firstElm.focus();
      e.preventDefault();
    }
  }
})();
