import { useGetPaymentLinkApiV1ProfileAddressPaymentLinkGet } from '@/shared/types';

export interface UseRampProps {
  toWallet: string;
  toCurrency: string;
  fromCurrency: string;
  fromAmount: number;
}

export const useRampWidget = ({ toWallet, fromCurrency, toCurrency, fromAmount }: UseRampProps) => {
  const { data: rampLinkWidget, isLoading } = useGetPaymentLinkApiV1ProfileAddressPaymentLinkGet(
    toWallet,
    {
      from_currency: fromCurrency,
      to_currency: toCurrency,
      from_amount: fromAmount,
    },
    {
      query: {
        select: data => data.data.data.link,
      },
    },
  );

  return { isLoading, rampLinkWidget };
};
