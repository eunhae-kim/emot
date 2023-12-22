// @ts-nocheck
/* eslint-disable */
import React, { useState, useEffect, MutableRefObject } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, A11y, FreeMode, Pagination } from 'swiper';
import Ticker from 'react-ticker';
import { LinkRounded } from '../Link/LinkRounded';
import V6Link from '../Common/V6Link';
import { string } from 'prop-types';
import useModal from '../../hooks/useModal';
import XtrAw from '../Common/XtrAw';
import { callBridgeApi } from '../../common/utils';
import { isApp } from '../../js/commonUtil';

export const TeamCodeToName = {
  OB: '두산',
  WO: '키움',
  SK: 'SSG',
  LG: 'LG',
  NC: 'NC',
  KT: 'KT',
  HT: '기아',
  SS: '삼성',
  HH: '한화',
  LT: '롯데',
};

export const StadiumCodeToName = {
  JS: '잠실',
  SJ: '사직',
  DK: '대구',
  PH: '포항',
  SW: '수원',
  KC: '광주',
  UL: '울산',
  EL: '이천',
  GC: '고척',
  MH: '문학',
  CJ: '청주',
  DJ: '대전',
  CW: '창원',
  SD: '상동',
};

export type GameStatus = 'SCHEDULED' | 'IN_PROGRESS' | 'ENDED' | 'CANCELED';
export const GameStatusToText: Record<GameStatus, string> = {
  SCHEDULED: '경기예정',
  IN_PROGRESS: '경기중',
  ENDED: '경기종료',
  CANCELED: '경기취소',
};
export const GameStatusToCssClass: Record<GameStatus, string> = {
  SCHEDULED: 'schedule',
  IN_PROGRESS: 'middle',
  ENDED: 'end',
  CANCELED: 'cancel',
};

export type TeamInfo = {
  code: string;
  score: number;
};
export type GameProgress = {
  inning: number;
  topBottom: 'T' | 'B';
};
export type GameInfo = {
  status: GameStatus;
  stadiumCode: string;
  time: string;
  team1: TeamInfo;
  team2: TeamInfo;
  progress: GameProgress;
};
export interface MainConnectMediaProps {
  title: string;
  subject: string | MutableRefObject<HTMLElement>;
  highlightText?: string;
  buttonText: string;
  gameList: Array<GameInfo>;
}

const progressToText = (progress: GameProgress) => {
  return `${progress.inning}회${progress.topBottom === 'T' ? '초' : '말'}`;
};

function renderSingleGameCont(gameInfo: GameInfo) {
  return (
    <div className="game-cont">
      <div className="game-info">
        <span className="date">{gameInfo.time}</span>
        <span className="area">{StadiumCodeToName[gameInfo.stadiumCode]}</span>
      </div>
      <div className="game-match-area">
        <div className="team-box">
          <span className={`adot_icon ${gameInfo.team1.code.toLowerCase()}`}></span>
          <p className="team-name">{TeamCodeToName[gameInfo.team1.code]}</p>
        </div>
        <div className="score-box">
          <p className={`game-status ${GameStatusToCssClass[gameInfo.status]}`}>
            {gameInfo.status === 'IN_PROGRESS' ? progressToText(gameInfo.progress) : GameStatusToText[gameInfo.status]}
          </p>
          <p className="score">
            {gameInfo.team1.score} : {gameInfo.team2.score}
          </p>
        </div>
        <div className="team-box">
          <span className={`adot_icon ${gameInfo.team2.code.toLowerCase()}`}></span>
          <p className="team-name">{TeamCodeToName[gameInfo.team2.code]}</p>
        </div>
      </div>
    </div>
  );
}

function renderDoubleGameCont(gameInfo: GameInfo) {
  return (
    <div className="game-cont" key={`${gameInfo.team1.code},${gameInfo.team2.code}`}>
      <div className="game-info">
        <span className="date">{gameInfo.time}</span>
        <span className="area">{StadiumCodeToName[gameInfo.stadiumCode]}</span>
      </div>
      <div className="game-status-box">
        <p className={`game-status ${GameStatusToCssClass[gameInfo.status]}`}>
          {gameInfo.status === 'IN_PROGRESS' ? progressToText(gameInfo.progress) : GameStatusToText[gameInfo.status]}
        </p>
      </div>
      <div className="game-match-area">
        <div className="team-box">
          <span className={`adot_icon ${gameInfo.team1.code.toLowerCase()}`}></span>
          <p className="team-name">{TeamCodeToName[gameInfo.team1.code]}</p>
          <p className="score">{gameInfo.team1.score}</p>
        </div>
        <div className="team-box">
          <span className={`adot_icon ${gameInfo.team2.code.toLowerCase()}`}></span>
          <p className="team-name">{TeamCodeToName[gameInfo.team2.code]}</p>
          <p className="score">{gameInfo.team2.score}</p>
        </div>
      </div>
    </div>
  );
}

