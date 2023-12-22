/**
 * Copyright (c) 2020 STCLab. All rights reserved.
 * Code licensed under the STCLab License
 * Version 2.2.17
 *
 * @author jhh<jhh@stclab.com>
 */

var NetFunnel = {};
NetFunnel.Skin = {};
//EditZoneStart ----------------------------------------------------------------

NetFunnel.TS_HOST = 'netfunnel.tworlddirect.com'; // Default TS host
//NetFunnel.TS_HOST = 'nf2-ts2.netfunnel.co.kr'; // Test TS host

NetFunnel.TS_PORT = 443; // Default TS port
NetFunnel.TS_PROTO = 'https'; // Default TS protocol [http|https]
NetFunnel.TS_QUERY = 'ts.wseq'; // Default request query

NetFunnel.TS_SERVICE_ID = 'service_3'; // Default TS Service id
//NetFunnel.TS_SERVICE_ID = 'service_1'; // Test service id

NetFunnel.TS_ACTION_ID = 'act_main_home'; // Default TS Action id
NetFunnel.TS_MAX_TTL = 30; // Default max ttl (second) 5~30
NetFunnel.TS_CONN_TIMEOUT = 3; // Default connect timeout (second)
NetFunnel.TS_CONN_RETRY = 1; // Default connect retry count
NetFunnel.TS_COOKIE_ID = 'NetFunnel_ID'; // Default Cookie ID
NetFunnel.TS_COOKIE_TIME = 10; // Default Cookie Time (minute)
NetFunnel.TS_COOKIE_DOMAIN = ''; // Default Cookie Domain
NetFunnel.TS_BYPASS = false; // NetFunnel Routine Bypass [true|false]
NetFunnel.TS_POPUP_TOP = false; // Popup Top Position ( "false" is center )
NetFunnel.TS_POPUP_LEFT = false; // Popup Left Position ( "false" is center )
NetFunnel.TS_AUTO_COMPLETE = true; // Auto setComplete [true|false]
NetFunnel.TS_DEBUG_MODE = false; // Debug Mode
NetFunnel.TS_SHOWTIME_LIMIT = 0; // Show WaitTime Limit (second, 0 is Unlimited)
NetFunnel.TS_SHOWCNT_LIMIT = 0; // Show WaitUser Limit (0 is Unlimited)
NetFunnel.TS_SHOWNEXT_LIMIT = 0; // Show NextWaitUser Limit (0 is Unlimited)
NetFunnel.TS_LIMIT_TEXT = '다수'; // SHOWCNT,SHOWNEXT Limit를 넘었을때 출력되는 문자열
NetFunnel.TS_IFRAME_RESIZE = false; // true | false
NetFunnel.TS_USE_UNFOCUS = true; // object unfocus after netfunnel call
NetFunnel.TS_VIRT_WAIT = 10000; // virtual wait time (millisecond)
NetFunnel.TS_USE_MOBILE_UI = true; // Mobile UI
NetFunnel.TS_POPUP_TARGET = window; // Popup target window
NetFunnel.TS_USE_FRAME_BLOCK = false; // Block FrameSet Page
NetFunnel.TS_FRAME_BLOCK_LIST = []; // Frame Block Window List
NetFunnel.TS_USE_PRE_WAIT = false; // Pre waiting popup use
NetFunnel.TS_USER_DATA_KEYS = []; // Input UserData Key & Type(c=cookie,v=variable)
// ex) [ {"key":<user_data_key>, "type":<c|v>}, ... ]
NetFunnel.TS_CONFIG_USE = true; // 무조건 Config에 있는 IP 와 PORT로 사용
NetFunnel.TS_POPUP_ZINDEX = 32000; // 대기 Popup창의 z-index 값.
// 대기창이 뒤로 숨지 않도록 적당한 값을 넣어줘야 한다.
NetFunnel.TS_IP_ERROR_RETRY = true; // Retry(Re-Issue) Where IP Validation Error
NetFunnel.TS_SUCCESS_POPUP_VISIBILITY = false;

//일정 기간 동안 대기인원 변함 없을시 Bypass 처리
NetFunnel.TS_NWAIT_BYPASS = true; // 사용 유무
NetFunnel.TS_MAX_NWAIT_COUNT = 100; // 대기인원 반복 체크 기준값

//Server Block
NetFunnel.TS_BLOCK_MSG = 'Service Block!!'; // Server Block시 팝업에 표시할 문구
NetFunnel.TS_BLOCK_URL = ''; // Server Block시 등록된 url로 이동(미등록시 경고창 후 서비스 진입 불가)
NetFunnel.TS_IPBLOCK_WAIT_COUNT = 200; // Server IP Block 가상대기창 반복 횟수
NetFunnel.TS_IPBLOCK_WAIT_TIME = 10000; // Server IP Block 가상대기시간

//대기창 미리보기
NetFunnel.TS_SHOW_WAIT_POPUP = false; //대기창 보기

//event skin 지정
NetFunnel.TS_SKIN_ID = ''; // Skin ID (미지정시 default 대기창)

// Variable for MProtect
NetFunnel.MP_USE = false; // 매크로방지기능 사용유무 (true|false)
NetFunnel.MP_TIMELIMIT = 20000; // 사용자의 요청을 체크하기 위한 단위 시간 (ms)
NetFunnel.MP_MAXREQLIMIT = NetFunnel.MP_TIMELIMIT / 1100; // TIMELIMIT 시간 내에 getTidChkEnter를 요청가능한 최대값
NetFunnel.MP_DEVLIMIT = 20; // 요청주기의 표준편차 제한값 (ms)
NetFunnel.MP_DEVCNTLIMIT = 7; // 표준편차 계산을 위한 item숫자
NetFunnel.MP_REQONLYLIMIT = 10; // setComplete 없이 getTidChkEnter만 요청한 횟수 제한값(횟수)
NetFunnel.MP_MINCOUNT = 5; // 계산을 하지 않는 자료개수

/* eslint-disable indent */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
// Logo Image Data -------------------------------------------------------------
//   - height:16 pixel
//   - GIF Format Data (Base64 Encoding)
NetFunnel.gLogoData =
  'R0lGODlhJgAQAOe/AB5vlR5ykh9zkyNymCF0lC1xkiN1lSR2liZ3lyd4mDN1lyh5mSp6mjN4lCt7my18nDh5myt+mC59nTd7ly9+njF/nzp+mjKAoDt/mzOBoT+CnkCDn0KFoUOGokSHo0iLpk+SrlSWsl2ZsF6asWeYsWCbsmGcs2OetWSftla4Q1e5RFi6RVm7Rl+6TWK6RnaowXuou3WqvHipwmG8TmS9SGK9T2W+SWq8T2O+UH6rvmS/UX+sv2y+UWXAUoCtwIKuwYOvw4SwxIWxxW/DXYayxnfCXYezx3XDZXbEZom1yY21w4q2you4y3rIaXvJao67zoLKcpq6yonJcpe/zZu/1IrNfY3Nd6C/z5zA1ZrC0KHA0I7QgJ/D2KPD04/SgZbQgZDTgqPH0KbG1pbUiqvH0azM3LDM16PZkaLamLPP2q7Zn7bS3KncobfT3bHcorrW4LnfrbPirrrgrsTY5Lvhr7jkqsba5rzjsLrkt73kscjc6Mvc4rzluMzd49Dg59Hh6MfpvtLi6dPk6s3qxtfk5dTl687rx9Xm7Nbn7dPrz9Ts0Nfo79Xt0dnp8N3q69fv097r7OHq8uXq7d/s7eDt7uDw1ePs9Obs7uTt9eft79/y3uLw8Onu8ODz3+vw8+H14Ozx9O3y9er14u306e7z9uj26u/26+/19+n46/D37PD2+PL3+fL57vP4+/T67/T5/Pf59vX6/fj69/L89/X88Pn7+Pr8+ff9//v9+v78///9+//9//n///z/+/7//P///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH5BAEKAP8ALAAAAAAmABAAAAj+AH2hSuXLl61SsHzp8pVLIcOHBSNKnDgxFY8VnXwlckHH1y2PBiuJakixZElUOlrocGWoBRxfuBS58vWpxRZbJnNKRKXSpqIWdB6x0JFCUZMWKhjpXMrTypkUTlzgWXHkjgsko3R4wbk0J08ovoq0aMEmxZAvW6rM0jGmq05TOqT4MpWiBR8oLfL0UOPqxphbC91SnFUHUMFHcTTJcgMGjShccgYtDUyxYSguWq5EWdXFjq9WWNp4mlJG4ZwrqvRcQVRQTBZfUbRkyULqDZWEug5RcLAAACUIQHxBIkAiUIIFYXz9cHApyQQJBT1Q8CVAwgIGiGAgIJXrlu4RBgXsUQjiKxKBEn8WOMCgCgiDS0okMBDhSzp1AxFjbGd4SH4BDpFQENwkBIzwBwIgSLCBD+8lIcEHC6TxwXQBSCCAAZ68gMApBenmQRBPIEIBDL40ct6BP5AhQQUMSLKEBH5wsGIFvgzQgBFCvCLDhgyJWEJBjkigQRonJADDHwns4EsIDDBASRIR9AGKBBNMJ4ACa5jRSgwM/EAEJIhcYEJEKEhgpgaq9OHADwVxQAEmTFDQhy9lLJCBLwdYQIEFjeRAwZ973LIJKBI5QkghqtwSSyYc+kIKJ7eowkktH2XCiS+WcKKpLadomkksAQEAOw==';
NetFunnel.gLogoText = '';
NetFunnel.gLogoURL = '	http://www.netfunnel.co.kr';

NetFunnel.gPreWaitData =
  'R0lGODlhKAAoALMMAPj4+MTExPT09NTU1NPT08XFxcbGxsLCwtXV1cPDw/X19b+/v////wAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJBQAMACwAAAAAKAAoAAAEgJDJSau9OOvNu/9gKI5kaZ5oqq5sCwKIYSAABcv0qQRLvwQCyc73C5YGxB5BgkwuS4nk4iCJJqlQKdZKxJII0ifYaRLwfECJmZg2AQaFwqA2ecfnrry+dJvR80NoRi5NRE8uXD5eLYk9iyxjhnprgnt2cn97mpucnZ6foKGio3oRACH5BAkFAAwALAAAAAAoACgAAASAkMlJq7046827/2AojmRpnmiqrmwLAohhIAAFy/SpBEu/BALJzvcLlgbEHkGCTC5LieTiIIkmqVAp1krEkgjSJ9hpEvB8QImZmDYBBoXCoDZ5x+euvP4Vm9HzQ2hGLk1ETy5cPl4tiT2LLGOGemuCe3Zyf3uam5ydnp+goaKjnREAIfkECQUADAAsAAAAACgAKAAABICQyUmrvTjrzbv/YCiOZGmeaKqubAsCiGEgAAXL9KkES78EAsnO9wuWBsQeQYJMLkuJ5OIgiSapUCnWSsSSCNIn2GkS8HxAiZmYNgEGhcKgNnnH5668fnOb0fNDaEYuTURPLlw+Xi2JPYssY4Z6a4J7dnJ/e5qbnJ2en6ChoqOiEQAh+QQJBQAMACwAAAAAKAAoAAAEgJDJSau9OOvNu/9gKI5kaZ5oqq5sCwKIYSCAOynBoi+BYDOD3Y7wSwh1h+JxkbQRlkQJTEY7CXK7ngQn1JoAg0JhUJMEj1GX8dhUL9uk6azMeKJN3KyPce3uSWdCaWBiZCdrQnAsiDuKK3aCP316PwyEY3SVmpucnZ6foKGio6IRACH5BAkFAAwALAAAAAAoACgAAAR9kMlJq7046827/2AojmRpnmiqrmwLAohhIIA7KcGiL4FgM4PdjvBLCHWH4nGRtBGWRJsgt+v9GIBBoTCoXb/gDUxGo4xn3hJOaGWsq75S8BidC6Mk47GpFzbzS3yBJk90EoV3JlNscYtwJ1lbXWZaXGlhmJmam5ydnp+goBEAIfkECQUADAAsAAAAACgAKAAABH2QyUmrvTjrzbv/YCiOZGmeaKqubFsCiGEggDspwaIvgWAzg92O8EsIdYficZG0EZZEmyC36/0YgEGhMKhdv2ALTEajjGfeEk5oZayrvlLwGJ0LoyTjsakXNvNLfIEmT3QShXcmU2xxi3AnWVtdZlpcaWGYmZqbnJ2en6CgEQAh+QQJBQAMACwAAAAAKAAoAAAEfZDJSau9OOvNu/9gKI5kaZ5oqq5sqwKIYSCAOynBoi+BYDOD3Y7wSwh1h+JxkbQRlkSbILfr/RiAQaEwqF2/YGxs5pXAZLQTTmhlrKu+UvAYnQujJOOxqRc280t8gSZPdBKFdyZTbHGLcCdZW10UkVxlYZiZmpucnZ6foKARACH5BAUFAAwALAAAAAAoACgAAASBkMlJq7046827/2AojmRpnmiqrmyrAohhIIA7KcGiL4FgM4PdjvBLCHWH4nGRNMFktAlhSSzhhD2JILfLloLHKgMwKBQGNZPx2HSthe3WNDx5ztKlLdbHuHb5JWRmaBNgQmItbztxLIpIP3OHP3p/P2NlZ3iWm5ydnp+goaKjpD8RADs=';

