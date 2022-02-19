import React from 'react';
import { formatBalance } from '../../lib/utils';

export default function BalancesInfo({
  data: { poolFraction, reserve1, reserve2, token1Data, token2Data },
}) {
  const balance1 = reserve1 * poolFraction;
  const balance2 = reserve2 * poolFraction;
  const balance1Usd = balance1 * token1Data.price;
  const balance2Usd = balance2 * token2Data.price;
  return (
    <div className="container">
      <div className="w-80 mx-auto text-center">
        Pool ownership: {formatBalance(poolFraction)} <br />
        {token1Data.name} reserve: {formatBalance(reserve1)}
        <br />
        {token2Data.name} reserve: {formatBalance(reserve2)}
        <br />
        {token1Data.name} balance: {formatBalance(balance1)}
        <br />
        {token2Data.name} balance: {formatBalance(balance2)}
        <br />
        {token1Data.name} usd value: {formatBalance(balance1Usd)}
        <br />
        {token2Data.name} usd value: {formatBalance(balance2Usd)}
        <br />
      </div>
    </div>
  );
}
