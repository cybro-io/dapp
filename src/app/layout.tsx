import React from 'react';

import clsx from 'clsx';
import type { Metadata } from 'next';

import { poppins, unbounded } from '@/app/fonts';
import { EthersProvider, Web3Modal } from '@/app/providers';

import styles from './layout.module.scss';

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(styles.root, unbounded.variable, poppins.variable)}>
        <Web3Modal>
          <EthersProvider>{children}</EthersProvider>
        </Web3Modal>
      </body>
    </html>
  );
}
