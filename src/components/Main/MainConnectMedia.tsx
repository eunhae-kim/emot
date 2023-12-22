// @ts-nocheck
/* eslint-disable */        
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, A11y, FreeMode, Pagination } from 'swiper';
import V6Link from '../Common/V6Link';
import { LinkRounded } from '../Link/LinkRounded';

export interface MainConnectMediaProps {
    title: string;
    subject: string | MutableRefObject<HTMLElement>;
    buttonText: string;
    gameLength: number;
    highlight?: boolean;
};

export function MainConnectMedia({ 
    title, 
    subject,
    buttonText,
    gameLength,
    highlight = false,
}: MainConnectMediaProps) {
  return (
    <article className="card-main-adot">
        <div className="title-cont">
            <h2 dangerouslySetInnerHTML={{ __html: title }} />
            <span className="tit-menu" dangerouslySetInnerHTML={{ __html: subject }} />
        </div>
        {gameLength === 1 && (
            <section className="game-wrapper">
                <div className="game-cont">
                    <div className="game-info">
                        <span className="date">오후 6:30</span>
                        <span className="area">광주</span>
                    </div>   
                    <div className="game-match-area">
                        <div className="team-box">
                            <span className="adot_icon ssg"></span>
                            <p className="team-name">SSG 랜더스</p>
                        </div>
                        <div className="score-box">
                            <p className="game-status middle">경기중</p>
                            <p className="score">0 : 0</p>
                        </div>
                        <div className="team-box">
                            <span className="adot_icon kia"></span>
                            <p className="team-name">KIA 타이거즈</p>
                        </div>
                    </div>
                </div>
            </section>
        )}
        {gameLength === 2 && (
            <section className="game-wrapper">
                <div className="game-cont">
                    <div className="game-info">
                        <span className="date">오후 6:30</span>
                        <span className="area">광주</span>
                    </div>
                    <div className="game-status-box">
                        <p className="game-status schedule">경기예정</p>
                        {/* <p className="game-status middle">경기중</p>
                        <p className="game-status end">경기종료</p>
                        <p className="game-status cancel">경기취소</p> */}
                    </div>
                    <div className="game-match-area">
                        <div className="team-box">
                            <span className="adot_icon doosan"></span>
                            <p className="team-name">DOOSAN</p>
                            <p className="score">0</p>
                        </div>
                        <div className="team-box">
                            <span className="adot_icon kiwoom"></span>
                            <p className="team-name">kiwoom</p>
                            <p className="score">0</p>
                        </div>
                    </div>
                </div>
                <div className="game-cont">
                    <div className="game-info">
                        <span className="date">오후 6:30</span>
                        <span className="area">광주</span>
                    </div>
                    <div className="game-status-box">
                        <p className="game-status middle">경기중</p>
                    </div>
                    <div className="game-match-area">
                        <div className="team-box">
                            <span className="adot_icon hanwha"></span>
                            <p className="team-name">한화</p>
                            <p className="score">0</p>
                        </div>
                        <div className="team-box">
                            <span className="adot_icon kt"></span>
                            <p className="team-name">KT</p>
                            <p className="score">0</p>
                        </div>
                    </div>
                </div>
            </section>
        )}
        {gameLength >= 3 && (            
            <Swiper
                modules={[FreeMode]}
                freeMode={true}
                className="game-swiper"
                spaceBetween={10}
                slidesPerView="auto"
            >
                <SwiperSlide>
                    <div className="game-cont">
                        <div className="game-info">
                            <span className="date">오후 6:30</span>
                            <span className="area">광주</span>
                        </div>
                        <div className="game-status-box">
                            <p className="game-status end">경기종료</p>
                        </div>
                        <div className="game-match-area">
                            <div className="team-box">
                                <span className="adot_icon lg"></span>
                                <p className="team-name">lg</p>
                                <p className="score">0</p>
                            </div>
                            <div className="team-box">
                                <span className="adot_icon lotte"></span>
                                <p className="team-name">lotte</p>
                                <p className="score">0</p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="game-cont">
                        <div className="game-info">
                            <span className="date">오후 6:30</span>
                            <span className="area">광주</span>
                        </div>
                        <div className="game-status-box">
                            <p className="game-status cancel">경기취소</p>
                        </div>
                        <div className="game-match-area">
                            <div className="team-box">
                                <span className="adot_icon nc"></span>
                                <p className="team-name">nc</p>
                                <p className="score">0</p>
                            </div>
                            <div className="team-box">
                                <span className="adot_icon samsung"></span>
                                <p className="team-name">samsung</p>
                                <p className="score">0</p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="game-cont">
                        <div className="game-info">
                            <span className="date">오후 6:30</span>
                            <span className="area">광주</span>
                        </div>
                        <div className="game-status-box">
                            <p className="game-status schedule">경기예정</p>
                            {/* <p className="game-status middle">경기중</p>
                            <p className="game-status end">경기종료</p>
                            <p className="game-status cancel">경기취소</p> */}
                        </div>
                        <div className="game-match-area">
                            <div className="team-box">
                                <span className="adot_icon ssg"></span>
                                <p className="team-name">ssg</p>
                                <p className="score">0</p>
                            </div>
                            <div className="team-box">
                                <span className="adot_icon kiwoom"></span>
                                <p className="team-name">kiwoom</p>
                                <p className="score">0</p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        )}
        {highlight && (
            <div className="game-highlight-cont">
                <span className="icon"></span>
                <Swiper
                    slidesPerView={1}
                    className="game-highlight-swiper"
                    modules={[Autoplay, Pagination, A11y]}
                    loop
                    pagination={{
                        type: 'fraction',
                    }}
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: false,
                    }}
                >
                    <SwiperSlide>
                        <V6Link href="http://www.naver.com">
                            <p className="text">111‘문보경 결승 투런홈런+임찬규 7승’ LG, 파죽지세 5연승 질주…키움, 3연패 수렁 [잠실 리뷰]</p>
                        </V6Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <V6Link href="http://www.naver.com">
                            <p className="text">222‘문보경 결승 투런홈런+임찬규 7승’ LG, 파죽지세 5연승 질주…키움, 3연패 수렁 [잠실 리뷰]</p>
                        </V6Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <V6Link href="http://www.naver.com">
                            <p className="text">333‘문보경 결승 투런홈런+임찬규 7승’ LG, 파죽지세 5연승 질주…키움, 3연패 수렁 [잠실 리뷰]</p>
                        </V6Link>
                    </SwiperSlide>
                    {/* 공통베너에 있는 컨트롤러 사용 */}
                    <div className="bnr-swiper-controller">
                        <button type="button">
                            <i className="ic-btn-stop2" aria-hidden='true' />
                            {/* <i className="ic-play" /> */} {/* //재생아이콘 */}
                        </button>
                    </div>
                </Swiper>
            </div>
        )}
        <LinkRounded
            label={buttonText}
            size="large"
        />
    </article>
  );
}
