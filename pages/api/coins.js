import fs from 'fs';
import { findTopEthCoins } from '../../lib/coingeckoApi';

const ethCoinsList = JSON.parse(fs.readFileSync('./public/ethCoins.json'));
export default async (req, res) => {
  const { phrase } = req.query;
  res.send(await findTopEthCoins(phrase, ethCoinsList));
};
