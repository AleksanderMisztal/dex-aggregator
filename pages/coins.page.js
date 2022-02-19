import React, { useEffect, useState } from 'react';
import { CoinSearch } from './coins/CoinSearch';
import { Navbar } from './common/Navbar';
import Modal from 'react-modal';
import CoinInfo from './coins/CoinInfo';
import { getPairAddress } from '../lib/contractMethods';
import { fetchJson } from '../lib/fetchApi';

Modal.setAppElement('#modal');

export default function Coins() {
  const [initCoins, setInitCoins] = useState([]);
  const [selecting1, setSelecting1] = useState(false);
  const [selecting2, setSelecting2] = useState(false);

  const [coin1, setCoin1] = useState(undefined);
  const [coin2, setCoin2] = useState(undefined);

  const [pairAddress, setPairAddress] = useState(undefined);

  useEffect(() => {
    fetchJson('/api/coins', { phrase: '' }).then(setInitCoins);
  }, []);

  const onCoinSelected = (coin, id) => {
    console.log('setting coin', { coin, id });
    const setCoin = id === 1 ? setCoin1 : setCoin2;
    setCoin(coin);
    setSelecting1(false);
    setSelecting2(false);

    if (coin1 && coin2) {
      console.log('both coins selected, getting pair', coin1.name, coin2.name);
      getPairAddress(coin1.address, coin2.address).then((address) => {
        console.log({ address });
        setPairAddress(address);
      });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-md mx-auto bg-slate-100 p-4 my-5">
        <button
          className="w-40 mx-auto text-center bg-green-200"
          onClick={() => setSelecting1(true)}
        >
          Select coin 1
        </button>
        {coin1 && <CoinInfo coin={coin1} />}
        <Modal isOpen={selecting1}>
          <CoinSearch
            initCoins={initCoins}
            onCoinSelected={(coin) => onCoinSelected(coin, 1)}
          />
        </Modal>
      </div>
      <div className="max-w-md mx-auto bg-slate-100 p-4 my-5">
        <button
          className="w-40 mx-auto text-center bg-green-200"
          onClick={() => setSelecting2(true)}
        >
          Select coin 2
        </button>
        {coin2 && <CoinInfo coin={coin2} />}
        <Modal isOpen={selecting2}>
          <CoinSearch
            initCoins={initCoins}
            onCoinSelected={(coin) => onCoinSelected(coin, 2)}
          />
        </Modal>
      </div>
      <div className="max-w-md mx-auto bg-slate-100 p-4 my-5">
        Pair address: {pairAddress}
      </div>
    </div>
  );
}
