import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { TtimeLayout } from '../../components/Layout/TtimeLayout';
import TtimeStoryListCont from '../../container/ttime/TtimeStroyListCont';
import { CollectStories, Tab, TabList } from '../../components/Ttime/CollectStories';
import XtrAw from '../../components/Common/XtrAw';
import V6Link from '../../components/Common/V6Link';
import useTtimeContext from '../../hooks/useTtimeContext';
import { TtimeStory } from '../../common/types';

const genIdListToStoryList = (idList: Array<number>) => (storyList: Array<TtimeStory>) => {
  // id 목록으로 스토리 목록을 생성. 없는 id는 undefined 항목으로 나오니 제거
  return idList.map((id) => storyList.find((v) => v.id === id)).filter((v) => v);
};
export default function TtimeMyStoriesPage() {
  const [selectedTab, setSelectedTab] = useState<Tab>(null);
  const [storyListConverter, setStoryListConverter] = useState<(storyList) => Array<TtimeStory>>(undefined);
  const [storyFilter, setStoryFilter] = useState<(story) => boolean>(undefined);
  const { ttimeUserInfo } = useTtimeContext();

  const router = useRouter();
  const { tabId = 'saved' } = router.query;

  useEffect(() => {
    setSelectedTab(TabList.find((tab) => tab.id === tabId) || TabList[0]);
  }, []);

  useEffect(() => {
    if (!ttimeUserInfo?.stories) return;

    switch (selectedTab?.id) {
      case 'saved':
        setStoryListConverter(() => genIdListToStoryList(ttimeUserInfo.stories.save));
        setStoryFilter(() => (story) => story?.savedYn === 'Y');
        break;
      case 'read':
        setStoryListConverter(() => genIdListToStoryList(ttimeUserInfo.stories.read));
        setStoryFilter(() => (story) => story?.readYn === 'Y');
        break;
      default:
    }
  }, [JSON.stringify(selectedTab), JSON.stringify(ttimeUserInfo)]);

  return (
    <TtimeLayout headerConfig={{ title: '이야기 모아 보기' }}>
      <div className="tTime-container collect-stories-container">
        <CollectStories
          selectedTab={selectedTab}
          onTabChanged={(tab) => {
            setSelectedTab(tab);
            router && router.replace(`${router.pathname}?tabId=${tab.id}`, undefined, { shallow: true });
          }}
        />
        {storyListConverter && (
          <TtimeStoryListCont
            useSort={false}
            showListHeader={false}
            showStoryCountHeader
            storyListConverter={storyListConverter}
            storyFilter={storyFilter}
            useStoryNotFoundScreen={1}
            hideSaveBtn={selectedTab?.id === 'saved'}
            storyListType={selectedTab?.id as 'saved' | 'read'}
          />
        )}
        <div className="enjoy-more-ttime-btn-area">
          <XtrAw appEid="" webEid="" xtrClick xtrView className="btn-area">
            <V6Link href="main">
              <div className="link-rounded-large">T 타임 더 즐기러 가기</div>
            </V6Link>
          </XtrAw>
        </div>
      </div>
    </TtimeLayout>
  );
}
