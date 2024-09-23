import React from 'react';

import clsx from 'clsx';

import { Vault } from '@/entities/Vault';
import { Button, ButtonView } from '@/shared/ui';

const vaults = [
  {
    id: 19,
    icon: 'https://linkee.ws/Z/e/Ze8q37HLoUr5D5qkzypxJq.svg',
    name: 'Aso Finance\nWeETH Lending',
    description:
      'This simple DeFi Vault on Blast enables you to earn yield on your WeETH assets by depositing them into the lending supply pool of Aso Finance',
    badges: [
      {
        description: '',
        icon: null,
        name: 'Most profitable',
        value: '',
      },
    ],
    chain_id: 81457,
    chain: 'Blast',
    address: '0xdccde9c6800bea86e2e91cf54a870ba3ff6faf9f',
    apy: 11.69,
    points: 0,
    tvl: 8897.362445208657,
    provider: {
      name: 'Aso Finance',
      description:
        'Aso Finance is an EVM compatible lending/borrowing protocol on Blast. Aso Finance provides peer-to-peer lending solutions that are fully decentralized, transparent and non-custodial. Similar to (and based on) existing lending platforms like Compound Finance and AAVE users will be able to lend any supported assets on our platform, and use their capital to borrow supported assets.',
      short_description: '',
    },
    trust_score: 6.9,
    token: {
      name: 'WeETH',
      address: '0x04c0599ae5a44757c0af6f9ec3b93da8976c150a',
      decimals: 18,
    },
    balance: 6.11860822093242e-9,
    balance_usd: 0.00001587518138756744,
  },
  {
    id: 16,
    icon: 'https://app.zerolend.xyz/icons/tokens/usdb.svg',
    name: 'Aso Finance\nUSDB Lending',
    description:
      'This simple DeFi Vault on Blast enables you to earn yield on your USDB assets by depositing them into the lending supply pool of Aso Finance',
    badges: [
      {
        description: '',
        icon: null,
        name: 'Cybro control',
        value: '',
      },
    ],
    chain_id: 81457,
    chain: 'Blast',
    address: '0x567103a40c408b2b8f766016c57a092a180397a1',
    apy: 8.15,
    points: 0,
    tvl: 1254888.5267535595,
    provider: {
      name: 'Aso Finance',
      description:
        'Aso Finance is an EVM compatible lending/borrowing protocol on Blast. Aso Finance provides peer-to-peer lending solutions that are fully decentralized, transparent and non-custodial. Similar to (and based on) existing lending platforms like Compound Finance and AAVE users will be able to lend any supported assets on our platform, and use their capital to borrow supported assets.',
      short_description: '',
    },
    trust_score: 6.9,
    token: {
      name: 'USDB',
      address: '0x4300000000000000000000000000000000000003',
      decimals: 18,
    },
    balance: 3.7314678829514403,
    balance_usd: 3.736105201977657,
  },
  {
    id: 6,
    icon: 'https://app.zerolend.xyz/icons/tokens/usdb.svg',
    name: 'ZeroLend\nUSDB Lending',
    description:
      "This simple DeFi Vault on Blast enables you to earn yield on your USDB assets by depositing them into ZeroLend's lending supply pool.",
    badges: [
      {
        description: '',
        icon: null,
        name: 'Most reliable',
        value: '',
      },
      {
        description: '',
        icon: null,
        name: 'Cybro control',
        value: '',
      },
      {
        description: '',
        icon: null,
        name: 'Cybro control2',
        value: '',
      },
      {
        description: '',
        icon: null,
        name: 'Cybro control3',
        value: '',
      },
    ],
    chain_id: 81457,
    chain: 'Blast',
    address: '0xf56dab7b7b2954aa86a591f164205e6cdd33797e',
    apy: 7.64,
    points: 0,
    tvl: 1527707.2449527683,
    provider: {
      name: 'ZeroLend',
      description:
        'ZeroLend is the largest lending market on L2s—Linea, zkSync, Manta, Blast, and X Layer—with a focus on liquid restaking tokens (LRTs) lending, governance, real-world assets (RWAs) lending, and account abstraction. \n\nZeroLend is based on AAVE v3 and has passed several security audits.',
      short_description: '',
    },
    trust_score: 8.3,
    token: {
      name: 'USDB',
      address: '0x4300000000000000000000000000000000000003',
      decimals: 18,
    },
    balance: 0,
    balance_usd: 0,
  },
];

export const HubVaults = () => {
  return (
    <div
      className={clsx('flex items-center flex-col gap-6 mt-auto md:mt-[-217px] px-6 md:px-0 z-10')}
    >
      <div className="flex flex-row flex-wrap gap-5 justify-center">
        <Vault vault={vaults[0]} linkClassName="w-full md:w-auto" />
        <Vault vault={vaults[1]} linkClassName="w-full md:w-auto" />
        <Vault vault={vaults[2]} linkClassName="w-full md:w-auto" />
      </div>

      <Button view={ButtonView.Secondary} className="w-full md:w-[367px]">
        Explore all vaults
      </Button>
    </div>
  );
};
