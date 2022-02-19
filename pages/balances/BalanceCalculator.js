import React, { useState } from 'react';
import { getCoinDataByAddress } from '../../lib/coingeckoApi';
import {
  getBalance,
  getPairAddress,
  getDenominatedPairReserves,
  getTotalSupply,
} from '../../lib/contractMethods';

const Input = ({ value, name, placeholder, onChange }) => (
  <div className="mx-auto my-2 w-80">
    <label htmlFor={name} className="text-gray-500">
      {placeholder}
    </label>
    <input
      className="w-full p-2 bg-blue-200  rounded text-xs"
      {...{ value, name, placeholder, onChange }}
    />
  </div>
);

const BalanceCalculator = () => {
  const [address1, setAddress1] = useState(
    '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'
  );
  const [address2, setAddress2] = useState(
    '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
  );
  const [userAddress, setUserAddress] = useState(
    '0xcd8AA390e6EAbBd2169b3580C1F7ce854675fD03'
  );

  const [balance, setBalance] = useState(undefined);
  const [totalSupply, setTotalSupply] = useState(undefined);
  const [token1, setToken1] = useState(undefined);
  const [token2, setToken2] = useState(undefined);
  const [reserve1, setReserve1] = useState(undefined);
  const [reserve2, setReserve2] = useState(undefined);

  const [loaded, setLoaded] = useState(false);

  const getInfo = async (address1, address2) => {
    // Could speed up by not awaiting sequentially
    // Could have getPairInfo = async (address1, address2)
    //    => {object with all the data} defined in contractMethods.js
    //   and a single set state here
    const pairAddress = await getPairAddress(address1, address2);
    const balance = await getBalance(pairAddress, userAddress);
    const totalSupply = await getTotalSupply(pairAddress);
    const [reserve1, reserve2] = await getDenominatedPairReserves(
      address1,
      address2
    );

    const token1 = await getCoinDataByAddress(address1);
    const token2 = await getCoinDataByAddress(address2);

    setBalance(balance);
    setTotalSupply(totalSupply);
    setToken1(token1);
    setToken2(token2);
    setReserve1(reserve1);
    setReserve2(reserve2);
    setLoaded(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { address1, address2 } = e.target;
    getInfo(address1.value, address2.value);
  };

  if (!loaded)
    return (
      <form onSubmit={handleSubmit}>
        <Input
          value={userAddress}
          name="user_address"
          placeholder="User address"
          onChange={(e) => setUserAddress(e.target.value)}
        />
        <Input
          value={address1}
          name="address1"
          placeholder={'First token: ' + token1}
          onChange={(e) => setAddress1(e.target.value)}
        />
        <Input
          value={address2}
          name="address2"
          placeholder={'Second token: ' + token2}
          onChange={(e) => setAddress2(e.target.value)}
        />
        <div className="mx-auto my-6 w-60">
          <button
            className="bg-blue-200 text-center w-full rounded p-2"
            type="submit"
          >
            Get info
          </button>
        </div>
      </form>
    );

  const fractionOwned = balance / totalSupply;
  const userBalance1 = reserve1 * fractionOwned;
  const userBalance2 = reserve2 * fractionOwned;
  const userBalance1Usd = userBalance1 * token1.price;
  const userBalance2Usd = userBalance2 * token2.price;
  return (
    <div className="container">
      <div className="w-80 mx-auto text-center">
        Fraction: {fractionOwned.toString()} <br />
        Balance: {balance.toString()} <br />
        Total Supply: {totalSupply.toString()}
        <br />
        Reserve 1: {reserve1.toString()}
        <br />
        Reserve 2: {reserve2.toString()}
        <br />
        User balance 1: {userBalance1.toString()}
        <br />
        User balance 2: {userBalance2.toString()}
        <br />
        Usd 1: {userBalance1Usd.toString()}
        <br />
        Usd 2: {userBalance2Usd.toString()}
        <br />
      </div>
    </div>
  );
};

export default BalanceCalculator;
