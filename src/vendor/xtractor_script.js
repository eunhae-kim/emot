
/** weblog script js path: ex) /resources/js/script */

//function loadjs(){
//	
////	if(typeof JQuery == 'undefined'){
////		var script = document.createElement('script');
////		script.type = 'text/javascript';
////		script.src = 'https://xtr.tos.sktelecom.com/js/jquery-1.11.3.min.js';
////		document.getElementsByTagName('head')[0].appendChild(script);		//
////
////	}
//
//	var script = document.createElement('script');
//	script.type = 'text/javascript';
//	script.src = 'https://xtr.tos.sktelecom.com/js/xtractor_api.js';
//	//script.src = '/js/xtractor_api.js';
//	document.getElementsByTagName('head')[0].appendChild(script);
//	
//}
//
//loadjs();

/*	if(typeof JQuery != 'undefined'){
		 $(document).ready(function() {
				
				$("form").each(function() {
					$(this).submit(function(event) {
						localStorage.setItem("XTMETHOD", $(this).attr("method").toUpperCase());
						localStorage.setItem("XTPARAM", "?"+$(this).serialize());
					});
				});

			});
	}*/

//setTimeout(function(){
//	 
//	 $(document).ready(function() {
//			
//			$("form").each(function() {
//				$(this).submit(function(event) {
//					localStorage.setItem("XTMETHOD", $(this).attr("method").toUpperCase());
//					localStorage.setItem("XTPARAM", "?"+$(this).serialize());
//				});
//			});
//
//		});
//
//	 }, 200);

var xtr = "";

//var xtrScriptPath = "/js";
//var xtrScriptPath = "https://xtr.tos.sktelecom.com/js";

var GVHOST_STR = '';

/** XTVID 占쎈쵐伊싨쾮占썽댖怨뺣샍占쎄퉵�숋옙�좎뜾紐닷뜝�숈삕筌먦끉逾ε뜝�뚭섭�됵옙�좎럥�깍옙占썽뇦猿뗫윪占쏙옙占쎈쵐伊싨쾮濡㏓ご�좎룞�숋옙諛댁뎽�좎럩裕놅옙占� */
var vid = 'XTVID';
var sid = 'XTSID';
var lid = 'XTLID';
var loginid = 'XTLOGINID';

//out referer cookie
var rid = 'XTRID';
var ruid =  'XTRUID';
var rkid =  'XTRKID';

//adKeyword cookie
var xtRef = 'XTREF';
var xtCate = 'XTCATE';
var xtKw = 'XTKW';

//adKeyword parameter
var xtrRef="xtr_ref";
var xtrCate="xtr_cate";
var xtrKw="xtr_kw";

var xtrChk = "false";

var hostIdx = 0;
var innerHostArray = new Array();
innerHostArray.push('tworld.co.kr');
innerHostArray.push('sktelecom.com');
innerHostArray.push('sktmembership.co.kr');
innerHostArray.push('skt0.co.kr');
innerHostArray.push('younghandong.com');
innerHostArray.push('sktelecom5gx.com');
innerHostArray.push('tfactory.co.kr');
innerHostArray.push('tsharp.io');
innerHostArray.push('mpai.kr');
innerHostArray.push('127.0.0.1');
innerHostArray.push('localhost');
innerHostArray.push('sktenterprise.com');
innerHostArray.push('sktenterprise.co.kr');
innerHostArray.push('sktenterprise.kr');
innerHostArray.push('sktenterprise.net');
innerHostArray.push('skt-enterprise.com');
innerHostArray.push('skt-enterprise.co.kr');
innerHostArray.push('skt-enterprise.kr');
innerHostArray.push('skt-enterprise.net');
innerHostArray.push('tworldfriends.co.kr');

var dummyHostArray = new Array();
dummyHostArray.push('127.0.0.1');
dummyHostArray.push('localhost');

makeXTVIDCookie();
makeSESSIONIDCookie();
makeRefererCookie();
makeRefererURLCookie();
makeRefererKeyWordCookie();
makeXTRRefCookie();
makeXTRCateCookie();
makeXTRKwCookie();

function makeXTVIDCookie() {
	if (!existCookie(vid)) {
		setXTVIDCookie(vid);
	}

//	if (!existCookie(newLid) && existCookie(lid)) {
//		var Lid = getXTCookie(lid);
//		var loginId = getXTCookie(loginid);
//		var xtrUrl = "/xtractor/loginDummy";
//		if(xtrUrl.indexOf("?")>0){
//			xtrUrl +="&";
//		}else{
//			xtrUrl +="?";
//		}	
//		/** var url = '<scr'+'ipt src=\"/xtractor/loginDummy.do?V_ID=' + getXTCookie(vid) + '&L_ID=' + loginId + '&ct=' + Math.round(new Date().getTime() / (1000*60)) + '\"><\/script>';
//			console.log(url);
//			document.write(url); 
//		$.get('http://xtr.tos.sktelecom.com/xtractor/loginDummy?V_ID=' + getXTCookie(vid) + '&L_ID=' + Lid + '&LOGIN_ID=' + loginId + '&ct=' + Math.round(new Date().getTime() / (1000*60)));
//		apiConnect(xtrUrl+"V_ID=" + getXTCookie(vid) + "&L_ID=" + Lid + "&LOGIN_ID=" + loginId + "&ct=" + Math.round(new Date().getTime() / (1000*60)));	
//		removeXTCookie(lid);*/
//		//setXTLIDCookie(newLid, loginId);
//	}
}

