import { useEffect, useState } from 'react';
import { BillsScreenType, CardProps, InquiryExcpetion, InquiryExcpetionType, Lang, TtimeStory } from './types';
import TXT from './i18nMsgs';
import { isApp } from '../js/commonUtil';
import { save as storySaveApi, unsave as storyUnsaveApi } from '../api/ttime/story';

export const isServer = () => typeof window === 'undefined';
export const isLoggedIn = (myInfo) => myInfo && Object.keys(myInfo).length > 0;

export const comma = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
export const commaIfNumber = (x: number | string) => {
  let n: number;
  if (typeof x === 'number') {
    n = x;
  } else if (x.match(/^\d+$/)) {
    n = parseInt(x, 10);
  } else {
    // 숫자로만 이루어진 스트링이 아니라면 그대로 리턴
    return x;
  }

  return comma(n);
};

// unit: 110:원, 140:KB, 240:초, 310:건, 320:건
// export const rmDataToDisplayData = (value: number|string, unlimit:string, unit:string, lang:Lang) => {}

export type ValueAndUnit = {
  v: string;
  unit: string;
};
export type DisplayData = {
  text: string;
  valueAndUnitArr: Array<ValueAndUnit>;
  isValueNumber: boolean;
};

// unlimit: 1:무제한, M:무제한, B:기본제공, 0:유한
export const plainTextToDisplayData = (value: number | string, unlimit: string, lang: Lang): DisplayData => {
  const strValue = `${value}`;

  if (unlimit === '1' || unlimit === 'M') {
    return {
      text: TXT['무제한'][lang],
      valueAndUnitArr: [
        {
          v: TXT['무제한'][lang],
          unit: '',
        },
      ],
      isValueNumber: false,
    };
  }

  if (unlimit === 'B') {
    return {
      text: TXT['기본제공'][lang],
      valueAndUnitArr: [
        {
          v: TXT['기본제공'][lang],
          unit: '',
        },
      ],
      isValueNumber: false,
    };
  }

  // 값이 숫자로 변환 가능한 값이 아니라면 "무제한", "기본제공"등 최종 형태가 들어있는 경우라서 그 값 그대로 이용
  if (strValue !== '' && strValue !== `${+strValue}`) {
    return {
      text: strValue,
      valueAndUnitArr: [
        {
          v: strValue,
          unit: '',
        },
      ],
      isValueNumber: false,
    };
  }

  return null;
};

export const smsToDisplayData = (value: number | string, unlimit: string, lang: Lang): DisplayData => {
  const unlimitResult = plainTextToDisplayData(value, unlimit, lang);
  if (unlimitResult) return unlimitResult;

  const v = parseInt(`${value}`, 10);
  const space = lang === 'EN' ? '\u00A0' : '';
  return {
    text: `${comma(v)}${space}${TXT['문자_건'][lang]}`,
    valueAndUnitArr: [
      {
        v: comma(v),
        unit: TXT['문자_건'][lang],
      },
    ],
    isValueNumber: true,
  };
};

export const secToValueAndUnitArr = (sec: number, lang: Lang): Array<ValueAndUnit> => {
  const h = Math.floor(sec / 60 / 60);
  const m = Math.floor((sec - h * 60 * 60) / 60);
  const s = sec % 60;

  const result = [];
  if (h > 0)
    result.push({
      v: h,
      unit: TXT['시간'][lang],
    });
  if (m > 0)
    result.push({
      v: m,
      unit: TXT['분'][lang],
    });
  if (h === 0 && s > 0)
    result.push({
      v: s,
      unit: TXT['초'][lang],
    });

  if (result.length === 0)
    result.push({
      v: 0,
      unit: TXT['초'][lang],
    });

  return result;
};

export const secToDisplayText = (sec: number, lang: Lang) => {
  const tmp = secToValueAndUnitArr(sec, lang);
  const space = lang === 'EN' ? '\u00A0' : '';
  return tmp.map((t) => `${t.v}${t.unit}`).join(space);
};

