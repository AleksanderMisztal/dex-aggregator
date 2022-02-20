import React, { useEffect, useState } from 'react';

import { PoolInfo } from './pools/PoolInfo';
import { AddressSelect } from './common/AddressSelect';
import { CoinSelect } from './coins/CoinSelect';

import { getPairInfo } from '../lib/contractMethods';
import { fetchJson } from '../lib/fetchApi';

const whale = '0xcd8AA390e6EAbBd2169b3580C1F7ce854675fD03';

export default function Coins() {
  const [initCoins, setInitCoins] = useState([]);

  const [coin1, setCoin1] = useState(undefined);
  const [coin2, setCoin2] = useState(undefined);
  const [userAddress, setUserAddress] = useState(whale);
  const [data, setData] = useState(undefined);

  useEffect(() => {
    fetchJson('/api/coins', { phrase: '' }).then(setInitCoins);
  }, []);
  useEffect(() => {
    if (!coin1 || !coin2) return;
    getPairInfo(coin1.address, coin2.address, userAddress).then(setData);
  }, [coin1, coin2]);

  return (
    <div className="w-full max-w-md shadow-lg p-4 mt-4 mx-auto rounded-lg">
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
      <div className="mx-auto w-max">{data && <PoolInfo data={data} />}</div>
    </div>
  );
}
