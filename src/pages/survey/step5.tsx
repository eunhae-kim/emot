import React, { useEffect, useState } from 'react';

import { Layout } from '../../components/Layout/Layout';
import { SurveyStep5 } from '../../components/Survey/SurveyStep5';
import BottomNav from '../../container/BottomNav';
import Head from 'next/head'; {/* 2022-12-21 접근성 / Head title 추가 */}

export default function SurveyStep() {

  const [step5Answer, setStep5Answer] = useState(",,,,")

  useEffect(() => {
    const step5 = sessionStorage.getItem("step5");
    if (step5) setStep5Answer(step5);
  }, []);

  function finishedSurvey() {
    if (step5Answer.length === 9) {
      sessionStorage.setItem("step5", step5Answer);
      location.href = "/v6/survey/step6";
    }
  }

  return (
    <>
      <Layout addClass="survey">
        {/* 2022-12-21 접근성 / Head title 추가 */} {/* 2023-01-10 접근성 / Head title 수정 */}
        {/* 2023-02-01 접근성 / html 추가 */}
        <html lang="ko" />
        <Head>
          <title>나에게 맞는 기기 찾기 5단계 &lt; Tworld</title>
        </Head>
        <div className="popup-survey">
          <SurveyStep5 step5Answer={step5Answer} setStep5Answer={setStep5Answer} />

          {/* 버튼 */}
          <div className="fixed-area-bt" onClick={finishedSurvey}>
            <div className="btn-full-pop">
              <button type="button" className={`btns ${(step5Answer && step5Answer.length === 9) ? 'blue' : 'gray'}`} disabled={!((step5Answer && step5Answer.length === 9))}>
                다음
              </button>
            </div>
          </div>
          {/* // 버튼 */}
        </div>
      </Layout>
      <BottomNav show={false} />
    </>
  );
}