function getURLParameter(url, name) {
    return decodeURI(
                (RegExp(name + '=' + '(.+?)(&|$)').exec(url)||[,null])[1]
        );
}

function getRefererDomain(referer){
	if (typeof referer != "undefined"){
		referer = referer.replace("https://", "");
		referer = referer.replace("http://", "");
		if(referer.indexOf("/") > -1){
			referer = referer.substring(0,referer.indexOf("/"));
		}
		return referer;
	}
}

function getRefererURL(referer){
	if (typeof referer != "undefined"){
		referer = referer.replace("https://", "");
		referer = referer.replace("http://", "");
		if(referer.indexOf("/") > -1){
			var urlLength = url.indexOf("?");
			referer = referer.substring(referer.indexOf("/"),urlLength);
		}
		return referer;
	}
}

function getRefererKeyword(referer){
	if (typeof referer != "undefined"){
		referer = referer.replace("https://", "");
		referer = referer.replace("http://", "");
		if(referer.indexOf("/") > -1){
			referer = getURLParameter(referer, "search");
		}
		return referer;
	}
}

function getParam(sname) {
    var params = location.search.substr(location.search.indexOf("?") + 1);
    var sval = "";
    params = params.split("&");

    for (var i = 0; i < params.length; i++) {
        temp = params[i].split("=");
        if ([temp[0]] == sname) { sval = temp[1]; }
    }

    return sval;
}

function makeXTRRefCookie() {
	var value = getParam(xtrRef);
	if(value != null){
		setXTREFCookie(xtRef, value); 
	}
}

function makeXTRCateCookie() {
	var value = getParam(xtrCate);
	if(value != null){
		setXTREFCookie(xtCate, value); 
	}
}

function makeXTRKwCookie() {
	var value = getParam(xtrKw);
	if(value != null){
		setXTREFCookie(xtKw, value); 
	}
}

/** XTRID Create*/
function makeRefererCookie() {
	try {
		var referer = document.referrer;
		if (typeof referer != "undefined"){
			var isInnerHost = false;
			for ( var int = 0; int < innerHostArray.length; int++) {
				var innerHost = innerHostArray[int];
				if(referer.indexOf(innerHost) > -1){
					isInnerHost = true;
				}
			}
			
			var isDummyHost = false;
			for ( var int = 0; int < dummyHostArray.length; int++) {
				var dummyHost = dummyHostArray[int];
				if(referer.indexOf(dummyHost) > -1){
					isDummyHost = true;
				}
			}
			
			if(!isInnerHost && !isDummyHost){
				var refererDomain = getRefererDomain(referer);	
				if (typeof refererDomain != "undefined"){
					document.cookie = rid + "=" + refererDomain + ";" + "path=/;domain=" + getXDomain();
				}
			}
		}		
	} catch (e) {
	}
}

/** XTRUID Create*/
function makeRefererURLCookie() {
	try {
		var referer = document.referrer;
		if (typeof referer != "undefined"){
			var isInnerHost = false;
			for ( var int = 0; int < innerHostArray.length; int++) {
				var innerHost = innerHostArray[int];
				if(referer.indexOf(innerHost) > -1){
					isInnerHost = true;
				}
			}
			if(!isInnerHost){
				var refererURL = getRefererURL(referer);	
				if (typeof refererDomain != "undefined"){
					document.cookie = ruid + "=" + refererURL + ";" + "path=/;domain=" + getXDomain();
				}
			}
		}		
	} catch (e) {
	}
}

/** XTRKID Create*/
function makeRefererKeyWordCookie() {
	try {
		var referer = document.referrer;
		if (typeof referer != "undefined"){
			var isInnerHost = false;
			for ( var int = 0; int < innerHostArray.length; int++) {
				var innerHost = innerHostArray[int];
				if(referer.indexOf(innerHost) > -1){
					isInnerHost = true;
				}
			}
			if(!isInnerHost){
				var refererKeyword = getRefererKeyword(referer);	
				if (typeof refererDomain != "undefined"){
					document.cookie = rkid + "=" + refererKeyword + ";" + "path=/;domain=" + getXDomain();
				}
			}
		}		
	} catch (e) {
	}
}

/** XTSID CREATE*/
function makeSESSIONIDCookie() {
	var xtsidExpire = 30;
	var xtrTodayDate = new Date();
	xtrTodayDate.setMinutes(xtrTodayDate.getMinutes() + xtsidExpire);
	var expiresInfo = xtrTodayDate.toUTCString();
	if (!existCookie(sid)) {
		var randomid = Math.floor(Math.random() * 1000);
		var xtsid = "A" + makeXTVIDValue() + randomid;
		document.cookie = sid + "=" + xtsid + ";" + "path=/;domain=" + getXDomain() + ";expires=" + expiresInfo;
	} else {
		document.cookie = sid + "=" + getXTCookie(sid) + ";" + "path=/;domain=" + getXDomain() + ";expires=" + expiresInfo;
	}

}

/** XTSID*/
function makeXTLIDCookie(value) {
	if (!existCookie(lid)) {
		setXTLIDCookie(lid, value);
	}
}

/** */
function existCookie(name) {
	var vid = getXTCookie(name);
	if (vid != null && vid != "") {
		return true;
	}
	return false;
}

