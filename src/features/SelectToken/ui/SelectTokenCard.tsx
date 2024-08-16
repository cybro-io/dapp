import React from 'react';

import { useWeb3ModalAccount } from '@web3modal/ethers5/react';
import clsx from 'clsx';
import { Token } from 'symbiosis-js-sdk';

import ExportIcon from '@/shared/assets/icons/export.svg';
import { getAvailableBalance, useSymbiosis } from '@/shared/lib';
import { Link, StarIconButton, Text, TextView } from '@/shared/ui';
import { formatUserMoney } from '@/shared/utils';
import { useMediaQuery } from 'usehooks-ts';

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
  const isSmallScreen = useMediaQuery('(max-width: 1279px)');

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
        'p-2 xl:p-4 inline-flex flex-row gap-4 items-center rounded-[14px] w-[calc(100%-9px)] cursor-pointer',
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
            alt={String(token?.name)}
            data-loaded={isLoadedImg}
            className="rounded-full data-[loaded=false]:bg-stroke-tableBorder size-6 xl:size-8"
          />

          <img
            className="absolute bottom-0 right-0 border-1 border-solid border-stroke-tableBorder bg-stroke-tableBorder rounded-full size-2.5 xl:size-[14px]"
            src={String(token.chain?.icons?.small)}
            alt={String(token.chain?.name)}
          />
        </div>

        <div className="flex flex-col gap-px">
          <Text textView={isSmallScreen ? TextView.P3 : TextView.BU1}>{token.symbol}</Text>
          <div className="inline-flex gap-[5px]">
            {!isSmallScreen && (
              <Text textView={isSmallScreen ? TextView.P3 : TextView.C4} className="opacity-70">
                Balance
              </Text>
            )}
            <Text textView={TextView.C4}>{formatUserMoney(balance)}</Text>
          </div>
        </div>
      </div>
      {!isSmallScreen && (
        <>
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
        </>
      )}
    </div>
  );
};