function renderMoreThanTwoGameCont(gameInfo: GameInfo) {
  return (
    <SwiperSlide key={`${gameInfo.team1.code},${gameInfo.team2.code}`}>
      <div className="game-cont">
        <div className="game-info">
          <span className="date">{gameInfo.time}</span>
          <span className="area">{StadiumCodeToName[gameInfo.stadiumCode]}</span>
        </div>
        <div className="game-status-box">
          <p className={`game-status ${GameStatusToCssClass[gameInfo.status]}`}>
            {gameInfo.status === 'IN_PROGRESS' ? progressToText(gameInfo.progress) : GameStatusToText[gameInfo.status]}
          </p>
        </div>
        <div className="game-match-area">
          <div className="team-box">
            <span className={`adot_icon ${gameInfo.team1.code.toLowerCase()}`}></span>
            <p className="team-name">{TeamCodeToName[gameInfo.team1.code]}</p>
            <p className="score">{gameInfo.team1.score}</p>
          </div>
          <div className="team-box">
            <span className={`adot_icon ${gameInfo.team2.code.toLowerCase()}`}></span>
            <p className="team-name">{TeamCodeToName[gameInfo.team2.code]}</p>
            <p className="score">{gameInfo.team2.score}</p>
          </div>
        </div>
      </div>
    </SwiperSlide>
  );
}

export function MainConnectMedia({
  title,
  subject,
  highlightText = '',
  buttonText,
  gameList = [],
}: MainConnectMediaProps) {
  const [tickerControl, setTickerControl] = useState(true);
  const { confirm } = useModal();

  const showMoveConfirm = (landingUrl: string) => {
    return confirm.show({
      isOpen: true,
      onClickConfirm: () => {
        setTimeout(() => {
          if (isApp()) {
            callBridgeApi({
              command: 'openUrl',
              params: {
                type: 1,
                href: landingUrl,
              },
            });
          } else {
            //window.location.href = landingUrl;
            window.open(landingUrl, '_blank');
          }
        }, 0);
        confirm.close();
      },
      onClickCancel: () => {
        confirm.close();
      },
      title: '<span class="icon-adot"></span>에이닷 서비스로 이동합니다',
      message: `똑똑한 AI, 야구 중계\n<br />\n에이닷 프로야구 채널로 이동하시겠습니까?`,
    });
  };

  const gameLength = gameList.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerControl(true);
    }, 2000);

    return () => {
      clearInterval(timer);
    };
  }, [tickerControl]);

  return (
    <article className="card-main-content card-main-adot">
      <h2 dangerouslySetInnerHTML={{ __html: title }} />
      <p className="sub-title" dangerouslySetInnerHTML={{ __html: subject }} />
      {gameLength === 1 && <section className="game-wrapper">{renderSingleGameCont(gameList[0])}</section>}
      {gameLength === 2 && (
        <section className="game-wrapper">{gameList.map((gameInfo) => renderDoubleGameCont(gameInfo))}</section>
      )}
      {gameLength >= 3 && (
        <Swiper
          modules={[FreeMode]}
          freeMode={true}
          className="game-swiper"
          spaceBetween={10}
          slidesPerView="auto"
          slidesOffsetAfter={20}
          slidesOffsetBefore={20}
        >
          {gameList.map((gameInfo) => renderMoreThanTwoGameCont(gameInfo))}
        </Swiper>
      )}
      {highlightText && (
        <XtrAw appEid="CMMA_A20-459" webEid="CMMA_A20-459">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              showMoveConfirm('https://my-adot.onelink.me/MAbS/q92cwt1s');
            }}
          >
            <div className="game-highlight-cont">
              <div className="title-area">
                <span className="icon"></span>
                <h3>하이라이트</h3>
              </div>
              <div className="highlight-area">
                <div className="ticker">
                  <Ticker speed={4} offset={25} onFinish={() => setTickerControl(false)} move={tickerControl}>
                    {() => <p>{highlightText}</p>}
                  </Ticker>
                </div>
              </div>
              <i className="bl-arr" aria-hidden="true"></i>
            </div>
          </a>
        </XtrAw>
      )}
      <XtrAw
        appEid={gameList[0]?.status === 'IN_PROGRESS' ? `CMMA_A20-461` : `CMMA_A20-460`}
        webEid={gameList[0]?.status === 'IN_PROGRESS' ? `CMMA_A20-461` : `CMMA_A20-460`}
      >
        <button
          label={buttonText}
          type={'button'}
          className={`link-rounded-large`}
          onClick={(e) => {
            e.preventDefault();
            showMoveConfirm('https://my-adot.onelink.me/MAbS/s82gzwtz');
          }}
        >
          {buttonText}
        </button>
      </XtrAw>
    </article>
  );
}
