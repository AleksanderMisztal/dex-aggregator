import IUniswapV2Factory from '@uniswap/v2-core/build/IUniswapV2Factory.json' assert { type: 'json' };
import IUniswapV2Pair from '@uniswap/v2-core/build/IUniswapV2Pair.json' assert { type: 'json' };
import ethers from 'ethers';
import dotenv from 'dotenv';
dotenv.config();

const factoryAddress = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f';
const provider = new ethers.providers.AlchemyProvider(
  'homestead',
  process.env.ALCHEMY_API_KEY
);
const factory = new ethers.Contract(
  factoryAddress,
  IUniswapV2Factory.abi,
  provider
);

// const uniswapUser = '0x06799a1e4792001AA9114F0012b9650cA28059a3';
// const pairsPromises = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(async (i) => {
//   const pairAddress = await factory.allPairs(i);
//   const pair = new ethers.Contract(pairAddress, IUniswapV2Pair.abi, provider);
//   const balance = await pair.balanceOf(uniswapUser);
//   if (balance == 0) return;
//   const totalSupply = await pair.totalSupply();
//   const [r0, r1, t] = await pair.getReserves();
//   const info = { i, totalSupply, r0, r1, balance };
//   Object.keys(info).forEach((k) => (info[k] = info[k].toString()));
//   console.log(info);
// });

// const pairs = await Promise.all(pairsPromises);

// const filter = pair0.filters.Transfer();
// const events = await pair0.queryFilter(filter, 14200000);
// console.log(events.map((e) => e.args));

// const eth_balance = (r0 * balance) / totalSupply / 1000000;
// const usdc_balance = pe(r1) * (balance / totalSupply);

// console.log({ eth_balance, usdc_balance });

// Alchemy only allows up to 10k logs (events) per query, so need to divide and conquer
const getLogs = async (filter, fromBlock, toBlock) => {
  if (fromBlock > toBlock) return [];
  try {
    console.log('Getting logs', { fromBlock, toBlock });
    const events = await factory.queryFilter(filter, fromBlock, toBlock);
    const data = events.map((e) => e.args);
    console.log(`${data.length} logs found`);
    return data;
  } catch (error) {
    const midBlock = (fromBlock + toBlock) >> 1;
    const arr1 = await getLogs(filter, fromBlock, midBlock);
    const arr2 = await getLogs(filter, midBlock + 1, toBlock);
    return [...arr1, ...arr2];
  }
};
const currentBlock = await provider.getBlockNumber();

const filter = factory.filters.PairCreated();
const events = await factory.queryFilter(filter, currentBlock - 100);
const data = events.map((e) => e.args);
console.log(data);
