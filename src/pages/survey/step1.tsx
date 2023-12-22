import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/Layout/Layout';
import { SurveyStep1 } from '../../components/Survey/SurveyStep1';
import Head from 'next/head';

export default function SurveyStep() {
  const [step1Answer, setStep1Answer] = useState(null);

  useEffect(() => {
    const step1 = sessionStorage.getItem('step1');
    if (step1) setStep1Answer(step1);
  }, []);

  function finishedSurvey() {
    if (step1Answer) {
      sessionStorage.setItem('step1', step1Answer);
      location.href = '/v6/survey/step2';
    }
  }

  return (
    <Layout addClass="survey">
      <html lang="ko" />
      <Head>
        <title>나에게 맞는 기기 찾기 1단계 &lt; Tworld</title>
        {/* FIXME: Test for 정적 OG태그 */}
        <meta property="og:title" content="단말 서베이" />
        <meta property="og:description" content="나에게 맞는 기기 찾기" />
        <meta property="og:url" content="https://app.tworld.co.kr/v6/survey/step1" />
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
  );
}
