'use client';

import React from 'react';

import { BaseLayout } from '@/app/layouts';
import {
  HubBanner,
  HubBlog,
  HubHero,
  HubInvestmentAcademy,
  HubOneClick,
  HubVaults,
} from '@/widgets/Hub';

export const HubPage = () => {
  return (
    <BaseLayout withMainPadding={false}>
      <div className="relative flex flex-col max-w-screen-xl mx-auto">
        <HubHero />
        <HubVaults />
        <HubOneClick />
        <HubInvestmentAcademy />
        <HubBlog />
        <HubBanner />
      </div>
    </BaseLayout>
  );
};
