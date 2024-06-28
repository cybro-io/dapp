'use client';

import React from 'react';

import { useWeb3Modal, useWeb3ModalAccount } from '@web3modal/ethers/react';
import clsx from 'clsx';

import { Mixpanel, MixpanelEvent } from '@/shared/analytics';
import { ComponentWithProps } from '@/shared/types';
import { Button, ButtonSize } from '@/shared/ui';

import styles from './ConnectWallet.module.scss';

type ConnectWalletProps = {
  buttonSize?: ButtonSize;
  isForm?: boolean;
};

export const ConnectWallet: ComponentWithProps<ConnectWalletProps> = ({
  buttonSize,
  isForm = false,
  className,
}) => {
  const { open } = useWeb3Modal();
  const { isConnected } = useWeb3ModalAccount();

  const onConnectWalletClick = React.useCallback(async () => {
    if (isForm) {
      Mixpanel.track(MixpanelEvent.VaultConnectWalletClickForm);
    } else {
      Mixpanel.track(MixpanelEvent.ConnectWalletClick);
    }

    await open();
  }, [isForm, open]);

  React.useEffect(() => {
    // This effect will track the success event when the component unmounts
    return () => {
      if (isConnected) {
        Mixpanel.track(MixpanelEvent.ConnectWalletSuccess);
      }
    };
  }, [isConnected]);

  return (
    <Button
      onClick={onConnectWalletClick}
      className={clsx(styles.root, className)}
      size={buttonSize}
    >
      Connect Wallet
    </Button>
  );
};
