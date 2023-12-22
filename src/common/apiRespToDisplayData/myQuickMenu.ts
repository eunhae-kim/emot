/*
{
    "respCode": 0,
    "respMsg": "SUCCESS",
    "quickMenuList": [
        {
            "menuId": "M000194",
            "menuNm": "나의 데이터/통화",
            "menuUrl": "/myt-data/submain",
            "iconPath": "https://s3-tworld-stg-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com/adminupload/guide/57345/4131/1554941872.png"
        },
        {
            "menuId": "M000233",
            "menuNm": "나의 요금",
            "menuUrl": "/myt-fare/submain",
            "iconPath": "https://s3-tworld-stg-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com/adminupload/guide/57345/4131/1701222457.png"
        },
        {
            "menuId": "M000301",
            "menuNm": "나의 가입 정보",
            "menuUrl": "/myt-join/submain",
            "iconPath": "https://s3-tworld-stg-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com/adminupload/guide/57345/4131/1783536027.png"
        },
        {
            "menuId": "M000563",
            "menuNm": "나의 혜택/할인",
            "menuUrl": "/benefit/my",
            "iconPath": "https://s3-tworld-stg-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com/adminupload/guide/57345/4131/950325734.png"
        },
        {
            "menuId": "M000819",
            "menuNm": "나의 쇼핑",
            "menuUrl": "https://m.shop.tworld.co.kr/my/submain",
            "iconPath": "https://s3-tworld-stg-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.comnull"
        },
        {
            "menuId": "M002336",
            "menuNm": "나의 구독",
            "menuUrl": "https://m-sktuniverse.tworld.co.kr/my/home",
            "iconPath": "https://s3-tworld-stg-an2-cdn-origin-mobile.s3-ap-northeast-2.amazonaws.com/adminupload/guide/10572/93595/132709378.png"
        }
    ]
}
*/
import { MenuListProps } from '../../components/My/MyQuickMenu';
import { myRedirect } from '../utils';

export default (resp: any, myInfo: any) => {
  if (resp?.respCode !== 0 || !resp.quickMenuList || !(resp.quickMenuList.length > 0)) return null;

  const compProps = {
    thumbList: resp.quickMenuList.map((info) => {
      return {
        imgUrl: info.iconPath,
        text: info.menuNm,
        link: info.menuUrl,
        confirmProps:
          myInfo.svcInfo.loginType === 'S' && info.simpleLoginYn === 'N'
            ? {
                isOpen: true,
                title: null,
                message: `간편로그인 상태에서 진입할 수 없습니다.<br/> T 아이디 (ID/PW) 로그인 후 이용해 주세요.`,
                cancelBtnName: '',
                confirmBtnName: '확인',
                //onClickCancel: null,
                onClickConfirm: null,
              }
            : null,
        isNew: false,
        exUrlNotiYn: info.exUrlNotiYn,
        oferStcCd: info.oferStcCd,
        /*
        xtrProps: {
          xtrEid: info.oferStcCd,
          xtrView: true,
          xtrClick: true,
        }
        */
      };
    }),
  } as MenuListProps;

  return { compProps };
};
