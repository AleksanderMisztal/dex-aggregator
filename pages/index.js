import React from 'react';
import { CoinSearch } from '../components/CoinSearch';
import { Navbar } from '../components/Navbar';
import { findTopEthCoins } from '../lib/coingeckoApi';
import fs from 'fs';

export async function getStaticProps(context) {
  const ethCoinsList = JSON.parse(fs.readFileSync('./public/ethCoins.json'));
  const initCoins = await findTopEthCoins('', ethCoinsList);
  return { props: { initCoins, ethCoinsList } };
}

export default function Coins(props) {
  return (
    <div>
      <Navbar />
      <CoinSearch {...props} />
    </div>
  );
}
