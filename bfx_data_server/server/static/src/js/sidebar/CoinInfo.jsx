import React from 'react';

export default function CoinInfo({ coin, active }) {
  if (coin[active]){
    const price = parseFloat((coin[active][2]).toPrecision(4));
    const high = parseFloat((coin[active][4]).toPrecision(5));
    const low = parseFloat((coin[active][5]).toPrecision(5));
    const volume = parseFloat((coin[active][3]*price).toPrecision(7));
    return (
      <div className="info-area">
        <div className="info-main"><span className="coin-title">{active.slice(0, 3)}</span> ${price}</div>
        <div className="info-details">
          <div className="info-item">high - ${high}</div>
          <div className="info-item">low - ${low}</div>
          <div className="info-item">volume - ${volume}</div>
        </div>
      </div>
    )
  }
  return <p>{active}</p>
}
