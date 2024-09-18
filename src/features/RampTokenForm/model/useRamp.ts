import React from 'react';

import NiceModal from '@ebay/nice-modal-react';

import { useMunzenCurrencies, useMunzenRates } from '@/entities/Munzen';
import {
  RampAlertStepModal,
  RampWidgetStepModal,
  useRampCalculate,
  useRampForm,
} from '@/features/RampTokenForm';
import { useWeb3ModalAccount } from '@/shared/lib';

export const useRamp = () => {
  const { address, isConnected } = useWeb3ModalAccount();

  const { handleCalculate, ...feeRest } = useRampCalculate();

  const { rates } = useMunzenRates();
  const { currencies } = useMunzenCurrencies();

  const rampAlertModal = NiceModal.useModal(RampAlertStepModal);
  const rampWidgetModal = NiceModal.useModal(RampWidgetStepModal);

  const initialCurrencies = React.useMemo(
    () => ({
      from: currencies?.find(currency => currency.tickerWithNetwork === 'USD') ?? null,
      to: currencies?.find(currency => currency.tickerWithNetwork === 'USDT-BEP20') ?? null,
    }),
    [currencies],
  );

  const form = useRampForm({
    onSubmit: data => {
      rampAlertModal
        .show()
        .then(() =>
          rampWidgetModal.show({
            toCurrency: data.toCurrency!.tickerWithNetwork,
            fromCurrency: data.fromCurrency!.tickerWithNetwork,
            toAmount: Number(data.amountIn!),
            toWallet: address,
          }),
        )
        .catch(() => rampAlertModal.remove());
    },
    onChangeAmountIn: data => {
      form.setFieldValue('amountOut', handleCalculate(data));
    },
    rates: rates ?? [],
    initialCurrencies,
  });

  const isDisabledAmount = !form.values.toCurrency || !form.values.fromCurrency;

  const isDisabledSubmit =
    form.isSubmitting || !form.isValid || !form.values.toCurrency || !form.values.fromCurrency;

  return { isConnected, ...feeRest, isDisabledAmount, isDisabledSubmit, form };
};
