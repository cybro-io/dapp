import React from 'react';

import { NextUIProvider } from '@nextui-org/react';
import { AppProps } from 'next/app';

import { StoreProvider } from '@/app/providers';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </NextUIProvider>
  );
}
