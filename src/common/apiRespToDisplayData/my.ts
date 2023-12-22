import { LineIcon, MyLineProps } from '../../components/My/MyLineManagement';
import { guessLang, isLoggedIn } from '../utils';
import { getDisplayName, getDisplayNameForLineSelector, getDisplayNumber } from '../../js/commonUtil';
import { MyJoinInfoProps } from '../../components/My/MyJoinInfo';
import { Icon } from '../../components/consts';
import { Lang } from '../types';

// {"svcInfo":{"svcMgmtNum":"7043577400","xtSvcMgmtNum":"","svcNum":"01086**17**","svcGr":"P","svcAttrCd":"M2","repSvcYn":"Y","pwdStCd":"","nickNm":"","prodId":"NA00002521","prodNm":"POC PPS일반요금제","addr":"","actRepYn":"Y","smsUsableYn":"Y","motpUsableYn":"","svcStCd":"AC","eqpMdlNm":"갤*************","eqpMdlCd":"SSUE","svcScrbDt":"********","svcLastUpdDtm":"20210119135600","userId":"wangdoragi@naver.com","xtUserId":"01c113bef62d07e665c0d464ea41475262516e547bada80aca4600b4f09686f7","totalSvcCnt":"1","expsSvcCnt":"1","mbrNm":"김*범","twdAdRcvAgreeYn":"N","twdInfoRcvAgreeYn":"N","twdLocUseAgreeYn":"N","tplaceUseAgreeYn":"Y","loginType":"T","mbrChlId":"CA033A32AE7A427C9214D3A800ED447C20221111165920","age":61,"isAdult":true,"oriRmk":"갤럭시S5 광대역LTE-A","oriEqpMdlNm":"S*******","sex":"M","custNum":"9610447806","beqpMktgDt":"","mbrCardGrCd":"","mbrCardBenfTypCd":"","dupScrbInfo":"MC0GCCqGSIb3DQIJAyEAjCQbeGKJ6OWWldRbxJegu8zu/u3WCnqPINB3N5ZQPmM=","xtInfo":{"XTLID":"02463b7664b8292bc5ca5a2bde69e66e","XTUID":"02463b7664b8292bc5ca5a2bde69e66e","XTLOGINID":"01c113bef62d07e665c0d464ea41475262516e547bada80aca4600b4f09686f7","XTSVCGR":"P"},"expsSeq":"1","coClCd":"T","acntNum":"6045007643","actCoClCd":"T","mbrCardNum":"","mbrCustNum":"","childSvcCnt":"0","selectableExpsSvcCnt":"1"},"tfamilySharingProdYn":"N","allSvcInfo":{"mbrChlId":"CA033A32AE7A427C9214D3A800ED447C20221111165920","userId":"wangdoragi@naver.com","xtUserId":"01c113bef62d07e665c0d464ea41475262516e547bada80aca4600b4f09686f7","dupScrbInfo":"MC0GCCqGSIb3DQIJAyEAjCQbeGKJ6OWWldRbxJegu8zu/u3WCnqPINB3N5ZQPmM=","totalSvcCnt":"1","expsSvcCnt":"1","m":[{"svcMgmtNum":"7043577400","xtSvcMgmtNum":"","svcNum":"01086**17**","svcGr":"P","svcAttrCd":"M2","expsSeq":"1","repSvcYn":"Y","pwdStCd":"","nickNm":"","prodId":"NA00002521","prodNm":"POC PPS일반요금제","addr":"","eqpMdlCd":"SSUE","eqpMdlNm":"갤*************","oriEqpMdlNm":"S*******","oriRmk":"갤럭시S5 광대역LTE-A","smsUsableYn":"Y","svcStCd":"AC","coClCd":"T","svcScrbDt":"********","svcLastUpdDtm":"20210119135600","custNum":"9610447806","acntNum":"6045007643","actRepYn":"Y","actCoClCd":"T","mbrCardNum":"","mbrCustNum":"","mbrCardGrCd":"","mbrCardBenfTypCd":""}],"s":[]},"childInfo":[]}

export type LineList = {
  mainLine: MyLineProps;
  mobileLineList: Array<MyLineProps>;
  wiredLineList: Array<MyLineProps>;
  securityLineList: Array<MyLineProps>;
};

export const svcInfoToMyLineProps = (svcInfo: any, group: string, lang: Lang) => {
  const lineLabel = getDisplayNameForLineSelector(svcInfo, lang);
  const lineIdText = getDisplayNumber(svcInfo);
  const is기준 = svcInfo.repSvcYn === 'Y'; // 기준회선
  const 고객보호_비밀번호_사용 = svcInfo.pwdStCd === '20' || svcInfo.pwdStCd === '21' || svcInfo.pwdStCd === '30';

  let icon: LineIcon;
  if (svcInfo.svcAttrCd === 'S1') {
    icon = LineIcon.인터넷;
  } else if (svcInfo.svcAttrCd === 'S2') {
    icon = LineIcon.IPTV;
  } else if (svcInfo.svcAttrCd === 'S3') {
    icon = LineIcon.집전화;
  } else {
    icon = LineIcon.모바일;
  }

  return {
    lineLabel,
    // 무선: 모자이크 된 전화 번호, 유선: 모자이크 된 주소
    lineIdText,
    icon,
    is기준,
    고객보호_비밀번호_사용,
    // is자녀?: boolean;,
    group,
    svcInfo,
  };
};

