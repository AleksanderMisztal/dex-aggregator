import React from 'react';
import Image from 'next/image';

export const CoinIcon = ({ img, alt }) => (
  <div className="relative w-4 h-4 mt-1.5">
    <Image src={img} alt={alt} layout="fill" objectFit="contain" />
  </div>
);
