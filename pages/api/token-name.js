import { ethers } from 'ethers';
import dotenv from 'dotenv';
dotenv.config();
import erc20abi from '../../public/erc20abi.json';

const alchemyKey = process.env.ALCHEMY_API_KEY;

const provider = new ethers.providers.AlchemyProvider('homestead', alchemyKey);

export default async (req, res) => {
  const { tokenAddress } = JSON.parse(req.body);
  const tokenContract = new ethers.Contract(tokenAddress, erc20abi, provider);
  const name = await tokenContract.name();
  res.statusCode = 200;
  res.send(name);
};
