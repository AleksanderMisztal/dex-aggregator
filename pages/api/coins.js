import fs from 'fs';
import { searchCoins } from '../../lib/coingeckoApi';

export default async (req, res) => {
  const { phrase } = req.query;

  const coins = await searchCoins(phrase);
  const ethCoinsList = JSON.parse(fs.readFileSync('./public/ethCoins.json'));
  const ethCoinAddresses = Object.fromEntries(
    ethCoinsList.map((coin) => [coin.id, coin.address])
  );
  const topEthCoins = coins
    .filter((coin) => ethCoinAddresses[coin.id])
    .slice(0, 5)
    .map((coin) => ({ ...coin, address: ethCoinAddresses[coin.id] }));
  res.send(topEthCoins);
};