/** */
function getXTCookie(name) {
	var cookies = document.cookie.split("; ");
	for ( var i = 0; i < cookies.length; i++) {
		var cPos = cookies[i].indexOf("=");
		var cName = cookies[i].substring(0, cPos);
		if (cName == name) {
			return unescape(cookies[i].substring(cPos + 1));
		}
	}
	// a cookie with the requested name does not exist
	return "";
}

/** XTVID  */
function setXTVIDCookie(name) {
	var randomid = Math.floor(Math.random() * 1000);

	var xtvid = "A" + makeXTVIDValue() + randomid;
	expireDate = new Date();
	expireDate.setYear(expireDate.getYear() + 10);
	setXTCookie(name, xtvid, 365 * 10, "/", getXDomain());
}

/** XTSID 占쎈쵐伊싨쾮濡㏓ご�좎룞�숋옙諛댁뎽�좎럩裕놅옙占� */
function setXTSIDCookie(name) {
	/** 3�좎럥큔占쏙옙�좎럩裕뉛옙占썹뛾�녿츋繹먲옙*/
	var randomid = Math.floor(Math.random() * 1000);

	/** XTVID =  �좎럥占썼땻�⑸┛�좎룞�숋옙紐낉옙占쎌뼔梨뤄옙占�(A...Z ) �좎럩裕뉛옙袁ㅻ뎨�좑옙+ yymmdd (占쎈쵐伊싨쾮濡녹삕占쎈객�먨뜝�뚮닔占쏙옙  + hhmmss (占쎈쵐伊싨쾮濡녹삕占쎈객�먨뜝�뚮츇�뚳옙 +  MMM (占쎈쵐伊싨쾮占썲뜝�뚮튂�묕옙�숋옙蹂�뜜 1/1000 占싸우삕 + RRR (�좎럩裕뉛옙占� */
	var xtvid = "A" + makeXTVIDValue() + randomid;
	/** var xtvid = makeXTVIDValue() + randomid; */
	expireDate = new Date();
	expireDate.setYear(expireDate.getYear() + 10);

	setXTCookie(name, xtvid, -1, "/", getXDomain());
}

/** */
try {
	var pcX = screen.width;
	var pcY = screen.height;
	var xloc = pcX+"X";
	xloc += pcY;
	setXTCookie("xloc", xloc, 365 * 10, "/", getXDomain());
} catch (e) {
}
/* �좎럥�삥묾�숈삕�좎띂寃ヨ쥈�룻맍 �좎룞��*/


/** XTLID  */
function setXTLIDCookie(name, value) {
	setXTCookie(name, value, -1, "/", getXDomain());
}

/** XTREFID  */
function setXTREFCookie(name, value) {
	setREFCookie(name, value, -1, "/", getXDomain());
}

/** XTRID  */
function removeXTCookie(name) {
	setXTCookie(name, "", 0, "/", getXDomain());
}

/**  */
function setXTCookie(name, value, expires, path, domain) {
	var todayDate = new Date();
	todayDate.setDate(todayDate.getDate() + expires);
	var expiresInfo = (expires < 0) ? '' : todayDate.toGMTString();
	document.cookie = name + "=" + escape(value) + ";" + "path=" + path	+ ";domain=" + domain + ";expires=" + expiresInfo;
}

/**  */
function setREFCookie(name, value, expires, path, domain) {
	var todayDate = new Date();
	todayDate.setDate(todayDate.getDate() + expires);
	var expiresInfo = (expires < 0) ? '' : todayDate.toGMTString();
	
	if (!existCookie(name)) {
		document.cookie = name + "=" + escape(value) + ";" + "path=" + path	+ ";domain=" + domain + ";expires=" + expiresInfo;
	} else {
		document.cookie = name + "=" + getXTCookie(name) + ";" + "path=" + path	+ ";domain=" + domain + ";expires=" + expiresInfo;
	}
}

/** */
function getXDomain() {
	var host = document.domain;
	var hostIp = host.replace(/\./g, "");

	if(!isNaN(hostIp) == true) {
		return host;
	} else {
		var tokens = host.split('.');
		var xdomain = tokens[tokens.length - 2] + '.' + tokens[tokens.length - 1];
		var newXdomain = (tokens[tokens.length - 1].length == 2) ? tokens[tokens.length - 3] + '.' + xdomain : xdomain;
		
		newXdomain = newXdomain.replace("undefined.","");
		return newXdomain;
	}
}

/** XTVID  */
function makeXTVIDValue() {
	var str = '';
	nowdate = new Date();
	digit = nowdate.getFullYear();
	if (digit < 2000) {
		digit = digit - 1900;
	} else {
		digit = digit - 2000;
	}
	str += paddingNo(digit);

	digit = nowdate.getMonth() + 1;
	str += paddingNo(digit);

	digit = nowdate.getDate();
	str += paddingNo(digit);

	digit = nowdate.getHours();
	str += paddingNo(digit);

	digit = nowdate.getMinutes();
	str += paddingNo(digit);

	digit = nowdate.getSeconds();
	str += paddingNo(digit);

	digit = nowdate.getMilliseconds();
	if ((digit <= 99) && (digit > 9)) {
		str += '0' + digit;
	} else if (digit <= 9) {
		str += '00' + digit;
	} else {
		str += '' + digit;
	}
	return str;
}

/** 10�곌랜占쏙옙占썲뜝�덉탳�좑옙�좎뜫爰껓옙袁ъ삕�좑옙0'�좎룞�숂춯占쎌뫒占쏙옙占쎄톾�れ돇�좎럩裕놅옙占� */
function paddingNo(val) {
	var st = '';
	if (val <= 9) {
		st += '0' + val;
	} else {
		st = '' + val;
	}
	return st;
}

