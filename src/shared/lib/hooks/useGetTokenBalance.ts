import React from 'react';

import { getAvailableBalance } from '@/shared/lib';

export const useGetTokenBalance = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchBalance = async (...props: Parameters<typeof getAvailableBalance>) => {
    try {
      setIsLoading(true);
      return await getAvailableBalance(...props);
    } catch (error) {
      console.error(error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, fetchBalance };
};
