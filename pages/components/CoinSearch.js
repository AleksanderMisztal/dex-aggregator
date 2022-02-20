import React, { useEffect, useState, useRef } from 'react';
import { CoinInfo } from './CoinInfo';
import { fetchJson } from '../../lib/fetchApi';

const CoinsList = ({ coins, onCoinSelected }) => {
  const topRef = useRef(null);
  useEffect(() => {
    if (coins.length === 0) return;
    topRef.current.scrollTop = 0;
  }, [coins]);

  if (coins.length === 0)
    return (
      <div className="h-72 text-slate-500 text-center pt-6">No coins found</div>
    );
  return (
    <ul className="h-72 overflow-scroll overflow-x-hidden p-1" ref={topRef}>
      {coins.map((coin, i) => (
        <li key={i} className="my-2 mr-2">
          <CoinInfo coin={coin} onClick={() => onCoinSelected(coin)} />
        </li>
      ))}
    </ul>
  );
};

export const CoinSearch = ({ onCoinSelected }) => {
  const [phrase, setPhrase] = useState('');
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    fetchJson('/api/coins', { phrase: '' }).then(setCoins);
  }, []);

  const handleChange = async (e) => {
    const newPhrase = e.target.value;
    setPhrase(newPhrase);
    const coins = await fetchJson('/api/coins', { phrase: newPhrase });
    if (newPhrase === phrase) setCoins(coins);
  };

  return (
    <div className="w-96 max-w-full shadow-lg rounded-lg p-6 bg-white">
      <h1 className="text-center font-bold">Coin search</h1>
      <input
        autoComplete="off"
        className="border-2 border-slate-200 rounded-md shadow-inner w-full outline-none p-2 mb-2"
        type="text"
        name="coinName"
        id="coinName"
        value={phrase}
        onChange={handleChange}
      />
      <CoinsList coins={coins} onCoinSelected={onCoinSelected} />
    </div>
  );
};
