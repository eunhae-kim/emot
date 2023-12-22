import { GameInfo, MainConnectMediaProps } from '../../../components/Main/MainConnectMedia';

// 1:경기전, 2:경기중, 3:경기종료, 4:경기취소, 5:경기지연
const ApiGameStatusToGameStatus = {
  '1': 'SCHEDULED',
  '2': 'IN_PROGRESS',
  '3': 'ENDED',
  '4': 'CANCELED',
  '5': 'SCHEDULED',
};
// 0:정규시즌, 1:시점경기, 3:준플레이오프, 4:와일드카드결정전, 5:플레이오프, 7:한국시리즈, 8:국제경기, 9:올스타전
const GameTypeCodeToGameType = {
  '0': '프로야구',
  '1': '프로야구 시범',
  '3': '준플레이오프',
  '4': '와일드카드 결정전',
  '5': '플레이오프',
  '7': '한국시리즈',
  '8': '국제경기',
  '9': '올스타전',
};

export default (apiResp: any): MainConnectMediaProps => {
  if (!apiResp || !apiResp.games || apiResp.games.length < 1) {
    return null;
  }

  const highlightText = apiResp.highlights && apiResp.highlights.length > 1 ? apiResp.highlights[0].title : null;
  const gameList: Array<GameInfo> = apiResp.games.map((game) => {
    const hhmmArr = game.time.split(/:/);
    let numHour = parseInt(hhmmArr[0], 10);
    let hh = '';
    const mm = hhmmArr[1];
    if (numHour >= 12) {
      if (numHour >= 13) {
        numHour -= 12;
      }
      hh = `오후 ${numHour}`;
    } else {
      hh = `오전 ${numHour}`;
    }

    return {
      status: ApiGameStatusToGameStatus[game.status],
      stadiumCode: game.stadium,
      time: `${hh}:${mm}`,
      team1: {
        code: game.awayTeam,
        score: game.awayScore,
      },
      team2: {
        code: game.homeTeam,
        score: game.homeScore,
      },
      progress: game.progress,
    };
  });

  const gameType = GameTypeCodeToGameType[apiResp.games[0]?.gameType] || '프로야구';
  let title;
  let subject;
  switch (gameList[0]?.status) {
    case 'SCHEDULED':
      title = `오늘은 ${gameType} 경기가 열려요`;
      subject = 'SKT고객이라면 <em class="point">에이닷</em>에서 데이터 걱정없이 보세요';
      break;
    case 'IN_PROGRESS':
      title = `지금 ${gameType} 경기 중 이에요`;
      subject = 'SKT고객이라면 <em class="point">에이닷</em>에서 데이터 걱정없이 보세요';
      break;
    case 'ENDED':
      title = `오늘 ${gameType} 경기 결과를 알려드려요`;
      subject = '다음 경기 일정도 <em class="point">에이닷</em>에서 확인해 보세요';
      break;
    case 'CANCELED':
      title = `오늘 ${gameType} 경기는 취소됐어요`;
      subject = '대신 <em class="point">에이닷</em>이 지난 경기 하이라이트를 보여 드릴게요';
      break;
    default:
      title = '';
      subject = '';
  }

  return {
    title,
    subject,
    // 경기 중에는 하이라이트 영역 노출 안함
    highlightText: gameList[0]?.status === 'IN_PROGRESS' ? null : highlightText,
    buttonText:
      gameList[0]?.status === 'IN_PROGRESS' ? '에이닷 프로야구 생중계 보러 가기' : '에이닷 프로야구 바로 가기',
    gameList,
  };
};
