import React from 'react';
import { BASE_PATH } from '../../common/const';
import MyLink from '../Common/MyLink';
import XtrAw from '../Common/XtrAw';

export interface MembershipProps {
  text: string | null;
  rank: string | null;
  btnType: string | null;
  disabled: boolean;
  btnName: string | null;
  descText: string | null;
  descSubText: string | null;
  link?: string;
}

export function MyMembership({ text, rank, btnType, disabled, btnName, descText, descSubText, link }: MembershipProps) {
  return (
    <div className="card-bottom-content">
      <div className="my-membership-info">
        <div className="my-state">
          <div className="membership">
            <p className="logo">
              <img src={`${BASE_PATH}/images/banner/my-membership-logo.png`} alt="T Membership" />
            </p>
            <span className="info-text">
              {text}
              <i className="sub">{rank}</i>
            </span>
          </div>
          <XtrAw
            appEid={btnType === 'barcode' ? 'CMMA_A24-18' : 'CMMA_A24-19'}
            webEid={btnType === 'barcode' ? 'MWMA_A24-50' : 'MWMA_A24-51'}
            xtrView
            xtrClick
          >
            <MyLink href={link} className={`btn-${`${btnType} ${disabled ? `disabled` : ``}`}`}>
              {btnName}
            </MyLink>
          </XtrAw>
        </div>
        {descText && (
          <p className="remark">
            <i className="ic-warn2" />
            <span dangerouslySetInnerHTML={{ __html: descText }} />
          </p>
        )}
        {descSubText && (
          <p className="remark">
            <span className="sub">{descSubText}</span>
          </p>
        )}
      </div>
    </div>
  );
}
