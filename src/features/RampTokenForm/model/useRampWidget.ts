import { useGetPaymentLinkApiV1ProfileAddressPaymentLinkGet } from '@/shared/types';

export interface UseRampProps {
  toWallet: string;
  toCurrency: string;
  fromCurrency: string;
  toAmount: number;
}

export const useRampWidget = ({ toWallet }: UseRampProps) => {
  const { data: rampLinkWidget, isLoading } = useGetPaymentLinkApiV1ProfileAddressPaymentLinkGet(
    toWallet,
    {
      query: {
        select: data => data.data.data.link,
      },
    },
  );

  return { isLoading, rampLinkWidget };
};
