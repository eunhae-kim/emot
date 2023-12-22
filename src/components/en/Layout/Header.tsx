import React from 'react';

export function Header() {
  return (
    <div className="header">
      <h1>
        <a href="/">
          <span className="hidden">T World</span>
        </a>
      </h1>
      <button type="button">
        <i className="ic-tbar-srch1" />
        <span className="hidden">search</span>
      </button>
    </div>
  );
}
