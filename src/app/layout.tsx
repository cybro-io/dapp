import React from 'react';

import './fonts';
import '@/shared/styles/global.scss';

import { GoogleAnalytics } from '@next/third-parties/google';
import clsx from 'clsx';
import type { Metadata } from 'next';
import Script from 'next/script';

import { poppins, unbounded } from '@/app/fonts';
import icon from '@/shared/assets/icons/favicon.ico';

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
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      url: icon.src,
    },
  ],
};

const gaId = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <Script defer data-domain="app.cybro.io" src="https://analytics.cybro.io/js/script.js" />
      <Script id="hotjar-script">
        {`(function(h,o,t,j,a,r){
          h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
          h._hjSettings={hjid:5059762,hjsv:6};
          a=o.getElementsByTagName('head')[0];
          r=o.createElement('script');r.async=1;
          r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
          a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}
      </Script>
      <Web3Modal>
        <EthersProvider>
          <ReactQueryProvider>
            <BalanceProvider>
              <ModalProvider>
                <body className={clsx(styles.root, unbounded.variable, poppins.variable)}>
                  <ToastProvider>{children}</ToastProvider>
                  <ModalContainer />
                </body>
                {!!gaId && <GoogleAnalytics gaId={gaId} />}
              </ModalProvider>
            </BalanceProvider>
          </ReactQueryProvider>
        </EthersProvider>
      </Web3Modal>
    </html>
  );
}
