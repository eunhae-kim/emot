import React, { useEffect, useState } from 'react';
import { getHotAndNew } from '../../api/main';
import { MainCardPick } from '../../components/Main/MainCardPick';

export function HotAndNew() {
  const [rankList, setRankList] = useState(null);

  useEffect(() => {
    (async () => {
      const hotAndNew = [
        { list: [], xtr: [] },
        { list: [], xtr: [] },
      ];

      const response = await getHotAndNew();

      // hotAndNew list와 xtr code 하드코딩
      if (response?.hotNewList) {
        hotAndNew[0].list = [
          response?.hotNewList?.A[0],
          response?.hotNewList?.B[1],
          response?.hotNewList?.B[0],
          response?.hotNewList?.A[1],
        ];
        hotAndNew[0].xtr = [
          { app: 75, web: 157 },
          { app: 80, web: 162 },
          { app: 79, web: 161 },
          { app: 76, web: 158 },
        ];
        hotAndNew[1].list = [
          response?.hotNewList?.A[2],
          response?.hotNewList?.B[3],
          response?.hotNewList?.B[2],
          response?.hotNewList?.A[3],
        ];
        hotAndNew[1].xtr = [
          { app: 77, web: 159 },
          { app: 82, web: 164 },
          { app: 81, web: 163 },
          { app: 78, web: 160 },
        ];
        setRankList(hotAndNew);
      }
    })();
  }, []);

  return rankList && rankList.length > 0 && <MainCardPick rankList={rankList} />;
}
