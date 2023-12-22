import React, { useEffect, useState } from 'react';
import { callApi } from '../common/callApi';
import { V6_PRIVATE_API_BASE_URL, V6_API_BASE_URL } from '../common/const';
import { isServer } from '../common/utils';
import { parse } from 'cookie';
import Head from 'next/head';

export default function MainTest({ hotNew }) {
  const [url, setUrl] = useState('');

  useEffect(() => {
    setUrl(typeof window === 'undefined' ? '' : window?.location?.href);
  }, []);

  return (
    <>
      <Head>
        <title>{hotNew.respMsg}</title>
        {/* FIXME: Test for 동적 OG태그 */}
        <meta property="og:title" content={hotNew.respMsg} />
        <meta property="og:description" content={hotNew.respMsg} />
        <meta property="og:url" content={'https://app.tworld.co.kr/v6/main_test'} />
        <meta property="og:type" content="website" />
        <meta name="referrer" content="unsafe-url" />
      </Head>
      <p>{JSON.stringify(hotNew)}</p>
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

export async function getServerSideProps(context) {
  const { req } = context;
  const cookies = parse(req.headers.cookie || '');
  const hotNew = await getHotNew(cookies.TWM);
  return {
    props: {
      hotNew,
    },
  };
}

async function getHotNew(twm) {
  const data = await callApi({
    baseUrl: isServer() ? V6_PRIVATE_API_BASE_URL[global.LDSP] : V6_API_BASE_URL[global.LDSP],
    method: 'get',
    headers: {
      'x-session-key': twm,
      'x-session-updated': '1',
    },
    url: '/main/hot-new',
  });

  return data;
}
