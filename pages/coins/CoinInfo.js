import React from 'react';
import Image from 'next/image';

export default function CoinInfo({ coin, ...props }) {
  const ad = coin.address;
  const shortAddr =
    ad.substring(0, 7) + '...' + ad.substring(ad.length - 5, ad.length);
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
}
