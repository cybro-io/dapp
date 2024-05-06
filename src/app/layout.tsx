import React from 'react';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { StoreProvider } from '@/app/lib/StoreProvider';
import { Web3Modal } from '@/shared/web3Modal';

const inter = Inter({ subsets: ['latin'] });

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
        <body className={inter.className}>{children}</body>
      </Web3Modal>
      {/*</StoreProvider>*/}
    </html>
  );
}