NetFunnel.gFixelData = 'R0lGODlhAQABAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAABAAEAAAICVAEAOw==';
//EditZoneEnd ------------------------------------------------------------------
(function (top) {
  NetFunnel.RTYPE_NONE = 0;
  NetFunnel.RTYPE_CHK_ENTER = 5002;
  NetFunnel.RTYPE_ALIVE_NOTICE = 5003;
  NetFunnel.RTYPE_SET_COMPLETE = 5004;
  NetFunnel.RTYPE_GET_TID_CHK_ENTER = 5101;
  NetFunnel.RTYPE_INIT = 5105;
  NetFunnel.RTYPE_STOP = 5106;
  NetFunnel.kSuccess = 200;
  NetFunnel.kContinue = 201;
  NetFunnel.kContinueDebug = 202;
  NetFunnel.kTsBypass = 300;
  NetFunnel.kTsBlock = 301;
  NetFunnel.kTsIpBlock = 302;
  NetFunnel.kTsExpressNumber = 303;
  NetFunnel.kTsErrorNoUservice = 500;
  NetFunnel.kTsErrorNoAction = 501;
  NetFunnel.kTsErrorAComplete = 502;
  NetFunnel.kTsErrorWrongServer = 503;
  NetFunnel.kTsErrorTooRecreate = 504;
  NetFunnel.kTsErrorNoKey = 505;
  NetFunnel.kTsErrorInvalidID = 506;
  NetFunnel.kTsErrorInvalidKey = 507;
  NetFunnel.kTsErrorInvalidIdStr = 508;
  NetFunnel.kTsErrorDuplicate = 509;
  NetFunnel.kTsErrorDelAction = 510;
  NetFunnel.kTsErrorUserviceExist = 511;
  NetFunnel.kTsErrorActionExist = 512;
  NetFunnel.kTsErrorLicenseOver = 513;
  NetFunnel.kTsErrorSize = 514;
  NetFunnel.kTsErrorNoUserAction = 515;
  NetFunnel.kTsErrorTooBigKey = 516;
  NetFunnel.kTsErrorInvalidIp = 517;
  NetFunnel.kErrorAuth = 900;
  NetFunnel.kErrorNotFound = 901;
  NetFunnel.kErrorNoinit = 902;
  NetFunnel.kErrorCode = 903;
  NetFunnel.kErrorParam = 904;
  NetFunnel.kErrorData = 905;
  NetFunnel.kErrorUnknownType = 906;
  NetFunnel.kErrorAlready = 907;
  NetFunnel.kErrorService = 908;
  NetFunnel.kErrorExecution = 909;
  NetFunnel.kErrorSock = 920;
  NetFunnel.kErrorSockSend = 921;
  NetFunnel.kErrorSockRecv = 922;
  NetFunnel.kErrorNotFoundLocalIP = 925;
  NetFunnel.kErrorSockConnect = 926;
  NetFunnel.kErrorNoConnect = 927;
  NetFunnel.kErrorSockData = 928;
  NetFunnel.kErrorIO = 991;
  NetFunnel.kErrorArunning = 992;
  NetFunnel.kErrorPermission = 993;
  NetFunnel.kErrorExpiredTime = 994;
  NetFunnel.kErrorOverCounter = 995;
  NetFunnel.kErrorSecurity = 996;
  NetFunnel.kErrorSystemStopping = 997;
  NetFunnel.kErrorNotSupport = 998;
  NetFunnel.kErrorSystem = 999;
  NetFunnel.PS_N_RUNNING = 0;
  NetFunnel.PS_RUNNING = 1;
  NetFunnel.PS_CONTINUE = 2;
  NetFunnel.PS_TIMEOUT = 3;
  NetFunnel.PS_ERROR = 99;
  NetFunnel.CONN_TIMEOUT_KEY = 'connection_timeout';
  NetFunnel.gControl = null;
  NetFunnel.gShowtimeLimit = false;
  NetFunnel.gShowcntLimit = false;
  NetFunnel.gShownextLimit = false;
  NetFunnel.gSkinId = '';
  NetFunnel.gPopupTop = false;
  NetFunnel.gPopupLeft = false;
  NetFunnel.gTotWait = -1;
  NetFunnel.gPrevWaitTime = -1;
  NetFunnel.gLastSkinID = 'default';
  NetFunnel.gUseMobileUI = false;
  NetFunnel.gUseUnfocus = false;
  NetFunnel.gAlreadyProc = 0;
  NetFunnel.gWaitPop = null;
  NetFunnel.gIPBlockWaitCount = 0;
  NetFunnel.gNWaitCount = 0;
  NetFunnel.gNWaitTemp = 0;
  NetFunnel.gReTimer = null;
  NetFunnel.gDebugflag = false;
  NetFunnel.Util = {
    makeDebugMsg: function (callback, rtype, code, data, isHtml) {
      var nl = '\n';
      var space = '       ';
      if (isHtml == true) {
        nl = '<br>';
        space = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
      }
      var rtypeS = 'Unknown';
      var codeS = 'Unkonwn Error';
      switch (rtype) {
        case NetFunnel.RTYPE_GET_TID:
          rtypeS = 'getTicketID';
          break;
        case NetFunnel.RTYPE_CHK_ENTER:
          rtypeS = 'chkEnter';
          break;
        case NetFunnel.RTYPE_ALIVE_NOTICE:
          rtypeS = 'aliveNotice';
          break;
        case NetFunnel.RTYPE_SET_COMPLETE:
          rtypeS = 'setComplete';
          break;
        case NetFunnel.RTYPE_GET_TID_CHK_ENTER:
          rtypeS = 'getTID+ChkEnter';
          break;
        case NetFunnel.RTYPE_INIT:
          rtypeS = 'Init';
          break;
        case NetFunnel.RTYPE_STOP:
          rtypeS = 'stop';
          break;
        default:
          rtypeS = 'Unknown';
          break;
      }
      switch (code) {
        case NetFunnel.kSuccess:
          codeS = 'Normal';
          break;
        case NetFunnel.kContinue:
          codeS = 'Continue';
          break;
        case NetFunnel.kContinueDebug:
          codeS = 'Debug Continue mode';
          break;
        case NetFunnel.kTsBypass:
          codeS = 'ServerSide Bypass';
          break;
        case NetFunnel.kTsBlock:
          codeS = 'ServerSide Block';
          break;
        case NetFunnel.kTsIpBlock:
          codeS = 'ServerSide Ip Block';
          break;
        case NetFunnel.kErrorSystem:
          codeS = 'System Error';
          break;
        case NetFunnel.kErrorSecurity:
          codeS = 'Security Error';
          break;
        case NetFunnel.kErrorIO:
          codeS = 'I/O Error';
          break;
        case NetFunnel.kErrorSockConnect:
          codeS = 'Connection Timeout';
          break;
        case NetFunnel.kErrorAlready:
          codeS = 'Already Running';
          break;
        case NetFunnel.kErrorNoinit:
          codeS = 'Init Error';
          break;
        case NetFunnel.E_INSERT:
          codeS = 'Insert Error';
          break;
        case NetFunnel.kErrorPermission:
          codeS = 'No Permission';
          break;
        case NetFunnel.kErrorExpiredTime:
          codeS = 'Key Expire';
          break;
        case NetFunnel.kErrorParam:
          codeS = 'Parameter Error';
          break;
        case NetFunnel.E_NOT_STARTED:
          codeS = 'No service time';
          break;
        case NetFunnel.kTsErrorNoUserAction:
          codeS = 'No action Error';
          break;
        default:
          codeS = 'Unknown Error';
          break;
      }
      var tStr =
        callback +
        ' ' +
        nl +
        nl +
        '  - type : ' +
        rtypeS +
        ' (' +
        rtype +
        ')' +
        nl +
        ' - Code : ' +
        codeS +
        ' (' +
        code +
        ')' +
        nl +
        ' - Params' +
        nl;
      for (var i in data) {
        tStr += space + i + ' ---> ' + data[i] + nl;
      }
      return tStr;
    },
    goNextPage: function (url, data) {
      var tUrl = url;
      for (var i in data) {
        tUrl += '&' + i + '=' + data[i];
      }
      document.location.href = tUrl;
    },
    alertDebugMsg: function (msg) {
      alert(msg);
    },
    decodeBase64: function (input) {
      var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
      var output = '';
      var chr1, chr2, chr3;
      var enc1, enc2, enc3, enc4;
      var i = 0;
      input = input.replace(/[^A-Za-z0-9+/=]/g, '');
      do {
        enc1 = keyStr.indexOf(input.charAt(i++));
        enc2 = keyStr.indexOf(input.charAt(i++));
        enc3 = keyStr.indexOf(input.charAt(i++));
        enc4 = keyStr.indexOf(input.charAt(i++));
        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;
        output += String.fromCharCode(chr1);
        if (enc3 != 64) {
          output += String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
          output += String.fromCharCode(chr3);
        }
      } while (i < input.length);
      return output;
    },
    getParam: function (input) {
      input = input.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
      var regexS = '[\\?&]' + input + '=([^&#]*)';
      var regex = new RegExp(regexS);
      var results = regex.exec(document.location.href);
      if (results === null) {
        return '';
      }
      return results[1];
    },
    isSmartPhone: function () {
      var mobileKeyWords = [
        'iPhone',
        'iPod',
        'iPad',
        'BlakBerry',
        'Android',
        'WindowsCE',
        'LG',
        'MOT',
        'SAMSUNG',
        'SonyEricsson',
        'Nokia',
        'Webos',
        'Opera mini',
        'Opera mobi',
        'Iemobile',
      ];
      try {
        for (var i = 0; i < mobileKeyWords.length; i++) {
          if (navigator.userAgent.match(mobileKeyWords[i]) !== null) {
            return true;
          }
        }
      } catch (e) {}
      return false;
    },
    calcStdDev: function (inArr, s) {
      if (typeof inArr != 'object') {
        return false;
      }
      if (inArr.length < 2) {
        return false;
      }
      if (s > 1 || s < 0) {
        s = 0;
      }
      var sum = 0,
        i = 0;
      for (i = 0; i < inArr.length; i++) {
        sum += parseInt(inArr[i], 10);
      }
      var mean = sum / inArr.length;
      var temp = 0;
      for (i = 0; i < inArr.length; i++) {
        temp += (parseInt(inArr[i], 10) - mean) * (parseInt(inArr[i], 10) - mean);
      }
      var stdDiv = Math.sqrt(temp / (inArr.length - s));
      return stdDiv;
    },
    delFocus: function (win) {
      try {
        var doc = document;
        if (typeof win == 'object' && typeof win.document == 'object') {
          doc = win.document;
        }
        var body = doc.getElementsByTagName('body')[0];
        var ifrm = doc.createElement('div');
        ifrm.style.position = 'absolute';
        ifrm.style.width = '0px';
        ifrm.style.height = '0px';
        ifrm.style.border = '0px';
        ifrm.style.top = NetFunnel.PopupUtil.getScrollTop(doc);
        ifrm.style.left = NetFunnel.PopupUtil.getScrollLeft(doc);
        body.appendChild(ifrm);
        ifrm.focus();
        var pNode = ifrm.parentNode;
        if (pNode && typeof pNode == 'object') {
          pNode.removeChild(ifrm);
        }
      } catch (e) {}
    },
    isVirtualWait: function (obj) {
      if (typeof obj != 'object') {
        return false;
      }
      if (typeof obj.mprotect == 'number' && obj.mprotect > 0) {
        return true;
      }
      return false;
    },
    getTimeStr: function (inTime, format, delimiter, force) {
      var tTime = parseInt(inTime, 10);
      if (typeof format == 'undefined') {
        format = '%H시간 %M분 %S초';
      }
      if (typeof delimiter == 'undefined') {
        delimiter = ' ';
      }
      if (typeof force == 'undefined') {
        force = false;
      }
      var tMin = 0;
      var tHour = 0;
      var tSec = 0;
      var j = 0;
      var matchStr = false;
      var item = false;
      var h = false;
      var m = false;
      var s = false;
      var matchStrs = format.match(/%[-]*[0-9]*[H|M|S]/g);
      for (j = 0; j < matchStrs.length; j++) {
        matchStr = matchStrs[j];
        item = matchStr.charAt(matchStr.length - 1);
        if (item == 'H') {
          h = true;
        }
        if (item == 'M') {
          m = true;
        }
        if (item == 'S') {
          s = true;
        }
      }
      if (h == true) {
        tHour = Math.floor(tTime / 3600);
      }
      if (m == true) {
        if (h == true) {
          tMin = Math.floor((tTime % 3600) / 60);
        } else {
          tMin = Math.floor(tTime / 60);
        }
      }
      if (s == true) {
        if (h == false && m == false) {
          tSec = tTime;
        } else {
          if (m == true) {
            tSec = tTime % 60;
          } else {
            if (h == true && m == false) {
              tSec = Math.floor(tTime % 3600);
            }
          }
        }
      }
      var result = '';
      var formatArr = format.split(delimiter);
      for (var i = 0; i < formatArr.length; i++) {
        var tStr = formatArr[i];
        matchStrs = tStr.match(/%[-]*[0-9]*[H|M|S]/g);
        var printMatch = true;
        for (j = 0; matchStrs && j < matchStrs.length; j++) {
          matchStr = matchStrs[j];
          var repStr = '';
          var pad = false;
          var repadStr = '&nbsp;';
          var padMinus = false;
          var ppadSize = 0;
          item = matchStr.charAt(matchStr.length - 1);
          if (matchStr.length > 2) {
            var cnt = '';
            var start = true;
            for (var k = 1; k < matchStr.length - 1; k++) {
              var ss = matchStr[k];
              if (ss == '-') {
                padMinus = true;
              } else {
                if (ss == '0' && start == true) {
                  repadStr = '0';
                  start = false;
                  pad = true;
                } else {
                  cnt += ss;
                  pad = true;
                }
              }
            }
            ppadSize = parseInt(cnt, 10);
          }
          var numberStr = '';
          if (item == 'H') {
            if (tHour == 0) {
              printMatch = false;
            }
            numberStr = '' + tHour;
          } else {
            if (item == 'M') {
              if (tMin == 0) {
                printMatch = false;
              }
              numberStr = '' + tMin;
            } else {
              if (item == 'S') {
                numberStr = '' + tSec;
              }
            }
          }
          if (pad) {
            if (padMinus) {
              repStr = numberStr;
            }
            var padDiff = ppadSize - numberStr.length;
            for (var l = 0; l < padDiff; l++) {
              repStr += repadStr;
            }
            if (!padMinus) {
              repStr += numberStr;
            }
          } else {
            repStr = numberStr;
          }
          tStr = tStr.replace(matchStr, repStr);
        }
        if (force == true || printMatch == true) {
          if (result.length > 0) {
            result = result + delimiter + tStr;
          } else {
            result = tStr;
          }
        }
      }
      return result;
    },
    getFrameWindowList: function (popupTarget) {
      var list = [];
      for (var i = 0; i < top.frames.length; i++) {
        var tframe = top.frames[i];
        if (tframe === popupTarget) {
          continue;
        }
        list.push({ win: tframe, popup: null });
      }
      return list;
    },
  };
  NetFunnel.BrowserDetect = {
    init: function () {
      this.browser = this.searchString(this.dataBrowser) || 'An unknown browser';
      this.version =
        this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || 'an unknown version';
      this.OS = this.searchString(this.dataOS) || 'an unknown OS';
    },
    searchString: function (data) {
      for (var i = 0; i < data.length; i++) {
        var dataString = data[i].string;
        var dataProp = data[i].prop;
        this.versionSearchString = data[i].versionSearch || data[i].identity;
        if (dataString) {
          if (dataString.indexOf(data[i].subString) != -1) {
            return data[i].identity;
          }
        } else {
          if (dataProp) {
            return data[i].identity;
          }
        }
      }
      return '';
    },
    searchVersion: function (dataString) {
      var index = dataString.indexOf(this.versionSearchString);
      if (index == -1) {
        return 0;
      }
      return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
    },
    dataBrowser: [
      { string: navigator.userAgent, subString: 'Chrome', identity: 'Chrome' },
      { string: navigator.userAgent, subString: 'OmniWeb', versionSearch: 'OmniWeb/', identity: 'OmniWeb' },
      { string: navigator.vendor, subString: 'Apple', identity: 'Safari' },
      { prop: window.opera, identity: 'Opera' },
      { string: navigator.vendor, subString: 'iCab', identity: 'iCab' },
      { string: navigator.vendor, subString: 'KDE', identity: 'Konqueror' },
      { string: navigator.userAgent, subString: 'Firefox', identity: 'Firefox' },
      { string: navigator.vendor, subString: 'Camino', identity: 'Camino' },
      { string: navigator.userAgent, subString: 'Netscape', identity: 'Netscape' },
      { string: navigator.userAgent, subString: 'MSIE', identity: 'Explorer', versionSearch: 'MSIE' },
      { string: navigator.userAgent, subString: 'Gecko', identity: 'Mozilla', versionSearch: 'rv' },
      { string: navigator.userAgent, subString: 'Mozilla', identity: 'Netscape', versionSearch: 'Mozilla' },
    ],
    dataOS: [
      { string: navigator.platform, subString: 'Win', identity: 'Windows' },
      { string: navigator.platform, subString: 'Mac', identity: 'Mac' },
      { string: navigator.platform, subString: 'Linux', identity: 'Linux' },
    ],
  };
  NetFunnel.BrowserDetect.init();
  if (NetFunnel.BrowserDetect.browser == 'Explorer') {
    if (typeof Array.push != 'function') {
      Array.prototype.push = function () {
        var n = this.length >>> 0;
        for (var i = 0; i < arguments.length; i++) {
          this[n] = arguments[i];
          n = (n + 1) >>> 0;
        }
        this.length = n;
        return n;
      };
    }
    if (typeof Array.pop != 'function') {
      Array.prototype.pop = function () {
        var n = this.length >>> 0,
          value;
        if (n) {
          value = this[--n];
          delete this[n];
        }
        this.length = n;
        return value;
      };
    }
  }
  NetFunnel.getCommandStr = function (mode, msg) {
    var cmd = '';
    var code = 0;
    if (mode == 'recv') {
      code = parseInt(msg.substring(0, 4), 10);
    } else {
      var myre = /opcode=([0-9]+)&/;
      var rr = myre.exec(msg);
      if (rr.length > 1) {
        code = parseInt(rr[1], 10);
      }
    }
    switch (code) {
      case 5101:
        cmd = 'getTidchkEnter';
        break;
      case 5002:
        cmd = 'chkEnter      ';
        break;
      case 5003:
        cmd = 'aliveNotice   ';
        break;
      case 5004:
        cmd = 'setComplete   ';
        break;
      default:
        cmd = 'Unknown       ';
    }
    return cmd;
  };
  NetFunnel.writeDebugMsg = function (win, mode, msg) {
    var d = new Date();
    var hour = parseInt(d.getHours(), 10);
    var min = parseInt(d.getMinutes(), 10);
    var sec = parseInt(d.getSeconds(), 10);
    var msec = parseInt(d.getMilliseconds(), 10);
    var tstr = '';
    if (hour < 10) {
      tstr += '0';
    }
    tstr += hour + ':';
    if (min < 10) {
      min += '0';
    }
    tstr += min + ':';
    if (sec < 10) {
      sec += '0';
    }
    tstr += sec;
    tstr += '.' + msec;
    var ptop = '';
    var bgc = '';
    var arrow = '';
    if (mode == 'recv') {
      ptop = 'padding-left:1px;';
      bgc = '#9E9E9E;';
      arrow = tstr + ' | Recv | <b>' + NetFunnel.getCommandStr(mode, msg) + '</b> | ';
    } else {
      ptop = 'margin-top:5px;';
      bgc = '#EEEEEE;';
      arrow = tstr + ' | Send | <b>' + NetFunnel.getCommandStr(mode, msg) + '</b> | ';
    }
    var str =
      "<div onload='this.focus()' style='width:650;overflow:hidden;padding:1px;border:1px solid #eeeeee;margin:0px;font-size:10px;font-family:monospace;background-color:" +
      bgc +
      ptop +
      "'>" +
      arrow +
      msg.substring(0, 50) +
      '</div>';
    if (win && win.document && win.document.body) {
      var bodyStr = win.document.body.innerHTML;
      win.document.body.innerHTML = bodyStr + str;
    }
  };
  NetFunnel.printDebugMsg = function (mode, url) {
    NetFunnel.debugWindow = window.open(
      '',
      'NetFunnel_debugWindow',
      'status=1,width=700,height=300,resizable=1,scrollbars=1',
    );
    if (typeof NetFunnel.debugWindow == 'object') {
      NetFunnel.writeDebugMsg(NetFunnel.debugWindow, mode, url);
    }
  };
  NetFunnel.Storage = function (inType) {
    this.html5Support = this.supportsHtml5Storage();
    if (typeof inType == 'number') {
      this.type = inType;
    }
  };
  NetFunnel.Storage.prototype.supportsHtml5Storage = function () {
    try {
      return 'localStorage' in window && window.localStorage !== null;
    } catch (e) {
      return false;
    }
  };
  NetFunnel.Storage.prototype.html5Support = false;
  NetFunnel.Storage.prototype.length = 0;
  NetFunnel.Storage.prototype.type = 1;
  NetFunnel.Storage.prototype.setStorageType = function (inType) {
    if (inType < 1 || inType > 2) {
      this.type = 1;
    } else {
      this.type = inType;
    }
  };
  NetFunnel.Storage.prototype.getStorage = function () {
    if (this.type == 1) {
      return localStorage;
    } else {
      if (this.type == 2) {
        return sessionStorage;
      }
    }
    return localStorage;
  };
  NetFunnel.Storage.prototype.setItem = function (key, value, minutes, domain) {
    try {
      if (this.html5Support) {
        this.getStorage().setItem(key, value);
        NetFunnel.Cookie.set(key, value, minutes, domain);
      } else {
        NetFunnel.Cookie.set(key, value, minutes, domain);
      }
      return true;
    } catch (e) {
      return false;
    }
  };
  NetFunnel.Storage.prototype.setItemStorageOnly = function (key, value, minutes, domain) {
    try {
      if (this.html5Support) {
        this.getStorage().setItem(key, value);
      } else {
        NetFunnel.Cookie.set(key, value, minutes, domain);
      }
      return true;
    } catch (e) {
      return false;
    }
  };
  NetFunnel.Storage.prototype.getItem = function (key, storageOnly) {
    var retval = false;
    try {
      if (this.html5Support) {
        retval = this.getStorage().getItem(key);
        if (!retval && (storageOnly == undefined || storageOnly == false)) {
          retval = NetFunnel.Cookie.get(key);
        }
      } else {
        retval = NetFunnel.Cookie.get(key);
      }
      return retval;
    } catch (e) {
      return false;
    }
  };
  NetFunnel.Storage.prototype.removeItem = function (key, storageOnly) {
    try {
      if (this.html5Support) {
        this.getStorage().removeItem(key);
        if (storageOnly == undefined || storageOnly == false) {
          NetFunnel.Cookie.del(key);
        }
      } else {
        NetFunnel.Cookie.del(key);
      }
      return true;
    } catch (e) {
      return false;
    }
  };
  NetFunnel.Storage.prototype.clear = function () {
    try {
      if (this.html5Support) {
        this.getStorage().clear();
      }
      return true;
    } catch (e) {
      return false;
    }
  };
  NetFunnel.MProtect = function () {
    try {
      var Storage = new NetFunnel.Storage();
      var dt = new Date();
      var ct = dt.getTime();
      var data = Storage.getItem('NFMPT.data', true);
      if (data === null) {
        data = '';
      }
      var stdData = Storage.getItem('NFMPT.stdData', true);
      if (stdData === null) {
        stdData = '';
      }
      var lastTime = parseInt(Storage.getItem('NFMPT.lastTime', true), 10);
      if (isNaN(lastTime) || lastTime === null || lastTime == '') {
        lastTime = 0;
      }
      var reqCnt = parseInt(Storage.getItem('NFMPT.reqCnt', true), 10);
      if (isNaN(reqCnt) || reqCnt === null || reqCnt == '') {
        reqCnt = 0;
      }
      var arrData = [];
      var arrStdData = [];
      if (data != '') {
        arrData = data.split(',');
      }
      if (stdData != '') {
        arrStdData = stdData.split(',');
      }
      if (lastTime != 0) {
        arrData[arrData.length] = ct - lastTime;
        arrStdData[arrStdData.length] = ct - lastTime;
      }
      lastTime = ct;
      var i = arrData.length - 1;
      var tsum = 0;
      for (; i >= 0; i--) {
        tsum += parseInt(arrData[i], 10);
        if (tsum > NetFunnel.MP_TIMELIMIT) {
          break;
        }
      }
      var j = arrStdData.length - NetFunnel.MP_DEVCNTLIMIT;
      if (j < 0) {
        j = 0;
      }
      var tArrStdData = arrStdData.slice(j);
      var tArrData = arrData.slice(i + 1);
      Storage.setItemStorageOnly('NFMPT.data', tArrData.join(','));
      Storage.setItemStorageOnly('NFMPT.stdData', tArrStdData.join(','));
      Storage.setItemStorageOnly('NFMPT.lastTime', lastTime + '');
      Storage.setItemStorageOnly('NFMPT.reqCnt', ++reqCnt + '');
      var stdDev = NetFunnel.Util.calcStdDev(tArrStdData, 0);
      if (stdDev != false && stdDev < NetFunnel.MP_DEVLIMIT) {
        return 2;
      }
      if (tArrData.length < NetFunnel.MP_MINCOUNT) {
        return 0;
      }
      if (tArrData.length + 1 > NetFunnel.MP_MAXREQLIMIT) {
        return 1;
      }
      if (reqCnt > NetFunnel.MP_REQONLYLIMIT) {
        Storage.setItemStorageOnly('NFMPT.reqCnt', '0');
        return 3;
      }
    } catch (e) {}
    return 0;
  };
  NetFunnel.ProgressBar = function (oID, oConfig, doc) {
    this._bar = null;
    this._bar2 = null;
    this._config = {};
    this._totWaitCnt = 0;
    this._wflag = 0;
    if (typeof oID == 'string') {
      this._obj = doc.getElementById(oID);
    } else {
      this._obj = oID;
    }
    this._config.width = 360;
    this._config.height = 5;
    this._config.count = 50;
    this._config.interval = 50;
    this._config.color = this._color;
    this._config.bgcolor = this._bgcolor;
    this._config.waitchk = 0;
    if (typeof oConfig == 'object') {
      for (var i in oConfig) {
        this._config[i] = oConfig[i];
      }
    }
    if (this._config.count <= 0) {
      this._config.count = 50;
    }
    this._oTable = doc.createElement('table');
    this._oTable.style.width = this._config.width + 'px';
    this._oTable.style.height = this._config.height + 'px';
    this._oTable.style.tableLayout = 'fixed';
    this._oTable.style.borderCollapse = 'separate';
    this._oTable.style.borderRadius = '20px';
    this._oTable.style.mozBorderRadius = '20px';
    this._oTable.style.overflow = 'hidden';
    this._oTable.cellPadding = 0;
    this._oTable.cellSpacing = 0;
    var tTbody = doc.createElement('tbody');
    var tRow = doc.createElement('tr');
    var tCell = doc.createElement('td');
    tCell.style.height = this._config.height + 'px';
    tCell.style.backgroundColor = this._config.bgcolor;
    var tCell2 = doc.createElement('td');
    tCell2.style.backgroundColor = this._config.bgcolor;
    tRow.appendChild(tCell);
    tRow.appendChild(tCell2);
    tTbody.appendChild(tRow);
    this._oTable.appendChild(tTbody);
    this._obj.appendChild(this._oTable);
    this._bar = tCell;
    this._bar2 = tCell2;
    this.show = function () {
      this._obj.style.visibility = 'visible';
      var myself = this;
      this._timer = setInterval(function () {
        myself._action(0);
      }, this._config.interval);
      return;
    };
    this.hide = function () {
      this._obj.style.visibility = 'hidden';
      if (this._timer) {
        clearTimeout(this._timer);
        this._timer = null;
      }
      return;
    };
    this._action = function () {
      try {
        if (this._config.waitchk != 0) {
          if (parseInt(this._config.waitchk, 10) < parseInt(NetFunnel.gLastData.nwait, 10)) {
            NetFunnel.gLastData.nwait = this._config.waitchk;
          }
        }
        if (this._wflag == 0 && NetFunnel.retryData === null) {
          this._wflag = 1;
        }
        this._oTable.style.width = this._config.width + 'px';
        if (NetFunnel.gTotWait <= 0) {
          NetFunnel.gTotWait = NetFunnel.gLastData.nwait;
        }
        if (parseInt(NetFunnel.gLastData.nwait, 10) > parseInt(NetFunnel.gTotWait, 10)) {
          NetFunnel.gTotWait = NetFunnel.gLastData.nwait;
        }
        var barSize =
          this._config.width - Math.round((NetFunnel.gLastData.nwait / NetFunnel.gTotWait) * this._config.width);
        var barSize2 = this._config.width - barSize;
        this._bar.style.width = barSize + 'px';
        this._bar.style.backgroundColor = this._config.color;
        this._bar2.style.width = barSize2 + 'px';
        this._bar2.style.backgroundColor = this._config.bgcolor;
        this._config.waitchk = NetFunnel.gLastData.nwait;
      } catch (e) {}
      return true;
    };
  };
  NetFunnel.ProgressBar.prototype._mmm = 0;
  NetFunnel.ProgressBar.prototype._curr = 0;
  NetFunnel.ProgressBar.prototype._direct = 0;
  NetFunnel.ProgressBar.prototype._obj = null;
  NetFunnel.ProgressBar.prototype._cells = null;
  NetFunnel.ProgressBar.prototype._timer = null;
  NetFunnel.ProgressBar.prototype._oTable = null;
  NetFunnel.ProgressBar.prototype._config = null;
  NetFunnel.ProgressBar.prototype._color = '#2a509b';
  NetFunnel.ProgressBar.prototype._bgcolor = '#b6dffd';
  NetFunnel.Cookie = {
    set: function (key, value, minutes, domain) {
      var tStr = key + '=' + escape(value);
      if (typeof minutes != 'undefined' && minutes.constructor == Number && minutes > 0) {
        var expire = new Date();
        expire.setMinutes(expire.getMinutes() + minutes);
        tStr += ';expires=' + expire.toGMTString();
      }
      if (typeof domain != 'undefined' && domain.constructor == String && domain != '') {
        tStr += ';domain=' + domain;
      } else {
        if (NetFunnel.TS_COOKIE_DOMAIN != '') {
          tStr += ';domain=' + NetFunnel.TS_COOKIE_DOMAIN;
        }
      }
      if (domain && location.protocol.indexOf('https') > -1) {
        tStr += ';path=/; samesite=none; secure;';
      } else {
        tStr += ';path=/;';
      }
      document.cookie = tStr;
    },
    del: function (key) {
      NetFunnel.Cookie.set(key, '', -1);
    },
    get: function (key) {
      if (document.cookie.length > 0) {
        var cStart = document.cookie.indexOf(key + '=');
        if (cStart != -1) {
          cStart = cStart + key.length + 1;
          var cEnd = document.cookie.indexOf(';', cStart);
          if (cEnd == -1) {
            cEnd = document.cookie.length;
          }
          return unescape(document.cookie.substring(cStart, cEnd));
        }
      }
      return '';
    },
  };
  NetFunnel.getUrlParameters = function (key) {
    if (typeof key != 'string' || key == '') {
      return '';
    }
    var strReturn = '';
    var strHref = document.location.href;
    if (strHref.indexOf('?') > -1) {
      var strQueryString = strHref.substr(strHref.indexOf('?'));
      var aQueryString = strQueryString.split('&');
      for (var iParam = 0; iParam < aQueryString.length; iParam++) {
        if (aQueryString[iParam].indexOf(key + '=') > -1) {
          var idx = aQueryString[iParam].indexOf(key + '=') + key.length + 1;
          strReturn = aQueryString[iParam].substr(idx);
          break;
        }
      }
    }
    return unescape(strReturn);
  };
  NetFunnel.gPop = null;
  NetFunnel.gTimer = null;
  NetFunnel.gLastData = null;
  NetFunnel.countdown_stop = function () {
    try {
      if (!NetFunnel.Util.isVirtualWait(NetFunnel.gLastData)) {
        NetFunnel.gControl.fireEvent(null, NetFunnel.gControl, 'onStop', { next: NetFunnel.gControl.next.stop });
        NetFunnel_sendStop();
        if (NetFunnel.gPop) {
          NetFunnel.gPop.hide();
          NetFunnel.gPop.destroy();
          delete NetFunnel.gPop;
          NetFunnel.gPop = null;
        }
        if (NetFunnel.gControl.getConfig('use_frame_block') == true) {
          NetFunnel.PopupUtil.hideBlockList(NetFunnel.gControl.getConfig('frame_block_list'));
        }
      }
    } catch (e) {}
  };
  NetFunnel.countdown = function () {
    if (NetFunnel.gLastData && NetFunnel.gLastData.time_left >= 0) {
      if (NetFunnel.gPop) {
        var tTime = NetFunnel.gPop.getObj('NetFunnel_Loading_Popup_TimeLeft');
        var tCount = NetFunnel.gPop.getObj('NetFunnel_Loading_Popup_Count');
        var tNext = NetFunnel.gPop.getObj('NetFunnel_Loading_Popup_NextCnt');
        if (this._gNWaitView != 0) {
          if (parseInt(this._gNWaitView, 10) < parseInt(NetFunnel.gLastData.nwait, 10)) {
            NetFunnel.gLastData.nwait = this._gNWaitView;
          }
        }
        this._gNWaitView = NetFunnel.gLastData.nwait;
        var tformat = '';
        var tformatArr = null;
        var shownextLimit = 0;
        var showcntLimit = 0;
        if (tCount) {
          showcntLimit = NetFunnel.gControl.getConfig('showcnt_limit');
          if (showcntLimit > 0 && NetFunnel.gLastData.nwait > showcntLimit) {
            tformat = tCount.className;
            if (tformat.length > 0) {
              tCount.innerHTML = tformat;
            } else {
              tCount.innerHTML = NetFunnel.TS_LIMIT_TEXT;
            }
          } else {
            tCount.innerHTML = String(NetFunnel.gLastData.nwait);
          }
        }
        if (tNext) {
          shownextLimit = NetFunnel.gControl.getConfig('shownext_limit');
          if (NetFunnel.gLastData.nnext == undefined) {
            tNext.innerHTML = '0';
          } else {
            if (shownextLimit > 0 && NetFunnel.gLastData.nnext > shownextLimit) {
              tformat = tNext.className;
              if (tformat.length > 0) {
                tNext.innerHTML = tformat;
              } else {
                tNext.innerHTML = NetFunnel.TS_LIMIT_TEXT;
              }
            } else {
              tNext.innerHTML = String(NetFunnel.gLastData.nnext);
            }
          }
        }
        if (tTime) {
          var showtimeLimit = NetFunnel.gControl.getConfig('showtime_limit');
          if (showtimeLimit > 0 && NetFunnel.gLastData.real_time_left > showtimeLimit) {
            tformat = tTime.className;
            tformatArr = tformat.split('^');
            if (tformatArr.length == 4 && tformatArr[3].length > 0) {
              tTime.innerHTML = tformatArr[3];
            } else {
              if (tTime.innerHTML.length >= 5) {
                tTime.innerHTML = '.';
              } else {
                tTime.innerHTML += '.';
              }
            }
          } else {
            tformat = tTime.className;
            if (tformat.length > 0) {
              tformatArr = tformat.split('^');
              tTime.innerHTML = NetFunnel.Util.getTimeStr(
                NetFunnel.gLastData.real_time_left,
                tformatArr[0],
                tformatArr[1],
                eval(tformatArr[2]),
              );
            } else {
              tTime.innerHTML = NetFunnel.Util.getTimeStr(NetFunnel.gLastData.real_time_left);
            }
          }
        }
        try {
          if (typeof tTime == 'object') {
            if (tTime.style.textDecoration == 'none') {
              tTime.style.textDecoration = 'underline';
            } else {
              tTime.style.textDecoration = 'none';
            }
          }
          if (typeof tTime == 'object') {
            if (tNext.style.textDecoration == 'none') {
              tNext.style.textDecoration = 'underline';
            } else {
              tNext.style.textDecoration = 'none';
            }
          }
          if (typeof tCount == 'object') {
            if (tCount.style.textDecoration == 'none') {
              tCount.style.textDecoration = 'underline';
            } else {
              tCount.style.textDecoration = 'none';
            }
          }
        } catch (e) {}
      }
    }
    if (NetFunnel.gLastData.time_left <= 0 && NetFunnel.gTimer) {
      if (NetFunnel.gPop) {
      }
      return;
    }
    var leftPerc = 0;
    var skinObj = NetFunnel.SkinUtil.get(NetFunnel.gSkinId, NetFunnel.Util.isSmartPhone());
    if (typeof skinObj.updateCallback == 'function') {
      if (parseInt(NetFunnel.gTotWait, 10) <= 0) {
        leftPerc = 0;
      } else {
        if (parseInt(NetFunnel.gTotWait, 10) < parseInt(NetFunnel.gLastData.nwait, 10)) {
          NetFunnel.gTotWait = parseInt(NetFunnel.gLastData.nwait, 10);
        }
        leftPerc = parseInt(((NetFunnel.gTotWait - NetFunnel.gLastData.nwait) * 100) / NetFunnel.gTotWait, 10);
      }
      skinObj.updateCallback(
        leftPerc,
        NetFunnel.gLastData.nwait,
        NetFunnel.gTotWait,
        NetFunnel.gLastData.real_time_left,
        true,
      );
    }
    NetFunnel.gLastData.time_left--;
    var self = this;
    NetFunnel.gTimer = setTimeout(function () {
      self.countdown();
    }, 500);
  };
  NetFunnel.SkinUtil = {
    prevID: '',
    add: function (id, obj, type) {
      try {
        if (typeof id != 'string' || id == '') {
          return false;
        }
        if (typeof obj != 'object') {
          return false;
        }
        if (typeof type != 'string' || type == '') {
          type = 'normal';
        }
        if (typeof NetFunnel.Skin[id] != 'object') {
          NetFunnel.Skin[id] = {};
        }
        NetFunnel.Skin[id][type] = obj;
        NetFunnel.gLastSkinID = id;
        return true;
      } catch (e) {
        return false;
      }
    },
    get: function (id, isMobile) {
      try {
        if (typeof id != 'string' || id == '') {
          id = NetFunnel.gLastSkinID;
        }
        var type = 'normal';
        if (NetFunnel.gUseMobileUI == true && isMobile == true) {
          type = 'mobile';
        }
        if (typeof NetFunnel.Skin[id] == 'object' && typeof NetFunnel.Skin[id][type] == 'object') {
          return NetFunnel.Skin[id][type];
        }
        if (NetFunnel.TS_SKIN_ID != '' && NetFunnel.TS_SKIN_ID != id) {
          if (
            typeof NetFunnel.Skin[NetFunnel.TS_SKIN_ID] == 'object' &&
            typeof NetFunnel.Skin[NetFunnel.TS_SKIN_ID][type] == 'object'
          ) {
            return NetFunnel.Skin[NetFunnel.TS_SKIN_ID][type];
          }
        }
        return NetFunnel.Skin['default'][type];
      } catch (e) {}
      return NetFunnel.Skin['default']['normal'];
    },
  };
  NetFunnel.SkinUtil.add(
    'default',
    {
      htmlStr:
        ' 			<div id="NetFunnel_Skin_Top" style="background-color:#ffffff;border:1px solid #9ab6c4;overflow:hidden;width:250px;-moz-border-radius: 5px; -webkit-border-radius: 5px; -khtml-border-radius: 5px; border-radius: 5px;" > 				<div style="background-color:#ffffff;border:6px solid #eaeff3;-moz-border-radius: 5px; -webkit-border-radius: 5px; -khtml-border-radius: 5px; border-radius: 5px;"> 					<div style="text-align:right;padding-top:5px;padding-right:5px;line-height:25px;"> 					</div>					<div style="padding-top:5px;padding-left:5px;padding-right:5px"> 						<div style="box-sizing:initial;text-align:center;font-size:12pt;color:#001f6c;height:22px"><b><span style="color:#013dc1">접속대기 중</span>입니다.</b></div> 						<div style="box-sizing:initial;text-align:right;font-size:9pt;color:#4d4b4c;padding-top:4px;height:17px;" ><b>예상시간 : <span id="NetFunnel_Loading_Popup_TimeLeft" class="%M분 %02S초^ ^false"></span></b></div> 						<div style="box-sizing:initial;padding-top:6px;padding-bottom:6px;vertical-align:center;width:228px" id="NetFunnel_Loading_Popup_Progressbar"></div> 						<div style="background-color:#ededed;padding-bottom:8px;overflow:hidden;width:228px"> 							<div style="padding-left:5px"> 								<div style="box-sizing:initial;text-align:center;font-size:8pt;color:#4d4b4c;padding:3px;padding-top:10px;padding-bottom:10px;height:10px">앞에 <b><span style="color:#2a509b"><span id="NetFunnel_Loading_Popup_Count" class="' +
        NetFunnel.TS_LIMIT_TEXT +
        '"></span></span></b> 명, 뒤에 <b><span style="color:#2a509b"><span id="NetFunnel_Loading_Popup_NextCnt" class="' +
        NetFunnel.TS_LIMIT_TEXT +
        '"></span></span></b> 명의 대기자가 있습니다.</div> 								<div style="box-sizing:initial;text-align:center;font-size:8pt;color:#4d4b4c;padding:3px;height:12px">현재 접속자가 많아 대기 중이며</div> 								<div style="box-sizing:initial;text-align:center;font-size:8pt;color:#4d4b4c;padding:3px;height:10px;">잠시만 기다리시면</div> 								<div style="box-sizing:initial;text-align:center;font-size:8pt;color:#4d4b4c;padding:3px;height:10px;">서비스로 자동 접속 됩니다.</div> 								<div style="box-sizing:initial;text-align:center;font-size:9pt;color:#2a509b;padding-top:10px;"> 									<b>[<span id="NetFunnel_Countdown_Stop" style="cursor:pointer">중지</span>]</b> 								</div> 							</div> 						</div> 					<div style="height:5px;"></div> 				</div> 			</div>',
    },
    'mobile',
  );
  NetFunnel.tstr =
    '	<div id="NetFunnel_Skin_Top" style="background-color:#ffffff;border:1px solid #9ab6c4;width:458px;-moz-border-radius: 5px; -webkit-border-radius: 5px; -khtml-border-radius: 5px; border-radius: 5px;"> 		<div style="background-color:#ffffff;border:6px solid #eaeff3;-moz-border-radius: 5px; -webkit-border-radius: 5px; -khtml-border-radius: 5px; border-radius: 5px;"> 			<div style="text-align:right;padding-top:5px;padding-right:5px;line-height:25px;"> 			<b><span id="NetFunnel_Loding_Popup_Debug_Alerts" style="text-align:left;color:#ff0000"></span></b> 			<span style="text-align:right;"><a href="' +
    NetFunnel.gLogoURL +
    '" target="_blank" style="cursor:pointer;text-decoration:none;">';
  if (
    (NetFunnel.BrowserDetect.browser == 'Explorer' && NetFunnel.BrowserDetect.version == '6') ||
    NetFunnel.gLogoData == ''
  ) {
    NetFunnel.tstr += '<b style="font-size:12px;">' + NetFunnel.gLogoText + '</b></a>';
  } else {
    NetFunnel.tstr +=
      '<b style="font-size:12px;">' +
      NetFunnel.gLogoText +
      '</b><img style="width:38px;height:16px;color:black;font-size:11px;" border=0 src="data:image/gif;base64,' +
      NetFunnel.gLogoData +
      '" ></a>';
  }
  NetFunnel.tstr +=
    '</span></div> 			<div style="padding-top:0px;padding-left:25px;padding-right:25px"> 				<div style="box-sizing:initial;text-align:left;font-size:12pt;color:#001f6c;height:22px"><b>서비스 <span style="color:#013dc1">접속대기 중</span>입니다.</b></div> 				<div style="box-sizing:initial;text-align:right;font-size:9pt;color:#4d4b4c;padding-top:4px;height:17px" ><b>예상대기시간 : <span id="NetFunnel_Loading_Popup_TimeLeft" class="%H시간 %M분 %02S초^ ^false"></span></b></div> 				<div style="box-sizing:initial;padding-top:6px;padding-bottom:6px;vertical-align:center;width:400px;height:20px" id="NetFunnel_Loading_Popup_Progressbar"></div> 				<div style="box-sizing:initial;background-color:#ededed;width:400px;padding-bottom:8px;overflow:hidden"> 					<div style="padding-left:5px"> 						<div style="box-sizing:initial;text-align:left;font-size:8pt;color:#4d4b4c;padding:3px;padding-top:10px;height:10px">고객님 앞에 <b><span style="color:#2a509b"><span id="NetFunnel_Loading_Popup_Count" class="' +
    NetFunnel.TS_LIMIT_TEXT +
    '"></span></span></b> 명, 뒤에 <b><span style="color:#2a509b"><span id="NetFunnel_Loading_Popup_NextCnt" class="' +
    NetFunnel.TS_LIMIT_TEXT +
    '"></span></span></b> 명의 대기자가 있습니다.  </div> 						<div style="box-sizing:initial;text-align:left;font-size:8pt;color:#4d4b4c;padding:3px;height:10px">현재 접속 사용자가 많아 대기 중이며, 잠시만 기다리시면 </div> 						<div style="box-sizing:initial;text-align:left;font-size:8pt;color:#4d4b4c;padding:3px;height:10px;">서비스로 자동 접속 됩니다.</div> 						<div style="box-sizing:initial;text-align:center;font-size:9pt;color:#2a509b;padding-top:10px;"> 							<b>※ 재 접속하시면 대기시간이 더 길어집니다. <span id="NetFunnel_Countdown_Stop" style="cursor:pointer">[중지]</span> </b> 						</div> 					</div> 				</div> 				<div style="height:5px;"></div> 			</div> 		</div> 	</div>';
  NetFunnel.SkinUtil.add('default', { htmlStr: NetFunnel.tstr }, 'normal');
  NetFunnel.PopupSetup = function (type, ret, skinid) {
    if (skinid === null || skinid == '') {
      skinid = NetFunnel.gSkinId;
    }
    var skinObj = NetFunnel.SkinUtil.get(skinid, NetFunnel.Util.isSmartPhone());
    switch (type) {
      case 'vcontinue':
        ret.data.nwait = 1000000;
        ret.data.ttl = '2';
        ret.data.tps = 1;
        break;
      case 'continue':
        break;
      case 'alert':
        break;
      default:
        break;
    }
    if (type != 'alert' && typeof ret == 'object') {
      NetFunnel.gLastData = ret.data;
      NetFunnel.gLastData.time_left = parseInt(ret.data.ttl, 10);
      NetFunnel.gLastData.tps = parseInt(ret.data.tps, 10);
      if (NetFunnel.gLastData.tps == 0) {
        NetFunnel.gLastData.tps = 1;
      }
      NetFunnel.gLastData.real_time_left = Math.round(parseInt(ret.data.nwait, 10) / NetFunnel.gLastData.tps);
      if (NetFunnel.gLastData.real_time_left < 1) {
        NetFunnel.gLastData.real_time_left = 1;
      }
      if (NetFunnel.gPrevWaitTime > -1 && NetFunnel.gLastData.real_time_left > NetFunnel.gPrevWaitTime) {
        NetFunnel.gLastData.real_time_left = NetFunnel.gPrevWaitTime;
      }
      NetFunnel.gPrevWaitTime = NetFunnel.gLastData.real_time_left;
      if (NetFunnel.gTotWait < 0) {
        NetFunnel.gTotWait = NetFunnel.gLastData.nwait;
      }
    }
    if (!NetFunnel.gPop) {
      NetFunnel.gPop = new NetFunnel.Popup(
        skinObj.htmlStr,
        NetFunnel.gPopupTop,
        NetFunnel.gPopupLeft,
        NetFunnel.gControl.getConfig('popup_target'),
        false,
        false,
        NetFunnel.gControl.getConfig('popup_zindex'),
      );
      if (typeof skinObj.prepareCallback == 'function') {
        skinObj.prepareCallback();
      }
      this._gNWaitView = 0;
    }
    NetFunnel.gPop.show();
    var tDAlert = null;
    if (NetFunnel.gPop.getObj('NetFunnel_Loding_Popup_Debug_Alerts')) {
      if (NetFunnel.gDebugflag) {
        tDAlert = NetFunnel.gPop.getObj('NetFunnel_Loding_Popup_Debug_Alerts');
        tDAlert.innerHTML = ' Debug Mode ';
      } else {
        tDAlert = NetFunnel.gPop.getObj('NetFunnel_Loding_Popup_Debug_Alerts');
        tDAlert.innerHTML = '';
      }
    }
    if (NetFunnel.gControl.getConfig('use_frame_block') == true) {
      NetFunnel.PopupUtil.showBlockList(NetFunnel.gControl.getConfig('frame_block_list'));
    }
    if (type != 'alert') {
      NetFunnel.countdown();
    }
  };
  NetFunnel.DefaultCallback = {
    onSuccess: function (ev, ret, obj) {
      if (NetFunnel.gTimer) {
        clearTimeout(NetFunnel.gTimer);
      }
      if (NetFunnel.gPop && !obj.getConfig('success_popup_visibility')) {
        NetFunnel.gPop.hide();
        NetFunnel.gPop.destroy();
        delete NetFunnel.gPop;
        NetFunnel.gPop = null;
      }
      if (obj.getConfig('use_frame_block') == true) {
        NetFunnel.PopupUtil.hideBlockList(obj.getConfig('frame_block_list'));
      }
      if (typeof ret.next == 'string' && ret.next != '') {
        document.location.href = ret.next;
      } else {
        if (typeof ret.next == 'function') {
          DefaultCallback_onSuccess(ev, ret, obj);
        }
      }
    },
    onContinued: function (ev, ret) {
      if (typeof ret.next == 'string') {
        document.location.href = ret.next;
        return;
      }
      if (typeof ret.next == 'function') {
        if (ret.next(ev, ret) == false) {
          return;
        }
      }
      if (ret.rtype == NetFunnel.RTYPE_CHK_ENTER || ret.rtype == NetFunnel.RTYPE_GET_TID_CHK_ENTER) {
        if (NetFunnel.gTimer) {
          clearTimeout(NetFunnel.gTimer);
        }
        NetFunnel.PopupSetup('continue', ret, NetFunnel.gSkinId);
      }
    },
    onError: function (ev, ret, obj) {
      if (NetFunnel.gPop) {
        NetFunnel.gPop.hide();
        NetFunnel.gPop.destroy();
        delete NetFunnel.gPop;
        NetFunnel.gPop = null;
      }
      if (obj.getConfig('use_frame_block') == true) {
        NetFunnel.PopupUtil.hideBlockList(obj.getConfig('frame_block_list'));
      }
      if (typeof ret.next == 'string' && ret.next != '') {
        document.location.href = ret.next;
        return;
      }
      if (typeof ret.next == 'function') {
        if (ret.next(ev, ret) == false) {
          return;
        }
      }
    },
    onStop: function (ev, ret) {
      if (typeof ret.next == 'string' && ret.next != '') {
        document.location.href = ret.next;
        return;
      }
      if (typeof ret.next == 'function') {
        if (ret.next(ev, ret) == false) {
          return;
        }
      }
    },
    onBypass: function (ev, ret, obj) {
      if (NetFunnel.gTimer) {
        clearTimeout(NetFunnel.gTimer);
      }
      if (NetFunnel.gPop) {
        NetFunnel.gPop.hide();
        NetFunnel.gPop.destroy();
        delete NetFunnel.gPop;
        NetFunnel.gPop = null;
      }
      if (obj.getConfig('use_frame_block') == true) {
        NetFunnel.PopupUtil.hideBlockList(obj.getConfig('frame_block_list'));
      }
      if (typeof ret.next == 'string' && ret.next != '') {
        document.location.href = ret.next;
        return;
      }
      if (typeof ret.next == 'function') {
        if (ret.next(ev, ret) == false) {
          return;
        }
      }
    },
    onExpressnumber: function (ev, ret, obj) {
      if (NetFunnel.gTimer) {
        clearTimeout(NetFunnel.gTimer);
      }
      if (NetFunnel.gPop) {
        NetFunnel.gPop.hide();
        NetFunnel.gPop.destroy();
        delete NetFunnel.gPop;
        NetFunnel.gPop = null;
      }
      if (obj.getConfig('use_frame_block') == true) {
        NetFunnel.PopupUtil.hideBlockList(obj.getConfig('frame_block_list'));
      }
      if (typeof ret.next == 'string' && ret.next != '') {
        document.location.href = ret.next;
        return;
      }
      if (typeof ret.next == 'function') {
        if (ret.next(ev, ret) == false) {
          return;
        }
      }
    },
    onBlock: function (ev, ret, obj) {
      if (NetFunnel.gTimer) {
        clearTimeout(NetFunnel.gTimer);
      }
      if (NetFunnel.gPop) {
        NetFunnel.gPop.hide();
        NetFunnel.gPop.destroy();
        delete NetFunnel.gPop;
        NetFunnel.gPop = null;
      }
      if (typeof ret.next == 'string' && ret.next != '') {
        document.location.href = ret.next;
        return;
      }
      if (typeof ret.next == 'function') {
        if (ret.next(ev, ret) == false) {
          return;
        }
      }
      if (typeof obj.getConfig('block_url') != 'string' || obj.getConfig('block_url') == '') {
        if (obj.getConfig('block_msg') == '' || typeof obj.getConfig('block_msg') != 'string') {
          alert('[NetFUNNEL]Service Block!');
        } else {
          alert(obj.getConfig('block_msg'));
        }
        return;
      }
      document.location.href = obj.getConfig('block_url');
    },
    onIpBlock: function (ev, ret) {
      if (typeof ret.next == 'string') {
        document.location.href = ret.next;
        return;
      }
      if (typeof ret.next == 'function') {
        if (ret.next(ev, ret) == false) {
          return;
        }
      }
      if (NetFunnel.gTimer) {
        clearTimeout(NetFunnel.gTimer);
      }
      NetFunnel.PopupSetup('vcontinue', ret, NetFunnel.gSkinId);
    },
  };
  NetFunnel.Event = function () {
    this.events = [];
    this.builtinEvts = [];
  };
  NetFunnel.Event.prototype.getActionIdx = function (obj, evt, action, binding) {
    if (obj && evt) {
      var curel = this.events[obj][evt];
      if (curel) {
        var len = curel.length;
        for (var i = len - 1; i >= 0; i--) {
          if (curel[i].action == action && curel[i].binding == binding) {
            return i;
          }
        }
      } else {
        return -1;
      }
    }
    return -1;
  };
  NetFunnel.Event.prototype.addListener = function (obj, evt, action, binding) {
    if (this.events[obj]) {
      if (this.events[obj][evt]) {
        if (this.getActionIdx(obj, evt, action, binding) == -1) {
          var curevt = this.events[obj][evt];
          curevt[curevt.length] = { action: action, binding: binding };
        }
      } else {
        this.events[obj][evt] = [];
        this.events[obj][evt][0] = { action: action, binding: binding };
      }
    } else {
      this.events[obj] = [];
      this.events[obj][evt] = [];
      this.events[obj][evt][0] = { action: action, binding: binding };
    }
  };
  NetFunnel.Event.prototype.removeListener = function (obj, evt, action, binding) {
    if (this.events[obj]) {
      if (this.events[obj][evt]) {
        var idx = this.actionExists(obj, evt, action, binding);
        if (idx >= 0) {
          this.events[obj][evt].splice(idx, 1);
        }
      }
    }
  };
  NetFunnel.Event.prototype.fireEvent = function (e, obj, evt, args) {
    if (!e) {
      e = window.event;
    }
    if (obj && this.events) {
      var evtel = this.events[obj];
      if (evtel) {
        var curel = evtel[evt];
        if (curel) {
          for (var act = 0; curel.length > act; act++) {
            var action = curel[act].action;
            if (curel[act].binding) {
              action = action.bind(curel[act].binding);
            }
            action(e, args, obj);
          }
        }
      }
    }
  };
  NetFunnel.gPopup = [];
  NetFunnel.PopupUtil = {
    getViewportHeight: function (win, doc) {
      if (win.innerHeight != win.undefined) {
        return win.innerHeight;
      }
      if (doc.compatMode == 'CSS1Compat') {
        return doc.documentElement.clientHeight;
      }
      if (doc.body) {
        return doc.body.clientHeight;
      }
      return win.undefined;
    },
    getViewportWidth: function (win, doc) {
      if (win.innerWidth != win.undefined) {
        return win.innerWidth;
      }
      if (doc.compatMode == 'CSS1Compat') {
        return doc.documentElement.clientWidth;
      }
      if (doc.body) {
        return doc.body.clientWidth;
      }
      return 0;
    },
    getScrollTop: function (doc) {
      if (doc.pageYOffset) {
        return doc.pageYOffset;
      } else {
        if (doc.documentElement && typeof doc.documentElement.scrollTop == 'number') {
          return doc.documentElement.scrollTop;
        } else {
          if (doc.body) {
            return doc.body.scrollTop;
          }
        }
      }
      return 0;
    },
    getScrollLeft: function (doc) {
      if (doc.pageXOffset) {
        return doc.pageXOffset;
      } else {
        if (doc.documentElement && typeof doc.documentElement.scrollLeft == 'number') {
          return doc.documentElement.scrollLeft;
        } else {
          if (doc.body) {
            return doc.body.scrollLeft;
          }
        }
      }
      return 0;
    },
    resizePopup: function () {
      for (var i = 0; NetFunnel.gPopup.length > i; i++) {
        NetFunnel.gPopup[i]._centerPopWin();
      }
    },
    getObjWidth: function (obj) {
      if (!obj) {
        return 0;
      }
      var width = 0;
      if (parseInt(obj.style.width, 10) > parseInt(obj.offsetWidth, 10)) {
        width = parseInt(obj.style.width, 10);
      } else {
        width = obj.offsetWidth;
      }
      return width;
    },
    getObjHeight: function (obj) {
      if (!obj) {
        return 0;
      }
      var height = 0;
      if (parseInt(obj.style.height, 10) > parseInt(obj.offsetHeight, 10)) {
        height = parseInt(obj.style.height, 10);
      } else {
        height = obj.offsetHeight;
      }
      return height;
    },
    showBlockList: function (blockList) {
      for (var i = 0; i < blockList.length; i++) {
        try {
          var tdata = blockList[i];
          tdata.popup = new NetFunnel.Popup(
            '',
            NetFunnel.gPopupTop,
            NetFunnel.gPopupLeft,
            tdata.win,
            false,
            false,
            NetFunnel.gControl.getConfig('popup_zindex'),
          );
          tdata.popup.show();
        } catch (e) {}
      }
    },
    hideBlockList: function (blockList) {
      for (var i = 0; i < blockList.length; i++) {
        try {
          var tdata = blockList[i];
          if (tdata.popup) {
            tdata.popup.hide();
            tdata.popup.destroy();
            delete tdata.popup;
            tdata.popup = null;
          }
        } catch (e) {}
      }
    },
    hideWaitPopup: function () {
      if (typeof NetFunnel == 'object') {
        if (NetFunnel.gWaitPop) {
          NetFunnel.gWaitPop.hide();
          NetFunnel.gWaitPop.destroy();
          NetFunnel.gWaitPop = null;
        }
      }
    },
    showWaitPopup: function () {
      if (typeof NetFunnel == 'object') {
        var tstr = '<div style="padding:2px;border:1px solid darkgray;"> 				<table> 					<tr>';
        if (NetFunnel.BrowserDetect.browser == 'Explorer' && NetFunnel.BrowserDetect.version == '6') {
          tstr += '<td></td>';
        } else {
          tstr += '<td><img style="" border=0 src="data:image/gif;base64,' + NetFunnel.gPreWaitData + '" ></td>';
        }
        tstr += '	<td style="valign:middle;font-size:9pt">wait...</td> 					</tr> 				</table> 			</div>';
        NetFunnel.gWaitPop = new NetFunnel.Popup(
          tstr,
          false,
          false,
          NetFunnel.gControl,
          true,
          'NetFunnel_Waiting_Popup',
          NetFunnel.gControl.getConfig('popup_zindex'),
        );
        NetFunnel.gWaitPop.show();
      }
    },
    getDocumentEntireHeight: function (doc) {
      var body = doc.body,
        html = doc.documentElement;
      var height = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight,
      );
      return height;
    },
  };
  NetFunnel.Popup = function (content, top, left, winobj, waiting, objId, zindex) {
    if (typeof winobj == 'object') {
      this._mWin = winobj;
      if (typeof winobj.document == 'object') {
        this._mDoc = winobj.document;
      } else {
        this._mWin = window;
        this._mDoc = document;
      }
    } else {
      this._mWin = window;
      this._mDoc = document;
    }
    if (typeof waiting != 'boolean') {
      waiting = false;
    }
    if (typeof objId != 'string') {
      objId = 'NetFunnel_Loading_Popup';
    }
    if (typeof zindex != 'undefined' && !isNaN(zindex)) {
      this._mZindex = zindex;
    }
    var theBody = this._mDoc.getElementsByTagName('BODY')[0];
    if (!theBody) {
      return;
    }
    var tObj = this._mDoc.getElementById(objId);
    if (!tObj || NetFunnel.SkinUtil.prevID != NetFunnel.gSkinId) {
      tObj = this._mDoc.createElement('div');
      tObj.id = objId;
      tObj.style.display = 'none';
      tObj.style.top = 0;
      tObj.style.left = 0;
      tObj.innerHTML = content;
      theBody.appendChild(tObj);
      var tObjCtBusy = this._mDoc.getElementById('NetFunnel_Loading_Popup_Progressbar');
      if (tObjCtBusy) {
        var tConfig = { count: 50, interval: 50 };
        var busyWidth = parseInt(tObjCtBusy.style.width, 10);
        var busyHeight = parseInt(tObjCtBusy.style.height, 10);
        if (!isNaN(busyWidth)) {
          tConfig.width = busyWidth;
        }
        if (!isNaN(busyHeight)) {
          tConfig.height = busyHeight;
        }
        var busybox = new NetFunnel.ProgressBar(tObjCtBusy, tConfig, this._mDoc);
        busybox.show();
        this._mProgress = busybox;
      }
      var tObjStopBtn = this._mDoc.getElementById('NetFunnel_Countdown_Stop');
      if (tObjStopBtn) {
        tObjStopBtn.onclick = NetFunnel.countdown_stop;
      }
      this.new_draw = true;
    }
    NetFunnel.SkinUtil.prevID = NetFunnel.gSkinId;
    var popmask = this._mDoc.getElementById('mpopup_bg');
    var popiframe = this._mDoc.getElementById('pop_iframe');
    if (!popmask) {
      popmask = this._mDoc.createElement('div');
      popmask.id = 'mpopup_bg';
      popmask.innerHTML = "<div style='width:100%; height:100%'>&nbsp;</div>";
      popmask.style.position = 'absolute';
      popmask.style.zIndex = this._mZindex + 1;
      popmask.style.top = '0px';
      popmask.style.left = '0px';
      popmask.style.width = '100%';
      popmask.style.height = '100%';
      popmask.style.margin = '0';
      popmask.style.padding = '0';
      popmask.style.border = '0px solid black';
      popmask.fontSize = '0';
      theBody.appendChild(popmask);
    }
    if (!popiframe) {
      popiframe = this._mDoc.createElement('div');
      popiframe.id = 'pop_iframe';
      popiframe.frameborder = '0';
      popiframe.border = '0';
      popiframe.framespacing = '0';
      popiframe.marginheight = '0';
      popiframe.marginwidth = '0';
      if (waiting) {
        popiframe.style.opacity = '0';
        popiframe.style.filter = 'alpha(opacity=0)';
      } else {
        popiframe.style.opacity = '0.5';
        popiframe.style.filter = 'alpha(opacity=50)';
      }
      popiframe.style.zIndex = this._mZindex;
      popiframe.style.top = '0px';
      popiframe.style.left = '0px';
      popiframe.style.width = '100%';
      popiframe.style.height = '100%';
      popiframe.style.position = 'fixed';
      popiframe.style.border = '0px solid #FFFFFF';
      popiframe.style.backgroundColor = '#FFFFFF';
      theBody = this._mDoc.getElementsByTagName('BODY')[0];
      theBody.appendChild(popiframe);
    }
    tObj.style.position = 'absolute';
    tObj.style.visibility = 'hidden';
    this._mCount++;
    this._mMask = popmask;
    this._mPopIFrame = popiframe;
    this._mObj = tObj;
    this._mTop = top;
    this._mLeft = left;
    this.mid = 'mpopup_' + this._mCount;
    this.addListener(this._mWin, 'resize', NetFunnel.PopupUtil.resizePopup);
    NetFunnel.gPopup.push(this);
  };
  NetFunnel.Popup.prototype = new NetFunnel.Event();
  NetFunnel.Popup.prototype._mCount = 0;
  NetFunnel.Popup.prototype._mid = '';
  NetFunnel.Popup.prototype._mWin = window;
  NetFunnel.Popup.prototype._mDoc = document;
  NetFunnel.Popup.prototype._mObj = null;
  NetFunnel.Popup.prototype._mMask = null;
  NetFunnel.Popup.prototype._mPopIFrame = null;
  NetFunnel.Popup.prototype._mIsShown = false;
  NetFunnel.Popup.prototype._mIframeResize = NetFunnel.TS_IFRAME_RESIZE;
  NetFunnel.Popup.prototype._mProgress = null;
  NetFunnel.Popup.prototype._mZindex = NetFunnel.TS_POPUP_ZINDEX;
  NetFunnel.Popup.prototype._centerPopWin = function () {
    if (this._mIsShown) {
      var theBody = this._mDoc.getElementsByTagName('BODY')[0];
      if (!theBody) {
        return;
      }
      var doc;
      if (NetFunnel.Util.isSmartPhone() == true) {
        doc = window;
      } else {
        if (NetFunnel.BrowserDetect.browser == 'Explorer') {
          doc = this._mDoc;
        } else {
          doc = this._mWin;
        }
      }
      var scTop = parseInt(NetFunnel.PopupUtil.getScrollTop(doc), 10);
      var scLeft = parseInt(theBody.scrollLeft, 10);
      var fullHeight = 0;
      if (NetFunnel.Util.isSmartPhone() == true) {
        fullHeight = NetFunnel.PopupUtil.getViewportHeight(window, this._mDoc);
      } else {
        fullHeight = NetFunnel.PopupUtil.getViewportHeight(this._mWin, this._mDoc);
      }
      var fullWidth = NetFunnel.PopupUtil.getViewportWidth(this._mWin, this._mDoc);
      if (typeof this._mTop == 'number') {
        this._mObj.style.top = this._mTop + 'px';
      } else {
        this._mObj.style.top = scTop + (fullHeight - NetFunnel.PopupUtil.getObjHeight(this._mObj)) / 2 + 'px';
      }
      if (typeof this._mLeft == 'number') {
        this._mObj.style.left = this._mLeft + 'px';
      } else {
        this._mObj.style.left = scLeft + (fullWidth - NetFunnel.PopupUtil.getObjWidth(this._mObj)) / 2 + 'px';
      }
      if (this._mIframeResize && typeof this._mPopIFrame == 'object') {
        this._mPopIFrame.style.top = this._mObj.style.top;
        this._mPopIFrame.style.left = this._mObj.style.left;
        this._mPopIFrame.style.width = this._mObj.style.width;
        this._mPopIFrame.style.height = parseInt(this._mObj.style.height, 10) + 6;
      }
    }
  };
  NetFunnel.Popup.prototype.getObj = function (id) {
    return this._mDoc.getElementById(id);
  };
  NetFunnel.Popup.prototype.show = function () {
    var theBody = this._mDoc.getElementsByTagName('BODY')[0];
    if (!theBody) {
      return;
    }
    theBody.style.overflow = 'auto';
    this._mObj.style.zIndex = this._mZindex + 2;
    this._mObj.style.visibility = 'visible';
    this._mObj.style.display = 'block';
    this._mMask.style.visiblity = 'visible';
    this._mMask.style.display = 'block';
    this._mPopIFrame.style.visiblity = 'visible';
    this._mPopIFrame.style.display = 'block';
    this._mIsShown = true;
    this._centerPopWin();
  };
  NetFunnel.Popup.prototype.hide = function () {
    var theBody = this._mDoc.getElementsByTagName('BODY')[0];
    if (!theBody) {
      return;
    }
    theBody.style.overflow = 'auto';
    this._mObj.style.visibility = 'hidden';
    this._mObj.style.display = 'none';
    this._mMask.style.visiblity = 'hidden';
    this._mMask.style.display = 'none';
    this._mPopIFrame.style.visiblity = 'hidden';
    this._mPopIFrame.style.display = 'none';
    this._mIsShown = false;
  };
  NetFunnel.Popup.prototype.destroy = function () {
    var theBody = this._mDoc.getElementsByTagName('BODY')[0];
    if (!theBody) {
      return;
    }
    var tsize = NetFunnel.gPopup.length;
    try {
      var popmask = this._mDoc.getElementById('mpopup_bg');
      theBody.removeChild(popmask);
    } catch (e) {}
    try {
      var popiframe = this._mDoc.getElementById('pop_iframe');
      theBody.removeChild(popiframe);
    } catch (e) {}
    for (var i = 0; i < tsize; i++) {
      var tObj = NetFunnel.gPopup.pop();
      if (tObj.mid == this.mid) {
        try {
          theBody.removeChild(tObj._mObj);
        } catch (e) {}
        continue;
      }
      NetFunnel.gPopup.push(tObj);
    }
    if (this._mProgress) {
      this._mProgress.hide();
    }
  };
  NetFunnel.RetVal = function (str) {
    this._mParam = {};
    this._mRtype = parseInt(str.substr(0, 4), 10);
    this._mCode = parseInt(str.substr(5, 3), 10);
    this._mRetStr = str.substr(9, str.length - 9);
    this._parse();
  };
  NetFunnel.RetVal.prototype._ltrim = function (str) {
    var k = 0;
    for (; k < str.length && this._isWhitespace(str.charAt(k)); k++) {
      continue;
    }
    return str.substring(k, str.length);
  };
  NetFunnel.RetVal.prototype._rtrim = function (str) {
    var j = str.length - 1;
    for (; j >= 0 && this._isWhitespace(str.charAt(j)); j--) {
      continue;
    }
    return str.substring(0, j + 1);
  };
  NetFunnel.RetVal.prototype._trim = function (str) {
    return this._ltrim(this._rtrim(str));
  };
  NetFunnel.RetVal.prototype._isWhitespace = function (charToCheck) {
    var whitespaceChars = ' \t\n\r\f';
    return whitespaceChars.indexOf(charToCheck) != -1;
  };
  NetFunnel.RetVal.prototype._parse = function () {
    var temp = '';
    var key = '';
    var value = '';
    var titem = this._mRetStr.split('&');
    for (var i = 0; titem.length > i; i++) {
      temp = titem[i].split('=');
      if (temp.length > 1) {
        key = this._trim(temp[0]);
        value = this._trim(temp[1]);
        this._mParam[key] = value;
      }
    }
  };
  NetFunnel.RetVal.prototype.getRetCode = function () {
    return this._mCode;
  };
  NetFunnel.RetVal.prototype.setRetCode = function (inCode) {
    this._mCode = inCode;
    return this._mCode;
  };
  NetFunnel.RetVal.prototype.getReqType = function () {
    return this._mRtype;
  };
  NetFunnel.RetVal.prototype.setReqType = function (inType) {
    this._mRtype = inType;
    return this._mRtype;
  };
  NetFunnel.RetVal.prototype.getRetStr = function () {
    return this._mRetStr;
  };
  NetFunnel.RetVal.prototype.getValue = function (key) {
    try {
      return this._mParam[key];
    } catch (e) {
      return null;
    }
  };
  NetFunnel.RetVal.prototype.setValue = function (key, value) {
    var oldValue = null;
    try {
      if (this.isKeyExist(key)) {
        oldValue = this.getValue(key);
      }
      this._mParam[key] = value;
      return oldValue;
    } catch (e) {
      return null;
    }
  };
  NetFunnel.RetVal.prototype.getNumber = function (key) {
    try {
      return parseInt(this._mParam[key], 10);
    } catch (e) {
      return 0;
    }
  };
  NetFunnel.RetVal.prototype.isKeyExist = function (key) {
    try {
      if (this._mParam[key] !== null) {
        return true;
      }
    } catch (e) {}
    return false;
  };
  NetFunnel.RetVal.prototype.getParam = function () {
    return this._mParam;
  };
  NetFunnel.TsClient = function (oConfigs, oCallbacks) {
    this.mConfig = {};
    this.mConfig.host = NetFunnel.TS_HOST;
    this.mConfig.port = NetFunnel.TS_PORT;
    this.mConfig.proto = NetFunnel.TS_PROTO;
    this.mConfig.query = NetFunnel.TS_QUERY;
    this.mConfig.max_ttl = NetFunnel.TS_MAX_TTL;
    this.mConfig.conn_timeout = NetFunnel.TS_CONN_TIMEOUT;
    this.mConfig.conn_retry = NetFunnel.TS_CONN_RETRY;
    this.mConfig.cookie_id = NetFunnel.TS_COOKIE_ID;
    this.mConfig.cookie_time = NetFunnel.TS_COOKIE_TIME;
    this.mConfig.cookie_domain = NetFunnel.TS_COOKIE_DOMAIN;
    this.mConfig.showcnt_limit = NetFunnel.TS_SHOWCNT_LIMIT;
    this.mConfig.showtime_limit = NetFunnel.TS_SHOWTIME_LIMIT;
    this.mConfig.shownext_limit = NetFunnel.TS_SHOWNEXT_LIMIT;
    this.mConfig.popup_top = NetFunnel.TS_POPUP_TOP;
    this.mConfig.popup_left = NetFunnel.TS_POPUP_LEFT;
    this.mConfig.skin_id = NetFunnel.TS_SKIN_ID;
    this.mConfig.use_unfocus = NetFunnel.TS_USE_UNFOCUS;
    this.mConfig.virt_wait = NetFunnel.TS_VIRT_WAIT;
    this.mConfig.use_mobile_ui = NetFunnel.TS_USE_MOBILE_UI;
    this.mConfig.mp_use = NetFunnel.MP_USE;
    this.mConfig.use_frame_block = NetFunnel.TS_USE_FRAME_BLOCK;
    this.mConfig.frame_block_list = NetFunnel.TS_FRAME_BLOCK_LIST;
    this.mConfig.use_pre_wait = NetFunnel.TS_USE_PRE_WAIT;
    this.mConfig.popup_target = NetFunnel.TS_POPUP_TARGET;
    this.mConfig.user_data = false;
    this.mConfig.user_data_keys = NetFunnel.TS_USER_DATA_KEYS;
    this.mConfig.block_msg = NetFunnel.TS_BLOCK_MSG;
    this.mConfig.block_url = NetFunnel.TS_BLOCK_URL;
    this.mConfig.ipblock_wait_count = NetFunnel.TS_IPBLOCK_WAIT_COUNT;
    this.mConfig.ipblock_wait_time = NetFunnel.TS_IPBLOCK_WAIT_TIME;
    this.mConfig.service_id = NetFunnel.TS_SERVICE_ID;
    this.mConfig.action_id = NetFunnel.TS_ACTION_ID;
    this.mConfig.show_wait_popup = NetFunnel.TS_SHOW_WAIT_POPUP;
    this.mConfig.config_use = NetFunnel.TS_CONFIG_USE;
    this.mConfig.popup_zindex = NetFunnel.TS_POPUP_ZINDEX;
    this.mConfig.ip_error_retry = NetFunnel.TS_IP_ERROR_RETRY;
    this.mConfig.success_popup_visibility = NetFunnel.TS_SUCCESS_POPUP_VISIBILITY;
    this.mConfig._host_changed = false;
    this.mConfig._port_changed = false;
    if (typeof oConfigs == 'object') {
      for (var sConfig in oConfigs) {
        this.mConfig[sConfig] = oConfigs[sConfig];
        if (sConfig == 'host') {
          this.mConfig._host_changed = true;
        }
        if (sConfig == 'port') {
          this.mConfig._port_changed = true;
        }
      }
    }
    NetFunnel.gPopupLeft = this.mConfig.popup_left;
    NetFunnel.gPopupTop = this.mConfig.popup_top;
    NetFunnel.gBlockList = this.mConfig.block_list;
    if (this.mConfig.skin_id == '') {
      NetFunnel.gSkinId = NetFunnel.TS_SKIN_ID;
    } else {
      NetFunnel.gSkinId = this.mConfig.skin_id;
    }
    if (typeof this.mConfig.use_unfocus != 'boolean') {
      if (typeof this.mConfig.use_unfocus == 'string' && this.mConfig.use_unfocus == 'true') {
        this.mConfig.use_unfocus = true;
      } else {
        this.mConfig.use_unfocus = false;
      }
    }
    NetFunnel.gUseUnfocus = this.mConfig.use_unfocus;
    if (typeof this.mConfig.use_mobile_ui != 'boolean') {
      if (typeof this.mConfig.use_mobile_ui == 'string' && this.mConfig.use_mobile_ui == 'true') {
        this.mConfig.use_mobile_ui = true;
      } else {
        this.mConfig.use_mobile_ui = false;
      }
    }
    NetFunnel.gUseMobileUI = this.mConfig.use_mobile_ui;
    if (typeof this.mConfig.use_frame_block != 'boolean') {
      if (typeof this.mConfig.use_frame_block == 'string' && this.mConfig.use_frame_block == 'true') {
        this.mConfig.use_frame_block = true;
      } else {
        this.mConfig.use_frame_block = false;
      }
    }
    if (this.mConfig.use_frame_block == true) {
      if (this.mConfig.frame_block_list.length < 1) {
        this.mConfig.frame_block_list = NetFunnel.Util.getFrameWindowList(this.mConfig.popup_target);
      }
    } else {
      this.mConfig.frame_block_list = [];
    }
    this.id = 0;
    NetFunnel.TsClient._Objects[this.id] = this;
    NetFunnel.TsClient._Count += 1;
    if (oCallbacks.onSuccess) {
      this.addListener(this, 'onSuccess', oCallbacks.onSuccess);
    }
    if (oCallbacks.onContinued) {
      this.addListener(this, 'onContinued', oCallbacks.onContinued);
    }
    if (oCallbacks.onBypass) {
      this.addListener(this, 'onBypass', oCallbacks.onBypass);
    }
    if (oCallbacks.onBlock) {
      this.addListener(this, 'onBlock', oCallbacks.onBlock);
    }
    if (oCallbacks.onIpBlock) {
      this.addListener(this, 'onIpBlock', oCallbacks.onIpBlock);
    }
    if (oCallbacks.onError) {
      this.addListener(this, 'onError', oCallbacks.onError);
    }
    if (oCallbacks.onStop) {
      this.addListener(this, 'onStop', oCallbacks.onStop);
    }
    if (oCallbacks.onExpressnumber) {
      this.addListener(this, 'onExpressnumber', oCallbacks.onExpressnumber);
    }
    this.counter[NetFunnel.RTYPE_NONE] = 0;
    this.counter[NetFunnel.RTYPE_GET_TID_CHK_ENTER] = 0;
    this.counter[NetFunnel.RTYPE_GET_TID] = 0;
    this.counter[NetFunnel.RTYPE_CHK_ENTER] = 0;
    this.counter[NetFunnel.RTYPE_ALIVE_NOTICE] = 0;
    this.counter[NetFunnel.RTYPE_SET_COMPLETE] = 0;
    this.counter[NetFunnel.RTYPE_INIT] = 0;
    this.counter[NetFunnel.RTYPE_STOP] = 0;
    this.connTimeout = function connTimeout() {
      if (this != NetFunnel.gControl) {
        return connTimeout.apply(NetFunnel.gControl, arguments);
      }
      if (NetFunnel.gAlreadyProc != 0) {
        return false;
      }
      this._resetScript();
      if (this.counter[this._mReqType] < this.mConfig.conn_retry) {
        this._mStatus = NetFunnel.PS_TIMEOUT;
        this.counter[this._mReqType] += 1;
        switch (this._mReqType) {
          case NetFunnel.RTYPE_GET_TID:
            this.getTicketID(this.user_id, this.user_tid, false);
            return true;
          case NetFunnel.RTYPE_CHK_ENTER:
            this.chkEnter(this.key, false);
            return true;
          case NetFunnel.RTYPE_GET_TID_CHK_ENTER:
            this.getTidChkEnter(this.user_id, this.user_tid, false);
            return true;
          case NetFunnel.RTYPE_ALIVE_NOTICE:
            this.aliveNotice(this.key, '', '', false);
            return true;
          case NetFunnel.RTYPE_SET_COMPLETE:
            this.setComplete(this.key, '', '', false);
            return true;
          default:
        }
      }
      NetFunnel.PopupUtil.hideWaitPopup();
      if (this._mReqType == NetFunnel.RTYPE_CHK_ENTER || this._mReqType == NetFunnel.RTYPE_GET_TID_CHK_ENTER) {
        var tStorage = new NetFunnel.Storage(2);
        tStorage.setItem(
          this.mConfig.cookie_id,
          '5002:200:key=' + NetFunnel.CONN_TIMEOUT_KEY,
          1,
          this.mConfig.cookie_domain,
        );
      }
      if (NetFunnel.gAlreadyProc >= 1) {
        return false;
      }
      this.fireEvent(null, this, 'onError', {
        rtype: this._mReqType,
        code: NetFunnel.kErrorSockConnect,
        data: { msg: 'Connection Timeout' },
        next: this.next.error,
      });
      this._mStatus = NetFunnel.PS_ERROR;
      return true;
    };
  };
  NetFunnel.TsClient._Count = 0;
  NetFunnel.TsClient._Objects = {};
  NetFunnel.TsClient.prototype = new NetFunnel.Event();
  NetFunnel.TsClient.prototype._initDone = false;
  NetFunnel.TsClient.prototype.id = null;
  NetFunnel.TsClient.prototype.mConfig = null;
  NetFunnel.TsClient.prototype.key = null;
  NetFunnel.TsClient.prototype.script = null;
  NetFunnel.TsClient.prototype.alarm = null;
  NetFunnel.TsClient.prototype._mReqType = NetFunnel.RTYPE_NONE;
  NetFunnel.TsClient.prototype._mMousePos = 0;
  NetFunnel.TsClient.prototype._mNoActTime = 0;
  NetFunnel.TsClient.prototype._mStatus = NetFunnel.PS_N_RUNNING;
  NetFunnel.TsClient.prototype.counter = {};
  NetFunnel.TsClient.prototype.next = { success: '', error: '' };
  NetFunnel.TsClient.prototype.init = function () {
    this._nCount++;
    this._initDone = true;
  };
  NetFunnel.TsClient.prototype.getConfig = function (key) {
    return this.mConfig[key];
  };
  NetFunnel.TsClient.prototype._isNoAction = function () {
    if (this._mMousePos == NetFunnel.MouseX) {
      return true;
    }
    this._mMousePos = NetFunnel.MouseX;
    return false;
  };
  NetFunnel.TsClient.prototype._resetAlarm = function () {
    if (this.alarm !== null) {
      clearTimeout(this.alarm);
    }
    this.alarm = null;
  };
  NetFunnel.TsClient.prototype._resetReTimer = function () {
    if (NetFunnel.gReTimer !== null) {
      clearTimeout(NetFunnel.gReTimer);
    }
    NetFunnel.gReTimer = null;
  };
  NetFunnel.TsClient.prototype._resetRetryTimer = function () {
    if (this.retryTimer !== null) {
      clearTimeout(this.retryTimer);
    }
    this.retryTimer = null;
  };
  NetFunnel.TsClient.prototype._resetScript = function () {
    try {
      if (this.script && typeof this.script == 'object') {
        var pNode = this.script.parentNode;
        if (pNode && typeof pNode == 'object') {
          pNode.removeChild(this.script);
        }
      }
    } catch (e) {}
    this.script = null;
  };
  NetFunnel.TsClient.prototype.getUserdata = function () {
    try {
      var userdata = '';
      var uKey = this.mConfig.user_data_keys;
      if (typeof this.mConfig.user_data == 'string') {
        return this.mConfig.user_data;
      }
      if (Object.prototype.toString.call(uKey).slice(8, -1) != 'Array') {
        return false;
      }
      for (var i = 0; i < uKey.length; i++) {
        var keydata = uKey[i];
        if (typeof keydata != 'object') {
          continue;
        }
        if (keydata.type == 'v') {
          try {
            userdata = eval(keydata.key);
            if (userdata != '') {
              break;
            }
          } catch (e) {}
        }
        if (keydata.type == 'c') {
          userdata = NetFunnel.Cookie.get(keydata.key);
          if (userdata != '') {
            break;
          }
        }
      }
      return userdata;
    } catch (e) {
      return false;
    }
  };
  NetFunnel.TsClient.prototype._showResult = function () {
    this._resetAlarm();
    if (NetFunnel.gAlreadyProc == 1 && NetFunnel.gRtype == NetFunnel.RTYPE_GET_TID_CHK_ENTER) {
      return;
    }
    NetFunnel.gAlreadyProc = 1;
    NetFunnel.PopupUtil.hideWaitPopup();
    this.retval = new NetFunnel.RetVal(this.result);
    if (this.retval.getReqType() == NetFunnel.RTYPE_GET_TID_CHK_ENTER) {
      this.retval.setReqType(NetFunnel.RTYPE_CHK_ENTER);
    }
    if (NetFunnel.TS_DEBUG_MODE) {
      NetFunnel.printDebugMsg('recv', this.result);
    }
    NetFunnel.ttl = 0;
    this.counter[this._mReqType] = 0;
    if (this.retval.getRetCode() == NetFunnel.kContinueDebug) {
      NetFunnel.gDebugflag = true;
    } else {
      NetFunnel.gDebugflag = false;
    }
    switch (this.retval.getReqType()) {
      case NetFunnel.RTYPE_GET_TID:
        this._showResultGetTicketID(this.retval);
        break;
      case NetFunnel.RTYPE_CHK_ENTER:
        this._showResultChkEnter(this.retval);
        break;
      case NetFunnel.RTYPE_ALIVE_NOTICE:
        this._showResultAliveNotice(this.retval);
        break;
      case NetFunnel.RTYPE_SET_COMPLETE:
        this._showResultSetComplete(this.retval);
        break;
      default:
        var tStorage = new NetFunnel.Storage(2);
        tStorage.removeItem(this.mConfig.cookie_id);
        this.fireEvent(null, this, 'onError', {
          rtype: NetFunnel.RTYPE_NONE,
          code: this.retval.getRetCode(),
          data: this.retval.getParam(),
          next: this.next.error,
        });
        this._mStatus = NetFunnel.PS_ERROR;
    }
  };
  NetFunnel.TsClient.prototype._showResultGetTicketID = function (retval) {
    var tStorage = new NetFunnel.Storage(2);
    switch (retval.getRetCode()) {
      case NetFunnel.kSuccess:
        tStorage.setItem(this.mConfig.cookie_id, this.result, this.mConfig.cookie_time, this.mConfig.cookie_domain);
        this._mStatus = NetFunnel.PS_N_RUNNING;
        this.fireEvent(null, this, 'onSuccess', {
          rtype: retval.getReqType(),
          code: retval.getRetCode(),
          data: retval.getParam(),
          next: this.next.success,
        });
        break;
      default:
        tStorage.removeItem(this.mConfig.cookie_id);
        this._mStatus = NetFunnel.PS_ERROR;
        this.fireEvent(null, this, 'onError', {
          rtype: retval.getReqType(),
          code: retval.getRetCode(),
          data: retval.getParam(),
          next: this.next.error,
        });
    }
    return;
  };
  NetFunnel.TsClient.prototype._showResultChkEnter = function (retval) {
    var self = this;
    var tStorage = new NetFunnel.Storage(2);
    switch (retval.getRetCode()) {
      case NetFunnel.kSuccess:
        tStorage.setItem(this.mConfig.cookie_id, this.result, this.mConfig.cookie_time, this.mConfig.cookie_domain);
        this._mStatus = NetFunnel.PS_N_RUNNING;
        NetFunnel.gNWaitTemp = 0;
        NetFunnel.gNWaitCount = 0;
        this.fireEvent(null, this, 'onSuccess', {
          rtype: retval.getReqType(),
          code: retval.getRetCode(),
          data: retval.getParam(),
          next: this.next.success,
        });
        break;
      case NetFunnel.kContinueDebug:
      case NetFunnel.kContinue:
        this._mStatus = NetFunnel.PS_CONTINUE;
        var ttl = retval.getNumber('ttl');
        if (ttl > this.mConfig.max_ttl) {
          ttl = this.mConfig.max_ttl;
          retval.setValue('ttl', ttl);
        }
        var nwait = retval.getNumber('nwait');
        if (NetFunnel.TS_NWAIT_BYPASS) {
          if (NetFunnel.gNWaitTemp == nwait) {
            NetFunnel.gNWaitCount += 1;
          } else {
            NetFunnel.gNWaitTemp = nwait;
            NetFunnel.gNWaitCount = 0;
          }
          if (NetFunnel.TS_MAX_NWAIT_COUNT <= NetFunnel.gNWaitCount) {
            this.fireEvent(null, this, 'onSuccess', {
              rtype: retval.getReqType(),
              code: retval.getRetCode(),
              data: retval.getParam(),
              next: this.next.success,
            });
            break;
          }
        }
        this.fireEvent(null, this, 'onContinued', {
          rtype: retval.getReqType(),
          code: retval.getRetCode(),
          data: retval.getParam(),
          next: this.next.continued,
        });
        NetFunnel.gAlreadyProc = 0;
        if (ttl > 0 && this._mStatus != NetFunnel.PS_N_RUNNING) {
          if (this.retryTimer) {
            clearTimeout(this.retryTimer);
          }
          NetFunnel.ttl = ttl;
          this.retryTimer = setTimeout(function () {
            self.chkEnterCont(self.retval.getValue('key'));
          }, ttl * 1000);
        }
        break;
      case NetFunnel.kTsBlock:
        this._mStatus = NetFunnel.PS_N_RUNNING;
        tStorage.setItem(this.mConfig.cookie_id, this.result, this.mConfig.cookie_time, this.mConfig.cookie_domain);
        this.fireEvent(null, this, 'onBlock', {
          rtype: retval.getReqType(),
          code: retval.getRetCode(),
          data: retval.getParam(),
          next: this.next.block,
        });
        if (this.retryTimer) {
          clearTimeout(this.retryTimer);
        }
        NetFunnel.ttl = ttl;
        break;
      case NetFunnel.kTsIpBlock:
        this._mStatus = NetFunnel.PS_N_RUNNING;
        if (this.retryTimer) {
          clearTimeout(this.retryTimer);
        }
        NetFunnel.gAlreadyProc = 0;
        if (this.mConfig.ipblock_wait_count >= NetFunnel.gIPBlockWaitCount + 1) {
          NetFunnel.gReTimer = setTimeout(function () {
            self.getTidChkEnter(self.user_id, self.user_tid, true);
          }, this.mConfig.ipblock_wait_time);
        } else {
          tStorage.setItem(this.mConfig.cookie_id, this.result, this.mConfig.cookie_time, this.mConfig.cookie_domain);
          this._mStatus = NetFunnel.PS_N_RUNNING;
          this.fireEvent(null, this, 'onSuccess', {
            rtype: retval.getReqType(),
            code: retval.getRetCode(),
            data: retval.getParam(),
            next: this.next.success,
          });
          break;
        }
        this.fireEvent(null, this, 'onIpBlock', {
          rtype: retval.getReqType(),
          code: retval.getRetCode(),
          data: retval.getParam(),
          next: this.next.ipblock,
        });
        if (this.mConfig.ipblock_wait_count != 0) {
          NetFunnel.gIPBlockWaitCount += 1;
        }
        break;
      case NetFunnel.kTsBypass:
        this._mStatus = NetFunnel.PS_N_RUNNING;
        tStorage.setItem(this.mConfig.cookie_id, this.result, this.mConfig.cookie_time, this.mConfig.cookie_domain);
        this.fireEvent(null, this, 'onBypass', {
          rtype: retval.getReqType(),
          code: retval.getRetCode(),
          data: retval.getParam(),
          next: this.next.bypass,
        });
        break;
      case NetFunnel.kTsExpressNumber:
        this._mStatus = NetFunnel.PS_N_RUNNING;
        tStorage.setItem(this.mConfig.cookie_id, this.result, this.mConfig.cookie_time, this.mConfig.cookie_domain);
        this.fireEvent(null, this, 'onExpressnumber', {
          rtype: retval.getReqType(),
          code: retval.getRetCode(),
          data: retval.getParam(),
          next: this.next.expressnumber,
        });
        break;
      default:
        tStorage.removeItem(this.mConfig.cookie_id);
        this._mStatus = NetFunnel.PS_ERROR;
        if (retval.getRetCode() == NetFunnel.kTsErrorInvalidIp && this.mConfig.ip_error_retry == true) {
          NetFunnel.gAlreadyProc = 0;
          this._mStatus = NetFunnel.PS_N_RUNNING;
          NetFunnel.gReTimer = setTimeout(function () {
            self.getTidChkEnter(self.user_id, self.user_tid, true, NetFunnel.gTotWait);
          }, 100);
        } else {
          this._mStatus = NetFunnel.PS_ERROR;
          this.fireEvent(null, this, 'onError', {
            rtype: retval.getReqType(),
            code: retval.getRetCode(),
            data: retval.getParam(),
            next: this.next.error,
          });
        }
    }
    return;
  };
  NetFunnel.TsClient.prototype._showResultAliveNotice = function (retval) {
    var tStorage = new NetFunnel.Storage(2);
    switch (retval.getRetCode()) {
      case NetFunnel.kSuccess:
        this._mStatus = NetFunnel.PS_N_RUNNING;
        this.fireEvent(null, this, 'onSuccess', {
          rtype: retval.getReqType(),
          code: retval.getRetCode(),
          data: retval.getParam(),
          next: this.next.success,
        });
        break;
      case NetFunnel.kContinueDebug:
      case NetFunnel.kContinue:
        this._mStatus = NetFunnel.PS_CONTINUE;
        if (this._mNoActTime > this.mConfig.no_action) {
          this.fireEvent(null, this, 'onError', {
            rtype: retval.getReqType(),
            code: NetFunnel.kTsErrorNoUserAction,
            data: retval.getParam(),
            next: this.next.error,
          });
          this._mNoActTime = 0;
          this._mStatus = NetFunnel.PS_ERROR;
          break;
        }
        var ttl = retval.getNumber('ttl');
        if (ttl > this.mConfig.max_ttl) {
          ttl = this.mConfig.max_ttl;
          retval.setValue('ttl', ttl);
        }
        this.fireEvent(null, this, 'onContinued', {
          rtype: retval.getReqType(),
          code: retval.getRetCode(),
          data: retval.getParam(),
          next: this.next.continued,
        });
        NetFunnel.gAlreadyProc = 0;
        if (ttl > 0 && this._mStatus != NetFunnel.PS_N_RUNNING) {
          if (this.retryTimer) {
            clearTimeout(this.retryTimer);
          }
          if (this._isNoAction()) {
            this._mNoActTime += ttl;
          } else {
            this._mNoActTime = 0;
          }
          tStorage.setItem(this.mConfig.cookie_id, this.result, this.mConfig.cookie_time, this.mConfig.cookie_domain);
          var self = this;
          this.retryTimer = setTimeout(function () {
            var key = tStorage.getItem(self.mConfig.cookie_id);
            key &&
              self.aliveNoticeCont(
                self.retval.getValue('key'),
                self.retval.getValue('ip'),
                self.retval.getValue('port'),
                self.retval.getValue('first'),
              );
          }, ttl * 1000);
        }
        break;
      case NetFunnel.kTsBlock:
        this._mStatus = NetFunnel.PS_N_RUNNING;
        this.fireEvent(null, this, 'onBlock', {
          rtype: retval.getReqType(),
          code: retval.getRetCode(),
          data: retval.getParam(),
          next: this.next.block,
        });
        break;
      case NetFunnel.kTsExpressNumber:
        this._mStatus = NetFunnel.PS_N_RUNNING;
        this.fireEvent(null, this, 'onExpressnumber', {
          rtype: retval.getReqType(),
          code: retval.getRetCode(),
          data: retval.getParam(),
          next: this.next.expressnumber,
        });
        break;
      case NetFunnel.kTsBypass:
        this._mStatus = NetFunnel.PS_N_RUNNING;
        this.fireEvent(null, this, 'onBypass', {
          rtype: retval.getReqType(),
          code: retval.getRetCode(),
          data: retval.getParam(),
          next: this.next.bypass,
        });
        break;
      case NetFunnel.kTsIpBlock:
        this._mStatus = NetFunnel.PS_N_RUNNING;
        this.fireEvent(null, this, 'onIpBlock', {
          rtype: retval.getReqType(),
          code: retval.getRetCode(),
          data: retval.getParam(),
          next: this.next.ipblock,
        });
        break;
      default:
        if (retval.getRetCode() == NetFunnel.kErrorExpiredTime) {
          tStorage.removeItem(this.mConfig.cookie_id);
        }
        this._mStatus = NetFunnel.PS_ERROR;
        this.fireEvent(null, this, 'onError', {
          rtype: retval.getReqType(),
          code: retval.getRetCode(),
          data: retval.getParam(),
          next: this.next.error,
        });
    }
    return;
  };
  NetFunnel.TsClient.prototype._showResultSetComplete = function (retval) {
    var tStorage = new NetFunnel.Storage(2);
    tStorage.removeItem(this.mConfig.cookie_id);
    switch (retval.getRetCode()) {
      case NetFunnel.kSuccess:
        this._mStatus = NetFunnel.PS_N_RUNNING;
        this.fireEvent(null, this, 'onSuccess', {
          rtype: retval.getReqType(),
          code: retval.getRetCode(),
          data: retval.getParam(),
          next: this.next.success,
        });
        break;
      default:
        this._mStatus = NetFunnel.PS_ERROR;
        this.fireEvent(null, this, 'onError', {
          rtype: retval.getReqType(),
          code: retval.getRetCode(),
          data: retval.getParam(),
          next: this.next.error,
        });
    }
    return;
  };
  NetFunnel.TsClient.prototype._connInit = function (rtype) {
    this.result = null;
    this._mReqType = rtype;
    this._resetAlarm();
    this._resetScript();
    this._resetRetryTimer();
    var self = this;
    this.alarm = setTimeout(function () {
      self.connTimeout(0);
    }, parseInt(this.mConfig.conn_timeout, 10) * 1000);
    if (!this.mConfig.host || this.mConfig.host == '') {
      return false;
    }
    if (!this.mConfig.port || this.mConfig.port == '') {
      return false;
    }
    if (!this.mConfig.query || this.mConfig.query == '') {
      return false;
    }
    if (!this.mConfig.service_id || this.mConfig.service_id == '') {
      return false;
    }
    if (!this.mConfig.action_id || this.mConfig.action_id == '') {
      return false;
    }
    this._mStatus = NetFunnel.PS_RUNNING;
    return true;
  };
  NetFunnel.TsClient.prototype._sendRequest = function (url) {
    this.script = document.createElement('script');
    this.script.src = url;
    var head = document.getElementsByTagName('head').item(0);
    if (NetFunnel.TS_DEBUG_MODE) {
      NetFunnel.printDebugMsg('send', url);
    }
    head.appendChild(this.script);
    return true;
  };
  NetFunnel.TsClient.prototype._sendError = function (eRType, eCode) {
    var tMsg = '';
    switch (eCode) {
      case NetFunnel.kErrorAlready:
        tMsg = 'Already running';
        break;
      case NetFunnel.kErrorNoinit:
        tMsg = 'Uninitialized object';
        break;
      case NetFunnel.kErrorSystem:
      default:
        tMsg = 'System error';
    }
    this.fireEvent(null, this, 'onError', { rtype: eRType, code: eCode, data: { msg: tMsg }, next: this.next.error });
  };
  NetFunnel.TsClient.prototype.setNext = function (next) {
    if (typeof next == 'object') {
      this.next = next;
    } else {
      try {
        this.next.success = undefined;
        this.next.continued = undefined;
        this.next.bypass = undefined;
        this.next.expressnumber = undefined;
        this.next.block = undefined;
        this.next.ipblock = undefined;
        this.next.error = undefined;
        this.next.stop = undefined;
      } catch (e) {
        this.next.success = window.undefined;
        this.next.continued = window.undefined;
        this.next.bypass = window.undefined;
        this.next.expressnumber = window.undefined;
        this.next.block = window.undefined;
        this.next.ipblock = window.undefined;
        this.next.error = window.undefined;
        this.next.stop = window.undefined;
      }
    }
  };
  NetFunnel.TsClient.prototype.sendStop = function (first) {
    if (NetFunnel.TS_BYPASS == true) {
      this.fireEvent(null, this, 'onSuccess', {
        rtype: this._mReqType,
        code: NetFunnel.kSuccess,
        data: {},
        next: this.next.success,
      });
      return true;
    }
    if (first == 'undefined') {
      first = true;
    }
    if (first) {
      this.counter[NetFunnel.RTYPE_STOP] = 0;
    }
    this._resetReTimer();
    this._resetAlarm();
    this._resetRetryTimer();
    this._resetScript();
    this.fireEvent(null, this, 'onSuccess', {
      rtype: this._mReqType,
      code: NetFunnel.kSuccess,
      data: {},
      next: this.next.success,
    });
    this._mStatus = NetFunnel.PS_N_RUNNING;
    return true;
  };
  NetFunnel.TsClient.prototype.getTicketID = function (userId, userTid, first) {
    NetFunnel.gPrevWaitTime = -1;
    if (NetFunnel.TS_BYPASS == true) {
      this.fireEvent(null, this, 'onSuccess', {
        rtype: this._mReqType,
        code: NetFunnel.kSuccess,
        data: {},
        next: this.next.success,
      });
      return true;
    }
    if (this.mConfig.use_unfocus == true) {
      NetFunnel.Util.delFocus(this.getConfig('popup_target'));
    }
    NetFunnel.gTotWait = -1;
    NetFunnel.retryData = null;
    var ret = this.mConfig.mp_use == true ? NetFunnel.MProtect() : 0;
    if (ret != 0) {
      this.fireEvent(null, this, 'onContinued', {
        rtype: NetFunnel.RTYPE_CHK_ENTER,
        code: NetFunnel.kContinue,
        data: { tps: 1, eps: 2, nwait: NetFunnel.gControl.getConfig('showcnt_limit') * 2, mprotect: ret, ttl: 10 },
      });
      if (this.retryTimer) {
        clearTimeout(this.retryTimer);
      }
      NetFunnel.retryData = { user_id: userId, user_tid: userTid, first: first };
      var self = this;
      this.retryTimer = setTimeout(function () {
        self.retryFunction(NetFunnel.RTYPE_GET_TID);
      }, this.mConfig.virt_wait);
      return false;
    }
    if (first == 'undefined') {
      first = true;
    }
    if (first) {
      this.counter[NetFunnel.RTYPE_GET_TID] = 0;
    }
    if (this._mStatus == NetFunnel.PS_RUNNING) {
      this._sendError(NetFunnel.RTYPE_GET_TID, NetFunnel.kErrorAlready);
      return false;
    }
    this.user_id = userId;
    this.user_tid = userTid;
    var url =
      this.mConfig.proto +
      '://' +
      this.mConfig.host +
      ':' +
      this.mConfig.port +
      '/' +
      this.mConfig.query +
      '?opcode=' +
      NetFunnel.RTYPE_GET_TID +
      '&nfid=' +
      this.id +
      '&prefix=NetFunnel.gRtype=' +
      NetFunnel.RTYPE_GET_TID +
      ';';
    url += '&sid=' + this.mConfig.service_id + '&aid=' + this.mConfig.action_id;
    var userdata = this.getUserdata();
    if (userdata != '') {
      url += '&user_data=' + userdata;
    }
    url += '&js=yes';
    var tdate = new Date();
    url += '&' + tdate.getTime();
    if (!this._connInit(NetFunnel.RTYPE_GET_TID)) {
      this._sendError(NetFunnel.RTYPE_GET_TID, NetFunnel.kErrorNoinit);
      return false;
    }
    this._sendRequest(url);
    return true;
  };
  NetFunnel.TsClient.prototype.chkEnter = function (key, first) {
    if (NetFunnel.TS_BYPASS == true) {
      this.fireEvent(null, this, 'onSuccess', {
        rtype: this._mReqType,
        code: NetFunnel.kSuccess,
        data: {},
        next: this.next.success,
      });
      return true;
    }
    if (this._mStatus == NetFunnel.PS_RUNNING || this._mStatus == NetFunnel.PS_CONTINUE) {
      this._sendError(NetFunnel.RTYPE_CHK_ENTER, NetFunnel.kErrorAlready);
      return false;
    }
    return this.chkEnterProc(key, first);
  };
  NetFunnel.TsClient.prototype.chkEnterCont = function (key, first) {
    if (this._mStatus == NetFunnel.PS_RUNNING) {
      this._sendError(NetFunnel.RTYPE_CHK_ENTER, NetFunnel.kErrorAlready);
      return false;
    }
    return this.chkEnterProc(key, first);
  };
  NetFunnel.TsClient.prototype.chkEnterProc = function (key, first) {
    if (first == 'undefined') {
      first = true;
    }
    if (first) {
      this.counter[NetFunnel.RTYPE_CHK_ENTER] = 0;
    }
    if (!key || key == '') {
      if (this.key) {
        key = this.key;
      } else {
        this._sendError(NetFunnel.RTYPE_CHK_ENTER, NetFunnel.kErrorParam);
        return false;
      }
    }
    this.key = key;
    var ip = this.retval.getValue('ip');
    if (this.mConfig.conn_retry > 1 && this.counter[this._mReqType] == this.mConfig.conn_retry) {
      ip = this.mConfig.config_use;
    }
    var port = this.retval.getValue('port');
    var url = '';
    if (ip && ip != '' && port && port != '' && !this.mConfig.config_use) {
      url = this.mConfig.proto + '://' + ip + ':' + port + '/';
    } else {
      url = this.mConfig.proto + '://' + this.mConfig.host + ':' + this.mConfig.port + '/';
    }
    url =
      url +
      this.mConfig.query +
      '?opcode=' +
      NetFunnel.RTYPE_CHK_ENTER +
      '&key=' +
      key +
      '&nfid=' +
      this.id +
      '&prefix=NetFunnel.gRtype=' +
      NetFunnel.RTYPE_CHK_ENTER +
      ';';
    if (NetFunnel.ttl > 0) {
      url = url + '&ttl=' + NetFunnel.ttl;
    }
    url += '&sid=' + this.mConfig.service_id + '&aid=' + this.mConfig.action_id;
    var userdata = this.getUserdata();
    if (userdata != '') {
      url += '&user_data=' + userdata;
    }
    url += '&js=yes';
    var tdate = new Date();
    url += '&' + tdate.getTime();
    if (!this._connInit(NetFunnel.RTYPE_CHK_ENTER)) {
      this._sendError(NetFunnel.RTYPE_CHK_ENTER, NetFunnel.kErrorNoinit);
      return false;
    }
    this._sendRequest(url);
    return true;
  };
  NetFunnel.retryData = null;
  NetFunnel.retryFunction = function (type) {
    if (typeof NetFunnel.retryData == 'object') {
      var t = NetFunnel.retryData;
      if (type == NetFunnel.RTYPE_GET_TID) {
        NetFunnel.gControl.getTicketID(t.user_id, t.user_tid, t.first);
      } else {
        if (type == NetFunnel.RTYPE_GET_TID_CHK_ENTER) {
          NetFunnel.gControl.getTidChkEnter(t.user_id, t.user_tid, t.first);
        }
      }
    }
  };
  NetFunnel.TsClient.prototype.getTidChkEnter = function (userId, userTid, first, totalWait) {
    NetFunnel.gPrevWaitTime = -1;
    if (NetFunnel.TS_BYPASS == true) {
      this.fireEvent(null, this, 'onSuccess', {
        rtype: this._mReqType,
        code: NetFunnel.kSuccess,
        data: {},
        next: this.next.success,
      });
      return true;
    }
    if (this._mStatus == NetFunnel.PS_RUNNING || this._mStatus == NetFunnel.PS_CONTINUE) {
      this._sendError(NetFunnel.RTYPE_CHK_ENTER, NetFunnel.kErrorAlready);
      return false;
    }
    if (this.mConfig.use_unfocus == true) {
      NetFunnel.Util.delFocus(this.getConfig('popup_target'));
    }
    NetFunnel.gTotWait = totalWait == undefined || isNaN(totalWait) ? -1 : totalWait;
    NetFunnel.retryData = null;
    var ret = this.mConfig.mp_use == true ? NetFunnel.MProtect() : 0;
    if (ret == 0 && this.mConfig.show_wait_popup == false) {
      if (this.getConfig('use_pre_wait')) {
        NetFunnel.PopupUtil.showWaitPopup();
      }
      return this.getTidChkEnterProc(userId, userTid, first);
    }
    this.fireEvent(null, this, 'onContinued', {
      rtype: NetFunnel.RTYPE_CHK_ENTER,
      code: NetFunnel.kContinue,
      data: { tps: 1, eps: 2, nwait: NetFunnel.gControl.getConfig('showcnt_limit') * 2, mprotect: ret, ttl: 10 },
    });
    if (this.retryTimer) {
      clearTimeout(this.retryTimer);
    }
    NetFunnel.retryData = { user_id: userId, user_tid: userTid, first: first };
    this.retryTimer = setTimeout(function () {
      NetFunnel.retryFunction(NetFunnel.RTYPE_GET_TID_CHK_ENTER);
    }, this.mConfig.virt_wait);
    return false;
  };
  NetFunnel.TsClient.prototype.getTidChkEnterProc = function (userId, userTid, first) {
    if (first == 'undefined') {
      first = true;
    }
    if (first) {
      this.counter[NetFunnel.RTYPE_GET_TID_CHK_ENTER] = 0;
    }
    this.user_id = userId;
    this.user_tid = userTid;
    var url =
      this.mConfig.proto +
      '://' +
      this.mConfig.host +
      ':' +
      this.mConfig.port +
      '/' +
      this.mConfig.query +
      '?opcode=' +
      NetFunnel.RTYPE_GET_TID_CHK_ENTER +
      '&nfid=' +
      this.id +
      '&prefix=NetFunnel.gRtype=' +
      NetFunnel.RTYPE_GET_TID_CHK_ENTER +
      ';';
    if (NetFunnel.ttl > 0) {
      url = url + '&ttl=' + NetFunnel.ttl;
    }
    url += '&sid=' + this.mConfig.service_id + '&aid=' + this.mConfig.action_id;
    url += '&js=yes';
    var userdata = this.getUserdata();
    if (userdata != '') {
      url += '&user_data=' + userdata;
    }
    var tdate = new Date();
    url += '&' + tdate.getTime();
    if (!this._connInit(NetFunnel.RTYPE_GET_TID_CHK_ENTER)) {
      this._sendError(NetFunnel.RTYPE_GET_TID_CHK_ENTER, NetFunnel.kErrorNoinit);
      return false;
    }
    this._sendRequest(url);
    return true;
  };
  NetFunnel.TsClient.prototype.aliveNoticeProc = function (key, ip, port, first) {
    if (first == 'undefined') {
      first = true;
    }
    if (first) {
      this.counter[NetFunnel.RTYPE_ALIVE_NOTICE] = 0;
    }
    if (!key || key == '') {
      if (this.key) {
        key = this.key;
      } else {
        this._sendError(NetFunnel.RTYPE_ALIVE_NOTICE, NetFunnel.kErrorParam);
        return false;
      }
    }
    this.key = key;
    this.ip = ip;
    this.port = port;
    if (this.mConfig.conn_retry > 1 && this.counter[this._mReqType] == this.mConfig.conn_retry) {
      ip = this.mConfig.config_use;
    }
    var url = '';
    if (ip && ip != '' && port && port != '' && !this.mConfig.config_use) {
      this.ip = this.mConfig._host_changed == false ? ip : this.mConfig.host;
      this.port = this.mConfig._port_changed == false ? port : this.mConfig.port;
      url = this.mConfig.proto + '://' + this.ip + ':' + this.port + '/';
    } else {
      url = this.mConfig.proto + '://' + this.mConfig.host + ':' + this.mConfig.port + '/';
    }
    url =
      url +
      this.mConfig.query +
      '?opcode=' +
      NetFunnel.RTYPE_ALIVE_NOTICE +
      '&key=' +
      key +
      '&nfid=' +
      this.id +
      '&prefix=NetFunnel.gRtype=' +
      NetFunnel.RTYPE_ALIVE_NOTICE +
      ';';
    url += '&sid=' + this.mConfig.service_id + '&aid=' + this.mConfig.action_id;
    var userdata = this.getUserdata();
    if (userdata != '') {
      url += '&user_data=' + userdata;
    }
    url += '&js=yes';
    var tdate = new Date();
    url += '&' + tdate.getTime();
    if (!this._connInit(NetFunnel.RTYPE_ALIVE_NOTICE)) {
      this._sendError(NetFunnel.RTYPE_ALIVE_NOTICE, NetFunnel.kErrorNoinit);
      return false;
    }
    this._sendRequest(url);
    return true;
  };
  NetFunnel.TsClient.prototype.aliveNotice = function (key, ip, port, first) {
    if (NetFunnel.TS_BYPASS == true) {
      this.fireEvent(null, this, 'onSuccess', {
        rtype: this._mReqType,
        code: NetFunnel.kSuccess,
        data: {},
        next: this.next.success,
      });
      return true;
    }
    if (this._mStatus == NetFunnel.PS_RUNNING || this._mStatus == NetFunnel.PS_CONTINUE) {
      this._sendError(NetFunnel.RTYPE_ALIVE_NOTICE, NetFunnel.kErrorAlready);
      return false;
    }
    return this.aliveNoticeProc(key, ip, port, first);
  };
  NetFunnel.TsClient.prototype.aliveNoticeCont = function (key, ip, port, first) {
    if (this._mStatus == NetFunnel.PS_RUNNING) {
      this._sendError(NetFunnel.RTYPE_ALIVE_NOTICE, NetFunnel.kErrorAlready);
      return false;
    }
    return this.aliveNoticeProc(key, ip, port, first);
  };
  NetFunnel.TsClient.prototype.setComplete = function (key, ip, port, first) {
    var Storage = new NetFunnel.Storage();
    Storage.setItemStorageOnly('NFMPT.reqCnt', '0');
    if (NetFunnel.TS_BYPASS == true) {
      this.fireEvent(null, this, 'onSuccess', {
        rtype: this._mReqType,
        code: NetFunnel.kSuccess,
        data: {},
        next: this.next.success,
      });
      return true;
    }
    if (first == 'undefined') {
      first = true;
    }
    if (first) {
      this.counter[NetFunnel.RTYPE_SET_COMPLETE] = 0;
    }
    if (this._mStatus == NetFunnel.PS_RUNNING) {
      this._sendError(NetFunnel.RTYPE_SET_COMPLETE, NetFunnel.kErrorAlready);
      return false;
    }
    if (!key || key == '') {
      if (this.key) {
        key = this.key;
      } else {
        this._sendError(NetFunnel.RTYPE_SET_COMPLETE, NetFunnel.kErrorParam);
        return false;
      }
    }
    this.key = key;
    this.ip = ip;
    if (this.mConfig.conn_retry > 1 && this.counter[this._mReqType] == this.mConfig.conn_retry - 1) {
      ip = this.mConfig.config_use;
    }
    this.port = port;
    if (key == NetFunnel.CONN_TIMEOUT_KEY) {
      var retval = new NetFunnel.RetVal(NetFunnel.RTYPE_SET_COMPLETE + ':' + NetFunnel.kSuccess + ':utime=1');
      this._showResultSetComplete(retval);
      return true;
    }
    var url = '';
    if (ip && ip != '' && port && port != '' && !this.mConfig.config_use) {
      this.ip = this.mConfig._host_changed == false ? ip : this.mConfig.host;
      this.port = this.mConfig._port_changed == false ? port : this.mConfig.port;
      url = this.mConfig.proto + '://' + this.ip + ':' + this.port + '/';
    } else {
      url = this.mConfig.proto + '://' + this.mConfig.host + ':' + this.mConfig.port + '/';
    }
    url =
      url +
      this.mConfig.query +
      '?opcode=' +
      NetFunnel.RTYPE_SET_COMPLETE +
      '&key=' +
      key +
      '&nfid=' +
      this.id +
      '&prefix=NetFunnel.gRtype=' +
      NetFunnel.RTYPE_SET_COMPLETE +
      ';';
    var userdata = this.getUserdata();
    if (userdata != '') {
      url += '&user_data=' + userdata;
    }
    url += '&js=yes';
    var tdate = new Date();
    url += '&' + tdate.getTime();
    if (!this._connInit(NetFunnel.RTYPE_SET_COMPLETE)) {
      this._sendError(NetFunnel.RTYPE_SET_COMPLETE, NetFunnel.kErrorNoinit);
      return false;
    }
    this._sendRequest(url);
    return true;
  };
  NetFunnel.TsClient.prototype.cookieExist = function () {
    var tStorage = new NetFunnel.Storage(2);
    var result = tStorage.getItem(this.mConfig.cookie_id);
    if (result == false || result == '') {
      return false;
    }
    var retval = new NetFunnel.RetVal(result);
    var key = retval.getValue('key');
    if (!key) {
      tStorage.removeItem(this.mConfig.cookie_id);
      return false;
    }
    return true;
  };
  NetFunnel.TsClient.prototype.isRunning = function () {
    if (this._mStatus == NetFunnel.PS_RUNNING || this._mStatus == NetFunnel.PS_CONTINUE) {
      return true;
    }
    return false;
  };
  function NetFunnel_init(oFlash, oConfigs, oCallbacks) {
    if (NetFunnel.gControl) {
      NetFunnel.gControl._resetScript();
      NetFunnel.gControl = null;
    }
    if (typeof oCallbacks == 'undefined') {
      oCallbacks = NetFunnel.DefaultCallback;
    } else {
      if (!oCallbacks.onSuccess) {
        oCallbacks.onSuccess = NetFunnel.DefaultCallback.onSuccess;
      }
      if (!oCallbacks.onContinued) {
        oCallbacks.onContinued = NetFunnel.DefaultCallback.onContinued;
      }
      if (!oCallbacks.onError) {
        oCallbacks.onError = NetFunnel.DefaultCallback.onError;
      }
      if (!oCallbacks.onStop) {
        oCallbacks.onStop = NetFunnel.DefaultCallback.onStop;
      }
      if (!oCallbacks.onBypass) {
        oCallbacks.onBypass = NetFunnel.DefaultCallback.onBypass;
      }
      if (!oCallbacks.onBlock) {
        oCallbacks.onBlock = NetFunnel.DefaultCallback.onBlock;
      }
      if (!oCallbacks.onExpressnumber) {
        oCallbacks.onExpressnumber = NetFunnel.DefaultCallback.onExpressnumber;
      }
      if (!oCallbacks.onIpBlock) {
        oCallbacks.onIpBlock = NetFunnel.DefaultCallback.onIpBlock;
      }
    }
    NetFunnel.gControl = new NetFunnel.TsClient(oConfigs, oCallbacks);
    return true;
  }
  function NetFunnel_sendStop(next) {
    try {
      if (!NetFunnel.gControl) {
        NetFunnel_init();
      }
      NetFunnel.gAlreadyProc = 0;
      NetFunnel.gControl.setNext(next);
      NetFunnel.gControl.sendStop();
      return true;
    } catch (err) {
      return false;
    }
  }
  function NetFunnel_getTicketID(next, userId, userTid) {
    if (!NetFunnel.gControl) {
      NetFunnel_init();
    }
    NetFunnel.gAlreadyProc = 0;
    NetFunnel.gControl.setNext(next);
    NetFunnel.gControl.getTicketID(userId, userTid);
    return true;
  }
  function NetFunnel_chkEnter(next, data) {
    if (!NetFunnel.gControl) {
      NetFunnel_init();
    }
    NetFunnel.gAlreadyProc = 0;
    var key;
    if (typeof data != 'undefined' && data.constructor == Object) {
      key = data.key;
      if (!key) {
        return false;
      }
    } else {
      var tStorage = new NetFunnel.Storage(2);
      var result = tStorage.getItem(NetFunnel.gControl.mConfig.cookie_id);
      if (result === null || result == '') {
        return false;
      }
      var retval = new NetFunnel.RetVal(result);
      key = retval.getValue('key');
      if (!key) {
        tStorage = new NetFunnel.Storage(2);
        tStorage.removeItem(this.mConfig.cookie_id);
        return false;
      }
    }
    NetFunnel.gControl.setNext(next);
    NetFunnel.gControl.chkEnter(key);
    return true;
  }
  function NetFunnel_getTidChkEnter(next, userId, userTid) {
    if (!NetFunnel.gControl) {
      NetFunnel_init();
    }
    NetFunnel.gAlreadyProc = 0;
    NetFunnel.gControl.setNext(next);
    NetFunnel.gControl.getTidChkEnter(userId, userTid);
    return true;
  }
  function NetFunnel_aliveNotice(next, data) {
    try {
      if (!NetFunnel.gControl) {
        NetFunnel_init();
      }
      NetFunnel.gAlreadyProc = 0;
      var key = '';
      var ip = '';
      var port = '';
      if (typeof data != 'undefined' && data.constructor == Object) {
        key = data.key;
        if (!key) {
          return false;
        }
        ip = data.ip;
        port = data.port;
      } else {
        var tStorage = new NetFunnel.Storage(2);
        var result = tStorage.getItem(NetFunnel.gControl.mConfig.cookie_id);
        if (result === null || result == '') {
          return false;
        }
        var retval = new NetFunnel.RetVal(result);
        key = retval.getValue('key');
        if (!key) {
          tStorage.removeItem(this.mConfig.cookie_id);
          return false;
        }
        ip = retval.getValue('ip');
        port = retval.getValue('port');
      }
      NetFunnel.gControl.setNext(next);
      NetFunnel.gControl.aliveNotice(key, ip, port);
      return true;
    } catch (err) {
      return false;
    }
  }
  function NetFunnel_setComplete(next, data) {
    if (!NetFunnel.gControl) {
      NetFunnel_init();
    }
    NetFunnel.gAlreadyProc = 0;
    NetFunnel.gControl.setNext(next);
    var key = '';
    var ip = '';
    var port = '';
    if (NetFunnel.gPop) {
      NetFunnel.gPop.hide();
      NetFunnel.gPop.destroy();
      delete NetFunnel.gPop;
      NetFunnel.gPop = null;
    }
    if (typeof data != 'undefined' && data.constructor == Object) {
      key = data.key;
      if (!key) {
        NetFunnel.gControl._sendError(NetFunnel.RTYPE_SET_COMPLETE, NetFunnel.kErrorSystem);
        return false;
      }
      ip = data.ip;
      port = data.port;
    } else {
      var tStorage = new NetFunnel.Storage(2);
      var result = tStorage.getItem(NetFunnel.gControl.mConfig.cookie_id);
      if (result === null || result == '') {
        NetFunnel.gControl._sendError(NetFunnel.RTYPE_SET_COMPLETE, NetFunnel.kErrorSystem);
        return false;
      }
      var retval = new NetFunnel.RetVal(result);
      var retCode = retval.getRetCode();
      var retType = retval.getReqType();
      if (
        retCode != NetFunnel.kSuccess &&
        retCode != NetFunnel.kTsBypass &&
        !(retType == NetFunnel.RTYPE_ALIVE_NOTICE && retCode == NetFunnel.kContinue)
      ) {
        var tRetval = new NetFunnel.RetVal(NetFunnel.RTYPE_SET_COMPLETE + ':200:msg="Success"');
        NetFunnel.gControl._showResultSetComplete(tRetval);
        return true;
      }
      key = retval.getValue('key');
      if (!key) {
        tStorage = new NetFunnel.Storage(2);
        tStorage.removeItem(NetFunnel.gControl.mConfig.cookie_id);
        NetFunnel.gControl._sendError(NetFunnel.RTYPE_SET_COMPLETE, NetFunnel.kErrorSystem);
        return false;
      }
      ip = retval.getValue('ip');
      port = retval.getValue('port');
    }
    NetFunnel.gControl.setComplete(key, ip, port);
    return true;
  }
  function NetFunnel_cookieExist() {
    if (!NetFunnel.gControl) {
      return false;
    }
    return NetFunnel.gControl.cookieExist();
  }
  function NetFunnel_isRunning() {
    if (!NetFunnel.gControl) {
      return false;
    }
    return NetFunnel.gControl.isRunning();
  }
  function NetFunnel_goForm(oConfig, form, stop) {
    var oForm = null;
    if (typeof form == 'string') {
      oForm = document.getElementById(form);
      if (typeof oForm != 'object' || oForm === null) {
        var tForm = document.getElementsByName(form);
        oForm = tForm[0];
        if (typeof oForm != 'object' || oForm === null) {
          alert('[NetFUNNEL] Invalid input form');
          return false;
        }
      }
    } else {
      if (typeof form == 'object') {
        oForm = form;
      } else {
        alert('[NetFUNNEL] Invalid input form');
        return false;
      }
    }
    if (typeof stop != 'function') {
      stop = function (ev, ret) {
        return false;
      };
    }
    NetFunnel_init(null, oConfig);
    NetFunnel_getTidChkEnter({
      success: function (ev, ret) {
        if (oForm !== null) {
          oForm.submit();
        }
      },
      error: function (ev, ret) {
        if (oForm !== null) {
          oForm.submit();
        }
      },
      bypass: function (ev, ret) {
        if (oForm !== null) {
          oForm.submit();
        }
      },
      stop: stop,
    });
    return false;
  }
  function NetFunnel_goUrl(oConfig, url, stop) {
    if (typeof url != 'string') {
      alert('[NetFUNNEL] Invalid input url');
      return false;
    }
    if (typeof stop != 'function') {
      stop = function (ev, ret) {
        return false;
      };
    }
    NetFunnel_init(null, oConfig);
    NetFunnel_getTidChkEnter({ success: url, error: url, bypass: url, stop: stop });
    return false;
  }
  function NetFunnel_goFunc(oConfig, func, stop) {
    if (typeof func != 'function') {
      alert('[NetFUNNEL] Invalid input function');
      return false;
    }
    if (typeof stop != 'function') {
      stop = function (ev, ret) {
        return false;
      };
    }
    NetFunnel_init(null, oConfig);
    NetFunnel_getTidChkEnter({ success: func, error: func, bypass: func, stop: stop });
    return false;
  }
  function NetFunnel_goComplete(oConfig, func) {
    if (typeof func != 'function') {
      func = function (ev, ret) {
        return false;
      };
    }
    NetFunnel_init(null, oConfig);
    NetFunnel_setComplete({ success: func, error: func, bypass: func });
    return false;
  }
  function NetFunnel_goAliveNotice(oConfig, func) {
    if (typeof func != 'function') {
      func = function (ev, ret) {
        return false;
      };
    }
    NetFunnel_init(null, oConfig);
    NetFunnel_aliveNotice({ success: func, error: func, bypass: func });
    return false;
  }
  function NetFunnel_Action(oConfig, oCallbacks) {
    var oForm = null;
    var success = oCallbacks.success;
    var continued = oCallbacks.continued;
    var stop = oCallbacks.stop;
    var error = oCallbacks.error;
    var bypass = oCallbacks.bypass;
    var block = oCallbacks.block;
    var ipblock = oCallbacks.ipblock;
    var expressnumber = oCallbacks.expressnumber;
    if (typeof oCallbacks.success == 'undefined') {
      success = oCallbacks;
    }
    if (typeof success == 'object') {
      oForm = success;
    }
    if (typeof stop == 'undefined') {
      stop = function (ev, ret) {
        return false;
      };
    }
    if (typeof error == 'undefined') {
      error = success;
    }
    if (typeof bypass == 'undefined') {
      bypass = success;
    }
    if (typeof expressnumber == 'undefined') {
      expressnumber = success;
    }
    NetFunnel_init(null, oConfig);
    if (oForm === null) {
      NetFunnel_getTidChkEnter({
        success: success,
        error: error,
        stop: stop,
        bypass: bypass,
        block: block,
        ipblock: ipblock,
        expressnumber: expressnumber,
        continued: continued,
      });
    } else {
      NetFunnel_getTidChkEnter({
        success: function (ev, ret) {
          if (oForm !== null) {
            oForm.submit();
          }
        },
        error: function (ev, ret) {
          if (oForm !== null) {
            oForm.submit();
          }
        },
        bypass: function (ev, ret) {
          if (oForm !== null) {
            oForm.submit();
          }
        },
        expressnumber: function (ev, ret) {
          if (oForm !== null) {
            oForm.submit();
          }
        },
        stop: stop,
        block: block,
        ipblock: ipblock,
        continued: continued,
      });
    }
    return false;
  }
  function NetFunnel_Complete(oConfig, func) {
    if (typeof func != 'function') {
      func = function (ev, ret) {
        return false;
      };
    }
    NetFunnel_init(null, oConfig);
    NetFunnel_setComplete({ success: func, error: func, bypass: func });
    return false;
  }
  function NetFunnel_AliveNotice(oConfig, func) {
    NetFunnel_init(null, oConfig);
    if (typeof func == 'function') {
      NetFunnel_aliveNotice({ success: func, error: func, bypass: func, continued: func });
    } else {
      if (typeof func == 'object') {
        var success = func.success;
        var continued = func.continued;
        var stop = func.stop;
        var error = func.error;
        var bypass = func.bypass;
        var block = func.block;
        var ipblock = func.ipblock;
        var expressnumber = func.expressnumber;
        NetFunnel_aliveNotice({
          success: success,
          error: error,
          stop: stop,
          bypass: bypass,
          block: block,
          ipblock: ipblock,
          expressnumber: expressnumber,
          continued: continued,
        });
      } else {
        func = function (ev, ret) {
          return false;
        };
        NetFunnel_aliveNotice({ success: func, error: func, bypass: func, continued: func });
      }
    }
    return false;
  }
  function DefaultCallback_onSuccess(ev, ret, obj) {
    if (navigator.userAgent.toLowerCase().indexOf('chrome') > 0) {
      if (NetFunnel.gPop) {
        var docobj = obj.getConfig('popup_target').document;
        var tmp = document.createElement('IMG');
        tmp.src = 'data:image/gif;base64,' + NetFunnel.gFixelData;
        tmp.style.position = 'absolute';
        tmp.style.top = '-10px';
        tmp.style.left = '-10px';
        tmp.style.display = 'none';
        tmp.onload = tmp.onerror = function () {
          ret.next(ev, ret);
          var body = docobj.getElementsByTagName('body')[0];
          body.removeChild(tmp);
        };
        var body = docobj.getElementsByTagName('body')[0];
        body.appendChild(tmp);
      } else {
        ret.next(ev, ret);
      }
    } else {
      ret.next(ev, ret);
    }
    return false;
  }
  if (NetFunnel.TS_AUTO_COMPLETE == true) {
    NetFunnel_Complete();
  }
  top.NetFunnel = NetFunnel.NetFunnel = NetFunnel;
  top.NetFunnel_init = NetFunnel.NetFunnel_init = NetFunnel_init.bind(this);
  top.NetFunnel_sendStop = NetFunnel.NetFunnel_sendStop = NetFunnel_sendStop.bind(this);
  top.NetFunnel_getTicketID = NetFunnel.NetFunnel_getTicketID = NetFunnel_getTicketID.bind(this);
  top.NetFunnel_chkEnter = NetFunnel.NetFunnel_chkEnter = NetFunnel_chkEnter.bind(this);
  top.NetFunnel_getTidChkEnter = NetFunnel.NetFunnel_getTidChkEnter = NetFunnel_getTidChkEnter.bind(this);
  top.NetFunnel_aliveNotice = NetFunnel.NetFunnel_aliveNotice = NetFunnel_aliveNotice.bind(this);
  top.NetFunnel_setComplete = NetFunnel.NetFunnel_setComplete = NetFunnel_setComplete.bind(this);
  top.NetFunnel_cookieExist = NetFunnel.NetFunnel_cookieExist = NetFunnel_cookieExist.bind(this);
  top.NetFunnel_isRunning = NetFunnel.NetFunnel_isRunning = NetFunnel_isRunning.bind(this);
  top.NetFunnel_goForm = NetFunnel.NetFunnel_goForm = NetFunnel_goForm.bind(this);
  top.NetFunnel_goUrl = NetFunnel.NetFunnel_goUrl = NetFunnel_goUrl.bind(this);
  top.NetFunnel_goFunc = NetFunnel.NetFunnel_goFunc = NetFunnel_goFunc.bind(this);
  top.NetFunnel_goComplete = NetFunnel.NetFunnel_goComplete = NetFunnel_goComplete.bind(this);
  top.NetFunnel_goAliveNotice = NetFunnel.NetFunnel_goAliveNotice = NetFunnel_goAliveNotice.bind(this);
  top.NetFunnel_Action = NetFunnel.NetFunnel_Action = NetFunnel_Action.bind(this);
  top.NetFunnel_Complete = NetFunnel.NetFunnel_Complete = NetFunnel_Complete.bind(this);
  top.NetFunnel_AliveNotice = NetFunnel.NetFunnel_AliveNotice = NetFunnel_AliveNotice.bind(this);
  top.DefaultCallback_onSuccess = NetFunnel.DefaultCallback_onSuccess = DefaultCallback_onSuccess.bind(this);
  'object' == typeof module && 'object' == typeof module.exports && (module.exports = NetFunnel);
})(typeof window !== 'undefined' ? window : this);
