/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import MyLink from '../Common/MyLink';

export interface MyVolumeProps {
  over1: string | null;
  overUnit0?: string | null;
  overUnit1?: string | null;
  link?: string;
}
export function MyVolume({ over1, overUnit0, overUnit1, link }: MyVolumeProps) {
  return (
    <div className="my-volume">
      <MyLink href={link}>
        <span className="krw">{overUnit0}</span>
        {over1}
        <span className="unit">{overUnit1}</span> <i className="bl-arr-bold right" aria-hidden="true" />
      </MyLink>
    </div>
  );
}
