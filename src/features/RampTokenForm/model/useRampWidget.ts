import React from 'react';

export interface UseRampProps {
  toWallet: string;
  toCurrency: string;
  fromCurrency: string;
  toAmount: number;
}

export const useRampWidget = (props: UseRampProps) => {
  const [isLoading, setLoading] = React.useState(false);

  const [rampLinkWidget, setRampLinkWidget] = React.useState<string | null>(null);

  const fetchLink = async (data: UseRampProps) => {
    setLoading(true);

    setTimeout(() => {
      setRampLinkWidget('https://widget.munzen.io/');
      setLoading(false);
    }, 1000);
  };

  React.useEffect(() => {
    fetchLink(props);
  }, [props]);

  return { isLoading, rampLinkWidget };
};
