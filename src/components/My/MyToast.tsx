/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-array-index-key */
import React from 'react';

export interface MyToastProps {
  message: string | null;
}
export function MyToast({ message }: MyToastProps) {
  return (
    <div className="my-layer-toast active">
      <div className="my-message">{message}</div>
    </div>
  );
}
