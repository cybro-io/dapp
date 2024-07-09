import { BigNumberish, ethers } from 'ethers';
import numeral from 'numeral';

import { Money, Nullable, UserMoney } from '@/shared/types';
import { isInvalid } from '@/shared/utils/utils';

export const formatUserMoney = (value: Money | string | undefined, maxDecimals = 6): UserMoney => {
  if (isInvalid(value)) return '0.00';

  let numericValue: number;

  if (typeof value === 'string') {
    // Remove commas before parsing to ensure correct numeric value
    numericValue = parseFloat(value.replace(/,/g, ''));
  } else {
    numericValue = value;
  }

  if (isNaN(numericValue)) {
    return '0.00';
  }

  if (numericValue >= 1e6) {
    return numeral(Math.floor(numericValue / 1e6) * 1e6).format('0,0a');
  }

  if (numericValue === 0) {
    return '0';
  }

  // Format the number with up to maxDecimals decimal places
  let formattedValue = numericValue.toLocaleString('en', {
    minimumFractionDigits: 0,
    maximumFractionDigits: maxDecimals,
  });

  // Remove trailing zeros after the decimal point, but not after commas
  if (formattedValue.includes('.')) {
    formattedValue = formattedValue.replace(/(\.\d*?[1-9])0+$/, '').replace(/\.$/, '');
  }

  return formattedValue;
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
