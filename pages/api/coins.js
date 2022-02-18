import fs from 'fs';
import { searchCoins } from '../../lib/coingeckoApi';

export const findTopEthCoins = async (phrase) => {
  const ethCoinsList = JSON.parse(fs.readFileSync('./public/ethCoins.json'));
  const coins = await searchCoins(phrase);
  const ethCoinAddresses = Object.fromEntries(
    ethCoinsList.map((coin) => [coin.id, coin.address])
  );
  const topEthCoins = coins
    .filter((coin) => ethCoinAddresses[coin.id])
    .slice(0, 20)
    .map((coin) => ({ ...coin, address: ethCoinAddresses[coin.id] }));
  return topEthCoins;
};

export default async (req, res) => {
  const { phrase } = req.query;
  res.send(await findTopEthCoins(phrase));
};
