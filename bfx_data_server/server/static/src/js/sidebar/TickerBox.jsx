/* eslint-disable no-param-reassign */
import React from 'react';

export default function TickerBox({ name, price, daily, setFavourite }) {
  function handleFavourite(evt) {
    const selectCoin = evt.target.name;
    if (evt.target.checked) {
      setFavourite(prev => [...prev, selectCoin]);
    } else {
      setFavourite(prev => prev.filter(item => item !== selectCoin));
    }
  }

  daily = parseFloat((daily*100).toPrecision(4));
  price = parseFloat((price).toPrecision(5));

  return (
    <div className='tickerbox' id={`ticker-${name}`}>
      <div className='box-values' data-symbol={name}>
        <div className='p-2'>{name}</div>
        <div className='p-2'>{price}</div>
        <div className="p-2 daily" id={`daily-${name}`}>{daily}</div>
      </div>
      <div className='p-2'>
        <input type='checkbox' name={name} onChange={handleFavourite} id={`fav-${name}`} />
      </div>
    </div>
  );
}
