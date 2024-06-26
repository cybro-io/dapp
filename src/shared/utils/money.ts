import { BigNumberish, ethers } from 'ethers';
import numeral from 'numeral';

import { Money, Nullable, UserMoney } from '@/shared/types';

export const formatUserMoney = (value: Money | string | undefined): UserMoney => {
  if (value === null || value === undefined) return '0.00';

  const numericValue = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(numericValue)) {
    return '0.00';
  }

  if (numericValue >= 1e6) {
    return numeral(Math.floor(numericValue / 1e6) * 1e6).format('0,0a');
  }

  return numeral(Math.floor(numericValue * 100) / 100).format('0,0.00');
};

export const formatEth = (value: Nullable<BigNumberish>): Money => {
  if (typeof value === 'undefined' || value === null) return null;

  return Number(ethers.formatEther(value));
};

export const parseMoney = (value: Nullable<BigNumberish>, decimals = 18): Money => {
  if (typeof value === 'undefined' || value === null) return null;

  return Number(ethers.formatUnits(value, decimals));
};

export const formatMoney = (value: number, decimals = 2): string => {
  const factor = Math.pow(10, decimals);
  return (Math.floor(value * factor) / factor).toFixed(decimals);
};
