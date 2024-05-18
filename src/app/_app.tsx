import React from 'react';

import { NextUIProvider } from '@nextui-org/react';
import { AppProps } from 'next/app';

import { StoreProvider } from '@/app/lib/StoreProvider';
import { Web3Modal } from '@/shared/ui/baseComponents';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <StoreProvider>
        <Web3Modal>
          <Component {...pageProps} />
        </Web3Modal>
      </StoreProvider>
    </NextUIProvider>
  );
}
