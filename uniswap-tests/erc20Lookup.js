import fs from 'fs';
import IUniswapV2Pair from '@uniswap/v2-core/build/IUniswapV2Pair.json' assert { type: 'json' };
import ethers from 'ethers';
import dotenv from 'dotenv';
dotenv.config();

const rawdata = fs.readFileSync('pairs.json');
const pairs = JSON.parse(rawdata);

const tokenAddress = pairs[42].t0;
const provider = new ethers.providers.AlchemyProvider(
  'homestead',
  process.env.ALCHEMY_API_KEY
);
const tokenContract = new ethers.Contract(
  tokenAddress,
  IUniswapV2Pair.abi,
  provider
);

console.log(await tokenContract.name());

let tokens = new Set();
pairs.forEach((pair) => {
  tokens.add(pair.t0);
  tokens.add(pair.t1);
});
tokens = Array.from(tokens);

console.log(`Found ${tokens.length} unique tokens.`);

for (let i = 0; i < tokens.length / 1000; i++) {
  const chunk = tokens.slice(1000 * i, 1000 * (i + 1));
  const stream = fs.createWriteStream('nameLookup.txt', { flags: 'a' });
  await Promise.all(
    chunk.map(async (token) => {
      const tokenContract = new ethers.Contract(
        token,
        IUniswapV2Pair.abi,
        provider
      );
      try {
        const name = await tokenContract.name();
        stream.write(token + ' ' + name + '\n');
      } catch (e) {
        console.log(token, e.message);
      }
    })
  );
  stream.end();
  console.log(`Written chunk ${i}`);
}
