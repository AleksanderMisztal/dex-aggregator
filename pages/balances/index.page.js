import React from 'react';
import { Navbar } from '../common/Navbar';
import BalanceCalculator from './BalanceCalculator';

export default function Home() {
  return (
    <div>
      <Navbar />
      <BalanceCalculator />
    </div>
  );
}
