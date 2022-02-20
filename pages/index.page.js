import React, { useEffect, useState } from 'react';
import { CoinSearch } from './coins/CoinSearch';
import { Navbar } from './common/Navbar';
import CoinInfo from './coins/CoinInfo';
import { getPairAddress } from '../lib/contractMethods';
import { fetchJson } from '../lib/fetchApi';
import { Dialog } from './common/Dialog';
import PoolInfo from './pools/PoolInfo';
import { getPairInfo } from '../lib/contractMethods';

export default function Coins() {
  const [initCoins, setInitCoins] = useState([]);
  const [selecting1, setSelecting1] = useState(false);
  const [selecting2, setSelecting2] = useState(false);

  const [coin1, setCoin1] = useState(undefined);
  const [coin2, setCoin2] = useState(undefined);

  const [pairAddress, setPairAddress] = useState(undefined);
  const [userAddress, setUserAddress] = useState(undefined);
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
      getPairAddress(coin.address, otherCoin.address).then((address) => {
        setPairAddress(address);
      });
    }
  };

  const getData = async () => {
    const data = await getPairInfo(coin1.address, coin2.address, userAddress);
    setData(data);
  };
  return (
    <div>
      <Navbar />
      <div className="max-w-md mx-auto bg-slate-100 p-4 my-5">
        <input
          className="w-full"
          type="text"
          onChange={(e) => setUserAddress(e.target.value)}
        />
      </div>
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
      <div className="max-w-md mx-auto bg-slate-100 p-4 my-5">
        Pair address: {pairAddress}
        {coin1 && coin2 && userAddress && pairAddress != 0 && (
          <button
            onClick={getData}
            className="w-40 mx-auto text-center bg-green-200"
          >
            Get pair data
          </button>
        )}
        {data && <PoolInfo data={data} />}
      </div>
    </div>
  );
}
