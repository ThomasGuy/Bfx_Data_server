import React from 'react';

export default function TickerBox({ name, price, favCoins, setState }) {
  function handleFavourite(evt) {
    const coin = evt.target.name;
    if (evt.target.checked) {
      setState([coin, ...favCoins]);
    } else {
      setState(favCoins.filter(item => item !== coin));
    }
  }

  return (
    <div className='tickerbox' data-coin={name}>
      <div className='p-1'>{name}</div>
      <div className='p-1'>{price}</div>
      <input type='checkbox' name={name} onChange={handleFavourite} id={`fav-${name}`} />
    </div>
  );
}
