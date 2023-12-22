import { callApi } from "../common/callApi";

export default async function () {
    return await callApi({
        url: `/api/user/login/info`,
        baseUrl: location.origin
    });
}
