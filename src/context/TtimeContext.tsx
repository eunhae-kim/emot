import React, { createContext, useContext, useEffect, useState } from 'react';
import getTtimeUserInfo from '../api/ttime/user';
import { AppContext } from './AppContext';
import { list as storyListApi } from '../api/ttime/story';
import { getCups as cupListApi } from '../api/ttime/cups';

interface MyTtime {
  userName: string;
  onboardingYn: 'Y' | 'N';
  stories: {
    read: number[];
    save: number[];
  };
  cups: {
    own: number[];
    popup: number[];
  };
}

interface TtimeContext {
  ttimeUserInfo: MyTtime;
  fetchTtimeData: () => void;
}

export const TtimeContext = createContext<TtimeContext>({
  ttimeUserInfo: {
    userName: null,
    onboardingYn: null,
    stories: {
      read: [],
      save: [],
    },
    cups: {
      own: [],
      popup: [],
    },
  },
  fetchTtimeData: () => {},
});

export const TtimeProvider = ({ children }) => {
  const appContext = useContext(AppContext);
  const loginInfo = appContext.loginInfo;
  const [myTtime, setMyTtime] = useState<MyTtime>({
    userName: null,
    onboardingYn: null,
    stories: {
      read: [],
      save: [],
    },
    cups: {
      own: [],
      popup: [],
    },
  });

  function filterStories(userData, stories) {
    const filteredRead = userData.read.filter((storyId) => stories.some((story) => story.id === storyId));
    const filteredSave = userData.save.filter((storyId) => stories.some((story) => story.id === storyId));

    return {
      read: filteredRead,
      save: filteredSave,
    };
  }

  function filterCups(userData, cups) {
    const filteredOwn = userData.own.filter((id) => cups.some((cup) => cup.id === id));
    const filteredPopup = userData.popup.filter((id) => cups.some((cup) => cup.id === id));

    return {
      own: filteredOwn,
      popup: filteredPopup,
    };
  }

  const fetchTtimeData = async () => {
    try {
      if (loginInfo === 'T') {
        const tTimeUserInfo = await getTtimeUserInfo();
        const storyList = await storyListApi();
        const cupList = await cupListApi();
        const filteredStories = filterStories(tTimeUserInfo.data.userInfo.stories, storyList.data.storyList);
        const filteredCup = filterCups(tTimeUserInfo.data.userInfo.cups, cupList.data.cupList);

        let myTtimeInfo = tTimeUserInfo.data.userInfo;
        myTtimeInfo.stories = filteredStories;
        myTtimeInfo.stories.save.reverse();
        myTtimeInfo.stories.read.reverse();
        myTtimeInfo.cups = filteredCup;

        setMyTtime(myTtimeInfo);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchTtimeData();
  }, [loginInfo]);

  return <TtimeContext.Provider value={{ ttimeUserInfo: myTtime, fetchTtimeData }}>{children}</TtimeContext.Provider>;
};
