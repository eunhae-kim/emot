import React, { useEffect, useState } from 'react';
import BottomNav from '../../container/BottomNav';
import { Layout } from '../../components/Layout/Layout';
import { SurveyStep2 } from '../../components/Survey/SurveyStep2';
import Head from 'next/head'; {/* 2022-12-21 접근성 / Head title 추가 */}

export default function SurveyStep() {
  const [step2Answer, setStep2Answer] = useState(null);

  useEffect(() => {
    const step2 = sessionStorage.getItem("step2");
    if (step2) setStep2Answer(step2);
  }, []);

  function finishedSurvey() {
    if (step2Answer) {
      sessionStorage.setItem("step2", step2Answer);
      location.href = "/v6/survey/step3";
    }
  }

  return (
    <>
      <Layout addClass="survey">
        {/* 2022-12-21 접근성 / Head title 추가 */} {/* 2023-01-10 접근성 / Head title 수정 */}
        {/* 2023-02-01 접근성 / html 추가 */}
        <html lang="ko" />
        <Head>
          <title>나에게 맞는 기기 찾기 2단계 &lt; Tworld</title>
        </Head>
        <div className="popup-survey">
          <SurveyStep2 step2Answer={step2Answer} setStep2Answer={setStep2Answer} />

          {/* 버튼 */}
          <div className="fixed-area-bt" onClick={finishedSurvey}>
            <div className="btn-full-pop">
              <button type="button" className={`btns ${step2Answer ? 'blue' : 'gray'}`} disabled={!step2Answer}>
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
