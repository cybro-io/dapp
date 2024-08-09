import { createEvent, sample } from 'effector';
import { createEffect } from 'effector/compat';

import {
  createTransactionApiV1ExchangeAddressTransactionsPost,
  SymbiosisData,
} from '@/shared/types';

type CreateSwapTransactionFxProps = {
  address: string;
  symbiosisData: SymbiosisData;
};

export const createSwapTransaction = createEvent<CreateSwapTransactionFxProps>();
const createSwapTransactionFx = createEffect<CreateSwapTransactionFxProps, void, void>(
  ({ address, symbiosisData }) =>
    createTransactionApiV1ExchangeAddressTransactionsPost(address, symbiosisData)
      .then(data => {
        console.log('createSwapTransactionFx', data);
      })
      .catch(() => {
        console.log('createSwapTransactionFx error');
      }),
);
export const $isLoadingCreateSwapTransaction = createSwapTransactionFx.pending;

sample({
  clock: createSwapTransaction,
  target: createSwapTransactionFx,
});
