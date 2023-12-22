import React, { useEffect, useState } from 'react';
import BottomNav from '../../container/BottomNav';
import { Layout } from '../../components/Layout/Layout';
import { SurveyStep1 } from '../../components/Survey/SurveyStep1';
import Head from 'next/head'; {/* 2022-12-21 접근성 / title 추가 */}

export default function SurveyStep() {

  const [step1Answer, setStep1Answer] = useState(null);

  useEffect(() => {
    const step1 = sessionStorage.getItem("step1");
    if (step1) setStep1Answer(step1);
  }, []);

  function finishedSurvey() {
    if (step1Answer) {
      sessionStorage.setItem("step1", step1Answer);
      location.href = "/v6/survey/step2";
    }
  }

  return (
    <>
    <Layout addClass="survey">
      {/* 2022-12-21 접근성 / title 추가 */} {/* 2023-01-10 접근성 / Head title 수정 */}
      {/* 2023-02-01 접근성 / html 추가 */}
      <html lang="ko" />
      <Head>
        <title>나에게 맞는 기기 찾기 1단계 &lt; Tworld</title>
      </Head>
      <div className="popup-survey">
        <SurveyStep1 step1Answer={step1Answer} setStep1Answer={setStep1Answer} />

        <div className="fixed-area-bt" onClick={finishedSurvey}>
          <div className="btn-full-pop">
            <button type="button" className={`btns ${step1Answer ? 'blue' : 'gray'}`} disabled={!step1Answer}>
              다음
            </button>
          </div>
        </div>
      </div>
    </Layout>
    <BottomNav show={false} />
    </>
  );
}
