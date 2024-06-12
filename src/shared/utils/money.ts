import { BigNumberish, ethers } from 'ethers';
import numeral from 'numeral';

import { Money, Nullable, UserMoney } from '@/shared/types';
import { isUndefined } from '@/shared/utils';

export const formatUserMoney = (value: Money | undefined): UserMoney => {
  if (value === null || isUndefined(value)) return '0.00';

  if (Number(value) >= 1e6) {
    return numeral(value).format('0,0a');
  }

  return numeral(value).format('0,0.00');
};

export const formatEth = (value: Nullable<BigNumberish>): Money => {
  if (typeof value === 'undefined' || value === null) return null;

  return Number(ethers.formatEther(value));
};

export const formatMoney = (value: Nullable<BigNumberish>, decimals = 18): Money => {
  if (typeof value === 'undefined' || value === null) return null;

  return Number(ethers.formatUnits(value, decimals));
};
