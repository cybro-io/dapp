'use client';
import React from 'react';

import { Provider } from 'react-redux';

import { makeStore, AppStore } from '@/app/lib/store';

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = React.useRef<AppStore>();

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}> {children} </Provider>;
}
