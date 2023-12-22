import React from 'react';
import { Layout } from '../components/Layout/Layout';
import Head from 'next/head';
import BottomNav from '../container/BottomNav';

export default function NoteicPopup() {
    return (
        <>
            <Layout addClass="info">
                <Head>
                    <title>T world</title>
                </Head>
                <div className="popup-page tod-service-end fixed-bottom">
                    <div className="container-wrap">
                        <div className="container">
                            <div className="cont-box color-bg">
                                <span className="tod-notice-on">모바일 T world&#40;App./Web&#41;</span>
                                <p className="top-title">
                                    안드로이드 OS 5.0,<br />
                                    iOS 12 미만 <br />
                                    서비스 지원 종료
                                </p>
                            </div>
                            <div className="cont-box tod-notice-detail">
                                <p>
                                    안드로이드 OS 5.0, iOS 12 미만인 휴대폰에서는 <br />
                                    모바일 T world&#40;App./Web&#41; 서비스를 이용하실 수 없습니다.
                                </p>
                                <p>
                                    안드로이드 OS 5.0, iOS 12를 지원하지 않는 휴대폰의 경우, T 월드 홈페이지 <br />
                                    &#40;www.tworld.co.kr&#41;를 이용해 주시기 바랍니다.
                                </p>
                                <p className="tod-referencemark"> OS 업데이트 관련된 자세한 내용은 사용 중인 휴대폰 제조사로 문의해 주시기 바랍니다.</p>
                            </div>
                        </div>
                        <div className="bt-fixed-area">
                            <button type="button" className="btn-floating">닫기</button>
                        </div>
                    </div>
                </div>
            </Layout>
            <BottomNav show={false} />
        </>
    );
}