/** XTVID 占쎈쵐伊싨쾮濡녹삕占쎈객�� �좎럥梨뤄옙占�*/
//makeXTVIDCookie();
/** makeSESSIONIDCookie(); */

/** WebLog �좎럥踰�占쎈〕�쇿뜝�숈삕占쎌럡苡울옙源놅옙占쏙옙END **/
var getContextPath = function() {
	var offset=location.href.indexOf(location.host)+location.host.length;
	var ctxPath=location.href.substring(offset,location.href.indexOf('/',offset+1));

	return ctxPath;
};

var _ConntectInfo = (function() {
	
	/** apiServer�좎룞�셢p, port, site占쎈땶�뀀�뗦뤆�됱삕?), script�뺢퀗�댐옙占� ?, ?, ?, ? */
	var info = [ 'xtr.tos.sktelecom.com', '443', GVHOST_STR, 'api', '0','NaPm,Ncisy', 'ALL', '0' ];
	//var info = [ '150.19.43.204:8080', '8080', GVHOST_STR, 'api', '0','NaPm,Ncisy', 'ALL', '0' ];
	
	var _CI = (!_ConntectInfo) ? [] : _ConntectInfo.val;
	var _N = 0;
	var _T = new Image(0, 0);
	if (_CI.join('.').indexOf(info[3]) < 0) {
		_CI.push(info);
		_N = _CI.length;
	}
	return {
		len : _N,
		val : _CI
	};
})();
//var _ApiConnectJSLoad = (function() {
//	var G = _ConntectInfo;
//	if (G.len != 0) {
//		var _A = G.val[G.len - 1];
//		var _G = (_A[0]).substr(0, _A[0].indexOf('.'));
//		var _C = (_A[7] != '0') ? (_A[2]) : _A[3];
//		var _U = (_A[5]).replace(/\,/g, '_');
//		var _S = (([ '<scr', 'ipt', 'type="text/javascr', 'ipt"></scr', 'ipt>' ])
//				.join('')).replace('tt', 't src="' + xtrScriptPath + '/xtractor_' + _C + '.js?gc='
//				+ _A[2] + '&py=' + _A[4] + '&gd=' + _G + '&gp=' + _A[1]
//				+ '&up=' + _U + '&rd=' + (new Date().getTime()) + '" t');
//		document.writeln(_S);
//		return _S;
//	}
//})();

function scriptValueGet(O, T) {
	for (var i = 0; i < O.val.length; i++) {
		var _AR = O.val[i];
/** if (_AR[3] == T) { */
			return O.val[i];
/**		} */
		;
	}
}

function apiConnect(errParam) {

	if (typeof (_ConntectInfo) == 'object') {
		var ciValue = scriptValueGet(_ConntectInfo, 'Api');
		var _UD = 'undefined';
		if (typeof (ciValue) != _UD) {
			var _GUL = ciValue[0];
			var _GPT = ciValue[1];
			var _GVHOST = ciValue[2];
			var _gU = '/xtractor/userScript/UserInfoGet?';
			var _rf = document.referrer;
			var _DC = document.cookie;
			function _NIM() {
				return new Image();
			}
			
			var _AIU = _NIM();
			
			function _IL(a) {
				return a != _UD ? a.length : 0;
			}
			function _UL(a) {
				a = _LST(a, '#');
				a = _CST(a, '://');
				if (a.length > 512) {
					a = a.substring(0, 511);
				}
				;
				return a;
			}
			function _PT() {
				return "https://" + _GUL;
				//return "http://" + _GUL;
				// return location.protocol == "https:" ? "https://" + _GUL : "http://" + _GUL + ":" + _GPT;
			}
			function _PL(a, uid) {
				
				_rf = _rf.replace("http://", "");
				_rf = _rf.replace("https://", "");
				
				if (_rf.substring(_rf.length-1, _rf.length) == "/") {
					_rf = _rf.substring(0,_rf.length-1);
				}
				
				_arg = _PT() + _gU;
				if (typeof _ERR != _UD && _ERR == 'err') {
					_arg = _PT() + _gE;
				}
				;
				var hs = "200";
				if (typeof errorStatus != "undefined"){
					hs = errorStatus;
				}
				var method = "GET";
				if ( localStorage.getItem("XTPARAM") != null ) {
					
					try{
						var lsParam = localStorage.getItem("XTPARAM");
						var lsParamStr = lsParam;
						if(a.indexOf("?") != -1){
							a += "&"+lsParamStr;
						}else{
							a += "?"+lsParamStr;
						}
						
					}catch(e){}
					//a += localStorage.getItem("XTPARAM");
					localStorage.removeItem("XTPARAM");
				}
				if ( localStorage.getItem("XTMETHOD") != null ) {
					method = localStorage.getItem("XTMETHOD");
					localStorage.removeItem("XTMETHOD");
				}
				
				if (a.length > 1000) {
					a = a.substring(0, 1000);
				}
				
				a = encodeURIComponent(a);
				
				
				
				var srcUrl = _arg + "&url=" + a;
				
				if (_rf != "") {
					srcUrl += "&ref=" + encodeURIComponent(encodeURIComponent(_rf));
					//srcUrl += "&ref=" + _rf;

//					for ( var int = 0; int < innerHostArray.length; int++) {
//						var innerHost = innerHostArray[int];
//						if(referer.indexOf(innerHost) > -1){
//							srcUrl += "&ref=" + encodeURIComponent(_rf);
//						}else{
//							srcUrl += "&ref=" + _rf;
//						}
//					}

				}
				srcUrl += "&req_type=xml" + "&ua="+encodeURIComponent(navigator.userAgent) + "&dc=" + encodeURIComponent(document.cookie) + "&xtuid=" +uid + "&httpstatus="+hs +"&method="+method;

				srcUrl += "&gvhost="+_GVHOST;
				_AIU.src = srcUrl;
/** _AIU.src = _arg + "&url=" + escape("script."+a) + "&ref=" + escape(_rf) +
 "&req_type=xml" + "&ua="+navigator.userAgent + "&dc=" + document.cookie +
 "&xtuid=" +uid + "&httpstatus="+hs;
 _AIU.src = _arg + "&url=" + escape("script."+a) + "&ref=" + escape(_rf) +
 "&dc=" + _DC + "&req_type=xml" + "&ua="+navigator.userAgent;
 console.log(_AIU.src);
 for(var i=0; i<_AIU.src.split("&").length; i++) {
 console.log(_AIU.src.split("&")[i]);
 } */
			setTimeout("", 300);
			}
			try{
/**				var fp = new Fingerprint2(getFPOptions()); */
				var url = document.URL.replace("http://", "");
				url = url.replace("https://", "");
				
				if(typeof errParam != "undefined") {
					if(url.indexOf("?") == -1){
						url+= "?" + errParam;
					}else{
						url+= "&" + errParam;
					}
				}
				
				_PL(url, "");
/**				fp.get(function(result) {
					_PL(url, result);

					if(typeof window.console !== "undefined") {	
						console.log("finger: " + result);
					}
				}); */
			}catch(e){
				_PL(url, 'FP_ERROR');

				if(typeof window.console !== "undefined") {
					console.log(e);	
				}
			}
		}
	}
	xtrChk = "true";

}

