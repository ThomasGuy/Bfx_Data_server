import React from 'react';

export default function CoinInfo({ coins, active }) {
  return (
    <p>
      {active}: {coins[active]}
    </p>
  );
}
