/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { Lang } from '../../common/types';
import TXT from '../../common/i18nMsgs';
import MyLink from '../Common/MyLink';
import XtrAw, { XtrAwProps } from '../Common/XtrAw';

export enum GraphType {
  DATA = 'data',
  VOICE = 'tell',
  SMS = 'message',
  WIRE_VOICE = 'wire_tell',
}

export type MainRmText = {
  v: string;
  unit: string;
};

export type MyGraphXtrAwProps = {
  mainBalance?: XtrAwProps;
  가족모아데이터?: XtrAwProps;
  통화_문자?: XtrAwProps;
  문자?: XtrAwProps;
  유선_문자?: XtrAwProps;
  giftBtn?: XtrAwProps;
  refillBtn?: XtrAwProps;
};

export interface MyGraphProps {
  mainRmTextArr: Array<MainRmText>;

  graphType: GraphType;

  mainTotalText: string;
  mainRmPct: number;

  // GraphType.DATA
  familyDataRmPct?: number;
  familyDataRmText?: string;
  voiceSmsRmText?: string;

  // GraphType.VOICE
  smsRmText?: string;

  lang: Lang;

  onDataRefillClick?: () => void;
  onDataGiftClick?: () => void;
  isDataRefillLayerVisible?: boolean;
  isDataGiftLayerVisible?: boolean;

  xtrAwProps?: MyGraphXtrAwProps;
}

export function MyGraph({
  mainRmTextArr,
  mainTotalText,
  mainRmPct,
  graphType,
  familyDataRmPct,
  familyDataRmText,
  voiceSmsRmText,
  smsRmText,
  onDataRefillClick,
  onDataGiftClick,
  isDataRefillLayerVisible,
  isDataGiftLayerVisible,
  lang,
  xtrAwProps,
}: MyGraphProps) {
  // console.log('xtrProps', xtrProps);
  // console.log(arrow === undefined);
  const spaceBeforeUnit = lang === 'EN' && graphType === GraphType.SMS ? '\u00A0' : '';
  const spaceBetweenValue =
    lang === 'EN' && (graphType === GraphType.VOICE || graphType === GraphType.WIRE_VOICE) ? '\u00A0' : '';
  return (
    <>
      <XtrAw as="div" className="my-volume" {...xtrAwProps?.mainBalance}>
        <MyLink href={`${lang === 'EN' ? '/en' : ''}/myt-data/hotdata`}>
          {mainRmTextArr.map((v, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <React.Fragment key={idx}>
              {v.v}
              <span className="unit">
                {spaceBeforeUnit}
                {v.unit}
              </span>
              {idx !== mainRmTextArr.length - 1 ? spaceBetweenValue : ''}
            </React.Fragment>
          ))}
          <i className="bl-arr-bold right" aria-hidden="true" />
        </MyLink>
      </XtrAw>

      {/*
      <div className="my-line-graph">
        <span className="bar-amount">{mainTotalText}</span>
        <div className="bar-graph" aria-label="Bar-Graph">
          <span className={`figure-${graphType}`} style={{ width: `${mainRmPct || 0}%` }} />
          {graphType === 'data' && (
            <span className="figure-data family" style={{ width: `${familyDataRmPct || 0}%` }} />
          )}
        </div>
      </div>
      */}

      {/* 그래프 추가 */}
      {/* bar 색상 다름
        남은 데이터 : _group-data
        남은 통화 : _group-call
        남은 데이터 : _group-message
      */}
      <div
        className={`graphbar_group ${
          {
            [GraphType.DATA]: 'graphbar_group-data',
            [GraphType.VOICE]: 'graphbar_group-call',
            [GraphType.SMS]: 'graphbar_group-message',
            [GraphType.WIRE_VOICE]: 'graphbar_group-call',
          }[graphType]
        }`}
      >
        <span className="bar-amount">{mainTotalText}</span>
        <div className="graphbar_box">
          <div className="graphbar graphbar-d" data-total="100">
            <span style={{ width: `${mainRmPct || 0}%` }} />
          </div>
          <div className="graphbar graphbar-s" data-total="100">
            <span style={{ left: `${mainRmPct}%`, width: `${familyDataRmPct || 0}%` }} />
          </div>
        </div>
      </div>
      {/* // 그래프 추가 */}

      {graphType === GraphType.DATA && (
        <>
          <div className="fee-list">
            {familyDataRmText && (
              <dl className="line-item family">
                <dt>{TXT['T가족모아데이터'][lang]}</dt>
                <dd>
                  <XtrAw {...xtrAwProps?.가족모아데이터}>
                    <MyLink href={`${lang === 'EN' ? '/en/myt-data/hotdata' : '/myt-data/familydata'}`}>
                      <em>{familyDataRmText /* 18GB */}</em>
                      <i className="bl-arr" aria-hidden="true">
                        {' '}
                      </i>
                    </MyLink>
                  </XtrAw>
                </dd>
              </dl>
            )}
            <dl className="line-item">
              <dt>{TXT['통화_문자'][lang]}</dt>
              <dd>
                <XtrAw {...xtrAwProps?.통화_문자}>
                  <MyLink href={`${lang === 'EN' ? '/en' : ''}/myt-data/hotdata`}>
                    {voiceSmsRmText /* 4시간 53분/기본제공 */}
                    <i className="bl-arr" aria-hidden="true" />
                  </MyLink>
                </XtrAw>
              </dd>
            </dl>
          </div>
          {lang === 'KO' && (
            <div className="my-btn-area">
              <XtrAw
                as="button"
                {...xtrAwProps?.refillBtn}
                type="button"
                className="btn"
                onClick={onDataRefillClick}
                aria-controls="modalRefill"
                aria-expanded={isDataRefillLayerVisible}
              >
                <i className="ic-etc-data" aria-hidden="true" />
                충전하기
              </XtrAw>
              <XtrAw
                as="button"
                {...xtrAwProps?.giftBtn}
                type="button"
                className="btn"
                onClick={onDataGiftClick}
                aria-controls="modalGift"
                aria-expanded={isDataGiftLayerVisible}
              >
                <i className="ic-etc-gift" aria-hidden="true" />
                선물하기
              </XtrAw>
            </div>
          )}
        </>
      )}

      {graphType === GraphType.VOICE && smsRmText && (
        <div className="fee-list">
          <dl className="line-item">
            <dt>{TXT['문자'][lang]}</dt>
            <dd>
              <XtrAw {...xtrAwProps?.문자}>
                <MyLink href={`${lang === 'EN' ? '/en' : ''}/myt-data/hotdata`}>
                  {smsRmText /* 기본제공 */}
                  <i className="bl-arr" aria-hidden="true" />
                </MyLink>
              </XtrAw>
            </dd>
          </dl>
        </div>
      )}

      {graphType === GraphType.WIRE_VOICE && smsRmText && (
        <div className="fee-list">
          <dl className="line-item">
            <dt>{TXT['문자'][lang]}</dt>
            <dd>
              <XtrAw {...xtrAwProps?.유선_문자}>
                <MyLink href={`${lang === 'EN' ? '/en' : ''}/myt-data/hotdata`}>
                  {smsRmText /* 기본제공 */}
                  <i className="bl-arr" aria-hidden="true" />
                </MyLink>
              </XtrAw>
            </dd>
          </dl>
        </div>
      )}
    </>
  );
}
