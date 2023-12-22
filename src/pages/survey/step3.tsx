import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/Layout/Layout';
import { SurveyStep3 } from '../../components/Survey/SurveyStep3';
import BottomNav from '../../container/BottomNav';
import Head from 'next/head'; {/* 2022-12-21 접근성 / Head title 추가 */}

export default function SurveyStep() {
  const [step3Answer, setStep3Answer] = useState<string>("");

  useEffect(() => {
    const step3 = sessionStorage.getItem("step3");
    if (step3) setStep3Answer(step3);
  }, []);

  function finishedSurvey() {
    if (step3Answer) {
      sessionStorage.setItem("step3", step3Answer);
      location.href = "/v6/survey/step4";
    }
  }

  return (
    <>
      <Layout addClass="survey">
        {/* 2022-12-21 접근성 / Head title 추가 */} {/* 2023-01-10 접근성 / Head title 수정 */}
        {/* 2023-02-01 접근성 / html 추가 */}
        <html lang="ko" />
        <Head>
          <title>나에게 맞는 기기 찾기 3단계 &lt; Tworld</title>
        </Head>
        <div className="popup-survey">
          <SurveyStep3 step3Answer={step3Answer} setStep3Answer={setStep3Answer} />

          {/* 버튼 */}
          <div className="fixed-area-bt" onClick={finishedSurvey}>
            <div className="btn-full-pop">
              <button type="button" className={`btns ${step3Answer ? 'blue' : 'gray'}`} disabled={!step3Answer}>
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
