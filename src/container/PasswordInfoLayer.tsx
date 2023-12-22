import React from 'react';
import { ModalPasswordInfo } from '../components/Modal/ModalPasswordInfo';
import { Lang } from '../common/types';

export type PasswordInfoLayerProps = {
  isOpen?: boolean;
  lang: Lang;
};
export default function PasswordInfoLayer({ isOpen, lang }: PasswordInfoLayerProps) {
  return <ModalPasswordInfo isVisible={isOpen} lang={lang} />;
}
