import numeral from 'numeral';

import { Nullable } from '@/shared/types';

export const formatMoney = (value: Nullable<string | number>) => {
  if (!value) return '';

  return numeral(value).format('0,0');
};