apiConnect();

function ScriptApi(Param) {

	if (typeof (_ConntectInfo) == 'object') {
		var ciValue = scriptValueGet(_ConntectInfo, 'Api');
		var _UD = 'undefined';
		if (typeof (ciValue) != _UD) {
			var _GUL = ciValue[0];
			var _GPT = ciValue[1];
			var _GVHOST = ciValue[2];
			var _gU = '/xtractor/userScript/UserInfoGet?';
			var _rf = document.referrer;
			var _DC = document.cookie;
			function _NIM() {
				return new Image();
			}
			
			var _AIU = _NIM();
			
			function _IL(a) {
				return a != _UD ? a.length : 0;
			}
			function _UL(a) {
				a = _LST(a, '#');
				a = _CST(a, '://');
				if (a.length > 512) {
					a = a.substring(0, 511);
				}
				;
				return a;
			}
			function _PT() {
				return "https://" + _GUL;
				//return "http://" + _GUL;
				// return location.protocol == "https:" ? "https://" + _GUL : "http://" + _GUL + ":" + _GPT;
			}
			function _PL(a, uid) {
				
				_rf = _rf.replace("http://", "");
				_rf = _rf.replace("https://", "");
				
				if (_rf.substring(_rf.length-1, _rf.length) == "/") {
					_rf = _rf.substring(0,_rf.length-1);
				}
				
				_arg = _PT() + _gU;
				if (typeof _ERR != _UD && _ERR == 'err') {
					_arg = _PT() + _gE;
				}
				;
				var hs = "200";
				if (typeof errorStatus != "undefined"){
					hs = errorStatus;
				}
				var method = "GET";
				if ( localStorage.getItem("XTPARAM") != null ) {
					
//					a += localStorage.getItem("XTPARAM");
					localStorage.removeItem("XTPARAM");
				}
				if ( localStorage.getItem("XTMETHOD") != null ) {
					method = localStorage.getItem("XTMETHOD");
					localStorage.removeItem("XTMETHOD");
				}
				
				if (a.length > 1000) {
					a = a.substring(0, 1000);
				}
				
				a = encodeURIComponent(a);
				
				var srcUrl = _arg + "&url=" + a;
				
				if (_rf != "") {
					srcUrl += "&ref=" + _rf;
				}
				srcUrl += "&req_type=xml" + "&ua="+encodeURIComponent(navigator.userAgent) + "&dc=" + encodeURIComponent(document.cookie) + "&xtuid=" +uid + "&httpstatus="+hs +"&method="+method;
				
				srcUrl += "&gvhost="+_GVHOST;
				_AIU.src = srcUrl;
/** _AIU.src = _arg + "&url=" + escape("script."+a) + "&ref=" + escape(_rf) +
 "&req_type=xml" + "&ua="+navigator.userAgent + "&dc=" + document.cookie +
 "&xtuid=" +uid + "&httpstatus="+hs;
 _AIU.src = _arg + "&url=" + escape("script."+a) + "&ref=" + escape(_rf) +
 "&dc=" + _DC + "&req_type=xml" + "&ua="+navigator.userAgent;
 console.log(_AIU.src);
 for(var i=0; i<_AIU.src.split("&").length; i++) {
 console.log(_AIU.src.split("&")[i]);
 } */
				setTimeout("", 300);
			}
			
			try{
/**				var fp = new Fingerprint2(getFPOptions()); */
				var url = "";
				//var url = document.URL.replace("http://", "");
				//url = url.replace("https://", "");
				
				if(typeof Param != "undefined") {	
					if(url.indexOf("?") == -1){
						//url.replace("?[object Arguments]", "");
						url= Param;
					}
				}
				
				_PL(url, "");
/**				fp.get(function(result) {
					_PL(url, result);

					if(typeof window.console !== "undefined") {	
						console.log("finger: " + result);
					}
				}); */
			}catch(e){
				_PL(url, 'FP_ERROR');

				if(typeof window.console !== "undefined") {
					console.log(e);	
				}
			}
		}
	}
}


