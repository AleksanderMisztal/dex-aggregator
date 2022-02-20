import React from 'react';
import { Navbar } from '../common/Navbar';
import PoolCalculator from './PoolCalculator';

export default function Home() {
  return (
    <div>
      <Navbar />
      <PoolCalculator />
    </div>
  );
}
