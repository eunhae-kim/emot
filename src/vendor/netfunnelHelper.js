export const initNetfunnel = function () {
  /* jshint ignore:start */
  var netfunnelSkinOption = {
    prepareCallback: function () {
      /*
      var progress_print = document.getElementById('Progress_Print');
      progress_print.innerHTML = '0';
      */
    },
    updateCallback: function (percent, nwait, totwait, timeleft) {
      /*
      // percent 진행률
      // nwait 남아있는 대기자수
      // totwait 전체 대기자수
      // timeleft 남아있는 대기시간
      var progress_print = document.getElementById('Progress_Print');
      // 현재 대기 인원 : 전체 대기인원 - 남아있는 대기인원1
      progress_print.innerHTML = totwait - nwait;
      */
    },
    htmlStr:
      '<div id="NetFunnel_Skin_Top" class="popup tw-popup" role="dialog" aria-hidden="false">' +
      '            <div class="popup-info" role="alertdialog" aria-labelledby="alertHeading" aria-describedby="alertText">' +
      '                <div class="popup-contents " id="alertText">' +
      '                    <div class="inner-contents tod-wait-wrap">' +
      '                        <span class="blind">잠시만 기다리시면 자동 접속됩니다.</span>' +
      '                        <p class="tod-txcolor1 tod-wait-txt">다시 접속하시면 대기시간이 길어지니 잠시만 기다려 주세요.</p>' +
      '                        <div class="tod-wait-box">' +
      '                            <span class="txt mb5">현재 대기인원 <em class="tod-txcolor6">' +
      '                             <span id="NetFunnel_Loading_Popup_Count">0</span>명</em></span>' +
      '                            <span class="txt">예상 대기시간 <span class="tod-txcolor6">' +
      '                             <span id="NetFunnel_Loading_Popup_TimeLeft" class=""></span>' +
      '                            </span></span>' +
      '                        </div>' +
      '                        ' +
      '                    </div>' +
      '                </div>' +
      '                <ul class="bt-bottom">' +
      '                    <li class="bt-red1 pos-right">' +
      '                        <button id="NetFunnel_Countdown_Stop">닫기</button>' +
      '                    </li>' +
      '                </ul>' +
      '            </div>' +
      '            <div class="popup-blind"></div>' +
      '        </div>',
    // htmlStr: '<div id="NetFunnel_Skin_Top" style="background-color:#ffffff;border:1px solid #9ab6c4;width:300px">' +
    //   '<div style="text-align:right;padding-top:5px;padding-right:5px;;text-align:center;">' +
    //   '<div style="text-align:left;font-size:9pt;color:#001f6c;padding-left:10px;">' +
    //   '<b><span style="color:#013dc1">접속대기 중</span>..</b><br>' +
    //   '- 대기자수 : <span id="NetFunnel_Loading_Popup_Count"></span>명<br>' +
    //   '- 대기시간 : <span id="NetFunnel_Loading_Popup_TimeLeft"></span><br>' +
    //   '<div id="Progress_Print" style="text-align:center;padding:5px;font:bold 20px Trebuchet MS,굴림,Gulim;color:gray"></div>' +
    //   '</div><div style="padding:10px;;vertical-align:center;width:280px" id="NetFunnel_Loading_Popup_Progressbar">' +
    //   '</div><div id="NetFunnel_Countdown_Stop" >중지</div></div>'
  };
  // 웹, 모바일 두가지 케이스에 대해서 모두 등록이 필요함
  NetFunnel.SkinUtil.add('tworld', netfunnelSkinOption, 'normal');
  NetFunnel.SkinUtil.add('tworld', netfunnelSkinOption, 'mobile');
  /* jshint ignore:end */
};
