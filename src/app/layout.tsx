import React from 'react';

import clsx from 'clsx';
import type { Metadata } from 'next';

import { poppins, unbounded } from '@/app/fonts';
import { StoreProvider } from '@/app/lib/StoreProvider';
import { Web3Modal } from '@/shared/Web3Modal';

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
      {/*<StoreProvider>*/}
      <Web3Modal>
        <body className={clsx(unbounded.variable, poppins.variable)}>{children}</body>
      </Web3Modal>
      {/*</StoreProvider>*/}
    </html>
  );
}
