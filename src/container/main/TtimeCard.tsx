import React, { useEffect } from 'react';
import _ from 'lodash';
import { MainTtimeContent } from '../../components/Main/MainTtimeContent';
import { TtimeStory } from '../../common/types';

interface TtimeCardProps {
  ttimeStory: TtimeStory[];
}
function ttimeCard({ ttimeStory }: TtimeCardProps) {
  const [ttimeStoryList, setTtimeStoryList] = React.useState<TtimeStory[]>([]);

  useEffect(() => {
    // 노출순위 기준으로 sort
    const sortedStory = _.sortBy(ttimeStory, ['sequence']);

    // 최대 3개까지 노출을 위한 slice 및 state 저장
    setTtimeStoryList(sortedStory.slice(0, 3));
  }, [ttimeStory]);

  return <MainTtimeContent ttimeStoryList={ttimeStoryList} />;
}

export const TtimeCard = React.memo(ttimeCard);
