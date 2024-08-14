import React from 'react';

import Image from 'next/image';
import { Token } from 'symbiosis-js-sdk';

import { DropdownButton, Text, TextView } from '@/shared/ui';

import { Balance } from './Balance';
import styles from './SwapTokenCard.module.scss';
import { Title } from './Title';
import { useWeb3ModalAccount } from '@web3modal/ethers5/react';

export type SwapTokenCardProps = React.PropsWithChildren & {
  token: Token | null;
  onSelectTokenClick: () => void;
  title?: React.ReactNode;
  balance: React.ReactNode;
  footer?: React.ReactNode;
};

export const SwapTokenCard = ({
  title,
  token,
  balance,
  onSelectTokenClick,
  children,
  footer,
}: SwapTokenCardProps) => {
  const { address } = useWeb3ModalAccount();

  if (!token) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.tokenCard}>
        <div className={styles.header}>
          <SwapTokenCard.Title title={title} />
          <SwapTokenCard.Balance>{balance}</SwapTokenCard.Balance>
        </div>
        <div className={styles.content}>
          <Image src={token.icons?.small ?? ''} width={32} height={32} alt={token.name ?? ''} />
          <div className="flex flex-col gap-px">
            <Text textView={TextView.BU1}>{token.symbol}</Text>
            <div className="inline-flex gap-[5px] items-center">
              <Image
                className="rounded-full"
                src={token.chain?.icons?.small ?? ''}
                width={14}
                height={14}
                alt={token.chain?.name ?? ''}
              />

              <Text textView={TextView.C4} className="opacity-40">
                On {token.chain?.name}
              </Text>
            </div>
          </div>
        </div>
        <DropdownButton
          className="w-fit absolute right-4 -bottom-4"
          type="button"
          onClick={onSelectTokenClick}
        >
          Change token
        </DropdownButton>
      </div>

      <div className="px-4">{children}</div>

      {address && <div className="h-divider bg-stroke-tableBorder" />}

      {address && <div className="px-4">{footer}</div>}
    </div>
  );
};

SwapTokenCard.Title = Title;
SwapTokenCard.Balance = Balance;
