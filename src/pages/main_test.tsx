import React, { useEffect, useState } from 'react';

export default function () {
  const [url, setUrl] = useState('');

  useEffect(() => {
    setUrl(typeof window === 'undefined' ? '' : window?.location?.href);
  }, []);

  return (
    <>
      404, {url} <br />
      <div>
        <a href={`/v6/main_`}>To Main Page</a>
      </div>
      <div>
        <a href={`/v6/my`}>To My Page</a>
      </div>
      <div>
        <a href={`/v6/menu`}>To Menu Page</a>
      </div>
      <div>
        <a href={`/v6/test.html`}>To Test Page</a>
      </div>
    </>
  );
}
