import React from 'react';
import Image from 'next/image';
import { MdArrowDropDown } from 'react-icons/md';
import { formatBalance } from '../../lib/utils';

export const PoolInfo = ({
  data: { poolFraction, reserve1, reserve2, token1Data, token2Data },
}) => {
  const { name: name1, price: price1, img: img1 } = token1Data;
  const { name: name2, price: price2, img: img2 } = token2Data;
  const balance1 = reserve1 * poolFraction;
  const balance2 = reserve2 * poolFraction;
  const b1Usd = balance1 * price1;
  const b2Usd = balance2 * price2;
  const tvl = reserve1 * price1 + reserve2 * price2;
  console.log(token1Data);
  const icon1 = <Icon img={img1} alt={name1} />;
  const icon2 = <Icon img={img2} alt={name2} />;
  return (
    <div className="w-80 max-w-full p-5 shadow-lg rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500">
      <div className="flex justify-between">
        <div className="flex">
          {icon1}
          {name1}-{name2}
          {icon2}
        </div>
        <button onClick={() => console.log('collapse')}>
          <MdArrowDropDown />
        </button>
      </div>
      <Row item1="Your pool share:" item2={poolFraction * 100} icon="%" />
      <Row item1={`Pooled ${name1}:`} item2={balance1} icon={icon1} />
      <Row item1={`Pooled ${name2}:`} item2={balance2} icon={icon2} />
      <Row item1={`Pooled value:`} item2={b1Usd + b2Usd} icon="$" />
      <Row item1={`Pool tvl:`} item2={tvl} icon="$" />
    </div>
  );
};

const Icon = ({ img, alt }) => (
  <div className="w-4 h-4 relative mt-1">
    <Image src={img} alt={alt} layout="fill" objectFit="contain" />
  </div>
);

const Row = ({ item1, item2, icon }) => (
  <div className="flex justify-between">
    <span>{item1}</span>
    <span className="flex">
      <span className="mr-1">{formatBalance(item2)}</span>
      {icon}
    </span>
  </div>
);
