import React, { useState, createContext, SetStateAction, Dispatch } from 'react';
import _ from 'lodash';
import { BottomNavProps } from '../components/Fullmenu/NavBottom';
import netfunnel, { V6NetfunnelWrapper } from '../common/v6NetfunnelWrapper';
import { callBridgeApi, genLoginInfo } from '../common/utils';
import { LoginType } from '../common/types';

export type ShowToastOptionsParam = {
  msg: string;
  delay?: number;
};

export type OnBackHandler = {
  handlerName: string;
  handlerFunction: () => void;
};

export interface AppContextType {
  myInfoLoaded: [boolean, Dispatch<SetStateAction<boolean>>];
  myInfo: any;
  loginInfo: LoginType;
  encryptSsoId: [string, Dispatch<SetStateAction<string>>];
  isMyWebview: [boolean, Dispatch<SetStateAction<boolean>>];
  isUnlimit: [boolean, Dispatch<SetStateAction<boolean>>];
  mccCode: [string, Dispatch<SetStateAction<string>>];
  isWifi: [boolean, Dispatch<SetStateAction<boolean>>];
  language: [string, Dispatch<SetStateAction<string>>];
  getMccCode: () => void;
  getNetworkType: () => void;
  onBackHandlers: [Array<OnBackHandler>, Dispatch<SetStateAction<Array<OnBackHandler>>>];
  addToOnBackHandlers: (OnBackHandler) => void;
  removeFromOnBackHandlers: (OnBackHandler) => void;
  netfunnel: V6NetfunnelWrapper;
  v5BaseUrl: [string, Dispatch<SetStateAction<string>>];
  toast: {
    isVisible: [boolean, Dispatch<SetStateAction<boolean>>];
    params: [string, Dispatch<SetStateAction<string>>];
    show: (ShowToastOptionsParam) => void;
  };
  bottomNav: {
    compProps: [BottomNavProps, Dispatch<SetStateAction<BottomNavProps>>];
  };
  toastMsg: [string, Dispatch<SetStateAction<string>>];
  showToastMsg: [boolean, Dispatch<SetStateAction<boolean>>];
  userType: ['regularUser' | 'noLineUser' | 'notSKTUser', Dispatch<SetStateAction<string>>];
}

export const AppContext = createContext<AppContextType>(null);

export function AppProvider({ children, pageProps }) {
  const [myInfoLoaded, setMyInfoLoaded] = useState<boolean>(true);
  const [myInfo, setMyInfo] = useState<any>(pageProps?.myInfo);
  const [isMyWebview, setIsMyWebview] = useState<boolean>(false);
  const [isUnlimit, setIsUnlimit] = useState<boolean>(false);
  const [mccCode, setMccCode] = useState<string>('450');
  const [isWifi, setIsWifi] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>('KO');
  const [encryptSsoId, setEncryptSsoId] = useState<string | null>(null);
  const [onBackHandlers, setOnBackHandlers] = useState<Array<OnBackHandler>>([]);
  const addToOnBackHandlers = (onBackHandler: OnBackHandler) => {
    onBackHandlers.push(onBackHandler);
    setOnBackHandlers(onBackHandlers);
  };
  const removeFromOnBackHandlers = (handlerName: string) => {
    const index = _.findIndex(onBackHandlers, (handler) => handler.handlerName === handlerName);
    if (index > -1) {
      onBackHandlers.splice(index, 1);
    }
    setOnBackHandlers(onBackHandlers);
  };

  // console.log('pageProps_:', pageProps);

  // Mcc Code읽어오는 Bridge API
  const getMccCode = () => {
    callBridgeApi({
      command: 'getMcc',
      callback: 'onGetMcc',
    });
  };

  // 네트워크 Type 읽어오는 Bridge API
  const getNetworkType = () => {
    callBridgeApi({
      command: 'getNetwork',
      callback: 'onGetNetwork',
    });
  };

  // 바텀 네비
  const [bottomNav_compProps, bottomNav_setCompProps] = useState<BottomNavProps>(null);

  // 토스트 관련
  const [toastMsg, setToastMsg] = useState<string>('');
  const [showToastMsg, setShowToastMsg] = useState<boolean>(false);
  const showToast = ({ msg, delay = 1000 }: ShowToastOptionsParam) => {
    setToastMsg(msg);
    setShowToastMsg(true);
    setTimeout(() => setShowToastMsg(false), delay);
  };

  const [v5BaseUrl, setV5BaseUrl] = useState<string>('/');
  const [userType, setUserType] = useState(pageProps?.userType);
  const loginInfo = genLoginInfo(myInfo);

  return (
    <AppContext.Provider
      value={{
        myInfoLoaded: [myInfoLoaded, setMyInfoLoaded],
        myInfo: [myInfo, setMyInfo],
        loginInfo,
        isMyWebview: [isMyWebview, setIsMyWebview],
        isUnlimit: [isUnlimit, setIsUnlimit],
        mccCode: [mccCode, setMccCode],
        isWifi: [isWifi, setIsWifi],
        language: [language, setLanguage],
        encryptSsoId: [encryptSsoId, setEncryptSsoId],
        getNetworkType,
        getMccCode,
        netfunnel,
        onBackHandlers: [onBackHandlers, setOnBackHandlers],
        addToOnBackHandlers,
        removeFromOnBackHandlers,
        bottomNav: {
          compProps: [bottomNav_compProps, bottomNav_setCompProps],
        },
        toast: {
          isVisible: [showToastMsg, setShowToastMsg],
          params: [toastMsg, setToastMsg],
          show: showToast,
        },
        v5BaseUrl: [v5BaseUrl, setV5BaseUrl],
        toastMsg: [toastMsg, setToastMsg],
        showToastMsg: [showToastMsg, setShowToastMsg],
        userType: [userType, setUserType],
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
