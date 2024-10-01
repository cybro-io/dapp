export interface MunzenCurrency {
  id: number;
  ticker: string;
  viewedTicker: string;
  name: string;
  isCrypto: boolean;
  logoUrl: string;
  priority: number;
  isBestConditions: boolean;
  decimals: number;
  roundOff: number;
  description: string | null;
  tooltipDescription: string | null;
  discountDescription: string | null;
  feeValue: number | null;
  blockchainNetwork: string | null;
  tickerWithNetwork: string;
}

export interface MunzenRate {
  fromCurrency: string;
  // Code (ticker) of base currency

  toCurrency: string;
  // Code (ticker) of quote currency with (or without) network

  exchangeRate: {
    divisor: number;
    // Rate calculated by 1 / value

    multiplier: number;
    // Rate calculated by 1 * value
  };
  // Rate of currencies conversion

  decimals: number;
  // Count of the rate's toCurrency decimals

  roundOff: number;
  // Number of decimals are rounded and displayed to customer

  minAmount: number;
  // Minimal amount available for exchange for fromCurrency

  maxAmount: number;
  // Maximal amount available for exchange for fromCurrency

  minAmountConverted: number;
  // Minimal amount available for exchange for toCurrency

  maxAmountConverted: string;
  // Maximal amount available for exchange for toCurrency

  availablePaymentTypes: Array<string>;
}

interface MunzenFeeProvider {
  type: 'max';
  value: Array<Array<MunzenFeeMoney | MunzenFeePercent>>;
}

interface MunzenFeeMoney {
  type: 'money';
  value: {
    amount: number;
    currency: string;
  };
}

interface MunzenFeePercent {
  type: 'percent';
  value: number;
}

export interface MunzenFee {
  providerFee: MunzenFeeProvider;
  networkFee: MunzenFeeMoney;
  networkFeeFiat: MunzenFeeMoney;
}
