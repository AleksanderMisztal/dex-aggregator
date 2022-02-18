import React from 'react';
import { CoinSearch } from '../components/CoinSearch';
import { Navbar } from '../components/Navbar';
import { findTopEthCoins } from './api/coins';

export async function getStaticProps(context) {
  const initCoins = await findTopEthCoins('');
  return { props: { initCoins } };
}

export default function Coins(props) {
  return (
    <div>
      <Navbar />
      <CoinSearch {...props} />
    </div>
  );
}
