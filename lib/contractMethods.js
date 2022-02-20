import { ethers } from 'ethers';
import IUniswapV2Factory from '@uniswap/v2-core/build/IUniswapV2Factory.json';
import IUniswapV2Pair from '@uniswap/v2-core/build/IUniswapV2Pair.json';
import erc20abi from '../public/erc20abi.json';
import { getCoinDataByAddress } from './coingeckoApi';

const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
const factoryAddress = process.env.NEXT_PUBLIC_FACTORY_ADDRESS;
const provider = new ethers.providers.AlchemyProvider('homestead', alchemyKey);

const factory = new ethers.Contract(
  factoryAddress,
  IUniswapV2Factory.abi,
  provider
);

export const getUsersPairs = async (pairs, address) => {
  const balances = await Promise.all(
    pairs.map((pairAddress) => {
      const pair = new ethers.Contract(
        pairAddress,
        IUniswapV2Pair.abi,
        provider
      );
      return pair.balanceOf(address);
    })
  );
  return pairs.filter((p, i) => balances[i] > 0);
};

export const getPairInfo = async (pairAddress, userAddress) => {
  const pair = new ethers.Contract(pairAddress, IUniswapV2Pair.abi, provider);
  const [address1, address2] = await Promise.all([
    pair.token0(),
    pair.token1(),
  ]);
  const token1 = new ethers.Contract(address1, erc20abi, provider);
  const token2 = new ethers.Contract(address2, erc20abi, provider);

  const data = {};
  data.reserves = pair.getReserves();
  data.balance = pair.balanceOf(userAddress);
  data.totalSupply = pair.totalSupply();
  data.decimals1 = token1.decimals();
  data.decimals2 = token2.decimals();
  data.token1Data = getCoinDataByAddress(address1);
  data.token2Data = getCoinDataByAddress(address2);

  await Promise.all(
    Object.entries(data).map(async ([key, value]) => {
      data[key] = await value;
    })
  );
  const {
    reserves,
    balance,
    totalSupply,
    decimals1,
    decimals2,
    token1Data,
    token2Data,
  } = data;
  let reserve1 = reserves.reserve0;
  let reserve2 = reserves.reserve1;
  const poolFraction = balance / totalSupply;
  reserve1 /= 10 ** decimals1;
  reserve2 /= 10 ** decimals2;

  return {
    pairAddress,
    token1Data,
    token2Data,
    poolFraction,
    reserve1,
    reserve2,
  };
};

export const getPairAddress = factory.getPair;
