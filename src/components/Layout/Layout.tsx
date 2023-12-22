import React from 'react';

export interface LayoutProps {
  addClass: string | null;
  children: React.ReactNode;
}

export function Layout({ children, addClass, ...props }: LayoutProps) {
  return (
    <div className="wrap">
      {/* 2023-01-13 웹접근성 - skip nav */}
      <div id="skipNav" className="skip-navi">
        <a href="#contents">본문 바로가기</a>
      </div>
      {/*  // 웹접근성 - skip nav */}
      <main className={`container ${addClass || ''}`} id="contents">
        {children}
      </main>
    </div>
  );
}
