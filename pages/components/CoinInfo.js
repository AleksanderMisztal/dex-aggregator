import React from 'react';
import Image from 'next/image';
import { shortenAddress } from '../../lib/utils';

export const CoinInfo = ({ coin, ...props }) => {
  const shortAddr = shortenAddress(coin.address);
  return (
    <div
      className="flex items-center rounded-md bg-slate-100 p-2 shadow-md hover:scale-[1.02] hover:cursor-pointer"
      {...props}
    >
      <Image
        className="w-10 h-10 mr-4"
        src={coin.img}
        alt={coin.name}
        width="30"
        height="30"
      />
      <div className="text-sm">
        <p className="text-gray-900 leading-none">{coin.name}</p>
        <p className="text-gray-600">{shortAddr}</p>
      </div>
    </div>
  );
};
