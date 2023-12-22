import { callApi } from '../../common/callApi';
import { ApiParams } from '../../common/types';
import { isApp } from '../../js/commonUtil';
import { TWORLD_APP_URL, TWORLD_URL } from '../../common/const';

export default async function (apiParams?: ApiParams) {
  // @ts-ignore
  const { LDSP } = global;

  // @ts-ignore
  const target = typeof window !== 'undefined' && window.location ? window.location.origin : null;

  return callApi({
    // 230915에 target 파라미터 필요 없게 소웍 소스 수정 됐으나 dev에서는 아직 필요. 추후 삭제 필요
    url: `/api/svcInfo?target=${target}`,

    // @ts-ignore
    xsrfHeaderName: null,

    // 오류 시, 'Cache-Control': 'max-age=0' 헤더가 추가되는 것 방지 (헤더가 추가되면 CORS 오류 발생 시킴)
    noCacheClearOnError: true,

    // 이렇게 전달 할 경우 파라미터가 인코딩되고, 소웍 서버에서 인식 못함
    // params: { target },
    baseUrl: isApp() ? TWORLD_APP_URL[LDSP] : TWORLD_URL[LDSP],

    // X-Session-Key, X-Session-Update 추가 방지
    headers: {},

    ...apiParams,
  });
}
