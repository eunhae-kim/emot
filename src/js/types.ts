export interface HeaderInfo {
  name?: string;
  number?: string;
  loginYn: boolean | null;
  loginType?: 'T' | 'S'; // T: T아이디 로그인, S: 간편로그인,
  userType?: 'regularUser' | 'noLineUser' | 'notSKTUser';
  hasMultiLine?: boolean;
  isPps?: boolean;
  isWired?: boolean;
  userId?: string;
}

export interface QuickMenu {
  menuId: string;
  menuNm: string;
  menuUrl: string;
  iconPath: string;
  exUrlNotiYn: string;
  oferStcCd: string;
}
