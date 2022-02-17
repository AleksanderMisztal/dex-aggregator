import { ethers } from 'ethers';
import IUniswapV2Factory from '@uniswap/v2-core/build/IUniswapV2Factory.json';
import IUniswapV2Pair from '@uniswap/v2-core/build/IUniswapV2Pair.json';
import erc20abi from './public/erc20abi.json';

const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
const factoryAddress = process.env.NEXT_PUBLIC_FACTORY_ADDRESS;
const provider = new ethers.providers.AlchemyProvider('homestead', alchemyKey);

const factory = new ethers.Contract(
  factoryAddress,
  IUniswapV2Factory.abi,
  provider
);

export const getPairAddress = async (address1, address2) => {
  const pairAddress = await factory.getPair(address1, address2);
  return pairAddress;
};

export const getTokenName = async (tokenAddress) => {
  const tokenContract = new ethers.Contract(tokenAddress, erc20abi, provider);
  const name = await tokenContract.name();
  return name;
};

export const getBalance = async (pairAddress, userAddress) => {
  const pair = new ethers.Contract(pairAddress, IUniswapV2Pair.abi, provider);
  const balance = await pair.balanceOf(userAddress);
  return balance;
};