export const voiceToDisplayData = (value: number | string, unlimit: string, lang: Lang): DisplayData => {
  const unlimitResult = plainTextToDisplayData(value, unlimit, lang);
  if (unlimitResult) return unlimitResult;

  const v = parseInt(`${value}`, 10);

  return {
    text: secToDisplayText(v, lang),
    valueAndUnitArr: secToValueAndUnitArr(v, lang),
    isValueNumber: true,
  };
};

export const kbToValueAndUnit = (kbParam: number | string) => {
  const kb = parseInt(`${kbParam}`, 10);

  if (kb < 1024) {
    return {
      v: `${comma(Math.floor(kb))}`,
      unit: 'KB',
    };
  }

  const mb = kb / 1024;
  if (mb < 1024) {
    return {
      v: `${comma(Math.floor(mb))}`,
      unit: 'MB',
    };
  }

  // 1000GB부터 소수점 버림
  const gb = mb / 1024;
  if (gb >= 1000) {
    return {
      v: `${comma(Math.floor(gb))}`,
      unit: 'GB',
    };
  }

  // 100이상 1000 미만 소수점 1개 표시
  if (gb >= 100) {
    return {
      v: `${parseFloat(gb.toFixed(1))}`,
      unit: 'GB',
    };
  }
  // 1이상 100 미만 사이 소수점 2개 표시
  return {
    v: `${parseFloat(gb.toFixed(2))}`,
    unit: 'GB',
  };
};

export const kbToDisplayText = (kbParam: number | string) => {
  const t = kbToValueAndUnit(kbParam);
  return `${t.v}${t.unit}`;
};

export const dataToDisplayData = (value: number | string, unlimit: string, lang: Lang) => {
  const unlimitResult = plainTextToDisplayData(value, unlimit, lang);
  if (unlimitResult) return unlimitResult;

  const v = parseInt(`${value}`, 10);
  return {
    text: kbToDisplayText(v),
    valueAndUnitArr: [kbToValueAndUnit(v)],
  };
};

export const callBridgeApi = (req: any) => {
  // @ts-ignore
  const androidTworld = window?.tworld;
  // @ts-ignore
  const iosTworld = window?.webkit?.messageHandlers?.tworld;

  if (androidTworld || iosTworld) {
    try {
      if (androidTworld) {
        androidTworld.postMessage(JSON.stringify(req));
      } else {
        iosTworld.postMessage(req);
      }
    } catch (e) {
      console.error(`Exception from bridge API ${e}`, req);
    }
  } else {
    console.log(`Bridge API not found.`, req);
  }
};

// 2022.12.01 23:45
export const formatYYYYMMDDHHmm = (YYYYMMDDHHmm: string) => {
  if (YYYYMMDDHHmm.length !== 8 && YYYYMMDDHHmm.length !== 12) return YYYYMMDDHHmm;
  if (YYYYMMDDHHmm.length === 12) {
    return `${YYYYMMDDHHmm.substr(0, 4)}.${YYYYMMDDHHmm.substr(4, 2)}.${YYYYMMDDHHmm.substr(
      6,
      2,
    )} ${YYYYMMDDHHmm.substr(8, 2)}:${YYYYMMDDHHmm.substr(10, 2)}`;
  }
  return `${YYYYMMDDHHmm.substr(0, 4)}.${YYYYMMDDHHmm.substr(4, 2)}.${YYYYMMDDHHmm.substr(6, 2)}`;
};

// YYYY. M. D HH:mm 형식  ex)2023. 4. 3 12:00
export const formatYYYYMDHHmm = (YYYYMMDDHHmm: string) => {
  if (YYYYMMDDHHmm.length !== 8 && YYYYMMDDHHmm.length !== 12) return YYYYMMDDHHmm;
  if (YYYYMMDDHHmm.length === 12) {
    return `${YYYYMMDDHHmm.substr(0, 4)}. ${String(parseInt(YYYYMMDDHHmm.substr(4, 2), 10))}. ${String(
      parseInt(YYYYMMDDHHmm.substr(6, 2), 10),
    )} ${YYYYMMDDHHmm.substr(8, 2)}:${YYYYMMDDHHmm.substr(10, 2)}`;
  }
  return `${YYYYMMDDHHmm.substr(0, 4)}. ${String(parseInt(YYYYMMDDHHmm.substr(4, 2), 10))}. ${String(
    parseInt(YYYYMMDDHHmm.substr(6, 2), 10),
  )}`;
};

