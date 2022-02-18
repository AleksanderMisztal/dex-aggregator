import React, { useState } from 'react';
import CoinInfo from './CoinInfo';
import { findTopEthCoins } from '../lib/coingeckoApi';

const CoinsList = ({ coins }) => {
  if (coins.length === 0)
    return (
      <div className="text-slate-500 text-center mt-6">No coins found</div>
    );
  return (
    <ul className="max-h-72 overflow-scroll overflow-x-hidden p-1">
      {coins.map((coin, i) => (
        <li key={i} className="my-2 mr-2">
          <CoinInfo coin={coin} onClick={() => alert(coin.name)} />
        </li>
      ))}
    </ul>
  );
};

export const CoinSearch = ({ initCoins, ethCoinsList }) => {
  const [phrase, setPhrase] = useState('');
  const [coins, setCoins] = useState(initCoins);

  const findCoins = (phrase) => {
    if (!phrase) setCoins(initCoins);
    else findTopEthCoins(phrase, ethCoinsList).then(setCoins);
  };

  const handleChange = (e) => {
    const phrase = e.target.value;
    setPhrase(phrase);
    findCoins(phrase);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const phrase = e.target.coinName.value;
    setPhrase(phrase);
    findCoins(phrase);
  };

  return (
    <div className="container w-full max-w-md mx-auto">
      <div className="shadow-lg rounded-lg m-10 p-6">
        <h1 className="text-center font-bold">Coin search</h1>
        <form action="" autoComplete="off" onSubmit={handleSubmit}>
          <input
            className="border-2 border-slate-200 rounded-md shadow-inner w-full outline-none p-2 mb-3"
            type="text"
            name="coinName"
            id="coinName"
            value={phrase}
            onChange={handleChange}
          />
          <CoinsList coins={coins} />
        </form>
      </div>
      Phrase: {phrase}
    </div>
  );
};
