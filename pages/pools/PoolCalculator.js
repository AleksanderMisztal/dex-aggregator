import React, { useState } from 'react';
import { getPairInfo } from '../../lib/contractMethods';
import { PoolInfo } from './PoolInfo';

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

const wethAddress = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
const usdcAddress = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48';
const whaleAddress = '0xcd8AA390e6EAbBd2169b3580C1F7ce854675fD03';

export const PoolCalculator = () => {
  const [address1, setAddress1] = useState(usdcAddress);
  const [address2, setAddress2] = useState(wethAddress);
  const [userAddress, setUserAddress] = useState(whaleAddress);

  const [data, setData] = useState(undefined);

  const [loaded, setLoaded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      address1: { value: address1 },
      address2: { value: address2 },
      userAddress: { value: userAddress },
    } = e.target;

    const data = await getPairInfo(address1, address2, userAddress);
    setData(data);
    setLoaded(true);
  };

  if (!loaded)
    return (
      <form onSubmit={handleSubmit}>
        <Input
          value={userAddress}
          name="userAddress"
          placeholder="User address"
          onChange={(e) => setUserAddress(e.target.value)}
        />
        <Input
          value={address1}
          name="address1"
          placeholder={'First token'}
          onChange={(e) => setAddress1(e.target.value)}
        />
        <Input
          value={address2}
          name="address2"
          placeholder={'Second token'}
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

  return <PoolInfo data={data} />;
};
