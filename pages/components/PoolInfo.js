import React, { useState } from 'react';
import { MdArrowDropDown, MdArrowDropUp, MdContentCopy } from 'react-icons/md';
import { CoinIcon } from './CoinIcon';
import { formatBalance, shortenAddress } from '../../lib/utils';

export const PoolInfo = ({
  data: {
    pairAddress,
    poolFraction,
    reserve1,
    reserve2,
    token1Data,
    token2Data,
  },
  ...props
}) => {
  const [expanded, setExpanded] = useState(true);
  const { name: name1, price: price1, img: img1 } = token1Data;
  const { name: name2, price: price2, img: img2 } = token2Data;

  const balance1 = reserve1 * poolFraction;
  const balance2 = reserve2 * poolFraction;
  const b1Usd = balance1 * price1;
  const b2Usd = balance2 * price2;
  const tvl = reserve1 * price1 + reserve2 * price2;

  const icon1 = <CoinIcon img={img1} alt={name1} />;
  const icon2 = <CoinIcon img={img2} alt={name2} />;
  const addIcon = (
    <MdContentCopy
      className="cursor-pointer mt-1"
      onClick={() => navigator.clipboard.writeText(pairAddress)}
    />
  );

  return (
    <div
      {...props}
      className="w-80 max-w-full p-2 shadow-lg rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500"
    >
      <div className="flex justify-between">
        <div className="flex">
          {icon1}
          {name1}-{name2}
          {icon2}
        </div>
        {expanded ? (
          <MdArrowDropUp onClick={() => setExpanded(false)} />
        ) : (
          <MdArrowDropDown onClick={() => setExpanded(true)} />
        )}
      </div>
      {expanded && (
        <div className="p-3">
          <Row
            item1="Your pool share:"
            item2={formatBalance(poolFraction * 100)}
            icon="%"
          />
          <Row
            item1={`Pooled ${name1}:`}
            item2={formatBalance(balance1)}
            icon={icon1}
          />
          <Row
            item1={`Pooled ${name2}:`}
            item2={formatBalance(balance2)}
            icon={icon2}
          />
          <Row
            item1={`Pooled value:`}
            item2={formatBalance(b1Usd + b2Usd)}
            icon="$"
          />
          <Row item1={`Pool tvl:`} item2={formatBalance(tvl)} icon="$" />
          <Row
            item1="Pair address:"
            item2={shortenAddress(pairAddress)}
            icon={addIcon}
          />
        </div>
      )}
    </div>
  );
};

const Row = ({ item1, item2, icon }) => (
  <div className="flex justify-between">
    <span>{item1}</span>
    <span className="flex">
      <span className="mr-1">{item2}</span>
      {icon}
    </span>
  </div>
);