function getFPOptions() {
	var optionsValue = {
		excludeUserAgent: false,
		excludeLanguage: false,
		excludeColorDepth: true,
		excludePixelRatio: true,
		excludeScreenResolution: true,
		excludeAvailableScreenResolution: true,
		excludeTimezoneOffset: false,
		excludeSessionStorage : true,
		excludeIndexedDB : true,
		excludeAddBehavior : true,
		excludeOpenDatabase : true,
		excludeCpuClass: false,
		excludePlatform: false,
		excludeDoNotTrack: true,
		excludeCanvas : true,
		excludeWebGL: true,
		excludeAdBlock: true,
		excludeHasLiedLanguages: true,
		excludeHasLiedResolution: true,
		excludeHasLiedOs: true,
		excludeHasLiedBrowser: true,
		excludeJsFonts: true,
		excludeFlashFonts: true,
		excludePlugins: true,
		excludeIEPlugins: true,
		excludeTouchSupport: true
	};

	return optionsValue;
}


/*
 * form submit �좎럥��옙�덉쾵筌뤿굛�� �좎럥肉�옙占쏙옙�몄삕占쏙옙
 */
//$(document).ready(function() {
//	
//	$("form").each(function() {
//		$(this).submit(function(event) {
//			localStorage.setItem("XTMETHOD", $(this).attr("method").toUpperCase());
//			localStorage.setItem("XTPARAM", "?"+xtr(this).serialize());
//		});
//	});
//	
//	/*
//	 * jquery Ajax default setting
//	 */
//
//});

function logSubmit(event){
    localStorage.setItem("XTMETHOD", event.target.method.toUpperCase());
    localStorage.setItem("XTPARAM", xtr_serialize(event.target));		
}

window.onsubmit = logSubmit;

var xtr_serialize = function (form) {
	var field,
			l,
			s = [];

	var len = form.elements.length;
		for (var i = 0; i < len; i++) {
			field = form.elements[i];
			if (field.name && !field.disabled && field.type != 'button' && field.type != 'file' && field.type != 'reset' && field.type != 'submit') {
				if (field.type == 'select-multiple') {
					l = form.elements[i].options.length;
					for (var j = 0; j < l; j++) {
						if (field.options[j].selected) {
							s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[j].value);
						}
					}
				}else if ((field.type != 'checkbox' && field.type != 'radio') || field.checked) {
					s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value);
				}
			}
		}
		return s.join('&').replace(/%20/g, '+');
	}


/*
 * XMLHttpRequest Ajax default setting
 */

_sendAjax = XMLHttpRequest.prototype.send;
XMLHttpRequest.prototype.send = function() {
    if (arguments[0] != null) {
    	//localStorage.setItem("XTPARAM", "?"+arguments);
    	localStorage.setItem("XTPARAM", arguments[0]);
    	
    }
    //apiConnect();
 
    //try{
    _sendAjax.apply(this, arguments);
    //}catch(e){
    	//console.log(e);
    //}
};

_openAjax = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function() {
	
	if (arguments[0] != null) {
    	localStorage.setItem("XTMETHOD", arguments[0]);
    }
	
	_openAjax.apply(this, arguments);
};


function new_callCSScript(E_ID, ACTION) {     
	 
    var URI = location.protocol + "//www.tworld.co.kr/global/xtractor/CSDummy";
    var v_id = GetCookie('XTVID'); 
    var l_id = GetCookie('XTLID'); //�뚯꽑�뺣낫(���쒗쉶��)
    var u_id = "";                 //�뚯꽑�뺣낫(�ㅽ쉶��)
    if(l_id != "")					//濡쒓렇�몃릺�댁엳�쇰㈃
    {
    	u_id = GetCookie('XTUID');  
    	if(u_id !="")				//�뚯꽑蹂�寃쎌뿬遺� �뺤씤�섏뿬 蹂�寃쏀븳 �ㅽ쉶�좎쑝濡� �꾨떖
    	{
    		l_id = u_id;
    	}     	
    }     
    var PARAMS = "V_ID=" + v_id + "&L_ID=" + l_id + "&E_ID=" + E_ID + "&CS_ID=&P_ID=&ACTION="+ACTION;   
    var ajax = new AJAX();
    URI = URI+"?"+PARAMS+"&_dt="+Math.floor(new Date().getTime()/1000); 
    ajax.sendRequest("GET", URI, false, null, PARAMS);
}

