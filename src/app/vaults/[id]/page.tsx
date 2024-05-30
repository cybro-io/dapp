import React from 'react';

import { BaseLayout } from '@/app/layouts';
import { VaultPage } from '@/views/VaultPage';

type pageProps = {};

export default function Vault() {
  return (
    <BaseLayout>
      <VaultPage />
    </BaseLayout>
  );
}
