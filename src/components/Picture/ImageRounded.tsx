import React from 'react';

export interface PictureProps {
  src: string;
  width: string;
  height: string;
  alt: string;
  lazy?: boolean;
}

export function ImageRounded({ src, width, height, alt, lazy = true, ...props }: PictureProps) {
  return (
    <picture className="thumbnail-rounded">
      <img loading={lazy ? "lazy": null} src={src} width={width} height={height} alt={alt} style={{objectFit: "cover"}}/>
    </picture>
  );
}
