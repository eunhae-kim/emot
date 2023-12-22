import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/Layout/Layout';
import { SurveyStep4 } from '../../components/Survey/SurveyStep4';
import BottomNav from '../../container/BottomNav';
import Head from 'next/head'; {/* 2022-12-21 접근성 / Head title 추가 */}

export default function SurveyStep() {
  const [step4Answer, setStep4Answer] = useState(null);

  useEffect(() => {
    const step4 = parseInt(sessionStorage.getItem("step4"));
    if (step4) setStep4Answer(step4);
  }, []);

  function finishedSurvey() {
    if (step4Answer) {
      sessionStorage.setItem("step4", step4Answer);
      location.href = "/v6/survey/step5";
    }
  }

  return (
    <>
    <Layout addClass="survey">
      {/* 2022-12-21 접근성 / Head title 추가 */} {/* 2023-01-10 접근성 / Head title 수정 */}
      {/* 2023-02-01 접근성 / html 추가 */}
      <html lang="ko" />
      <Head>
        <title>나에게 맞는 기기 찾기 4단계 &lt; Tworld</title>
      </Head>
      <div className="popup-survey">
        <SurveyStep4 step4Answer={step4Answer} setStep4Answer={setStep4Answer} />

        {/* 버튼 */}
        <div className="fixed-area-bt" onClick={finishedSurvey}>
            <div className="btn-full-pop">
              <button type="button" className={`btns ${step4Answer ? 'blue' : 'gray'}`} disabled={!step4Answer}>
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
