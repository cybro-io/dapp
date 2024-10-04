import React from 'react';

import * as Sentry from '@sentry/nextjs';
import { useDisconnect, useWeb3Modal } from '@web3modal/ethers5/react';

import { track, AnalyticsEvent } from '@/shared/analytics';
import { useToast } from '@/shared/hooks';
import { useWeb3ModalAccount } from '@/shared/lib';
import { ToastType } from '@/shared/ui';

type UseConnectWalletProps = {
  isForm?: boolean;
  onWalletConnect?: (address: string, chainId: number) => void;
};

export const useConnectWallet = ({
  isForm,
  onWalletConnect,
}: UseConnectWalletProps) => {
  const { triggerToast } = useToast();

  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();

  const { isConnected, address, chainId } = useWeb3ModalAccount();
  const [hasClickedConnect, setHasClickedConnect] = React.useState(false);

  const handleConnect = React.useCallback(async () => {
    if (isForm) {
      track.event(AnalyticsEvent.VaultConnectWalletClickForm);
    } else {
      track.event(AnalyticsEvent.ConnectWalletClick);
    }

    setHasClickedConnect(true);
    await open();
  }, [isForm, open]);

  React.useEffect(() => {
    if (hasClickedConnect && isConnected && address) {
      onWalletConnect?.(address, chainId);
      track.event(AnalyticsEvent.ConnectWalletSuccess);
      setHasClickedConnect(false); // Reset the state after tracking
    }
  }, [isConnected, hasClickedConnect]);

  React.useEffect(() => {
    if (isConnected && !address) {
      triggerToast({
        message: `Something went wrong`,
        description:
          'We were unable to complete the current operation. Try again or connect support.',
        type: ToastType.Error,
      });

      Sentry.captureMessage('Wallet is connected, but no address found');
      disconnect().catch(() => {});
    }
  }, [isConnected, address]);

  return { handleConnect, isConnected };
};
