import numeral from 'numeral';

import { Nullable } from '@/shared/types';

export const formatMoney = (value: Nullable<string | number>) => {
  if (typeof value === 'undefined') return '';

  return numeral(value).format('0,0');
};
