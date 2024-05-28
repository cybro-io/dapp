'use client';

import React from 'react';

import { useWeb3Modal } from '@web3modal/ethers/react';
import clsx from 'clsx';

import { ComponentWithProps } from '@/shared/types';
import { Button, ButtonSize } from '@/shared/ui';

import styles from './ConnectWallet.module.scss';

type ConnectWalletProps = {
  buttonSize?: ButtonSize;
};

export const ConnectWallet: ComponentWithProps<ConnectWalletProps> = ({
  buttonSize,
  className,
}) => {
  const { open } = useWeb3Modal();

  return (
    <Button
      onClick={() => open({ view: 'Networks' })}
      className={clsx(styles.root, className)}
      size={buttonSize}
    >
      Connect Wallet
    </Button>
  );
};
