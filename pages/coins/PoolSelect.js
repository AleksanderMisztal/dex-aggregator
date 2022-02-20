import React, { useState, useEffect } from 'react';
import { CoinSelect } from './CoinSelect';
import { getPairAddress } from '../../lib/contractMethods';
import { shortenAddress } from '../../lib/utils';
import { fetchJson } from '../../lib/fetchApi';

export const PoolSelect = ({ onSelected }) => {
  const [initCoins, setInitCoins] = useState([]);
  const [poolAddress, setPoolAddress] = useState(undefined);
  const [coin1, setCoin1] = useState(undefined);
  const [coin2, setCoin2] = useState(undefined);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    fetchJson('/api/coins', { phrase: '' }).then(setInitCoins);
  }, []);

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
    <div className="p-4">
      <div className="flex justify-around">
        <CoinSelect
          coin={coin1}
          initCoins={initCoins}
          onCoinSelected={setCoin1}
        />
        <CoinSelect
          coin={coin2}
          initCoins={initCoins}
          onCoinSelected={setCoin2}
        />
      </div>
      {poolAddress ? (
        <div>
          Pool found at {shortenAddress(poolAddress)}
          <button className="p-3 bg-blue-500" onClick={handleSelect}>
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
  );
};
