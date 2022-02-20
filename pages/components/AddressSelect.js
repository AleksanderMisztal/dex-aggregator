import React from 'react';
import { useState } from 'react';
import { Dialog } from './Dialog';
import { shortenAddress, isValidAddress } from '../../lib/utils';

export const AddressSelect = ({ onAddressSelected, initialAddress }) => {
  const [open, setOpen] = useState(false);
  const [addresses, setAddresses] = useState([initialAddress]);
  const [activeAddress, setActiveAddress] = useState(0);
  const [validInput, setValidInput] = useState(false);

  const activateAddress = (idx) => {
    setOpen(false);
    if (idx === activeAddress) return;
    const address = addresses[idx];
    onAddressSelected(address);
    setActiveAddress(idx);
  };

  const addAddress = (address) => {
    if (!isValidAddress(address)) return;
    if (addresses.includes(address)) return;
    setAddresses([...addresses, address]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const address = e.target.address.value;
    addAddress(address);
    e.target.address.value = '';
  };

  const validateInput = (e) => {
    const input = e.target.value;
    const valid = isValidAddress(input) && !addresses.includes(input);
    setValidInput(valid);
  };

  const buttonStyle = validInput ? '' : 'cursor-not-allowed';

  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <div className="bg-white p-4 rounded-lg">
          <div>
            {addresses.map((a, i) => (
              <button
                className={
                  'font-bold block p-3 my-2 rounded-md w-full ' +
                  (i == activeAddress ? 'bg-blue-500' : 'bg-blue-300')
                }
                key={i}
                onClick={() => activateAddress(i)}
              >
                {shortenAddress(a)}
              </button>
            ))}
          </div>
          <form onSubmit={handleSubmit} autoComplete="off">
            <input
              className="border-2 rounded-md p-2"
              type="text"
              id="address"
              onChange={validateInput}
            />
            <button
              disabled={!validInput}
              type="submit"
              className={
                'bg-blue-400 rounded-md hover:bg-blue-700 p-3 ' + buttonStyle
              }
            >
              Add address
            </button>
          </form>
        </div>
      </Dialog>
      <button
        className="absolute right-4 top-0 bg-blue-400 p-3 rounded-lg border-orange-500 border-2"
        onClick={() => setOpen(true)}
      >
        {activeAddress === undefined
          ? 'Import address'
          : shortenAddress(addresses[activeAddress])}
      </button>
    </>
  );
};
