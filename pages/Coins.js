import React, { useState } from 'react';
import { PoolInfo } from './components/PoolInfo';
import { PoolSelect } from './components/PoolSelect';
import { AddressSelect } from './components/AddressSelect';
import { getPairInfo } from '../lib/contractMethods';
import { fetchJson } from '../lib/fetchApi';
import { shortenAddress } from '../lib/utils';

const whale = '0xcd8AA390e6EAbBd2169b3580C1F7ce854675fD03';

export default function Coins({ initCoins, initPools }) {
  const [userAddress, setUserAddress] = useState(whale);
  const [pools, setPools] = useState(initPools);
  const [loading, setLoading] = useState(false);

  const onAddressChanged = async (address) => {
    setLoading(true);
    setUserAddress(address);
    setPools([]);

    const poolAddresses = await fetchJson('/api/find-pools', { address });
    const promises = poolAddresses.map((pa) => getPairInfo(pa, address));
    const pools = await Promise.all(promises);
    setPools(pools);
    setLoading(false);
  };

  const addPool = (poolAddress) => {
    if (pools.map((p) => p.pairAddress).includes(poolAddress)) return;
    getPairInfo(poolAddress, userAddress).then((newPool) => {
      setPools([...pools, newPool]);
    });
  };

  const totalValue = pools.map(calcValue).reduce((a, b) => a + b, 0);

  return (
    <div className="w-full max-w-md shadow-lg p-4 mt-4 mx-auto rounded-lg bg-white">
      <AddressSelect
        onAddressSelected={onAddressChanged}
        initialAddress={whale}
      />
      <PoolSelect onSelected={addPool} initCoins={initCoins} />
      <div className="mx-auto w-max text-center">
        {loading ? (
          'Loading...'
        ) : pools.length === 0 ? (
          'User has no funds in popular pools.'
        ) : (
          <>
            {shortenAddress(userAddress)} uni v2 worth: {totalValue.toFixed(2)}$
            <div className="flex flex-col-reverse">
              {pools.map((pool, i) => (
                <div key={i} className="my-1">
                  <PoolInfo data={pool} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const calcValue = (p) => {
  const {
    poolFraction,
    reserve1,
    reserve2,
    token1Data: { price: price1 },
    token2Data: { price: price2 },
  } = p;
  return poolFraction * (reserve1 * price1 + reserve2 * price2);
};
