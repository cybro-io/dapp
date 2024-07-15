import React from 'react';

import './fonts';
import '@/shared/styles/global.scss';

import clsx from 'clsx';
import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google'

import { poppins, unbounded } from '@/app/fonts';

import styles from './layout.module.scss';
import {
  BalanceProvider,
  EthersProvider,
  ModalContainer,
  ModalProvider,
  ReactQueryProvider,
  ToastProvider,
  Web3Modal,
} from './providers';

export const metadata: Metadata = {
  title: 'CYBRO - the first earn marketplace on Blast L2',
  description:
    'CYBRO is an earn marketplace where users can choose investment tools based on desired returns and risk levels, including staking, farming, and lending',
  openGraph: {
    title: 'CYBRO - the first earn marketplace on Blast L2',
    description:
      'CYBRO is an earn marketplace where users can choose investment tools based on desired returns and risk levels, including staking, farming, and lending',
  },
};

const gaId = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <Web3Modal>
        <EthersProvider>
          <ReactQueryProvider>
            <BalanceProvider>
              <ModalProvider>
                <body className={clsx(styles.root, unbounded.variable, poppins.variable)}>
                  <ToastProvider>{children}</ToastProvider>
                  <ModalContainer />
                </body>
                {!!gaId && <GoogleAnalytics gaId={gaId}/>}
              </ModalProvider>
            </BalanceProvider>
          </ReactQueryProvider>
        </EthersProvider>
      </Web3Modal>
    </html>
  );
}
