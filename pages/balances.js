import React from 'react';
import { Navbar } from '../components/Navbar';
import BalanceCalculator from '../components/BalanceCalculator';

export default function Home() {
  return (
    <div>
      <Navbar />
      <BalanceCalculator />
    </div>
  );
}