export default (myInfo: any, lang?: Lang) => {
  lang = lang || guessLang();

  if (!isLoggedIn(myInfo)) {
    return {
      기준회선: null,
      선택회선: null,
      hasMultiLine: false,
      mobileLineList: [],
      wiredLineList: [],
    };
  }

  const mSvcList = myInfo.allSvcInfo?.m || [];
  const sSvcList = myInfo.allSvcInfo?.s || [];
  const securitySvcList = myInfo.allSvcInfo?.o || [];
  const childSvcList = myInfo.childInfo || [];

  const unregisteredCnt = +myInfo.svcInfo.notExpsSvcCnt || 0;

  const childLineList = childSvcList
    .map((svcInfo) => svcInfoToMyLineProps(svcInfo, 'm', lang))
    .map((lineInfo) => ({ ...lineInfo, is자녀: true })) as [MyLineProps];
  const mobileLineList = [...mSvcList.map((svcInfo) => svcInfoToMyLineProps(svcInfo, 'm', lang)), ...childLineList];
  const wiredLineList = sSvcList.map((svcInfo) => svcInfoToMyLineProps(svcInfo, 's', lang));
  const securityLineList = securitySvcList.map((svcInfo) => svcInfoToMyLineProps(svcInfo, 'o', lang));

  const allSvcList = [...mobileLineList, ...wiredLineList, ...securityLineList].map((lineInfo) => {
    if (lineInfo.svcInfo.svcMgmtNum === myInfo.svcInfo.svcMgmtNum) {
      lineInfo.is선택 = true;
    }
    return lineInfo;
  }) as [MyLineProps];

  const 기준회선 = allSvcList.find((info) => info.is기준);

  // 상품명 영문 처리등은 svcInfo에만 되어 있어서 allSvcInfo가 아닌 svcInfo를 직접 가져와서 사용
  let 선택회선 = allSvcList.find((info) => info.is선택);

  try {
    // myInfo.allSvcInfo 필드가 없거나 선택 회선이 없는 장애 상황 대응 방어 코드
    if (!선택회선 && myInfo.svcInfo?.expsSvcCnt > 0) {
      선택회선 = svcInfoToMyLineProps(
        myInfo.svcInfo,
        myInfo.svcInfo?.svcAttrCd ? myInfo.svcInfo.svcAttrCd.substr(0, 1).toLowerCase() : '',
        lang,
      );
    }
  } catch (e) {
    console.log(`회선정보오류:`, e);
  }

  if (선택회선) {
    선택회선.svcInfo = myInfo.svcInfo;
  }

  const getLineCount = () => {
    if (lang === 'KO') {
      // 국문은 모든 회선 카운트
      return mobileLineList.length + wiredLineList.length;
    }
    // 영문은 자녀회선 및 유선 카운트 안함
    return mobileLineList.filter((lineInfo) => !lineInfo.is자녀).length;
  };

  const lineCount = getLineCount();

  const hasMultiLine = lineCount > 1;

  const wiredContractsDisplayProps = {
    joinTitle: '인터넷/전화/IPTV 가입 정보',
    itemList: [],
  } as MyJoinInfoProps;
  let appEid;
  let webEid;
  sSvcList.forEach((svcInfo) => {
    let icon;
    let name;
    if (svcInfo.svcAttrCd === 'S1') {
      icon = Icon.INTERNET;
      name = '인터넷';
      appEid = 'CMMA_A24-29';
      webEid = 'MWMA_A24-61';
    } else if (svcInfo.svcAttrCd === 'S2') {
      icon = Icon.IP_TV;
      name = 'IPTV';
      appEid = 'CMMA_A24-31';
      webEid = 'MWMA_A24-63';
    } else if (svcInfo.svcAttrCd === 'S3') {
      icon = Icon.TELEPHONE;
      name = '전화';
      appEid = 'CMMA_A24-30';
      webEid = 'MWMA_A24-62';
    }
    wiredContractsDisplayProps.itemList.push({
      icon,
      name,
      text: svcInfo.prodNm,
      link: `/myt-join/submain`,
      svcInfo,
      xtrAwProps: {
        appEid,
        webEid,
        xtrView: true,
        xtrClick: true,
      },
    });
  });
  securitySvcList.forEach((svcInfo) => {
    wiredContractsDisplayProps.itemList.push({
      icon: Icon.SECURITY,
      name: '보안',
      text: svcInfo.prodNm,
      link: `/myt-join/submain`,
      svcInfo,
      xtrAwProps: {
        appEid: 'CMMA_A24-32',
        webEid: 'MWMA_A24-64',
        xtrView: true,
        xtrClick: true,
      },
    });
  });

  return {
    기준회선,
    선택회선,
    unregisteredCnt,
    hasMultiLine,
    mobileLineList,
    wiredLineList,
    securityLineList,
    lineCount,
    wiredContractsDisplayProps,
  };
};
