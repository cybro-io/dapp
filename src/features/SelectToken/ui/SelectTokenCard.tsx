import React from 'react';

import { useWeb3ModalAccount } from '@web3modal/ethers5/react';
import clsx from 'clsx';
import { Token } from 'symbiosis-js-sdk';

import ExportIcon from '@/shared/assets/icons/export.svg';
import { getAvailableBalance, useSymbiosis } from '@/shared/lib';
import { Link, StarIconButton, Text, TextView } from '@/shared/ui';
import { formatUserMoney } from '@/shared/utils';

type TokenCardProps = {
  token: Token;
  onClickFavorite: (state: boolean) => void;
  isFavorite?: boolean;
  isActive?: boolean;
  onSelectToken?: (token: Token) => void;
};

export const SelectTokenCard = ({
  isActive,
  token,
  onClickFavorite,
  isFavorite,
  onSelectToken,
}: TokenCardProps) => {
  const getHrefExplorerFromToken = (token: Token) => {
    if (token.address) {
      return `${token.chain?.explorer}/address/${token.address}`;
    }
    return `${token.chain?.explorer}/tokens`;
  };

  const { address } = useWeb3ModalAccount();
  const symbiosis = useSymbiosis();

  const [balance, setBalance] = React.useState<string>('');
  const [isLoadedImg, setIsLoadedImg] = React.useState<boolean>(false);

  React.useEffect(() => {
    const provider = symbiosis.providers.get(token.chainId);

    if (address && provider) {
      getAvailableBalance(token, symbiosis.getProvider(token.chainId), address)
        .then(setBalance)
        .catch(setBalance);
    }
  }, [token, address]);

  return (
    <div
      className={clsx(
        'p-4 inline-flex flex-row gap-4 items-center rounded-[14px] w-[calc(100%-4px)] cursor-pointer',
        isActive ? 'bg-background-chips' : 'bg-transparent',
        !isActive && 'hover:border-stroke-tableBorder hover:border-[1px] hover:border-solid',
      )}
      onClick={() => onSelectToken?.(token)}
    >
      <div className="inline-flex gap-[9px] items-center flex-1">
        <div className="relative">
          <img
            onLoad={() => {
              setIsLoadedImg(true);
            }}
            src={String(token.icons?.small)}
            width={32}
            height={32}
            alt={String(token?.name)}
            data-loaded={isLoadedImg}
            className="rounded-full data-[loaded=false]:bg-stroke-tableBorder"
          />

          <img
            className="absolute bottom-0 right-0 border-1 border-solid border-stroke-tableBorder bg-stroke-tableBorder rounded-full"
            src={String(token.chain?.icons?.small)}
            width={14}
            height={14}
            alt={String(token.chain?.name)}
          />
        </div>

        <div className="flex flex-col gap-px">
          <Text textView={TextView.BU1}>{token.symbol}</Text>
          <div className="inline-flex gap-[5px]">
            <Text textView={TextView.C4} className="opacity-70">
              Balance
            </Text>
            <Text textView={TextView.C4}>{formatUserMoney(balance)}</Text>
          </div>
        </div>
      </div>
      <Link
        href={getHrefExplorerFromToken(token)}
        target="_blank"
        onClick={event => {
          event.stopPropagation();
        }}
      >
        <ExportIcon className="text-stroke-tableBorder" />
      </Link>
      <StarIconButton
        isActive={isFavorite}
        onClick={event => {
          event.stopPropagation();
          onClickFavorite(!isFavorite);
        }}
      />
    </div>
  );
};
