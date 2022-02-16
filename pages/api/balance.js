import { ethers } from 'ethers';
import dotenv from 'dotenv';
dotenv.config();
import IUniswapV2Pair from '@uniswap/v2-core/build/IUniswapV2Pair.json';

const alchemyKey = process.env.ALCHEMY_API_KEY;

const provider = new ethers.providers.AlchemyProvider('homestead', alchemyKey);

export default async (req, res) => {
  const { pairAddress, userAddress } = JSON.parse(req.body);
  const pair = new ethers.Contract(pairAddress, IUniswapV2Pair.abi, provider);
  const balance = await pair.balanceOf(userAddress);
  res.statusCode = 200;
  res.send(balance);
};
