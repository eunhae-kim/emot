import React from 'react';

export interface LayoutProps {
  addClass: string | null;
  children: React.ReactNode;
}

export function Layout({ children, addClass, ...props }: LayoutProps) {
  return (
    <div className="wrap">
      <main className={`container ${addClass || ''}`}>{children}</main>
    </div>
  );
}
