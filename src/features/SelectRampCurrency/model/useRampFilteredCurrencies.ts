import React from 'react';

import { useDebounceValue } from 'usehooks-ts';

import { MunzenCurrency } from '@/entities/Munzen';

export const useRampFilteredCurrencies = (
  currencies: MunzenCurrency[],
  selectedCurrencyId: string,
  isCrypto: boolean,
) => {
  const [searchCurrency, setSearchCurrency] = React.useState('');
  const [debouncedSearchCurrency] = useDebounceValue(searchCurrency, 500);

  const withFilteredByCrypto = (currencies: MunzenCurrency[]) =>
    currencies.filter((currency) => currency.isCrypto === isCrypto);

  const withSortSelected = (currencies: MunzenCurrency[]) =>
    currencies.sort((currencyA) =>
      currencyA.tickerWithNetwork == selectedCurrencyId ? -1 : 0,
    );

  const withFilterBySymbol = (currencies: MunzenCurrency[]) =>
    debouncedSearchCurrency
      ? currencies.filter(({ ticker }) =>
          ticker?.toLowerCase().includes(debouncedSearchCurrency.toLowerCase()),
        )
      : currencies;

  const filteredCurrencies = React.useMemo(() => {
    if (!debouncedSearchCurrency) {
      return withFilteredByCrypto(withSortSelected(currencies));
    }

    return withFilteredByCrypto(
      withFilterBySymbol(withSortSelected(currencies)),
    );
  }, [debouncedSearchCurrency, currencies]);

  const isEmptyFilteredCurrencies =
    filteredCurrencies.length < 1 && Boolean(debouncedSearchCurrency);

  return {
    filteredCurrencies,
    isEmptyFilteredCurrencies,
    setSearchCurrency,
    searchCurrency,
    withSortSelected,
  };
};
