import React, { useEffect, useState } from 'react';
import { MainConnectMedia } from '../../components/Main/MainConnectMedia';
import { getKbo } from '../../api/main';
import kboApiRespToCompProps from '../../common/apiRespToDisplayData/main/adotBaseball';

export default function ({ targetDate }: { targetDate: string }) {
  const [cardProps, setCardProps] = useState(null);
  useEffect(() => {
    (async () => {
      const resp = await getKbo({ targetDate });
      setCardProps(kboApiRespToCompProps(resp));
    })();
  }, []);

  if (!cardProps) return null;
  return <MainConnectMedia {...cardProps} />;
}
