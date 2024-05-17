import React from 'react';

import './fonts';
import '@/shared/styles/global.scss';

import HomePage from '@/pages/HomePage';
import { BaseLayout } from '@/shared/ui';

export default function Home() {
  return (
    <BaseLayout>
      <HomePage />
    </BaseLayout>
  );
}
