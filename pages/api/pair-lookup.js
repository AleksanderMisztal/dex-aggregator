import { ethers } from 'ethers';
import dotenv from 'dotenv';
dotenv.config();
import IUniswapV2Factory from '@uniswap/v2-core/build/IUniswapV2Factory.json';

const alchemyKey = process.env.ALCHEMY_API_KEY;
const factoryAddress = process.env.FACTORY_ADDRESS;

const provider = new ethers.providers.AlchemyProvider('homestead', alchemyKey);
const factory = new ethers.Contract(
  factoryAddress,
  IUniswapV2Factory.abi,
  provider
);

export default async (req, res) => {
  const { address1, address2 } = JSON.parse(req.body);
  const pairAddress = await factory.getPair(address1, address2);
  res.statusCode = 200;
  res.send(pairAddress);
};
