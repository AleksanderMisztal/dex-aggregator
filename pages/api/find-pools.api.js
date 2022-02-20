import { getUsersPairs } from '../../lib/contractMethods';
import fs from 'fs';
import path from 'path';

const filePath = path.resolve(process.cwd(), 'public/topPairs.json');
const pairs = JSON.parse(fs.readFileSync(filePath));

export default async function coins(req, res) {
  const { address } = req.query;
  const pools = await getUsersPairs(pairs, address);
  res.send(pools);
}
