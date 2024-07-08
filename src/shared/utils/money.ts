import { BigNumberish, ethers } from 'ethers';
import numeral from 'numeral';

import { Money, Nullable, UserMoney } from '@/shared/types';
import { isInvalid } from '@/shared/utils/utils';

export const formatUserMoney = (value: Money | string | undefined, maxDecimals = 8): UserMoney => {
  if (isInvalid(value)) return '0.00';

  const numericValue = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(numericValue)) {
    return '0.00';
  }

  if (numericValue >= 1e6) {
    return numeral(Math.floor(numericValue / 1e6) * 1e6).format('0,0a');
  }

  if (numericValue === 0) {
    return '0';
  }

  return numericValue
    .toLocaleString('en', {
      minimumFractionDigits: 0,
      maximumFractionDigits: maxDecimals,
    })
    .replace(/\.?0+$/, ''); // Remove trailing zeros
};

export const fromWei = (value: Nullable<BigNumberish>, decimals = 18): Money => {
  if (typeof value === 'undefined' || value === null) return null;

  return Number(ethers.formatUnits(value, decimals));
};

export const formatMoney = (value: number, decimals = 2): string => {
  const factor = Math.pow(10, decimals);
  return (Math.floor(value * factor) / factor).toFixed(decimals);
};

export const convertToUsd = (value: Money, tokenPrice: number) => {
  if (!value) return 0;

  return value * tokenPrice;
};
