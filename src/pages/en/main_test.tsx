/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { MainEvent } from '../../components/Main/MainEvent';
import { MainMySmartPhone } from '../../components/Main/MainMySmartPhone';
import { MainWrapContent } from '../../components/Main/MainWrapContent';
import BottomNav from "../../container/BottomNav";

export default function () {
  return (
    <>
      <BottomNav tabIndex={3} showBottomSheet={"Y"} lang={"EN"} />
    </>
  );
}
