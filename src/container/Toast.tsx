import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from "../context/AppContext";
import {MyToast} from "../components/My/MyToast";

export default function () {
  const appContext = useContext(AppContext);
  const [toastMsg] = appContext.toastMsg;
  const [showToastMsg] = appContext.showToastMsg;

  return showToastMsg ? <MyToast message={toastMsg} /> : null;
}
