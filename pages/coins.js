import React from 'react';
import { CoinSearch } from '../components/CoinSearch';
import { fetchJson } from '../lib/fetchApi';

const getCoins = (phrase) =>
  fetchJson('http://localhost:3000/api/coins', { phrase });
export async function getServerSideProps(context) {
  const initCoins = await getCoins('');
  return { props: { initCoins } };
}

export default function Coins(props) {
  return (
    <div>
      <CoinSearch {...props} />
    </div>
  );
}
