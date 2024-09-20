'use client';

import React from 'react';

import clsx from 'clsx';

import { useAuthWallet } from '@/entities/Auth';
import { ComponentWithProps } from '@/shared/types';
import { Button, ButtonSize, ButtonView } from '@/shared/ui';

import { useConnectWallet } from '../model/useConnectWallet';

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
  const { authWallet } = useAuthWallet();

  const { handleConnect, isConnected } = useConnectWallet({
    isForm,
    onWalletConnect: authWallet,
  });

  if (isConnected) {
    return whenConnectedComponent;
  }

  return (
    <Button
      type="button"
      onClick={handleConnect}
      className={clsx(className)}
      size={buttonSize}
      view={viewType}
    >
      Connect Wallet
    </Button>
  );
};

export default ConnectWallet;
