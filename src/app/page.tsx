import React from 'react';

import { BaseLayout } from '@/app/layouts';
import { HomePage } from '@/views/HomePage';

export default function Home() {
  return (
    <BaseLayout>
      <HomePage />
    </BaseLayout>
  );
}
