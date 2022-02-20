import React, { useEffect, useState } from 'react';

import { PoolInfo } from './pools/PoolInfo';
import { AddressSelect } from './common/AddressSelect';
import { CoinSelect } from './coins/CoinSelect';

import { getPairInfo } from '../lib/contractMethods';
import { fetchJson } from '../lib/fetchApi';
import { shortenAddress } from '../lib/utils';

const whale = '0xcd8AA390e6EAbBd2169b3580C1F7ce854675fD03';

export default function Coins() {
  const [initCoins, setInitCoins] = useState([]);

  const [coin1, setCoin1] = useState(undefined);
  const [coin2, setCoin2] = useState(undefined);
  const [userAddress, setUserAddress] = useState(whale);
  const [newPool, setNewPool] = useState(undefined);
  const [checking, setChecking] = useState(false);
  const [pools, setPools] = useState([]);
  useEffect(() => {
    fetchJson('/api/coins', { phrase: '' }).then(setInitCoins);
  }, []);
  useEffect(() => {
    if (!coin1 || !coin2) return;
    setChecking(true);
    getPairInfo(coin1.address, coin2.address, userAddress).then((pool) => {
      setNewPool(pool);
      setChecking(false);
    });
  }, [coin1, coin2]);

  const addPool = () => {
    if (!newPool) return;
    if (pools.map((p) => p.pairAddress).includes(newPool.pairAddress)) return;
    setPools([...pools, newPool]);
    setNewPool(undefined);
    setCoin1(undefined);
    setCoin2(undefined);
  };

  return (
    <div className="w-full max-w-md shadow-lg p-4 mt-4 mx-auto rounded-lg bg-white">
      <AddressSelect onAddressSelected={setUserAddress} />
      <div className="flex justify-around p-4">
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
      <div className="mx-auto w-max flex flex-col-reverse">
        {pools.map((pool, i) => (
          <div className="my-1">
            <PoolInfo key={i} data={pool} />
          </div>
        ))}
        {newPool ? (
          <div>
            Pool found at {shortenAddress(newPool.pairAddress)}
            <button className="p-3 bg-blue-500" onClick={addPool}>
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
}
