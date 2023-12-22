import React, { useEffect, useState } from 'react';
import { ImageRounded } from '../Picture/ImageRounded';
import { LinkRounded } from '../Link/LinkRounded';
import XtrAw from '../Common/XtrAw';
import V6Link from '../Common/V6Link';
import { BASE_PATH } from '../../common/const';

export interface TtimeListProps {
  tTimeList: any;
}

export function TtimeListContent({ tTimeList }: TtimeListProps) {
  const categoryList = Object.keys(tTimeList);
  const [toggleState, setToggleState] = useState(0);

  let tabList = null;
  useEffect(() => {
    tabList = document.querySelector('.card-tab-item');
  });

  const lineMove = (index: number) => {
    const line = tabList.querySelector('.line');
    const list = tabList.querySelectorAll('li');
    const target = list[index];

    line.style.left = `${target.offsetLeft}px`;
    line.style.width = `${target.offsetWidth}px`;
  };

  const toggleTab = (index: number) => {
    setToggleState(index);
    lineMove(index);
  };

  return (
    <article className="card-main-content tTime-list">
      {/* T-time 카테고리 */}
      <div className="card-tab-wrap">
        <ul className="card-tab-item horizontal-scroll" role="tablist">
          {categoryList?.map((category, index: number) => (
            <li key={index} role="presentation">
              <XtrAw
                as={'button'}
                xtrClick={true}
                xtrView={true}
                type="button"
                className={toggleState === index ? 'active' : null}
                onClick={() => toggleTab(index)}
                role="tab"
                id={`tab_panel${index}`}
                aria-controls={`tab_content${index}`}
                aria-selected={toggleState === index}
              >
                {tTimeList[category].categoryName}
              </XtrAw>
            </li>
          ))}
          <i className="line" />
        </ul>
      </div>

      {/* 티백 콘텐츠 리스트 */}
      {categoryList?.map((category, index: number) => (
        <>
          <ul
            key={index}
            className={`card-tab-area ${toggleState === index ? 'active' : ''}`}
            role="tabpanel"
            aria-labelledby={`tab_panel${index}`}
            id={`tab_content${index}`}
          >
            <h3 className="hidden">{tTimeList[category].categoryName}</h3>
            {tTimeList[category]?.productList?.map((product: any, index: number) => (
              <>
                {/* 티백 콘텐츠 리스트 */}
                <li key={`teabag${index}`}>
                  <V6Link>
                    <XtrAw as={'div'} xtrClick={true} xtrView={true} className="tbumb-item" onClick={() => {}}>
                      <div>
                        <em>{product.tag1}</em>
                        <em>{product.tag2}</em>
                        <strong>{product.name}</strong>
                        <span>{product.time}분 소요</span>
                      </div>
                      <ImageRounded src={product.imageUrl} width="95" height="90" alt="" />{' '}
                    </XtrAw>
                  </V6Link>
                </li>

                {/* 리워드 띠배너 */}
                {index === Math.floor(tTimeList[category]?.productList.length / 2) - 1 && (
                  <li key={`banner${index}`} className="banner-area">
                    <a href="#none">
                      <img src={`${BASE_PATH}/images/banner/tTimeList-banner.jpg`} alt="" width="100%" />
                    </a>
                  </li>
                )}
              </>
            ))}
          </ul>
        </>
      ))}

      <XtrAw as={'div'} xtrClick={true} xtrView={true} onClick={() => {}}>
        <LinkRounded to={``} size="large" label={'더 보기'} />
      </XtrAw>
    </article>
  );
}
