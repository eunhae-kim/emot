/* eslint-disable */
import { useEffect } from 'react';

export default () => {
  useEffect(() => {
    (function (w, d, a) {
      // @ts-ignore
      w.__beusablerumclient__ = {
        load: function (src) {
          var b = d.createElement('script');
          b.src = src;
          b.defer = true;
          b.type = 'text/javascript';
          d.getElementsByTagName('head')[0].appendChild(b);
        },
      };
      // @ts-ignore
      w.__beusablerumclient__.load(a + '?url=' + encodeURIComponent(d.URL));
    })(window, document, '//sktrum.beusable.net/load/b221116e124231u390');
  }, []);

  return null;
};
