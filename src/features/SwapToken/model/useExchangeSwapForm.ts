import React from 'react';

import { BigNumber } from 'bignumber.js';
import { getTokenPriceUsd, Token } from 'symbiosis-js-sdk';
import { useDebounceValue } from 'usehooks-ts';
import * as yup from 'yup';

import { useForm } from '@/shared/lib';
import { Mixpanel, MixpanelEvent } from '@/shared/analytics';

type ExchangeSwapFormValues = {
  tokenIn: Token;
  amountIn: number | string;
  tokenOut: Token;
  amountOut: number | string;
  priceInUsd: number;
  priceOutUsd: number;
  address: string;
  slippage: number;
  deadline: number;
};

type UseExchangeSwapFormProps = {
  initialTokenIn: Token;
  initialTokenOut: Token;
  onCalculate: (data: ExchangeSwapFormValues) => void;
  onSubmit: (data: ExchangeSwapFormValues) => void;
};

const validationSchema = yup.object().shape({
  amountIn: yup
    .number()
    .typeError('Invalid value')
    .required('Amount is required')
    .positive('Amount is positive '),
});

export const useExchangeSwapForm = ({
  initialTokenOut,
  initialTokenIn,
  onCalculate,
  onSubmit,
}: UseExchangeSwapFormProps) => {
  const form = useForm({
    initialValues: {
      amountIn: '',
      amountOut: '',
      tokenIn: initialTokenIn,
      tokenOut: initialTokenOut,
      address: '',
      slippage: 2,
      deadline: 20,
      priceInUsd: 0,
      priceOutUsd: 0,
    },
    validateOnMount: true,
    validationSchema,
    onSubmit: (data, state) => {
      onSubmit(data);
      state.setTouched({});
    },
  });

  const [debouncedAmountIn, setDebouncedAmountIn] = useDebounceValue(form.values.amountIn, 1000);
  const [debouncedAddress, setDebouncedAddress] = useDebounceValue(form.values.address, 1000);

  const setTokenIn = (token: ExchangeSwapFormValues['tokenIn']) => {
    form.setFieldValue('tokenIn', token);
  };
  const setTokenOut = (token: ExchangeSwapFormValues['tokenOut']) => {
    form.setFieldValue('tokenOut', token);
  };
  const setAmountOut = (amount: ExchangeSwapFormValues['amountOut']) => {
    form.setFieldValue('amountOut', amount);
  };
  const setAmountIn = (amount: ExchangeSwapFormValues['amountIn']) => {
    form.setFieldValue('amountIn', amount);
  };
  const setPriceInUsd = (amount: ExchangeSwapFormValues['priceInUsd']) => {
    form.setFieldValue('priceInUsd', amount);
  };
  const setPriceOutUsd = (amount: ExchangeSwapFormValues['priceOutUsd']) => {
    form.setFieldValue('priceOutUsd', amount);
  };

  const setAddress = (address: ExchangeSwapFormValues['address']) => {
    form.setFieldValue('address', address);
  };

  const handleSwapDirection = () => {
    setDebouncedAmountIn('');
    setDebouncedAddress('');
    setAmountOut('');
    setAmountIn('');
    setAddress('');

    const tokenIn = form.values.tokenIn;
    setTokenIn(form.values.tokenOut);
    setTokenOut(tokenIn);

    const priceInUsd = form.values.priceInUsd;
    setPriceInUsd(form.values.priceOutUsd);
    setPriceOutUsd(priceInUsd);

    form.setTouched({});
  };

  const handleSetPercent = (balance: number, percent: number) => {
    Mixpanel.track(MixpanelEvent.ChangeSwapAmountPreset, { percent: `${percent * 100}%` });
    setAmountIn(
      new BigNumber(balance).multipliedBy(percent).dp(6, BigNumber.ROUND_DOWN).toString(),
    );
  };

  const handleChangeToken = (token: Token, direction: 'in' | 'out') => {
    const setToken = direction === 'in' ? setTokenIn : setTokenOut;
    const setPrice = direction === 'in' ? setPriceInUsd : setPriceOutUsd;
    const setAmount = direction === 'in' ? setAmountIn : setAmountOut;

    setToken(token);
    setAmount('');
    getTokenPriceUsd(token).then(amount => {
      setPrice(amount);
    });
    setAddress('');

    form.setTouched({});
  };

  const handleChangeSettings = ({ deadline, slippage }: { slippage: number; deadline: number }) => {
    form.setFieldValue('slippage', slippage);
    form.setFieldValue('deadline', deadline);
    Mixpanel.track(MixpanelEvent.ChangeSwapSettings, { deadline, slippage });
  };

  React.useEffect(() => {
    Mixpanel.track(MixpanelEvent.ChangeSwapFrom, { token: form.values.tokenIn });
  }, [form.values.tokenIn]);

  React.useEffect(() => {
    Mixpanel.track(MixpanelEvent.ChangeSwapTo, { token: form.values.tokenOut });
  }, [form.values.tokenOut]);

  React.useEffect(() => {
    if (form.isValid && debouncedAmountIn) {
      Mixpanel.track(MixpanelEvent.ChangeSwapAmount, { amount: debouncedAmountIn });

      onCalculate?.(form.values);
    }
  }, [debouncedAmountIn]);

  return {
    ...form,
    handleSwapDirection,
    debouncedAmountIn,
    setAmountOut,
    setAmountIn,
    setPriceInUsd,
    setPriceOutUsd,
    handleSetPercent,
    handleChangeToken,
    setAddress,
    debouncedAddress,
    handleChangeSettings,
  };
};