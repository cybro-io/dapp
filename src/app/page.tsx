import React from 'react';

import './fonts';
import '@/shared/styles/global.scss';

import { BaseLayout } from '@/app/layouts';
import HomePage from '@/pages/HomePage';

export default function Home() {
  return (
    <BaseLayout>
      <HomePage />
    </BaseLayout>
  );
}
