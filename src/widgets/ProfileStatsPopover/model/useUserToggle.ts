import { useWeb3ModalAccount } from '@web3modal/ethers5/react';

import {
  useGetProfileApiV1ProfileAddressGet,
  useGetProfileEarnedYieldApiV1ProfileAddressEarnedYieldGet,
} from '@/shared/types';

export const useUserToggle = () => {
  const { address } = useWeb3ModalAccount();

  const { data: userProfile } = useGetProfileApiV1ProfileAddressGet(address, {
    query: {
      enabled: Boolean(address),
      select: data => data.data.data,
    },
  });

  const { data: earnedYield } = useGetProfileEarnedYieldApiV1ProfileAddressEarnedYieldGet(address, {
    query: {
      enabled: Boolean(address),
      select: data => data.data.data,
    },
  });

  return { address, userProfile, earnedYield };
};
