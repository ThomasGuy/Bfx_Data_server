import React from 'react';
import numeral from 'numeral';

export default function CoinInfo({ coins, active }) {
  if (coins[active]){
    const price = numeral(coins[active][2]).format('$0,0.00');
    const high = numeral(coins[active][4]).format('0,0.00');
    const low = numeral(coins[active][5]).format('0,0.00');
    const volume = numeral(coins[active][3]*coins[active][2]).format('0,0');
    return (
      <div className="info-area">
        <div className="info-main"><span className="coin-title">{active.slice(0, 3)}</span> {price}</div>
        <div className="info-details">
          <div className="info-item"><span>HIGH</span> {high}</div>
          <div className="info-item"><span>LOW</span>  {low}</div>
          <div className="info-item"><span>VOL</span>  {volume}</div>
        </div>
      </div>
    )
  }
  return <p>{active}</p>
}