// 22. 12. 01. 23:45
export const formatDate1 = (YYYYMMDDHHmm: string, dateOnly?: boolean) => {
  if (YYYYMMDDHHmm.length !== 8 && YYYYMMDDHHmm.length !== 12) return YYYYMMDDHHmm;
  if (YYYYMMDDHHmm.length === 12 && !dateOnly) {
    return `${YYYYMMDDHHmm.substr(2, 2)}. ${YYYYMMDDHHmm.substr(4, 2)}. ${YYYYMMDDHHmm.substr(
      6,
      2,
    )}. ${YYYYMMDDHHmm.substr(8, 2)}:${YYYYMMDDHHmm.substr(10, 2)}`;
  }
  return `${YYYYMMDDHHmm.substr(2, 2)}. ${YYYYMMDDHHmm.substr(4, 2)}. ${YYYYMMDDHHmm.substr(6, 2)}.`;
};

export const sleep = (ms: number, result?: any) => {
  return new Promise((resolve) => setTimeout(() => resolve(result), ms));
};

export const guessLang = (pathname?: string): Lang => {
  if (!pathname && isServer()) return 'KO';

  const _pathname = pathname || window.location.pathname;

  const paths = _pathname.split(/\//);
  for (let i = 0; i < Math.min(paths.length, 3); i++) {
    if (paths[i] === 'en') return 'EN';
  }

  return 'KO';
};

export const getBillsScreenType = (myDisplayData: any) => {
  let billsScreenType: BillsScreenType;
  if (!myDisplayData.선택회선) {
    billsScreenType = '준회원';
  } else if (myDisplayData.선택회선.group === 'm') {
    // 무선
    if (myDisplayData.선택회선.svcInfo.svcAttrCd === 'M2') {
      billsScreenType = '무선_PPS';
    } else {
      // 통합청구 관련 분류는 이후에
      billsScreenType = '무선_일반';
    }
  } else if (myDisplayData.선택회선.group === 's') {
    if (myDisplayData.선택회선.svcInfo.actCoClCd === 'B') {
      billsScreenType = '유선_SK브로드밴드';
    } else {
      // 통합청구 관련 분류는 이후에
      billsScreenType = '유선_일반';
    }
  } else {
    // 보안상품 케이스 정의 없어서 유선일반 처리
    billsScreenType = '유선_일반';
  }

  return billsScreenType;
};

export const RespCodeToExceptionType: Record<number, InquiryExcpetionType> = {
  // 1002 : '타임아웃',
  1004: '서비스점검중',
  3003: '조회할수없음_오류',
  3027: '조회할수없음_월제한초과',
  3028: '조회할수없음_항목없음',
  3029: '조회할수없음_요금제변경이력있음',
  3030: '조회할수없음_회선정지이력있음',
  3032: '요금안내서없음',
};

export const getInquiryException = (apiResp: any): InquiryExcpetion => {
  let result: InquiryExcpetion = null;
  // apiResp.respCode = 3028;
  if (!apiResp) {
    result = {
      type: '조회할수없음_미응답',
      apiResp,
    };
  } else if (RespCodeToExceptionType[apiResp?.respCode]) {
    result = {
      type: RespCodeToExceptionType[apiResp.respCode],
      apiResp,
    };
  } else if (apiResp?.respCode !== 0) {
    result = {
      type: '미정의오류',
      apiResp,
    };
  }

  return result;
};
export const getPaidInquiryException = (apiResp: any): InquiryExcpetion => {
  if (apiResp && apiResp.invDt === '') {
    return {
      type: '조회불가없음_신규가입이력없음',
      apiResp,
    };
  }

  return getInquiryException(apiResp);
};

export const toFullUrl = (url: string) => {
  const rxFullUrl = /^https?:\/\//;

  let fullUrl = url;
  if (!rxFullUrl.exec(url)) {
    fullUrl = window.location.origin + url;
  }

  return fullUrl;
};

export const myRedirect = (urlParam: string) => {
  let url = urlParam;
  if (isApp()) {
    url = toFullUrl(url);

    callBridgeApi({
      command: 'closeMyAndOpenUrl',
      params: {
        href: url,
      },
    });
  } else {
    window.location.href = url;
  }
};

export const makeBannerList = (bannerResp, maxCount = 10) => {
  const { M, T, prtyTp } = bannerResp;
  let bannerArray: Array<CardProps> = [];

  let bannerListFromAdmin;
  if (prtyTp === 'M') {
    bannerListFromAdmin = [...M, ...T];
  } else {
    bannerListFromAdmin = [...T, ...M];
  }
  bannerListFromAdmin = bannerListFromAdmin.slice(0, maxCount);

  if (bannerListFromAdmin) {
    bannerListFromAdmin.forEach((banner) => {
      const card = {
        type: banner.tosBnnrId ? 'T' : 'M',
        src: banner.bnnrFilePathNm,
        alt: banner.bnnrImgAltCtt,
        href: banner.imgLinkUrl,
        imgLinkTrgtClCd: banner.imgLinkTrgtClCd,
        oferStcCd: banner.oferStcCd,
        billYn: banner.billYn,
        tosMsgSerNum: banner.tosMsgSerNum,
        tosCmpgnNum: banner.tosCmpgnNum,
        tosCellNum: banner.tosCellNum,
        tosExecSchNum: banner.tosExecSchNum,
      };
      bannerArray.push(card);
    });
  }

  // 230519_TOS 배너 미노출 처리(임시)
  bannerArray = bannerArray.filter((banner) => banner.tosCmpgnNum != '20230518CMP034');
  return bannerArray;
};

export const replaceParamsInString = (format: string, params: Record<string, any>) => {
  if (!params) return format;

  return format.replace(/(\{([^{]+)\})/g, (allM, m1, m2) => {
    return params[m2] || '';
  });
};

export const useActiveElement = () => {
  const [active, setActive] = useState<HTMLElement>(
    typeof document !== 'undefined' ? (document.activeElement as HTMLElement) : null,
  );

  const handleFocusIn = (e) => {
    setActive(document.activeElement as HTMLElement);
  };

  useEffect(() => {
    document.addEventListener('focusin', handleFocusIn);
    return () => {
      document.removeEventListener('focusin', handleFocusIn);
    };
  }, []);

  return active;
};

export function useChecksum(value) {
  const [checksum, setChecksum] = useState(0);

  useEffect(() => {
    setChecksum((v) => v + 1);
  }, [value]);

  return checksum;
}

export function sortArrayBy(list: Array<any>, key: string, descOrder: boolean) {
  list.sort((a, b) => {
    const valueA = a[key];
    const valueB = b[key];

    let diff = 0;
    if (valueA > valueB) diff = 1;
    else if (valueA < valueB) diff = -1;

    return descOrder ? diff * -1 : diff;
  });
}

export const ttimeOnSaveClick = async (
  storyId: number,
  storyListParam: Array<TtimeStory>,
  setRawStoryList: (arr) => void,
) => {
  const storyList = storyListParam.slice(0);
  // 일단 화면에 표시
  const storyData = storyList.find((story) => story.id === storyId);
  if (storyData) {
    if (storyData.savedYn === 'Y') {
      storyData.savedYn = 'N';
    } else {
      storyData.savedYn = 'Y';
    }

    const targetApi = storyData.savedYn === 'Y' ? storySaveApi : storyUnsaveApi;
    try {
      await targetApi({
        rid: {
          storyId,
        },
      });

      // 성공 시 뷰에 반영
      setRawStoryList(storyList);
    } catch (e) {
      console.log(`failed to call ${targetApi}`);
    }
  }
  return null;
};

export const genLoginInfo = (myInfo) => {
  if (!myInfo) {
    return 'N';
  }

  const loginYn = Object.keys(myInfo).length > 0;

  if (loginYn) {
    return myInfo.svcInfo.loginType;
  }
  return 'N';
};

export const isCheckFromWidgetParam = () => {
  const params = new URL(window.location.href).searchParams;
  return !!params.get('fromWidget');
};
