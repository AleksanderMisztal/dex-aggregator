import React, { useState } from 'react';
import { CoinIcon } from './CoinIcon';
import { Dialog } from './Dialog';
import { CoinSearch } from './CoinSearch';

export const CoinSelect = ({ coin, initCoins, onCoinSelected }) => {
  const [selecting, setSelecting] = useState(false);

  const startSelect = () => setSelecting(true);
  const handleSelect = (coin) => {
    setSelecting(false);
    onCoinSelected(coin);
  };

  return (
    <>
      {!coin ? (
        <button
          className="rounded-full py-2 px-4 bg-gradient-to-r from-violet-500 to-fuchsia-500"
          onClick={startSelect}
        >
          Select a coin
        </button>
      ) : (
        <button
          className="inline-flex justify-center rounded-full py-2 px-4 bg-gradient-to-r from-violet-500 to-fuchsia-500"
          onClick={startSelect}
        >
          <CoinIcon img={coin.img} alt={coin.name} />
          <span className="ml-2">{coin.name}</span>
        </button>
      )}
      <Dialog open={selecting} onClose={() => setSelecting(false)}>
        <CoinSearch initCoins={initCoins} onCoinSelected={handleSelect} />
      </Dialog>
    </>
  );
};
