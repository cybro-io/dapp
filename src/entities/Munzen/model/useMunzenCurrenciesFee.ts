import React from 'react';

import { MunzenFee } from '@/entities/Munzen/model/types';

export const useMunzenCurrenciesFee = () => {
  const [fee, setFee] = React.useState<MunzenFee | undefined>();
  const [isLoading, setLoading] = React.useState(false);

  const mockAsync = async () => {
    setLoading(true);
    setTimeout(async () => {
      setFee({
        providerFee: {
          type: 'max',
          value: [
            [
              {
                type: 'money',
                value: {
                  amount: 2.5,
                  currency: 'EUR',
                },
              },
            ],
            [
              {
                type: 'percent',
                value: 2.9,
              },
            ],
          ],
        },
        networkFee: {
          type: 'money',
          value: {
            amount: 0.000357,
            currency: 'USDT',
          },
        },
        networkFeeFiat: {
          type: 'money',
          value: {
            amount: 0.000321,
            currency: 'EUR',
          },
        },
      });
      setLoading(false);
    }, 3000);
  };

  React.useEffect(() => {
    mockAsync();
  }, []);

  return { fee, isLoading };
};
