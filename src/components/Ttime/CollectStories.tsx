import React, { useEffect, useState } from 'react';
import XtrAw from '../Common/XtrAw';

export type Tab = { id: string; label: string };

export const TabList: Array<Tab> = [
  { id: 'saved', label: '저장한 이야기' },
  { id: 'read', label: '다 읽은 이야기' },
];

export interface CollectStoriesProps {
  selectedTab: Tab;
  children?: React.ReactNode;
  onTabChanged?: (Tab) => void;
}

export function CollectStories({ children, selectedTab, onTabChanged = () => {} }: CollectStoriesProps) {
  return (
    <article className="collect-stories-content">
      {/* 탭 카테고리 */}
      <div className="card-tab-wrap">
        <ul className="card-tab-item" role="tablist">
          {TabList?.map((tab, index: number) => (
            <li key={tab.id} role="presentation">
              <XtrAw
                as="button"
                xtrClick
                xtrView
                type="button"
                className={tab.id === selectedTab?.id ? 'active' : null}
                onClick={() => onTabChanged(tab)}
                role="tab"
                id={`tab_panel${index}`}
                aria-controls={`tab_content${index}`}
                aria-selected={tab.id === selectedTab?.id}
              >
                {tab.label}
              </XtrAw>
            </li>
          ))}
        </ul>
      </div>

      {/* 탭 컨텐츠 */}
      <div aria-labelledby={`tab_panel_${selectedTab?.id}`} id={`tab_content_${selectedTab?.id}`}>
        {children}
      </div>
    </article>
  );
}
