import { BigNumber } from 'bignumber.js';
import { useForm } from 'react-hook-form';
import { getTokenPriceUsd, Token } from 'symbiosis-js-sdk';
import { useDebounceValue } from 'usehooks-ts';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type ExchangeSwapFormValues = {
  tokenIn: Token;
  amountIn: string;
  tokenOut: Token;
  amountOut: string;
  priceInUsd: number;
  priceOutUsd: number;
  address: string;
  balanceIn: string;
  balanceOut: string;
};

type UseExchangeSwapFormProps = {
  initialTokenIn: Token;
  initialTokenOut: Token;
};

const validationSchema = yup.object().shape({
  amountIn: yup.number().typeError('Invalid value').required().positive(),
});

export const useExchangeSwapForm = ({
  initialTokenOut,
  initialTokenIn,
}: UseExchangeSwapFormProps) => {
  const form = useForm<ExchangeSwapFormValues>({
    defaultValues: {
      amountIn: '',
      amountOut: '',
      tokenIn: initialTokenIn,
      tokenOut: initialTokenOut,
      address: '',
    },
    mode: 'all',
    resolver: yupResolver<any>(validationSchema),
  });

  const values = form.watch();

  const [debouncedAmountIn, setDebouncedAmountIn] = useDebounceValue(values.amountIn, 1000);
  const [debouncedAddress, setDebouncedAddress] = useDebounceValue(values.address, 1000);

  const setTokenIn = (token: ExchangeSwapFormValues['tokenIn']) => form.setValue('tokenIn', token);
  const setTokenOut = (token: ExchangeSwapFormValues['tokenOut']) =>
    form.setValue('tokenOut', token);
  const setAmountOut = (amount: ExchangeSwapFormValues['amountOut']) =>
    form.setValue('amountOut', amount);
  const setAmountIn = (amount: ExchangeSwapFormValues['amountIn']) =>
    form.setValue('amountIn', amount);
  const setPriceInUsd = (amount: ExchangeSwapFormValues['priceInUsd']) =>
    form.setValue('priceInUsd', amount);
  const setPriceOutUsd = (amount: ExchangeSwapFormValues['priceOutUsd']) =>
    form.setValue('priceOutUsd', amount);
  const setAddress = (address: ExchangeSwapFormValues['address']) =>
    form.setValue('address', address);

  const setBalanceIn = (balance: ExchangeSwapFormValues['balanceIn']) =>
    form.setValue('balanceIn', balance);
  const setBalanceOut = (balance: ExchangeSwapFormValues['balanceOut']) =>
    form.setValue('balanceOut', balance);

  const handleSwapDirection = () => {
    setDebouncedAmountIn('');
    setDebouncedAddress('');
    setAmountOut('');
    setAmountIn('');
    setAddress('');

    setTokenIn(values.tokenOut);
    setTokenOut(values.tokenIn);

    const priceInUsd = values.priceInUsd;
    setPriceInUsd(values.priceOutUsd);
    setPriceOutUsd(priceInUsd);

    const balanceIn = values.balanceIn;
    setBalanceIn(values.balanceOut);
    setBalanceOut(balanceIn);
  };

  const handleSetPercent = (percent: number) =>
    setAmountIn(
      new BigNumber(values.balanceIn).multipliedBy(percent).dp(6, BigNumber.ROUND_DOWN).toString(),
    );

  const handleChangeToken = (token: Token, direction: 'in' | 'out') => {
    const setToken = direction === 'in' ? setTokenIn : setTokenOut;
    const setPrice = direction === 'in' ? setPriceInUsd : setPriceOutUsd;
    const setAmount = direction === 'in' ? setAmountIn : setAmountOut;

    setToken(token);
    setAmount('');
    getTokenPriceUsd(token).then(setPrice);
    setAddress('');
  };

  return {
    form,
    values,
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
    setBalanceIn,
    setBalanceOut,
  };
};
