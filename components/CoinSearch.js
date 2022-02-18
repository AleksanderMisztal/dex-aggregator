import React, { useState } from 'react';
import CoinInfo from './CoinInfo';
import { fetchJson } from '../lib/fetchApi';

const getCoins = (phrase) => fetchJson('/api/coins', { phrase });

const CoinsList = ({ coins }) => {
  if (coins.length === 0)
    return (
      <div className="text-slate-500 text-center mt-6">No coins found</div>
    );
  return (
    <ul className="max-w-md">
      {coins.map((coin, i) => (
        <li key={i} className="my-3">
          <CoinInfo coin={coin} onClick={() => alert(coin.name)} />
        </li>
      ))}
    </ul>
  );
};

export const CoinSearch = (props) => {
  const [phrase, setPhrase] = useState('');
  const [coins, setCoins] = useState(props.initCoins);

  const handleChange = (e) => {
    const phrase = e.target.value;
    setPhrase(phrase);
    if (!phrase) setCoins(props.initCoins);
    else getCoins(phrase).then(setCoins);
  };

  return (
    <div className="container w-full max-w-sm mx-auto">
      <div className="shadow-lg rounded-lg m-10 p-6">
        <h1 className="text-center font-bold">Coin search</h1>
        <form action="" autoComplete="off">
          <input
            className="border-2 border-slate-200 rounded-md shadow-inner w-full outline-none p-2"
            type="text"
            name="search"
            id="search"
            value={phrase}
            onChange={handleChange}
          />
          <CoinsList coins={coins} />
        </form>
      </div>
    </div>
  );
};
