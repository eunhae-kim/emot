import { Lang } from '../types';
import { GraphType, MainRmText, MyGraphXtrAwProps } from '../../components/My/MyGraph';
import { dataToDisplayData, kbToDisplayText, smsToDisplayData, voiceToDisplayData } from '../utils';
import { TitleType } from '../../components/My/MyTitle';

/*
const result = {
  "respCode": 0,
  "tfamilySharing": {
    "total": "0",
    "remained": "-5886",
    "unit": "140"
  },
  "data": {
    "isShow": true,
    "isUnlimit": true,
    //"total": "스마트폰 플러스",
    //"remained": "스마트폰 플러스"
  },
  "voice": {
    "prodId": "NA00006404",
    "prodNm": "5GX프라임",
    "skipId": "DD3GW",
    "skipNm": "영상, 부가전화 300분",
    "unlimit": "0",
    "total": "18000",
    "used": "369",
    "remained": "17631",
    "unit": "240",
    "rgstDtm": "",
    "exprDtm": "",
    "isShow": true,
    "isUnlimit": false
  },
  "wire": {
    "prodId": "NP00000020",
    "prodNm": "(SKT)집전화정액형100분",
    "skipId": "BD033",
    "skipNm": "(SKT)집전화정액형 100분 공제",
    "unlimit": null,
    "total": "6000",
    "used": "700",
    "remained": "5300",
    "unit": "910",
    "isShow": true,
    "isUnlimit": false
  },
  "sms": {
    "prodId": "NA00006404",
    "prodNm": "5GX프라임",
    "skipId": "DD3GN",
    "skipNm": "SMS/MMS 기본제공",
    "unlimit": "B",
    "total": "기본제공",
    "used": "기본제공",
    "remained": "기본제공",
    "unit": "310",
    "rgstDtm": "",
    "exprDtm": "",
    "isShow": true,
    "isUnlimit": true
  }
};
*/
export default (resp: any, lang: Lang) => {
  if (!resp || (!resp.data && !resp.voice && !resp.sms)) {
    return {
      // 데이터는 로드 됐지만, 보여줄게 없음
      noDisplayData: true,
    };
  }

  let mainRmTextArr: Array<MainRmText>;
  let graphType: GraphType = null;
  let title: TitleType = null;

  // '100GB' | '무제한'
  let mainTotalText = '';
  // 40.5
  let mainRmPct = 0;
  // '100GB' | '무제한'
  let mainRmText = '';

  let isMainDataNumber = false;

  let t가족모아데이터_가입됨 = false;

  // GraphType.DATA
  // 40.5
  let familyDataRmPct = 0;
  // '5GB'
  let familyDataRmText = '';
  // `4시간 53분/기본제공`
  let voiceSmsRmText = '';

  // GraphType.VOICE
  // '기본제공'
  let smsRmText = '';

  if (resp.data?.isShow) {
  }
  let voiceDisplayData;
  let voiceTotalDisplayData;
  if (resp.voice?.isShow || resp.wire?.isShow) {
    const respData = resp.voice?.isShow ? resp.voice : resp.wire;
    voiceDisplayData = voiceToDisplayData(respData.remained, respData.unlimit, lang);
    voiceTotalDisplayData = voiceToDisplayData(respData.total, respData.unlimit, lang);
  }
  let smsDisplayData;
  let smsTotalDisplayData;
  if (resp.sms?.isShow) {
    smsDisplayData = smsToDisplayData(resp.sms.remained, resp.sms.unlimit, lang);
    smsTotalDisplayData = smsToDisplayData(resp.sms.total, resp.sms.unlimit, lang);
  }

  if (resp.tfamilySharing?.isShow) {
    t가족모아데이터_가입됨 = true;
  }
  if (resp.tfamilySharing?.remained) {
    familyDataRmText = kbToDisplayText(resp.tfamilySharing.remained);
  }

  if (resp.data?.isShow) {
    // Data 필드는 unlimit 없고, inUnlimit만 있음
    const dataUnlimit = resp.data.isUnlimit ? '1' : '0';

    graphType = GraphType.DATA;

    title = lang === 'EN' ? TitleType.EN_남은데이터 : TitleType.남은데이터;
    let totalDataGiven: number = 0;
    let totalDataRemain: number = 0;

    // 유제한
    if (!resp.data.isUnlimit) {
      totalDataGiven = parseInt(resp.data.total, 10);
      totalDataRemain = parseInt(resp.data.remained, 10);

      let tfamilySharingRemain = 0;
      // 가족공유 데이터 있음
      if (resp.tfamilySharing?.isShow) {
        const totalTfamilyData = parseInt(resp.tfamilySharing.total, 10);
        tfamilySharingRemain = parseInt(resp.tfamilySharing.remained, 10);

        familyDataRmPct = (tfamilySharingRemain / totalDataGiven) * 100;
      } else {
        familyDataRmPct = 0;
      }
      mainRmPct = ((totalDataRemain - tfamilySharingRemain) / totalDataGiven) * 100;

      isMainDataNumber = true;
    } else {
      mainRmPct = 100;

      // 무제한일 경우 값이 "스마트폰 플러스"등 텍스트로 나올 수 있어 파싱없이 값 할당 해 둔 후 dataToDisplayData통해 레이블 추출
      totalDataGiven = resp.data.total || '';
      totalDataRemain = resp.data.remained || '';

      isMainDataNumber = false;
    }
    const dataTotalDisplay = dataToDisplayData(totalDataGiven, dataUnlimit, lang);
    const dataDisplay = dataToDisplayData(totalDataRemain, dataUnlimit, lang);
    mainRmText = dataDisplay.text;
    mainRmTextArr = dataDisplay.valueAndUnitArr;
    mainTotalText = dataTotalDisplay.text;

    const voiceSmsRmTextArr = [];
    if (resp.voice?.isShow) {
      voiceSmsRmTextArr.push(voiceDisplayData.text);
    }
    if (resp.sms?.isShow) {
      voiceSmsRmTextArr.push(smsDisplayData.text);
    }
    voiceSmsRmText = voiceSmsRmTextArr.join('/');
  } else if (resp.voice?.isShow || resp.wire?.isShow) {
    const respData = resp.voice?.isShow ? resp.voice : resp.wire;

    if (resp.voice?.isShow) {
      graphType = GraphType.VOICE;
    } else {
      graphType = GraphType.WIRE_VOICE;
    }

    title = lang === 'EN' ? TitleType.EN_남은통화 : TitleType.남은통화;

    mainRmText = voiceDisplayData.text;
    mainRmTextArr = voiceDisplayData.valueAndUnitArr;
    mainTotalText = voiceTotalDisplayData.text;
    smsRmText = smsDisplayData?.text || '';

    if (respData.isUnlimit) {
      mainRmPct = 100;
      isMainDataNumber = false;
    } else {
      mainRmPct = (respData.remained / respData.total) * 100;
      isMainDataNumber = true;
    }
  } else if (resp.sms?.isShow) {
    graphType = GraphType.SMS;

    title = lang === 'EN' ? TitleType.EN_남은문자 : TitleType.남은문자;

    mainRmText = smsDisplayData.text;
    mainRmTextArr = smsDisplayData.valueAndUnitArr;
    mainTotalText = smsTotalDisplayData.text;

    if (resp.voice.isUnlimit) {
      mainRmPct = 100;
      isMainDataNumber = false;
    } else {
      mainRmPct = (resp.sms.remained / resp.sms.total) * 100;
      isMainDataNumber = true;
    }
  }

  /*
  mainBalance?: XtrProps,
  가족모아데이터?: XtrProps,
  통화_문자?: XtrProps,
  문자?: XtrProps,
  유선_문자?: XtrProps,
  giftBtn?: XtrProps,
  refillBtn?: XtrProps,
  */
  const xtrAwProps: MyGraphXtrAwProps = {
    mainBalance: {
      appEid: {
        KO: {
          [GraphType.DATA]: 'CMMA_A24-3',
          [GraphType.VOICE]: 'CMMA_A24-8',
          [GraphType.SMS]: 'CMMA_A24-10',
          [GraphType.WIRE_VOICE]: 'CMMA_A24-11',
        },
        EN: {
          [GraphType.DATA]: 'CMMA_A10_B134-3',
          [GraphType.VOICE]: 'CMMA_A10_B134-6',
          [GraphType.SMS]: 'CMMA_A10_B134-8',
          [GraphType.WIRE_VOICE]: 'CMMA_A10_B134-9',
        },
      }[lang][graphType],
      webEid: {
        KO: {
          [GraphType.DATA]: 'MWMA_A24-35',
          [GraphType.VOICE]: 'MWMA_A24-40',
          [GraphType.SMS]: 'MWMA_A24-42',
          [GraphType.WIRE_VOICE]: 'MWMA_A24-43',
        },
        EN: {
          [GraphType.DATA]: 'MWMA_A10_B134-17',
          [GraphType.VOICE]: 'MWMA_A10_B134-20',
          [GraphType.SMS]: 'MWMA_A10_B134-22',
          [GraphType.WIRE_VOICE]: 'MWMA_A10_B134-23',
        },
      }[lang][graphType],
      xtrClick: true,
      xtrView: true,
    },
    가족모아데이터: {
      appEid: {
        KO: 'CMMA_A24-4',
        EN: 'CMMA_A10_B134-4',
      }[lang],
      webEid: {
        KO: 'MWMA_A24-36',
        EN: 'MWMA_A10_B134-18',
      }[lang],
      xtrClick: true,
      xtrView: true,
    },
    통화_문자: {
      appEid: {
        KO: 'CMMA_A24-5',
        EN: 'CMMA_A10_B134-5',
      }[lang],
      webEid: {
        KO: 'MWMA_A24-37',
        EN: 'MWMA_A10_B134-19',
      }[lang],
      xtrClick: true,
      xtrView: true,
    },
    문자: {
      appEid: {
        KO: 'CMMA_A24-9',
        EN: 'CMMA_A10_B134-7',
      }[lang],
      webEid: {
        KO: 'MWMA_A24-41',
        EN: 'MWMA_A10_B134-21',
      }[lang],
      xtrClick: true,
      xtrView: true,
    },
    유선_문자: {
      appEid: 'CMMA_A24-12',
      webEid: 'MWMA_A24-44',
      xtrClick: true,
      xtrView: true,
    },
    refillBtn: {
      appEid: 'CMMA_A24-6',
      webEid: 'MWMA_A24-38',
      xtrClick: true,
      xtrView: true,
    },
    giftBtn: {
      appEid: 'CMMA_A24-7',
      webEid: 'MWMA_A24-39',
      xtrClick: true,
      xtrView: true,
    },
  };

  return {
    graphType,
    title,
    mainRmText,
    mainRmTextArr,
    mainTotalText,
    mainRmPct,
    isMainDataNumber,
    familyDataRmPct,
    familyDataRmText,
    t가족모아데이터_가입됨,
    voiceSmsRmText,
    smsRmText,
    xtrAwProps,
  };
};
