import React, { useEffect, useState } from 'react';
import { ImageRounded } from '../Picture/ImageRounded';
import { LinkRounded } from '../Link/LinkRounded';
import XtrAw from '../Common/XtrAw';
import { SKTUNIVERSE_URL } from '../../common/const';
import V6Link from '../Common/V6Link';
import useModal from '../../hooks/useModal';

export interface ScmRankingProps {
  scmRanking: any;
  seg: string;
  onClickConversion?: any;
  rankingSeg: any;
  setRankingSeg: any;
}

function ScmRanking({ seg, scmRanking, onClickConversion, rankingSeg, setRankingSeg }: ScmRankingProps) {
  const categoryList = Object.keys(scmRanking);
  const [toggleState, setToggleState] = useState(0);
  const { bottomSheetAge } = useModal();

  let tabList = null;
  useEffect(() => {
    tabList = document.querySelector('.card-tab-item');
  });

  const lineMove = (index: number) => {
    const line = tabList.querySelector('.line');
    const list = tabList.querySelectorAll('li');
    const target = list[index];

    line.style.left = `${target.offsetLeft}px`;
    line.style.width = `${target.offsetWidth}px`;
  };

  const toggleTab = (index: number) => {
    setToggleState(index);
    lineMove(index);
  };

  const xtrCategoryCode = {
    전체: ['CMMA_A20-13', 'MWMA_A20-95'],
    쇼핑: ['CMMA_A20-14', 'MWMA_A20-96'],
    음식: ['CMMA_A20-15', 'MWMA_A20-97'],
    '카페/디저트': ['CMMA_A20-16', 'MWMA_A20-98'],
    콘텐츠: ['CMMA_A20-17', 'MWMA_A20-99'],
    '교통/여행': ['CMMA_A20-18', 'MWMA_A20-100'],
    라이프스타일: ['CMMA_A20-19', 'MWMA_A20-101'],
  };
  return (
    <article className="card-main-content best-card">
      <div className="title">
        <XtrAw
          as={'button'}
          appEid={'CMMA_A20-12'}
          webEid={'MWMA_A20-94'}
          xtrClick={true}
          xtrView={true}
          onClick={() => {
            bottomSheetAge.show({
              isOpen: true,
              bottomSheetType: 'scm',
              rankingSeg,
              setRankingSeg,
            });
          }}
          type="button"
          className="btn-addr-bl"
          title="연령 선택"
          aria-haspopup="menuAge"
          aria-expanded="false"
        >
          <span>{seg}</span>
          <i className="bl-arr-bold" aria-hidden="true" /> {/* 2023-01-10 접근성 / aria 추가 */}
        </XtrAw>
        &nbsp;가 선택한 BEST 구독 상품
      </div>
      <h2 className="hidden">{seg} 가 선택한 BEST 구독 상품</h2>
      <div className="card-tab-wrap">
        <ul className="card-tab-item horizontal-scroll" role="tablist">
          {categoryList?.map((category, index: number) => (
            <li key={index} role="presentation">
              {/* 2023-01-10 접근성 / role 수정 */}
              <XtrAw
                as={'button'}
                appEid={xtrCategoryCode[scmRanking[category].categoryName][0]}
                webEid={xtrCategoryCode[scmRanking[category].categoryName][1]}
                xtrClick={true}
                xtrView={true}
                type="button"
                className={toggleState === index ? 'active' : null}
                onClick={() => toggleTab(index)}
                role="tab"
                id={`tab_panel${index}`}
                aria-controls={`tab_content${index}`}
                aria-selected={toggleState === index}
              >
                {scmRanking[category].categoryName}
              </XtrAw>
            </li>
          ))}
          <i className="line" />
        </ul>
      </div>
      {categoryList?.map((category, index: number) => (
        <>
          <ul
            key={index}
            className={`card-tab-area circular ${toggleState === index ? 'active' : ''}`}
            role="tabpanel"
            aria-labelledby={`tab_panel${index}`}
            id={`tab_content${index}`}
          >
            {/* 2023-03-13 접근성 */}
            <h3 className="hidden">{scmRanking[category].categoryName}</h3>
            {scmRanking[category]?.productList?.map((product, index: number) => (
              <li key={index}>
                <V6Link href={`${SKTUNIVERSE_URL[global.LDSP]}/product/view?prodId=${product.prod_id}`}>
                  <XtrAw
                    as={'div'}
                    appEid={`CMMA_A20-${20 + index}`}
                    webEid={`MWMA_A20-${102 + index}`}
                    xtrClick={true}
                    xtrView={true}
                    className="tbumb-item"
                    onClick={async () => {
                      await onClickConversion('scm_001');
                    }}
                  >
                    <ImageRounded src={product.imageUrl} width="56" height="56" alt="" />{' '}
                    <span>
                      <strong>
                        <em>{index + 1}</em>
                        {product.prod_nm}
                      </strong>
                      <span className="bestcard-txt" dangerouslySetInnerHTML={{ __html: product.description }} />
                    </span>
                  </XtrAw>
                </V6Link>
              </li>
            ))}
          </ul>
        </>
      ))}
      <XtrAw
        as={'div'}
        appEid={'CMMA_A20-23'}
        webEid={'MWMA_A20-105'}
        xtrClick={true}
        xtrView={true}
        onClick={async () => {
          await onClickConversion('scm_001');
        }}
      >
        <LinkRounded to={`${SKTUNIVERSE_URL[global.LDSP]}/product/list`} size="large" label={'구독 상품 더 보기'} />
      </XtrAw>
    </article>
  );
}

export const MainSubscribeContent = React.memo(ScmRanking);
