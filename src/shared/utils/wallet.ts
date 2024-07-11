import { BalanceResponse, Maybe } from '@/shared/types';

export const shortenWalletAddress = (address: Maybe<`0x${string}`>): Maybe<string> => {
  if (!address) return;

  const start = address.slice(0, 7);
  const end = address.slice(-3);

  return `${start}...${end}`;
};

export const transformBalances = (balance: BalanceResponse[]) => {
  const balances: Record<string, number> = {};

  balance.forEach(item => {
    balances[item.address] = item.balance_usd;
  });

  return balances;
};