var AJAX = function() {
	var request = null;
	this.sendRequest = sendRequest;
	if (window.XMLHttpRequest) {
		request = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		request = new ActiveXObject("MSXML2.XMLHTTP");
		if (!request) {
			request = new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	function sendRequest(reqType, url, asynch, action, queryString) {
		//request.onreadystatechange = action;  // CallBack
		request.open(reqType, url, asynch);
		request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charaset=UTF-8");
		request.send(queryString);
	}
}

var XtractorError = {
		
};

XtractorError.sendError = function(ex) {
	
	var msg = encodeURIComponent("JavaScript-"+ex.message);
	msg = msg.replace(/ /g, "_");
	
	
	var dd = ex.stack.split("\n");
	var errorLine = "";
	if(dd.length>0){
		var r =dd[1];
		errorLine = encodeURIComponent(r);
	}
	
	var xtrUrl = document.URL;
	
	if(xtrUrl.indexOf("?")>0){
		xtrUrl +="&";
	}else{
		xtrUrl +="?";
	}	
	ScriptApi(xtrUrl+"ErrMsg="+ msg + "&ErrLine="+errorLine);	
	//xtr.getJSON(xtrUrl+"ErrMsg="+ msg);
};

var XtractorEvent = {
		
};

XtractorEvent.xtrEvent = function(Parameter) {
	
//	var param = encodeURIComponent(Parameter);
	var param = Parameter.replace(/ /g, "_");
	
	var domain = window.location.host;
	var xtrUrl = domain+"/eventDummy";
	
	if(xtrUrl.indexOf("?")>0){
		xtrUrl +="&";
	}else{
		xtrUrl +="?";
	}	
	ScriptApi(xtrUrl+param);	
};


var XtractorScript = {
		
};


XtractorScript.xtrLoginDummy = function(Parameter) {

	//var param = encodeURIComponent(Parameter);
	var param = Parameter.replace(/ /g, "_");
	
	var domain = window.location.host;
	var xtrUrl = domain+"/loginDummy";
	
	if(xtrUrl.indexOf("?")>0){
		xtrUrl +="&";
	}else{
		xtrUrl +="?";
	}	
	ScriptApi(xtrUrl+param);
};

XtractorScript.xtrCSDummy = function(E_ID, CS_ID, ACTION, AREA) {

	var eid = E_ID.replace(/ /g, "_");

	var csid = CS_ID.replace(/ /g, "_");

	var action = null;
	
	var fullurl = null;
	if(ACTION) {
		action = ACTION.replace(/ /g, "_");
	}
	
	var area = null;
	if(AREA) {
		area = AREA.replace(/ /g, "_");
	}

	var domain = window.location.host;
	
	var url = window.location.pathname;
	var hash = window.location.hash;
	
	if(url){
		fullurl = url;		
	}
	if(hash){
		fullurl +=hash;
	}
	
	fullurl = encodeURIComponent(fullurl);

	var xtrUrl = domain+"/csDummy";
	
	if(xtrUrl.indexOf("?")>0){
		xtrUrl +="&";
	}else{
		xtrUrl +="?";
	}
		
	if(area != null){
		if(fullurl != null){
			ScriptApi(xtrUrl+"E_ID="+ eid + "&CS_ID="+csid + "&ACTION="+action+ "&AREA="+area+ "&frontURL="+fullurl);
		}else{
			ScriptApi(xtrUrl+"E_ID="+ eid + "&CS_ID="+csid + "&ACTION="+action+ "&AREA="+area);
		}
	}else if(action != null){
		if(fullurl != null){
			ScriptApi(xtrUrl+"E_ID="+ eid + "&CS_ID="+csid + "&ACTION="+action+ "&frontURL="+fullurl);
		}else{
			ScriptApi(xtrUrl+"E_ID="+ eid + "&CS_ID="+csid + "&ACTION="+action);
		}
	}else{
		if(fullurl != null){
			ScriptApi(xtrUrl+"E_ID="+ eid + "&ACTION="+csid+ "&frontURL="+fullurl);
		}else{
			ScriptApi(xtrUrl+"E_ID="+ eid + "&ACTION="+csid);
		}
	}
};


XtractorScript.xtrSns = function(prodID, SNS) {

	//var pid = encodeURIComponent(prodID);
	var pid = prodID.replace(/ /g, "_");

	//var tw = encodeURIComponent(SNS);
	var tw = SNS.replace(/ /g, "_");
	
	var domain = window.location.host;
	var xtrUrl = domain+"/snsDummy";
	
	if(xtrUrl.indexOf("?")>0){
		xtrUrl +="&";
	}else{
		xtrUrl +="?";
	}	
	ScriptApi(xtrUrl+"PROD_ID="+ pid + "&SNS="+tw);	
};

XtractorScript.xtrOrder = function(pid, cnt, type, grade, age, gender) {

	var domain = window.location.host;
	var xtrUrl = domain+"/orderDummy";
	
	if(xtrUrl.indexOf("?")>0){
		xtrUrl +="&";
	}else{
		xtrUrl +="?";
	}	
	ScriptApi(xtrUrl+"P_ID="+ pid +"&CNT="+cnt+"&TYPE="+type+"&GRADE="+grade+"&AGE="+age+"&GENDER="+gender);	
};

XtractorScript.xtrMenualApi = function(url) {

	var domain = window.location.host;
	var xtrUrl = domain+url;
	ScriptApi(xtrUrl);

};


XtractorScript.xtrSearch = function(kwd, inKwd, cArea) {

	var keyword = kwd.replace(/ /g, "_");

	var inkeyword = inKwd.replace(/ /g, "_");

	var clickArea = null;
	if(cArea) {
		clickArea = cArea.replace(/ /g, "_");
	}

	var domain = window.location.host;

	var xtrUrl = domain+"/searchDummy";
	
	if(xtrUrl.indexOf("?")>0){
		xtrUrl +="&";
	}else{
		xtrUrl +="?";
	}
		
	if(clickArea != null){
		ScriptApi(xtrUrl+"keyword="+ keyword + "&inkeyword="+inkeyword + "&clickarea="+clickArea);			
	}else{
		ScriptApi(xtrUrl+"keyword="+ keyword + "&clickarea="+inkeyword);
	}
};

XtractorScript.xtrMPSearch = function(kwd, inKwd, type, cArea, destinateURL) {

	var keyword = kwd.replace(/ /g, "_");

	var inkeyword = inKwd.replace(/ /g, "_");

	var kwdType = null;
	if(type) {
		kwdType = type.replace(/ /g, "_");
	}
	
	var clickArea = null;
	if(cArea) {
		clickArea = cArea.replace(/ /g, "_");
	}
	
	var landingURL = null;
	if(destinateURL) {
		landingURL = destinateURL.replace(/ /g, "_");
	}

	var domain = window.location.host;

	var xtrUrl = domain+"/searchDummy";
	
	if(xtrUrl.indexOf("?")>0){
		xtrUrl +="&";
	}else{
		xtrUrl +="?";
	}
		
	if(clickArea != null){
		ScriptApi(xtrUrl+"keyword="+keyword+"&inkeyword="+inkeyword+"&kwdType="+kwdType+"&clickarea="+clickArea+"&landingURL="+landingURL);			
	}else if(type != null){
		ScriptApi(xtrUrl+"keyword="+keyword+"&inkeyword="+inkeyword+"&kwdType="+kwdType);
	}else{
		ScriptApi(xtrUrl+"keyword="+keyword+"&kwdType="+kwdType);
	}
};



XtractorScript.xtrSearchResult = function(kwd, inKwd, result) {

	var keyword = kwd.replace(/ /g, "_");

	var inkeyword = inKwd.replace(/ /g, "_");

	var resultList = result.replace(/ /g, "_");
	
	var domain = window.location.host;

	var xtrUrl = domain+"/searchResultDummy";
	
	if(xtrUrl.indexOf("?")>0){
		xtrUrl +="&";
	}else{
		xtrUrl +="?";
	}
		
	ScriptApi(xtrUrl+"keyword="+ keyword + "&inkeyword="+inkeyword + "&resultList="+resultList);			
	
};

XtractorScript.xtrProdCompare = function(basicPid, comparePid, type) {

	var domain = window.location.host;
	var xtrUrl = domain+"/compareDummy";
	
	if(xtrUrl.indexOf("?")>0){
		xtrUrl +="&";
	}else{
		xtrUrl +="?";
	}	
	ScriptApi(xtrUrl+"BASIC_PID="+ basicPid +"&COMPARE_PID="+comparePid + "&TYPE="+type);	
};


XtractorScript.xtrTotalSearch = function(kwd, inKwd, pageCategory, pageurl, expuseContents, orderCondition) {

	var domain = window.location.host;
	var xtrUrl = domain+"/twTotalSearch";
	
	if(xtrUrl.indexOf("?")>0){
		xtrUrl +="&";
	}else{
		xtrUrl +="?";
	}	
	ScriptApi(xtrUrl+"keyword="+kwd+"&inkeyword="+inKwd+"&pageCategory="+pageCategory+"&pageurl="+pageurl+"&expuseContents="+expuseContents+"&orderCondition="+orderCondition);	
};

XtractorScript.xtrTotalSearchResult = function(kwd, inKwd, clickPageCategory, clickPageurl, clickModuldeOrder, clickModuleId, clickModuleName, clickCollectionOrder, clickCollectionId, clickCollectionName, orderCondition) {

	var domain = window.location.host;
	var xtrUrl = domain+"/twTotalSearchResult";
	
	if(xtrUrl.indexOf("?")>0){
		xtrUrl +="&";
	}else{
		xtrUrl +="?";
	}	
	ScriptApi(xtrUrl+"keyword="+kwd+"&inkeyword="+inKwd+"&clickPageCategory="+clickPageCategory+"&clickPageurl="+clickPageurl+"&clickModuldeOrder="+clickModuldeOrder+"&clickModuleId="+clickModuleId+"&clickModuleName="+clickModuleName+"&clickCollectionOrder="+clickCollectionOrder+"&clickCollectionId="+clickCollectionId+"&clickCollectionName="+clickCollectionName+"&orderCondition="+orderCondition);	
};



function postParam(){ 
	var forms = document.getElementsByTagName("form");
	if(typeof forms !== "undefined") {
		for ( var int = 0; int < forms.length; int++) {
			var getForm = forms[int];
			var oriSubmit = getForm.submit;
			getForm.submit = function(e) {
				localStorage.setItem("XTMETHOD", 'POST');
				var formData = [];
				var elem = this.elements;
				var postParamStr = "";
				for(var i=0; i<elem.length; i++) {
					var name = elem[i].name;
					var value = elem[i].value;
					formData.push(name + '=' + value);
					if(i > 0){
						postParamStr += "&";
					}
					postParamStr += name + "=" + value;
				}
				localStorage.setItem("XTPARAM", postParamStr);
				oriSubmit.apply(this);
			};
		}
	}
	
}

var ready = function(){
	postParam();
};

if(document.readyState == 'complete' ) ready();
else if(document.addEventListener) {
	ready();
}
else document.attachEvent('onreadystatechange', function() { 
	if(document.readyState === 'complete') ready();
});



