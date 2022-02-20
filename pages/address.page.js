import React from 'react';
import { AddressSelect } from './common/AddressSelect';

export default function Address() {
  return (
    <div>
      Hello
      <AddressSelect onAddressSelected={(address) => console.log(address)} />
    </div>
  );
}
