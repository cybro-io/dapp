import { Money, Nullable } from '@/shared/types';

export enum VaultType {
  USDB = 'usdb',
  WETH = 'weth',
  WBTC = 'wbct',
}

export type VaultData = {
  title: string;
  userBalance: Nullable<string>;
  userDeposit: Nullable<string>;
  totalValueLocked: Nullable<string>;
  totalVaultInvestment: Nullable<string>;
};

export const getRandomVault = (): VaultType => {
  const values = Object.values(VaultType);
  const randomIndex = Math.floor(Math.random() * values.length);
  return values[randomIndex];
};

export const getVaultTitle = (vaultType: VaultType) => {
  switch (vaultType) {
    case VaultType.USDB:
      return 'Stable growth USDB vault';
    case VaultType.WETH:
      return 'Stable growth WETH vault';
    case VaultType.WBTC:
      return 'Stable growth WBTC vault';
    default:
      return 'Stable growth USDB vault';
  }
};

export const getUserBalanceForVault = (
  vaultType: VaultType,
  usdbBalance: Money,
  wethBalance: Money,
  wbtcBalance: Money,
): Money => {
  switch (vaultType) {
    case VaultType.USDB:
      return usdbBalance;
    case VaultType.WETH:
      return wethBalance;
    case VaultType.WBTC:
      return wbtcBalance;
    default:
      return usdbBalance;
  }
};
