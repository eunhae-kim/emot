import React, { useEffect, useState } from 'react';
import { getDeviceSurveyResult } from '../../api/main';

import { Layout } from '../../components/Layout/Layout';
import { SurveyStep6 } from '../../components/Survey/SurveyStep6';
import { SurveyStep7 } from '../../components/Survey/SurveyStep7';
import BottomNav from '../../container/BottomNav';
import Head from 'next/head';
{
  /* 2022-12-21 접근성 / Head title 추가 */
}

export default function SurveyStep() {
  const [step6Answer, setStep6Answer] = useState(',,,,,');
  const [surveyFinished, setSurveyFinished] = useState(false); // 로컬테스트 true 운영반영 false 변경

  useEffect(() => {
    const step6 = sessionStorage.getItem('step6');
    if (step6) setStep6Answer(step6);
  }, []);

  async function finishedSurvey() {
    if (step6Answer.length === 11) {
      sessionStorage.setItem('step6', step6Answer);
      setSurveyFinished(true);
      setTimeout(() => {
        location.href = '/v6/survey/complete';
      }, 3000);
    }
  }
  return (
    <>
      <Layout addClass="survey">
        {/* 2022-12-21 접근성 / Head title 추가 */} {/* 2023-01-10 접근성 / Head title 수정 */}
        {/* 2023-02-01 접근성 / html 추가 */}
        <html lang="ko" />
        <Head>
          <title>나에게 맞는 기기 찾기 6단계 &lt; Tworld</title>
        </Head>
        <div className="popup-survey">
          {surveyFinished ? (
            <SurveyStep7 />
          ) : (
            <>
              <SurveyStep6 step6Answer={step6Answer} setStep6Answer={setStep6Answer} />
              <div className="fixed-area-bt">
                <div className="btn-full-pop" onClick={finishedSurvey}>
                  <button
                    type="button"
                    className={`btns ${step6Answer && step6Answer.length === 11 ? 'blue' : 'gray'}`}
                    disabled={!(step6Answer && step6Answer.length === 11)}
                  >
                    결과 보기
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </Layout>
      <BottomNav show={false} />
    </>
  );
}
