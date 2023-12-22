import React, { useEffect, useState } from 'react';
import Head from 'next/head'; // 2022-12-21 접근성 / Head title 추가
import { Layout } from '../../components/Layout/Layout';

import { SurveyStep8 } from '../../components/Survey/SurveyStep8';
import { SurveyStep9 } from '../../components/Survey/SurveyStep9';
import { SurveyStep10 } from '../../components/Survey/SurveyStep10';

import { getDeviceSurveyResult } from '../../api/main';

export default function SurveyStep() {
  const [surveyResult, setSurveyResult] = useState(null);
  const [isError, setIsError] = useState(false);
  const [processId, setProcessId] = useState(null);
  const [surveyCode, setSurveyCode] = useState(null);
  const [errorCode, setErrorCode] = useState<number>();

  useEffect(() => {
    (async () => {
      let response = null;
      const randomNum = Math.floor(Math.random() * 5) + 1;

      try {
        const surveyResponse =
          sessionStorage.getItem('step4') + sessionStorage.getItem('step5') + sessionStorage.getItem('step6');
        if (surveyResponse) {
          response = await getDeviceSurveyResult(`${surveyResponse.replace(/\,/g, '')}_AA${randomNum}`);
          setSurveyCode(`${surveyResponse.replace(/\,/g, '')}_AA${randomNum}`);
          filterDevice(response.result);
          setProcessId(response.processId);
        } else {
          setIsError(true);
        }
      } catch (e) {
        setErrorCode(response.respCode);
        setIsError(true);
      }
    })();
  }, []);

  function filterDevice(response) {
    // 1. 제조사 필터
    let filteredDevice = response;
    const comp = sessionStorage.getItem('step1');
    filteredDevice = filteredDevice.filter((device) => {
      if (comp === '삼성' || comp === '애플') {
        return device.comp === comp;
      } else if (comp === 'etc') {
        return device.comp === '삼성' && device.comp === '애플';
      }
    });

    // 2. 휴대폰유형 필터
    const spec = sessionStorage.getItem('step2');
    filteredDevice = filteredDevice.filter((device) => {
      return device.spec === spec;
    });

    filteredDevice = filteredDevice.slice(0, 3);
    setSurveyResult(filteredDevice);
  }

  return (
    <>
      <Layout addClass="survey">
        {/* 2022-12-21 접근성 / Head title 추가 */} {/* 2023-01-10 접근성 / Head title 수정 */}
        {/* 2023-02-01 접근성 / html 추가 */}
        <html lang="ko" />
        <Head>
          <title>나에게 맞는 기기 찾기 결과 &lt; Tworld</title>
        </Head>
        {surveyResult && (
          <div className="popup-survey">
            {
              // 정상 케이스
              surveyResult.length > 0 && (
                <SurveyStep8 surveyResult={surveyResult} processId={processId} surveyCode={surveyCode} />
              )
            }
            {
              // 일치하는 단말이 없는 케이스
              surveyResult.length === 0 && <SurveyStep10 />
            }
          </div>
        )}
        {
          // 에러케이스
          isError && (
            <div className="popup-survey">
              <SurveyStep9 errorCode={errorCode} />
            </div>
          )
        }
      </Layout>
    </>
  );
}
