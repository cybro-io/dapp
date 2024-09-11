import React from 'react';

import { useWeb3Modal } from '@web3modal/ethers5/react';

import { Mixpanel, MixpanelEvent } from '@/shared/analytics';
import { useWeb3ModalAccount } from '@/shared/lib';

type UseConnectWalletProps = {
  isForm?: boolean;
  onWalletConnect?: (address: string, chainId: number) => void;
};

export const useConnectWallet = ({ isForm, onWalletConnect }: UseConnectWalletProps) => {
  const { open } = useWeb3Modal();

  const { isConnected, address, chainId } = useWeb3ModalAccount();
  const [hasClickedConnect, setHasClickedConnect] = React.useState(false);

  const handleConnect = React.useCallback(async () => {
    if (isForm) {
      Mixpanel.track(MixpanelEvent.VaultConnectWalletClickForm);
    } else {
      Mixpanel.track(MixpanelEvent.ConnectWalletClick);
    }

    setHasClickedConnect(true);
    await open();
  }, [isForm, open]);

  React.useEffect(() => {
    if (hasClickedConnect && isConnected && address) {
      onWalletConnect?.(address, chainId);
      Mixpanel.track(MixpanelEvent.ConnectWalletSuccess);
      setHasClickedConnect(false); // Reset the state after tracking
    }
  }, [isConnected, hasClickedConnect]);

  return { handleConnect, isConnected };
};
