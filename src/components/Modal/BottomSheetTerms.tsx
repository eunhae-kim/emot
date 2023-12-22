/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-danger */
import React, { useState } from 'react';
import { getTerms, updateTermAgreement } from '../../api/main';
import useModal from '../../hooks/useModal';

interface CardProps {
  id: string;
  name: string;
  value: string;
  href: string;
}

interface MainItemBoxProps {
  isOpen: boolean;
  title: string;
  agreeList: Array<CardProps>;
  getClosed: any;
}

export function BottomSheetTerms({ isOpen, title, agreeList, getClosed }: MainItemBoxProps) {
  const { modalFullScreen, confirm } = useModal();

  const [, setUpdatedTermsList] = useState<Array<string>>([]);

  // 선택약관 체크박스 모두 체크
  function checkAllTerms() {
    const terms = document.querySelectorAll("input[name='terms']");
    terms.forEach((term) => {
      // @ts-ignore
      term.checked = true;
    });
  }

  function set30DaysHidden() {
    confirm.show({
      isOpen,
      title: '잠시만요!',
      cancelBtnName: '다음에 하기',
      message: '미선택 약관에 동의하시면 보다 다양한 혜택을<br/>받으실 수 있어요.',
      onClickCancel: () => {
        const today = new Date();
        const hiddenDate = new Date(today);
        hiddenDate.setDate(today.getDate() + 30);
        localStorage.setItem('terms', hiddenDate.toString());
        getClosed();
        confirm.close();
      },
      onClickConfirm: () => {
        checkAllTerms();
        confirm.close();
      },
    });
  }

  function agreeClicked() {
    const query = "input[name='terms']:checked";
    const selectedTerms = document.querySelectorAll(query);
    const terms = [];

    selectedTerms.forEach((term: HTMLInputElement) => {
      terms.push(term.value);
    });

    setUpdatedTermsList(terms);

    if (selectedTerms.length === 0 || selectedTerms.length !== agreeList.length) {
      confirm.show({
        isOpen,
        title: '잠시만요!',
        cancelBtnName: '다음에 하기',
        message:
          selectedTerms.length === 0
            ? '약관에 동의하시면 보다 다양한 혜택을 <br/>받으실 수 있어요.'
            : '모든 약관에 동의하시면 보다 다양한 혜택을 <br/>받으실 수 있어요.',
        onClickCancel: () => {
          confirm.close();
          getClosed();
        },
        onClickConfirm: () => {
          checkAllTerms();
          confirm.close();
        },
      });
      return;
    }

    if (selectedTerms.length === agreeList.length) {
      updateTerms(terms);
    }
  }

  function errorConfirm(respCode: number) {
    confirm.show({
      isOpen: true,
      message: `일시적으로 서비스 제공이 원활하지 않습니다.<br/>잠시 후 다시 이용해주세요. ${
        respCode && respCode !== 1004 ? ` (코드: ${respCode})` : ''
      }`,
    });
  }

  async function updateTerms(terms) {
    if (terms.length > 0) {
      const request = {};
      terms.map((term) => {
        request[term] = 'Y';
      });
      const response = await updateTermAgreement(request);
      getClosed();

      if (response.respCode !== 0) {
        errorConfirm(response?.respCode);
      }
    }
  }

  async function clickTermsDetail(id: string) {
    const response = await getTerms(id === 'twdInfoRcvAgreeYn' ? '06' : '03');
    if (response?.respCode === 0) {
      modalFullScreen.show({ isOpen: true, ...response.result, contentType: 'iframeSrcDoc' });
    } else {
      errorConfirm(response?.respCode);
    }
  }

  return (
    <div aria-hidden={!isOpen} className="overlay-modal" onClick={getClosed}>
      <div className="BottomSheet modal-content-transition" onClick={(e) => e.stopPropagation()}>
        <div className="info-agree">
          <strong className="title" dangerouslySetInnerHTML={{ __html: title }} />

          {/* 2022-12-13 접근성 / button title 추가 */}
          <button type="button" className="modal-closed" title="닫기" onClick={getClosed}>
            <i className="ic-tbar-cls" aria-hidden="true" /> {/* 2023-02-13 접근성 / aria 추가 */}
            <span className="hidden">닫기</span>
          </button>

          <ul>
            {agreeList.map(
              (obj, index: number) =>
                obj.value === 'N' && (
                  <li key={index}>
                    <span className="check-box">
                      <input name="terms" type="checkbox" id={obj.id} value={obj.id} />
                      <span className="check-ico">
                        <i className="bl-check" aria-hidden="true" /> {/* 2023-02-13 접근성 / aria 추가 */}
                      </span>
                      <label htmlFor={obj.id} dangerouslySetInnerHTML={{ __html: obj.name }} />
                    </span>

                    <button type="button" title={`${obj.name}상세보기`}>
                      {obj.id !== 'tNotiInfoRcvAgreeYn' && (
                        <div onClick={() => clickTermsDetail(obj.id)} aria-hidden="true">
                          <i className="bl-arr" aria-hidden="true" /> {/* 2023-02-13 접근성 / aria 추가 */}
                          <span className="hidden">내용 바로가기</span>
                        </div>
                      )}
                    </button>
                  </li>
                ),
            )}
          </ul>

          <button onClick={agreeClicked} type="button" className="btn-agree" title="동의하고 시작">
            동의하고 시작
          </button>

          <div className="area-center">
            <button type="button" className="btn-month" title="30일간 보지 않기" onClick={set30DaysHidden}>
              30일간 보지 않기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
