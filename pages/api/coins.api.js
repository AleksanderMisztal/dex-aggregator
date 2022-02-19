import fs from 'fs';
import { findTopEthCoins } from '../../lib/coingeckoApi';
import path from 'path';

const filePath = path.resolve(process.cwd(), 'public/ethCoins.json');
const ethCoinsList = JSON.parse(fs.readFileSync(filePath));
export default async function coins(req, res) {
  const { phrase } = req.query;
  res.send(await findTopEthCoins(phrase, ethCoinsList));
}
