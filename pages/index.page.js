import React, { useEffect, useState } from 'react';

import { CoinSearch } from './coins/CoinSearch';
import { CoinInfo } from './coins/CoinInfo';
import { PoolInfo } from './pools/PoolInfo';
import { Dialog } from './common/Dialog';
import { AddressSelect } from './common/AddressSelect';

import { getPairInfo } from '../lib/contractMethods';
import { fetchJson } from '../lib/fetchApi';

const whale = '0xcd8AA390e6EAbBd2169b3580C1F7ce854675fD03';
export default function Coins() {
  const [initCoins, setInitCoins] = useState([]);
  const [selecting1, setSelecting1] = useState(false);
  const [selecting2, setSelecting2] = useState(false);

  const [coin1, setCoin1] = useState(undefined);
  const [coin2, setCoin2] = useState(undefined);
  const [userAddress, setUserAddress] = useState(whale);
  const [data, setData] = useState(undefined);

  useEffect(() => {
    fetchJson('/api/coins', { phrase: '' }).then(setInitCoins);
  }, []);

  const closeModal = () => {
    setSelecting1(false);
    setSelecting2(false);
  };

  const onCoinSelected = (coin, id) => {
    closeModal();
    const setCoin = id === 1 ? setCoin1 : setCoin2;
    const otherCoin = id === 1 ? coin2 : coin1;
    setCoin(coin);

    if (coin && otherCoin) {
      getPairInfo(coin.address, otherCoin.address, userAddress).then(setData);
    }
  };

  return (
    <div>
      <AddressSelect onAddressSelected={setUserAddress} />
      <div className="max-w-md mx-auto bg-slate-100 p-4 my-5">
        <button
          className="w-40 mx-auto text-center bg-green-200"
          onClick={() => setSelecting1(true)}
        >
          Select coin 1
        </button>
        {coin1 && <CoinInfo coin={coin1} />}
        <Dialog open={selecting1} onClose={closeModal}>
          <CoinSearch
            initCoins={initCoins}
            onCoinSelected={(coin) => onCoinSelected(coin, 1)}
          />
        </Dialog>
      </div>
      <div className="max-w-md mx-auto bg-slate-100 p-4 my-5">
        <button
          className="w-40 mx-auto text-center bg-green-200"
          onClick={() => setSelecting2(true)}
        >
          Select coin 2
        </button>
        {coin2 && <CoinInfo coin={coin2} />}
        <Dialog open={selecting2} onClose={closeModal}>
          <CoinSearch
            initCoins={initCoins}
            onCoinSelected={(coin) => onCoinSelected(coin, 2)}
          />
        </Dialog>
      </div>
      {data && <PoolInfo data={data} />}
    </div>
  );
}
