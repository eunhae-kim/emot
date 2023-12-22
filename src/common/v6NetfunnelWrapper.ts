import { TWORLD_APP_URL, TWORLD_URL } from './const';
import { isApp } from '../js/commonUtil';
import NetfunnelTargetInfo from './netfunnelTargetInfo';

// {actionId: "act-myt-data_submain", target: "/myt-data/submain"}
export type NetfunnelActionTarget = { actionId: string; target: string };

export const getActionId = (url: string) => {
  let actionId = null;

  if (!url) return actionId;

  NetfunnelTargetInfo.every((actionTarget) => {
    //console.log(url, actionTarget.target, url.indexOf(actionTarget.target));
    if (url.indexOf(actionTarget.target) > -1) {
      actionId = actionTarget.actionId;
      return false;
    }

    return true;
  });
  return actionId;
};

export class V6NetfunnelWrapper {
  netfunnelActionTargetList: Array<NetfunnelActionTarget>;
  isLoggedIn: boolean;
  getActionId: (url: string) => string;

  constructor() {
    // 디폴트로 넷퍼넬 태우기 위해서 일단 true로 설정
    this.isLoggedIn = true;
    //this.netfunnelActionTargetList = [];
    this.netfunnelActionTargetList = NetfunnelTargetInfo;
    this.getActionId = getActionId;
  }
  setIsLoggedIn(isLoggedIn: boolean) {
    this.isLoggedIn = isLoggedIn;
  }
  /*
  setNetfunnelActionTargetList(netfunnelActionTargetList: Array<NetfunnelActionTarget>) {
    this.netfunnelActionTargetList = netfunnelActionTargetList;
  }*/
  do(url: string, onComplete: () => void) {
    const actionId = getActionId(url);

    // 기존 스펙과 같은 조건에서 netfunnel 사용 안함
    // - 로그인 안되어 있음 / 넷퍼넬 로드 안됨 / actionTarget에 정의 된 URL이 아님
    // @ts-ignore
    if (!this.isLoggedIn || !window.NetFunnel_Action || !actionId) {
      onComplete();
      return;
    }

    // 기존 스펙과 동일하게 PRD가 아닌 경우에는 act-0test로 actionId 전달
    // @ts-ignore
    window.NetFunnel_Action(
      {
        action_id: global.LDSP !== 'GREEN' && global.LDSP !== 'BLUE' ? 'act-0test' : actionId,
        //action_id: 'act_1',
        skin_id: 'tworld',
      },
      {
        success: function () {
          onComplete();
        },
      },
    );
  }
}

export default new V6NetfunnelWrapper();
