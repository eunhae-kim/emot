import { callApi } from '../common/callApi';
import { getConfig } from './common';

export async function getMainTopBanner() {
  const data = await callApi({
    method: 'get',
    headers: getConfig().headers,
    url: '/main/banner/top',
  });
  return data;
}

export async function getSubBanner() {
  const data = await callApi({
    method: 'get',
    headers: getConfig().headers,
    url: '/main/banner/sub',
  });
  return data;
}

export async function getHotAndNew() {
  const data = await callApi({
    method: 'get',
    headers: getConfig().headers,
    url: '/main/hot-new',
  });
  return data;
}

export async function getQuickMenu() {
  const data = await callApi({
    method: 'get',
    headers: getConfig().headers,
    url: '/main/quick-menu',
  });
  return data;
}

export async function getShortcutMenu() {
  const data = await callApi({
    method: 'get',
    headers: getConfig().headers,
    url: '/main/shortcut-menu',
  });
  return data;
}

export async function getHomeCicnts() {
  const data = await callApi({
    method: 'get',
    headers: getConfig().headers,
    url: '/main/home-cicnts',
  });
  return data;
}

export async function setShortCutMenu(menuIdStr) {
  const data = await callApi({
    method: 'post',
    headers: getConfig().headers,
    url: '/main/shortcut-menu',
    data: {
      menuIdStr,
    },
  });
  return data;
}

export async function getInitShortCutMenu() {
  const data = await callApi({
    method: 'get',
    headers: getConfig().headers,
    url: '/main/shortcut-menu/init',
  });
  return data;
}

export async function getMarketingCardDefault() {
  const data = await callApi({
    method: 'get',
    headers: getConfig().headers,
    url: '/marketing-cards-default',
  });
  return data;
}

export async function getMarketingCard() {
  const data = await callApi({
    method: 'get',
    headers: getConfig().headers,
    url: '/marketing-cards',
  });
  return data;
}

export async function changeDeviceRanking(segKey, subscriptionId) {
  const data = await callApi({
    method: 'get',
    headers: getConfig().headers,
    url: '/marketing-card-device-summary',
    params: { segKey, subscriptionId },
  });
  return data;
}

export async function changeScmRanking(segKey, subscriptionId) {
  const data = await callApi({
    method: 'get',
    headers: getConfig().headers,
    url: '/marketing-card-subscription-statistics',
    params: { segKey, subscriptionId },
  });
  return data;
}

export async function getDeviceSurveyResult(surveyCode) {
  const data = await callApi({
    method: 'get',
    headers: getConfig().headers,
    url: '/device-survey',
    params: { surveyCode },
  });
  return data;
}

export async function getNotice() {
  const data = await callApi({
    method: 'get',
    headers: getConfig().headers,
    url: '/main/notice',
  });
  return data;
}

export async function getTermAgreement() {
  const data = await callApi({
    method: 'get',
    headers: getConfig().headers,
    url: '/my/agreements',
  });
  return data;
}

export async function getTermAgreementBanner() {
  const data = await callApi({
    method: 'get',
    headers: getConfig().headers,
    url: '/main/banner/agreement',
  });
  return data;
}

export async function updateTermAgreement(terms) {
  const data = await callApi({
    method: 'post',
    headers: getConfig().headers,
    url: '/my/agreements',
    data: terms,
  });
  return data;
}

export async function getMainNotice() {
  const data = await callApi({
    method: 'get',
    headers: getConfig().headers,
    url: '/main/notice/emergency',
  });
  return data;
}

// just for test
export async function tempMarketingCard() {
  const data = await callApi({
    method: 'get',
    headers: getConfig().headers,
    url: '/temp-marketing-cards-all',
  });
  return data;
}

/*
 * 약관 내용 조회(html)
 *  - stplTypCd(03): T world 개인정보 수집/이용 동의
 *  - stplTypCd(06): 광고성 정보 수신 동의
 *  - stplTypCd(15): T world 위치기반서비스 이용동의
 */
