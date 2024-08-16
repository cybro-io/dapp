'use client';

import React from 'react';

import { useWeb3Modal, useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers5/react';
import clsx from 'clsx';

import { Mixpanel, MixpanelEvent } from '@/shared/analytics';
import { ComponentWithProps } from '@/shared/types';
import { Button, ButtonSize, ButtonView } from '@/shared/ui';

import styles from './ConnectWallet.module.scss';

type ConnectWalletProps = {
  whenConnectedComponent?: React.ReactNode;
  buttonSize?: ButtonSize;
  viewType?: ButtonView;
  isForm?: boolean;
};

export const ConnectWallet: ComponentWithProps<ConnectWalletProps> = ({
  whenConnectedComponent,
  buttonSize,
  viewType,
  isForm = false,
  className,
}) => {
  const { open } = useWeb3Modal();

  const { isConnected } = useWeb3ModalAccount();
  const [hasClickedConnect, setHasClickedConnect] = React.useState(false);

  const onConnectWalletClick = React.useCallback(async () => {
    if (isForm) {
      Mixpanel.track(MixpanelEvent.VaultConnectWalletClickForm);
    } else {
      Mixpanel.track(MixpanelEvent.ConnectWalletClick);
    }

    setHasClickedConnect(true);
    await open();
  }, [isForm, open]);

  React.useEffect(() => {
    if (hasClickedConnect && isConnected) {
      console.log('wallet connected');
      Mixpanel.track(MixpanelEvent.ConnectWalletSuccess);
      setHasClickedConnect(false); // Reset the state after tracking
    }
  }, [isConnected, hasClickedConnect]);

  return (
    <React.Fragment>
      {!isConnected ? (
        <Button
          type="button"
          onClick={onConnectWalletClick}
          className={clsx(styles.root, className)}
          size={buttonSize}
          view={viewType}
        >
          Connect Wallet
        </Button>
      ) : (
        whenConnectedComponent
      )}
    </React.Fragment>
  );
};
