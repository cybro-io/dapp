import { isBtc, isTronChainId } from 'symbiosis-js-sdk';

import { useSymbiosis } from '@/shared/lib';

export const useSwapChains = () => {
  const symbiosis = useSymbiosis();

  return symbiosis.chains().filter(chain => !isTronChainId(chain.id) && !isBtc(chain.id));
};