export async function getTerms(stplTypCd: '03' | '06' | '15') {
  const data = await callApi({
    method: 'get',
    headers: getConfig().headers,
    url: '/tworld-terms',
    params: {
      stplTypCd,
    },
  });
  return data;
}

export async function getKbo(params) {
  /*
  return {
    respCode: 0,
    games: [
      {
        gameId: '20230823OBWO0',
        gameType: '0',
        stadium: 'GC',
        canceledGameYn: 'N',
        doubleHeader: '0',
        date: '20230823',
        time: '18:30',
        status: '2',
        progress: {
          inning: 2,
          topBottom: 'B',
        },
        homeTeam: 'WO',
        homeScore: 0,
        awayTeam: 'OB',
        awayScore: 0,
      },
      {
        gameId: '20230823SSHH0',
        gameType: '0',
        stadium: 'DJ',
        canceledGameYn: 'N',
        doubleHeader: '0',
        date: '20230823',
        time: '18:30',
        status: '2',
        progress: {
          inning: 8,
          topBottom: 'T',
        },
        homeTeam: 'HH',
        homeScore: 0,
        awayTeam: 'SS',
        awayScore: 0,
      },
      {
        gameId: '20230823HTKT0',
        gameType: '0',
        stadium: 'SW',
        canceledGameYn: 'Y',
        doubleHeader: '0',
        date: '20230823',
        time: '18:30',
        status: '4',
        progress: {
          inning: 0,
          topBottom: 'T',
        },
        homeTeam: 'KT',
        homeScore: 0,
        awayTeam: 'HT',
        awayScore: 0,
      },
      {
        gameId: '20230823NCSK0',
        gameType: '0',
        stadium: 'MH',
        canceledGameYn: 'Y',
        doubleHeader: '0',
        date: '20230823',
        time: '18:30',
        status: '4',
        progress: {
          inning: 0,
          topBottom: 'T',
        },
        homeTeam: 'SK',
        homeScore: 0,
        awayTeam: 'NC',
        awayScore: 0,
      },
      {
        gameId: '20230823LTLG0',
        gameType: '0',
        stadium: 'JS',
        canceledGameYn: 'Y',
        doubleHeader: '0',
        date: '20230823',
        time: '18:30',
        status: '4',
        progress: {
          inning: 0,
          topBottom: 'T',
        },
        homeTeam: 'LG',
        homeScore: 0,
        awayTeam: 'LT',
        awayScore: 0,
      },
    ],
    highlights: [
      {
        title: '[NC vs KT][1회초] 마틴, 선취점 가져오는 희생플라이',
        landingUrl: 'skt.adot://mytv/main?channelId=CH_0000000130&behavior=port',
      },
      {
        title: '[NC vs KT][1회말] 정구범, 중심 타선 돌려세우며 위기 탈출',
        landingUrl: 'skt.adot://mytv/main?channelId=CH_0000000130&behavior=port',
      },
      {
        title: '[NC vs KT][2회말] 황재균, 좋은 수비로도 막을 수 없는 내야안타',
        landingUrl: 'skt.adot://mytv/main?channelId=CH_0000000130&behavior=port',
      },
      {
        title: '[NC vs KT][3회초] 배제성, 숱한 위기 넘어서는 피칭',
        landingUrl: 'skt.adot://mytv/main?channelId=CH_0000000130&behavior=port',
      },
      {
        title: '[NC vs KT][3회말] 김상수, 상대 실책으로 진루했지만 결국 아웃',
        landingUrl: 'skt.adot://mytv/main?channelId=CH_0000000130&behavior=port',
      },
    ],
  };
  */
  /// *
  const data = await callApi({
    method: 'get',
    headers: getConfig().headers,
    url: '/main/kbo',
    params,
  });
  return data;
  //* /
}

// 홈 팝업 배너
export async function getHomePopupBanner() {
  const data = await callApi({
    method: 'get',
    headers: getConfig().headers,
    url: '/main/banner/popup',
  });
  return data;
}
