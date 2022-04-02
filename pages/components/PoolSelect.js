import React, { useState, useEffect } from 'react';
import { CoinSelect } from './CoinSelect';
import { getPairAddress } from '../../lib/contractMethods';
import { shortenAddress } from '../../lib/utils';

export const PoolSelect = ({ onSelected, initCoins }) => {
  const [poolAddress, setPoolAddress] = useState(undefined);
  const [coin1, setCoin1] = useState(undefined);
  const [coin2, setCoin2] = useState(undefined);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    if (!coin1 || !coin2) return;
    setChecking(true);
    getPairAddress(coin1.address, coin2.address).then((pool) => {
      setPoolAddress(pool);
      setChecking(false);
    });
  }, [coin1, coin2]);

  const handleSelect = () => {
    if (poolAddress == 0) return;
    setPoolAddress(undefined);
    setCoin1(undefined);
    setCoin2(undefined);
    onSelected(poolAddress);
  };

  return (
    <div className="w-max mx-auto p-4 rounded bg-purple-100">
      <div className="flex gap-x-4 justify-around">
        <CoinSelect
          coin={coin1}
          onCoinSelected={setCoin1}
          initCoins={initCoins}
        />
        <CoinSelect
          coin={coin2}
          onCoinSelected={setCoin2}
          initCoins={initCoins}
        />
      </div>
      <div className="text-center">
        {/* can't just say poolAddress ? ... because it's a bignumber object */}
        {poolAddress && poolAddress != 0 ? (
          <div className="mt-3 flex gap-3 items-center">
            Pool found at {shortenAddress(poolAddress)}
            <button
              className="rounded-full py-2 px-4 bg-gradient-to-r from-violet-500 to-fuchsia-500"
              onClick={handleSelect}
            >
              Add
            </button>
          </div>
        ) : checking ? (
          'Loading...'
        ) : coin1 && coin2 ? (
          'Pool not found.'
        ) : (
          'Select coins to add a pool.'
        )}
      </div>
    </div>
  );
};
