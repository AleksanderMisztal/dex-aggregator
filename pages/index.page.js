import React, { useEffect, useState } from 'react';
import { PoolInfo } from './pools/PoolInfo';
import { PoolSelect } from './coins/PoolSelect';
import { AddressSelect } from './common/AddressSelect';
import { getPairInfo } from '../lib/contractMethods';
import { fetchJson } from '../lib/fetchApi';

const whale = '0xcd8AA390e6EAbBd2169b3580C1F7ce854675fD03';

export default function Coins() {
  const [userAddress, setUserAddress] = useState(whale);
  const [pools, setPools] = useState([]);

  useEffect(() => {
    fetchJson('/api/find-pools', { address: userAddress })
      .then((poolAddresses) =>
        Promise.all(poolAddresses.map((pa) => getPairInfo(pa, userAddress)))
      )
      .then(setPools);
  }, []);

  const addPool = (poolAddress) => {
    if (pools.map((p) => p.pairAddress).includes(poolAddress)) return;
    getPairInfo(poolAddress, userAddress).then((newPool) => {
      setPools([...pools, newPool]);
    });
  };

  return (
    <div className="w-full max-w-md shadow-lg p-4 mt-4 mx-auto rounded-lg bg-white">
      <AddressSelect
        onAddressSelected={setUserAddress}
        initialAddress={whale}
      />
      <PoolSelect onSelected={addPool} />
      <div className="mx-auto w-max flex flex-col-reverse">
        {pools.map((pool, i) => (
          <div key={i} className="my-1">
            <PoolInfo data={pool} />
          </div>
        ))}
      </div>
    </div>
  );
}
