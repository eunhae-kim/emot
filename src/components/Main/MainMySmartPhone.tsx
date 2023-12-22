/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-danger */
// @ts-nocheck
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';
import XtrAw from '../Common/XtrAw';

import classNames from 'classnames';

Chart.register(CategoryScale, annotationPlugin);

export interface MainItemBoxProps {
  planData: any;
  onClickConversion: any;
}

export const options = {
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false },
    annotation: {
      annotations: [
        {
          type: 'line',
          yMin: 100, //yMin yMax 값이 같아야 직선 표시
          yMax: 100, //yMin yMax 값이 같아야 직선 표시
          // value: '50',
          borderDash: [4, 3],
          borderColor: 'rgba(204, 204, 204, 0.8)',
          borderWidth: 1,
          label: {
            display: true,
            enabled: true,
            content: ' 기본제공 데이터 ',
            backgroundColor: '#ffffff',
            borderColor: 'rgba(204, 204, 204, 0.8)',
            borderWidth: 1,
            borderRadius: 50,
            color: '#888',
            position: 'start',
            xAdjust: -10,
            //yAdjust: -15,
            font: {
              size: 10,
            },
          },
        },
      ],
    },
  },
  elements: {
    line: {
      borderCapStyle: 'round', // 선 끝을 둥글게
      borderJoinStyle: 'bevel', // 꺾이는 모서리를 둥글게
    },
  },
  scales: {
    y: {
      grid: {
        beginAtZero: true,
        display: true,
        color: [
          'rgba(204, 204, 204, 1)', //가로(y)선 색상
          'rgba(0, 0, 0, 0)',
          'rgba(0, 0, 0, 0)',
          'rgba(0, 0, 0, 0)',
          'rgba(0, 0, 0, 0)',
          'rgba(0, 0, 0, 0)',
          'rgba(0, 0, 0, 0)',
          'rgba(0, 0, 0, 0)',
          'rgba(0, 0, 0, 0)',
          'rgba(0, 0, 0, 0)',
          'rgba(0, 0, 0, 0)',
          'rgba(0, 0, 0, 0)',
        ],
      },
      ticks: {
        display: false,
      },
    },
    x: {
      grid: {
        beginAtZero: true,
        display: false, // 세로(X)선 숨김
      },
      ticks: {
        fontSize: 11,
        fontColor: 'rgba(153, 153, 153, 1)',
        autoSkip: false,
        maxRotation: 0,
        minRotation: 0,
      },
    },
  },
};

