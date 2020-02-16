/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
import React from 'react';
import numeral from 'numeral';

export default function TickerBox({ name, price, daily, dispatch }) {
  function handleFavourite(evt) {
    const selectCoin = [evt.target.name];
    evt.target.checked ?
      dispatch({ type: 'ADD_FAVOURITE', item: selectCoin })
      :
      dispatch({ type: 'REMOVE_FAVOURITE', item: selectCoin });
  }

  daily = parseFloat((daily*100).toPrecision(4));
  price = numeral(parseFloat((price).toPrecision(5))).format('0,0.000');

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
