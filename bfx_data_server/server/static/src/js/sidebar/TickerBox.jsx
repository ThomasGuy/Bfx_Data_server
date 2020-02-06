import React from 'react';

export default function TickerBox({ name, price, setFavourite }) {
  function handleFavourite(evt) {
    const selectCoin = evt.target.name;
    if (evt.target.checked) {
      setFavourite(prev => [...prev, selectCoin]);
    } else {
      setFavourite(prev => prev.filter(item => item !== selectCoin));
    }
  }

  return (
    <div className='tickerbox' id={`ticker-${name}`}>
      <div className='box-values' data-symbol={name}>
        <div className='p-2'>{name}</div>
        <div className='p-2'>{price}</div>
      </div>
      <div className='p-2'>
        <input type='checkbox' name={name} onChange={handleFavourite} id={`fav-${name}`} />
      </div>
    </div>
  );
}