function PlanChart({ planData, onClickConversion }: MainItemBoxProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  let sojinPredict = Math.round(planData.props.pred_month_usage_gb - planData.props.curr_prod_data_gb);
  const dataUnit = sojinPredict < 1 ? 'MB' : 'GB';
  if (dataUnit === 'MB') sojinPredict = sojinPredict * 1000;

  const top = (planData.props.curr_prod_data_gb / planData.props.pred_month_usage_gb) * 100;

  const sojinPersent = [];
  planData.props.pred_daily_sojin_rate.map((daily) => {
    sojinPersent.push(daily * 100);
  });

  sojinPersent[0] = 0;

  const date = new Date().getDate();
  const lastDay = sojinPersent.length;
  // 사용량이 기본제공량을 못 넘기면 레이블 틀어지는 현상이 있어서 보정
  if (sojinPersent[sojinPersent.length - 1] <= 100) {
    options.plugins.annotation.annotations[0].label.yAdjust = -17;
  }
  const solidLineData = sojinPersent.slice(0, date);
  const fillZero = Array(date - 1).fill(null);
  const slicedSojinPersent = sojinPersent.slice(date - 1, lastDay);
  const dashedLindData = [...fillZero, ...slicedSojinPersent];

  const pointBackgroundColor = Array(lastDay).fill('rgba(0, 0, 0, 0)');
  const pointBorderColor = Array(lastDay).fill('rgba(0, 0, 0, 0)');
  const labels = Array(lastDay).fill('');

  labels[0] = '1일';
  labels[14] = '15일';
  labels[lastDay - 1] = `${lastDay}일`;

  pointBackgroundColor[date - 1] = 'rgba(84, 88, 221, 1)';
  pointBackgroundColor[lastDay - 1] = 'rgba(84, 88, 221, 1)';
  pointBorderColor[date - 1] = 'rgba(84, 88, 221, 0.15)';

  const chartData = {
    type: 'line',
    labels,
    datasets: [
      {
        id: 1,
        label: '기본 제공 데이터 100GB',
        data: solidLineData,
        borderColor: '#5458dd',
        pointBackgroundColor: 'rgba(0, 0, 0, 0)',
        pointBorderColor: 'rgba(0, 0, 0, 0)', //포인터 보더 색상
        backgroundColor: 'transparent',
        tension: 0.5,
      },
      {
        id: 2,
        label: '예상사용량 110GB',
        data: dashedLindData,
        borderColor: '#5458dd',
        borderDash: [1, 6], // 점선 굵기 선 여백
        pointBorderWidth: 12, //포인터 보더 사이즈
        pointRadius: 6, //포인터 반경 범위
        pointBackgroundColor,
        pointBorderColor,
        tension: 0,
        pointStyle: 'circle', //포인터 스타일
      },
    ],
  };

  return (
    <article className="card-main-event my-smart-phone">
      <h2 dangerouslySetInnerHTML={{ __html: '이번 달 예상 데이터 사용량을 알려드려요' }} />
      <p
        className="sub-title"
        dangerouslySetInnerHTML={{
          __html: '직전 3개월의 일자별 데이터 사용량을 바탕으로 <br> 예측한 결과입니다',
        }}
      />
      {/* chart */}
      <div className="data-consume">
        <span className="hidden">그래프 영역</span>
        <Line options={options} data={chartData} aria-hidden="true" />
        {/* 기본 사용량 비 노출시 hide 추가 */}
        {/* 기본제공 텍스트 위치 style top : 값변경 */}
        <ul className="data-graph__legend">
          <li>
            <i className="bar black" />
            {`기본 제공 데이터 ${planData.props.curr_prod_data_gb}GB`}
          </li>
          <li>
            <i className="bar blue" />
            {`예상 사용량 ${planData.props.pred_month_usage_gb.toFixed(1)}
            ${planData.props.pred_month_usage_gb.toFixed(1) >= 1 ? 'GB' : 'MB'}`}
            {/* 툴팁추가 tooltip-content .on 추가 시 나타남 */}
            <div className={classNames(['tooltip-box', { on: showTooltip }])}>
              <button
                type="button"
                onClick={() => {
                  setShowTooltip(!showTooltip);
                }}
                title="툴팁"
                aria-describedby="tooltip"
              >
                <i className="ic-info" />
                <i className="bl-arr top" />
              </button>
              <p className="tooltip-content" id="tooltip" role="tooltip" hidden>
                <span className="text">
                  이번 달 1일부터 주 단위 데이터 사용량을 지난달과 비교하여 예측한 결과입니다. 실제 데이터 사용량과 다를
                  수 있습니다
                </span>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowTooltip(false);
                  }}
                >
                  <i className="ic-tbar-cls" />
                </button>
              </p>
            </div>
          </li>
        </ul>
      </div>

      <div className="data-fee-item">
        <dl>
          <dt>
            <span className="flag">추천</span>
            {planData.name}
          </dt>
          <dd>{`월 ${planData.props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원`}</dd>
        </dl>
      </div>

      <XtrAw appEid={'CMMA_A20-9'} webEid={'MWMA_A20-91'} xtrClick={true} xtrView={true}>
        <div
          className={'link-rounded-large'}
          onClick={async () => {
            await onClickConversion('plan_001');
            window.location.href = `/product/callplan?prod_id=${planData.id}`;
          }}
        >
          추천 요금제 알아보기
        </div>
      </XtrAw>
    </article>
  );
}

export const MainMySmartPhone = React.memo(PlanChart);
