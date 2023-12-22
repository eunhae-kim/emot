import React, { forwardRef, useContext } from 'react';
import V6Link from './V6Link';
import { AppContext } from '../../context/AppContext';

type AnchorProps = React.HTMLProps<HTMLAnchorElement>;

export default forwardRef<HTMLAnchorElement, AnchorProps>((props, ref) => {
  const appContext = useContext(AppContext);
  const [isMyWebview] = appContext?.isMyWebview || [false];

  return <V6Link {...props} ref={ref} myToMainWebView={isMyWebview} />;
});
