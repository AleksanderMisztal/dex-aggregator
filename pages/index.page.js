import React from 'react';
import { getPairInfo, getUsersPairs } from '../lib/contractMethods';
import { findTopEthCoins } from '../lib/coingeckoApi';
import Coins from './Coins';
import path from 'path';
import fs from 'fs';

const whale = '0xcd8AA390e6EAbBd2169b3580C1F7ce854675fD03';

export async function getStaticProps() {
  const ethCoinsPath = path.resolve(process.cwd(), 'public/ethCoins.json');
  const ethCoinsList = JSON.parse(fs.readFileSync(ethCoinsPath));
  const initCoins = await findTopEthCoins('', ethCoinsList);

  const address = whale;
  const topPairsPath = path.resolve(process.cwd(), 'public/topPairs.json');
  const pairs = JSON.parse(fs.readFileSync(topPairsPath));
  const poolAddresses = await getUsersPairs(pairs, address);
  const promises = poolAddresses.map((pa) => getPairInfo(pa, address));
  const initPools = await Promise.all(promises);

  return {
    props: {
      initCoins,
      initPools,
    },
    revalidate: 10,
  };
}

export default function CoinsPage({ initCoins, initPools }) {
  return <Coins initCoins={initCoins} initPools={initPools} />;
}
