import { Method } from 'axios';

export type ApiId = {
  url: string;
  method: Method;
  noCacheClearOnError?: boolean;
};
export type Lang = 'KO' | 'EN';
export type CallApiParams = {
  url: string;
  setter?: (any) => void;
  baseUrl?: string;
  method?: Method;
  headers?: any;
  data?: any;
  params?: any;
  xsrfHeaderName?: string;
  noCacheClearOnError?: boolean;
  clearApiCacheFor?: Array<ApiId>;
};

export type ApiParams = {
  setter?: (any) => void;
  data?: any;
} & Partial<CallApiParams>;

export type LoginType = 'N' | 'S' | 'T';

export type BillsScreenType =
  | '준회원'
  | '무선_일반'
  | '무선_PPS'
  | '무선_통합청구_대표회선'
  | '무선_통합청구_일반회선'
  | '유선_일반'
  | '유선_SK브로드밴드'
  | '유선_통합청구_대표회선'
  | '유선_통합청구_일반회선';

export type CommonExcpetionType = '타임아웃' | '서비스점검중' | '조회할수없음_미응답' | '미정의오류';
export type InquiryExcpetionType =
  | '조회할수없음_월제한초과'
  | '조회할수없음_요금제변경이력있음'
  | '조회할수없음_회선정지이력있음'
  | '조회할수없음_항목없음'
  | '조회할수없음_권한있는자녀회선아님'
  | '조회할수없음_오류'
  | '조회할수없음_미응답'
  | '조회불가없음_신규가입이력없음'
  | '요금안내서없음'
  | '미지원_영문PPS'
  | CommonExcpetionType;

export type InquiryExcpetion = {
  type: InquiryExcpetionType;
  apiResp: any;
};

export interface CardProps {
  src: string;
  alt: string;
  href: string;
  oferStcCd: string;
  imgLinkTrgtClCd: string;
  billYn: string;
  tosMsgSerNum: string;
  tosCmpgnNum: string;
  tosCellNum: string;
  tosExecSchNum: string;
  type: string;
}

export interface TtimeTag {
  id: number;
  title: string;
  categoryYn: 'Y' | 'N';
}

export interface TtimeStory {
  id: number;
  title: string;
  thumbnailImgUrl: string;
  thumbnailImgAlt: string;
  storyUrl: string;
  ctaLinkBillYn: 'Y' | 'N';
  ctaLinkTargetCode: 0 | 1 | 2;
  ctaLinkTargetUrl: string;
  tags: Array<TtimeTag>;
  readCompleteCount: number;
  saveCount: number;
  sequence: number;
  viewCount: number;
  readYn: 'Y' | 'N';
  savedYn: 'Y' | 'N';
  createDatetime: string;
  updateDatetime: string;
}

export interface TtimeTheme {
  id: number;
  title: string;
  iconImageUrl: string;
  iconImageAlt: string;
  themeImageUrl: string;
  themeImageAlt: string;
  borderColor: string;
  backgroundColor: string;
  subTitle: string;
}

export interface TtimeCup {
  id: number;
  title: string;
  titleLineBreak: string;
  displayMwYn: 'Y' | 'N';
  displayAosYn: 'Y' | 'N';
  displayIosYn: 'Y' | 'N';
  thumbnailImgUrl: string;
  thumbnailImgAlt: string;
  bigTumbnailImgUrl: string;
  bigTumbnailImgAlt: string;
  lockedTumbnailImgUrl: string;
  lockedTumbnailImgAlt: string;
  bigLockedTumbnailImgUrl: string;
  bigLockedTumbnailImgAlt: string;
  guide: string;
  tip: string;
  ownYn: string;
  popupYn: 'Y' | 'N';
  activeYn: 'Y' | 'N';
}
