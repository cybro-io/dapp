import React from 'react';

import { Text, TextView } from '@/shared/ui';
import { formatUserMoney } from '@/shared/utils';

export const Balance = ({ children }: React.PropsWithChildren) => {
  if (typeof children !== 'string') {
    return null;
  }

  return (
    <div className="inline-flex gap-[5px]">
      <Text textView={TextView.C4} className="opacity-70">
        Balance
      </Text>
      <Text textView={TextView.C4}>{formatUserMoney(children)}</Text>
    </div>
  );
};
