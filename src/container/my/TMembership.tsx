import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { MyMembership } from '../../components/My/MyMembership';
import tmembershipApiRespToDisplayData from '../../common/apiRespToDisplayData/tmembership';
import tMembershipApi from '../../api/my/tmembership';

const OTB_LIFETIME_IN_SEC = 60 * 20;
const OTB_RENEWABLE_FROM = 60 * 1;
// const OTB_RENEWABLE_FROM = 60 * 19 + 30;

const calcOtbLifetimeLeft = (otpGeneratedAt: number) => {
  const curTime = new Date().valueOf();
  const secElapsed = Math.floor((curTime - otpGeneratedAt) / 1000);
  let lifetimeLeft = OTB_LIFETIME_IN_SEC - secElapsed;
  if (lifetimeLeft < 0) lifetimeLeft = 0;

  return lifetimeLeft;
};

const getApiRespStorageKey = (mbrCardNum) => {
  return `TMBR_${mbrCardNum}`;
};

export default function () {
  const appContext = useContext(AppContext);
  const [myInfo] = appContext.myInfo;

  const [tmembershipDisplayData, setTMembershipDisplayData] = useState(null);
  const [otpGeneratedAt, setOtpGeneratedAt] = useState(0);
  const [otbLifetimeLeft, setOtbLifetimeLeft] = useState(0);
  const [mbrCardNumState, setMbrCardNumState] = useState<string>(null);
  const countdownHandle = useRef<ReturnType<typeof setTimeout>>(null);

  const updateOtbLifetimeLeft = () => {
    clearTimeout(countdownHandle.current);

    const lifetimeLeft = calcOtbLifetimeLeft(otpGeneratedAt);
    setOtbLifetimeLeft(lifetimeLeft);

    if (lifetimeLeft > 0) {
      countdownHandle.current = setTimeout(updateOtbLifetimeLeft, 50);
    }
  };

  const setApiResp = (apiResp: string, otpGeneratedAtParam: number) => {
    const tmpTmembershipDisplayData = tmembershipApiRespToDisplayData(apiResp, myInfo);
    setTMembershipDisplayData(tmpTmembershipDisplayData);

    setOtpGeneratedAt(otpGeneratedAtParam);

    // console.log('tmembership api resp set', apiResp, tmpTmembershipDisplayData, otpGeneratedAtParam);
  };

  useEffect(() => {
    updateOtbLifetimeLeft();
  }, [otpGeneratedAt]);

  const reloadData = useCallback(() => {
    tMembershipApi({
      setter: (tmembershipResp) => {
        if (!tmembershipResp) return;
        const curTime = new Date().valueOf();

        if (mbrCardNumState) {
          sessionStorage.setItem(
            getApiRespStorageKey(mbrCardNumState),
            `${curTime} ${encodeURIComponent(JSON.stringify(tmembershipResp))}`,
          );
        }

        setApiResp(tmembershipResp, curTime);
      },
    });
  }, [mbrCardNumState]);

  useEffect(() => {
    // 로그인 된 사용자 변경 없고 잔여시간이 있다면 재요청 안함
    const { mbrCardNum } = myInfo.svcInfo;
    setMbrCardNumState(mbrCardNum);
  }, []);

  useEffect(() => {
    if (mbrCardNumState === null) return;

    const cache = mbrCardNumState ? sessionStorage.getItem(getApiRespStorageKey(mbrCardNumState)) || '' : '';

    if (cache) {
      const [prevOtpGeneratedAt, prevApiRespEncoded] = cache.split(/ /);
      const prevApiResp = decodeURIComponent(prevApiRespEncoded);

      if (prevOtpGeneratedAt && prevApiResp) {
        const nPrevOtpGeneratedAt = parseInt(prevOtpGeneratedAt, 10);

        const prevApiRespJson = JSON.parse(prevApiResp);
        // 이전에 바코드 정상 생성 이력이 있고 아직 OTP lifetime이 충분히 남아있으면 재활용
        if (prevApiRespJson.otbAvailableYn === 'Y' && calcOtbLifetimeLeft(nPrevOtpGeneratedAt) > OTB_RENEWABLE_FROM) {
          setApiResp(prevApiRespJson, nPrevOtpGeneratedAt);
          return;
        }
      }
    }

    reloadData();
  }, [mbrCardNumState]);

  // console.log(333, reloadData, otbLifetimeLeft, tmembershipDisplayData);
  return tmembershipDisplayData && tmembershipDisplayData.compProps ? (
    <MyMembership
      reloadData={reloadData}
      otbLifetimeLeft={otbLifetimeLeft}
      otbRenewableFrom={OTB_RENEWABLE_FROM}
      {...tmembershipDisplayData.compProps}
    />
  ) : null;
}
