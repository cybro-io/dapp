import { Usdb } from '@/shared/types/__generated/contracts/Usdb';
import { UsdbVault } from '@/shared/types/__generated/contracts/UsdbVault';
import { Wbtc } from '@/shared/types/__generated/contracts/Wbtc';
import { WbtcVault } from '@/shared/types/__generated/contracts/WbtcVault';
import { Weth } from '@/shared/types/__generated/contracts/Weth';
import { WethVault } from '@/shared/types/__generated/contracts/WethVault';

export type Token = Usdb | Weth | Wbtc;

export type Vault = UsdbVault | WethVault | WbtcVault;
