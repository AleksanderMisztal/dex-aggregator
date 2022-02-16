import { BigNumber } from 'ethers';
import React, { useState } from 'react';

const fetchApi = (endpoint, data) =>
  fetch(`/api/${endpoint}`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
const fetchText = async (endpoint, data) =>
  await (await fetchApi(endpoint, data)).text();
const fetchJson = async (endpoint, data) =>
  await (await fetchApi(endpoint, data)).json();

const Input = ({ value, name, placeholder, onChange }) => (
  <div className="mx-auto my-2 w-60">
    <label htmlFor={name} className="text-gray-500">
      {placeholder}
    </label>
    <input
      className="w-60 p-2 bg-blue-200  rounded"
      {...{ value, name, placeholder, onChange }}
    />
  </div>
);

const PairBalance = () => {
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
  const [token1, setToken1] = useState(undefined);
  const [token2, setToken2] = useState(undefined);

  const getInfo = async (address1, address2) => {
    console.log(address1, address2);
    const pairAddress = await fetchText('pair-lookup', { address1, address2 });
    console.log({ pairAddress });
    const rawBalance = await fetchJson('balance', { pairAddress, userAddress });
    const balance = BigNumber.from(rawBalance.hex).toString();
    console.log({ balance });
    setBalance(balance);
    setToken1(await fetchText('token-name', { tokenAddress: address1 }));
    setToken2(await fetchText('token-name', { tokenAddress: address2 }));
    console.log({ token1, token2 });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { address1, address2 } = e.target;
    getInfo(address1.value, address2.value);
  };

  return (
    <div className="container">
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
          tooltip="Second token"
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
      {balance !== undefined && (
        <div className="w-60 mx-auto text-center">Balance: {balance}</div>
      )}
    </div>
  );
};

export default PairBalance;
