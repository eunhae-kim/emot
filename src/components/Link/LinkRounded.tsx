import React from 'react';
import V6Link from '../Common/V6Link';

export interface LinkProps {
  to: string;
  label: string;
  size: string;
  backgroundColor?: string;
  color?: string;
  borderColor?: string;
}

export function LinkRounded({ to = '/', label, size, backgroundColor, color, borderColor, ...props }: LinkProps) {
  return (
    <V6Link href={to} className={`link-rounded-${size}`} style={{ backgroundColor, color, borderColor }}>
      {label}
    </V6Link>
  );
}
