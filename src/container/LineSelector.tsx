import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { ModalLine } from '../components/Modal/ModalLine';
import { AppContext } from '../context/AppContext';
import { MyLineProps } from '../components/My/MyLineManagement';
import myApiRespToDisplayData from '../common/apiRespToDisplayData/my';
import chooseLineApi from '../api/my/chooseLine';
import { callBridgeApi, guessLang, myRedirect, useActiveElement } from '../common/utils';
import { custPwdFailUrl, isApp } from '../js/commonUtil';
import TXT from '../common/i18nMsgs';
import { Lang } from '../common/types';
import focusLoop from '../common/focusLoop';
import useModal from '../hooks/useModal';

export type LineSelectorProps = {
  isOpen?: boolean;
  onClose?: () => void;
};

let _selectedLineInfo;
export default function LineSelector({ isOpen, onClose }: LineSelectorProps) {
  const appContext = useContext(AppContext);

  const [myInfo] = appContext.myInfo;
  const { toast } = appContext;
  const { passwordInfo, lineSelectorPassword } = useModal();

  const [mobileLineList, setMobileLineList] = useState<Array<MyLineProps>>([]);
  const [wiredLineList, setWiredLineList] = useState<Array<MyLineProps>>([]);
  const [selectedLineInfo, setSelectedLineInfo] = useState<any>({});
  const [myDisplayData, setMyDisplayData] = useState<any>(myApiRespToDisplayData(myInfo));

  const onPwClose = useCallback(() => {
    const myDisplayData = myApiRespToDisplayData(myInfo);
    lineSelectorPassword.close();
    setMyDisplayData(myDisplayData);
    setSelectedLineInfo(myDisplayData.선택회선);
  }, [myInfo]);

  const [bottomNavManuallyClosed, setBottomNavManuallyClosed] = useState(false);

  const [lang, setLang] = useState<Lang>('KO');

  const selectedElm = useActiveElement();
  const [lastSelectedElm, setLastSelectedElm] = useState(selectedElm);

  const layerRef = useRef<HTMLElement>(null);

  const generateOnInputComplete = (svcMgmtNum) => (svcPwd) => {
    callChooseLineApi({
      svcMgmtNum,
      svcPwd,
    });
  };

  const onLineSelected = async (lineInfo: MyLineProps) => {
    const msg = `${lineInfo.svcInfo.svcMgmtNum} selected`;
    console.log(msg);
    setSelectedLineInfo(lineInfo);
    _selectedLineInfo = lineInfo;

    /*
    // 일단 비밀번호 없이 요청 후에 chooseLineApi 응답값에서 요청할 경우 비밀번호 입력 팝업 띄움
    if (lineInfo.고객보호_비밀번호_사용) {
      showLineSelectPwLayer({
        lineDisplayData: lineInfo,
        //lineIdText: lineInfo.lineIdText,
        incorrectPwCnt: 0,
        onInputComplete: generateOnInputComplete(lineInfo.svcInfo.svcMgmtNum),
      });

      return;
    }
    */

    callChooseLineApi({
      svcMgmtNum: lineInfo.svcInfo.svcMgmtNum,
    });
  };

  const callChooseLineApi = useCallback(
    async ({ svcMgmtNum, svcPwd }: { svcMgmtNum: string; svcPwd?: string }) => {
      let resp;
      try {
        console.log({ svcMgmtNum, svcPwd });
        resp = await chooseLineApi({
          data: { svcMgmtNum, svcPwd },
        });
      } catch (e) {}

      /*
    respCode: {
      type: JsonSchemaType.NUMBER,
      description:
        ‘CHOOSE_LINE_FAILED = 3014,// 회선변경 실패’ +
        ‘CANNOT_ENTER_PASSWORD = 3015, // 패스워드입력 가능상태(20,21,30) 아님’ +
        ‘NEED_ENTER_PASSWORD = 3016,   // 고객비밀번호 인증 필요’ +
        ‘NEED_UNLOCK_PASSWORD = 3017,  // 고객비밀번호 잠김 해제 필요’ +
        ‘NEED_SET_PASSWORD = 3018,     // 고객비밀번호 설정 필요’ +
        ‘WRONG_PASSWORD_1 = 3019,      // 고객비밀번호 입력 오류 1회’ +
        ‘WRONG_PASSWORD_2 = 3020,      // 고객비밀번호 입력 오류 2회’ +
        ‘WRONG_PASSWORD_3 = 3021,      // 고객비밀번호 입력 오류 3회’ +
        ‘WRONG_PASSWORD_4 = 3022,      // 고객비밀번호 입력 오류 4회’ +
        ‘WRONG_PASSWORD_5 = 3023,      // 고객비밀번호 입력 오류 5회(잠김예정)’ +
        ‘WRONG_PASSWORD_LOCKED = 3024, // 고객비밀번호 입력 오류로 잠김’,
    },
    */

      /*
      // @ts-ignore
      resp = { respCode: !window.test ? 3016 : 3018 + window.test };
      // @ts-ignore
      window.test = window.test ? window.test + 1 : 1;
      */
      switch (resp?.respCode) {
        case 0:
          if (isApp()) {
            callBridgeApi({
              command: 'reloadMainWebView',
            });
            callBridgeApi({
              command: 'reloadMyWebView',
            });
          } else {
            window.location.reload();
          }
          return;
          break;
        case 3014:
          toast.show({ msg: TXT['회선변경에실패했습니다'][lang] });
          break;
        case 3015:
          toast.show({ msg: '패스워드 입력 가능상태 아님' });
          break;
        case 3016:
          //toast.show({ msg: '고객비밀번호 인증 필요' });
          lineSelectorPassword.show({
            lineDisplayData: _selectedLineInfo,
            //lineIdText: lineInfo.lineIdText,
            incorrectPwCnt: 0,
            onInputComplete: generateOnInputComplete(_selectedLineInfo.svcInfo.svcMgmtNum),
            onClose: onPwClose,
          });
          return;
          break;
        case 3017:
          //toast.show({ msg: '고객비밀번호 잠김 해제 필요' });
          myRedirect(custPwdFailUrl(null, lang));
          break;
        case 3018:
          //toast.show({msg: '고객비밀번호 설정 필요'});
          passwordInfo.show({ lang });
          break;
        case 3019:
          //toast.show({msg: '고객비밀번호 입력 오류 1회'});
          lineSelectorPassword.show({
            lineDisplayData: _selectedLineInfo,
            incorrectPwCnt: 1,
            onInputComplete: generateOnInputComplete(_selectedLineInfo.svcInfo.svcMgmtNum),
            onClose: onPwClose,
          });
          return;
          break;
        case 3020:
          lineSelectorPassword.show({
            lineDisplayData: _selectedLineInfo,
            incorrectPwCnt: 2,
            onInputComplete: generateOnInputComplete(_selectedLineInfo.svcInfo.svcMgmtNum),
            onClose: onPwClose,
          });
          //toast.show({msg: '고객비밀번호 입력 오류 2회'});
          return;
          break;
        case 3021:
          //toast.show({msg: '고객비밀번호 입력 오류 3회'});
          lineSelectorPassword.show({
            lineDisplayData: _selectedLineInfo,
            incorrectPwCnt: 3,
            onInputComplete: generateOnInputComplete(_selectedLineInfo.svcInfo.svcMgmtNum),
            onClose: onPwClose,
          });
          return;
          break;
        case 3022:
          //toast.show({msg: '고객비밀번호 입력 오류 4회'});
          lineSelectorPassword.show({
            lineDisplayData: _selectedLineInfo,
            incorrectPwCnt: 4,
            onInputComplete: generateOnInputComplete(_selectedLineInfo.svcInfo.svcMgmtNum),
            onClose: onPwClose,
          });
          return;
          break;
        case 3023:
          //toast.show({msg: '고객비밀번호 입력 오류 5회(잠김예정)'});
          lineSelectorPassword.show({
            lineDisplayData: _selectedLineInfo,
            incorrectPwCnt: 5,
            onInputComplete: generateOnInputComplete(_selectedLineInfo.svcInfo.svcMgmtNum),
            onClose: onPwClose,
          });
          return;
          break;
        case 3024:
          /*
        toast.show({msg: '고객비밀번호 입력 오류로 잠김', delay: 2000});
        setIsLineSelectPwLayerVisible(false);
        */
          myRedirect(custPwdFailUrl(null, lang));
          break;
        default:
          toast.show({ msg: `ERROR ${resp?.respCode || ''}` });
          break;
      }

      // 회선 변경 실패 시 선택 원복
      const myDisplayData = myApiRespToDisplayData(myInfo);
      setSelectedLineInfo(myDisplayData.선택회선);
    },
    [selectedLineInfo],
  );

  useEffect(() => {
    setLang(guessLang());

    setLastSelectedElm(selectedElm);

    if (window.$tw?.bottomNav$api?.isVisible) {
      window.$tw?.bottomNav$api?.hide();
      setBottomNavManuallyClosed(true);
    }

    setTimeout(() => {
      if (layerRef.current) {
        focusLoop.setTargetLayer(layerRef.current);
      }
    }, 100);

    return () => {
      focusLoop.cleanUp();

      setTimeout(() => {
        const openLineSelectorBtn = document.getElementById('openLineSelector');
        if (openLineSelectorBtn) {
          openLineSelectorBtn.focus();
        } else if (lastSelectedElm) {
          lastSelectedElm.focus();
        }
      }, 100);

      if (bottomNavManuallyClosed) {
        window.$tw?.bottomNav$api?.show && window.$tw.bottomNav$api.show();
        setBottomNavManuallyClosed(false);
      }
    };
  }, []);

  useEffect(() => {
    if (!myInfo || !myInfo.allSvcInfo) return;

    const myDisplayData = myApiRespToDisplayData(myInfo);

    setMobileLineList(myDisplayData.mobileLineList);
    setWiredLineList(myDisplayData.wiredLineList);

    setSelectedLineInfo(myDisplayData.선택회선);

    console.log(myDisplayData);
  }, [myInfo, lang]);

  return myInfo ? (
    <ModalLine
      layerRef={layerRef}
      isVisible={isOpen}
      mobileLineList={mobileLineList}
      wiredLineList={wiredLineList}
      unregisteredCnt={myDisplayData.unregisteredCnt}
      selectedLineSvcMgmtNum={selectedLineInfo?.svcInfo?.svcMgmtNum}
      lang={lang}
      onLineSelected={onLineSelected}
      onClose={onClose}
    />
  ) : null;
}
