/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';

import { Layout } from '../components/Layout/Layout';

export default function NoteicErr() {
  return (
    <Layout addClass="main">
      <div className="card-notice-content">
        <div className="notice-cnt svc-err">
          <p className="img-box">
            <i className="ic-err">
              <span className="hidden">서비스에러</span>
            </i>
          </p>
          <h2 className="svc-title">이용에 불편을 드려서 죄송합니다.</h2>
          <span className="svc-text">
            요청하신 페이지를 찾을 수 없습니다.
            <br />
            <br />
            찾으시는 페이지가 삭제되었거나
            <br />
            이름이 변경된 경우 사용할 수 없습니다.
          </span>
          <div className="btn-area">
            <a href="/" className="btn">
              T world 홈으로 이동
            </a>
          </div>
        </div>
        <div className="fixed-area-bt">
          <div className="btn-full-pop">
            <button
              type="button"
              className="btns blue"
              onClick={() => {
                window.history.back();
              }}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
