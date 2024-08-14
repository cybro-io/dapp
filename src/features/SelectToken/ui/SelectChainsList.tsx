import React from 'react';

import clsx from 'clsx';
import { FixedSizeList } from 'react-window';

import { useSelectChain } from '@/features/SelectToken';
import { SearchInput, Text, TextView } from '@/shared/ui';

export const SelectChainsList = () => {
  const { setSelectedChain, selectedChain, chains, registerSearchChain, isEmptyFilteredChains } =
    useSelectChain();

  return (
    <div className="overflow-auto p-2 flex flex-col gap-2 flex-1">
      <Text textView={TextView.H5}>Networks:</Text>
      <SearchInput placeholder="Search" {...registerSearchChain()} />

      {isEmptyFilteredChains && (
        <div className="w-full h-[75px] flex items-center justify-center">
          <Text textView={TextView.BP3} className="opacity-40">
            Nothing found. Try again.
          </Text>
        </div>
      )}

      {!isEmptyFilteredChains && (
        <FixedSizeList height={426} width={303} itemCount={chains.length} itemSize={48 + 8}>
          {({ index, style }) => {
            const chain = chains[index];
            return (
              <div style={{ ...style, marginBottom: 8 }}>
                <button
                  type="button"
                  className={clsx(
                    'md:h-12 md:w-[calc(100%-6px)] md:px-4 md:py-2 md:gap-[9px] flex flex-row items-center rounded-[14px]',
                    'h-[30px] md:w-[calc(100%-6px)] px-2 py-1.5 gap-1',
                    chain.id === selectedChain ? 'bg-background-chips' : 'bg-transparent',
                  )}
                  onClick={() => setSelectedChain(chain.id === selectedChain ? null : chain.id)}
                >
                  <img
                    src={chain.icons.small}
                    className="size-4 md:size-8 rounded-full bg-stroke-tableBorder"
                  />
                  <Text textView={TextView.BU3} className="md:!text-base !text-xs">
                    {chain.name}
                  </Text>
                </button>
              </div>
            );
          }}
        </FixedSizeList>
      )}
    </div>
  );
};
