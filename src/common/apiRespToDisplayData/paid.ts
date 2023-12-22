import moment from 'moment';
import { comma, commaIfNumber, formatDate1 } from '../utils';
/*
{
  indvYn:"N"
  invDt:"20221031"
  repSvcYn:"Y"
  respCode:0
  smallPayYn:"N"
  useAmtTot:"29420"
}
{
  "respCode": 0,
  "smallPayYn": "N",
  "useAmtTot": "",
  "invDt": "",
  "indvYn": "Y"
}
*/
export type wireDispalyData = {
  요금: string;
  통합청구사용: boolean;
  기간: string;
  휴대폰결제이용동의: boolean;
  청구월: number;

  apiResp: any;
};

export default (apiResp: any): wireDispalyData => {
  const 요금 = commaIfNumber(apiResp.useAmtTot);
  const 통합청구사용 = apiResp.indvYn !== 'Y';
  const 이용월 = parseInt(apiResp.invDt.replace(/....(..)../, '$1'), 10);
  const 기간 = formatDate1(apiResp.invDt.replace(/..$/, '01')) + ' ~ ' + formatDate1(apiResp.invDt);
  const 휴대폰결제이용동의 = apiResp.smallPayYn === 'Y';
  const 청구월 = 이용월 + 1 > 12 ? 1 : 이용월 + 1;

  const result = {
    요금,
    통합청구사용,
    기간,
    휴대폰결제이용동의,
    청구월,
    apiResp,
  };

  //console.log(`paid API res:`, result);

  return result;
};
