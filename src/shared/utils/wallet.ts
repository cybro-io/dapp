import { Maybe } from '@/shared/types';

export const shortenWalletAddress = (address: Maybe<`0x${string}`>): Maybe<string> => {
  if (!address) return;

  const start = address.slice(0, 7);
  const end = address.slice(-3);

  return `${start}...${end}`;
};
