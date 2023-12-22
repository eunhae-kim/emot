/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-danger */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { ImageRounded } from '../Picture/ImageRounded';
import { LinkRounded } from '../Link/LinkRounded';

export interface ListProps {
  href: string;
  name: string;
  desc: string;
  src: string;
  alt: string;
}

export interface RankingProps {
  name: string;
  list: Array<ListProps>;
}
export interface MainItemBoxProps {
  title: string;
  linkName: string;
  ranking: Array<RankingProps>;
}

export function MainRankingContent({ title, ranking, linkName }: MainItemBoxProps) {
  console.log(JSON.stringify(ranking));
  const [toggleState, setToggleState] = useState(0);
  const toggleTab = (index: number) => {
    // 웹접근성 포커스 이동 작업 할 것
    setToggleState(index);
  };
  return (
    <article className="card-main-content">
      <h2 dangerouslySetInnerHTML={{ __html: title }} />
      <ul className="card-tab-item">
        {ranking.map((obj, index: number) => (
          <li key={index}>
            <button type="button" className={toggleState === index ? 'active' : null} onClick={() => toggleTab(index)}>
              {obj.name}
            </button>
          </li>
        ))}
      </ul>

      {ranking.map((objs, index: number) => (
        <ul key={index} className={`card-tab-area ${toggleState === index ? 'active' : ''}`}>
          {/* active = null 적용 시 문자열 */}
          {objs.list.map((obj, i: number) => (
            <li key={i}>
              <a href={obj.href}>
                <ImageRounded src={obj.src} alt={obj.alt} width="90" height="60" />
                <span>
                  <strong>
                    <em>{i + 1}</em>
                    {obj.name}
                  </strong>
                  <p dangerouslySetInnerHTML={{ __html: obj.desc }} />
                </span>
              </a>
            </li>
          ))}
        </ul>
      ))}

      <LinkRounded to="/" size="large" label={linkName} />
    </article>
  );
}
