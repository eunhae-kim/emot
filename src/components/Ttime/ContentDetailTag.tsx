import React from 'react';

export interface ContentDetailTagProps {
  tags: string[];
}

export function ContentDetailTag({ tags }: ContentDetailTagProps) {
  return (
    <article className="content-tag-area">
      <h2 className="hidden">태그 영역</h2>

      {/* 태그 영역 */}
      <div className="tag-box">
        {tags.map((tag, index) => {
          return <span key={index} className="tag">{`#${tag}`}</span>;
        })}
      </div>
    </article>
  );
}
