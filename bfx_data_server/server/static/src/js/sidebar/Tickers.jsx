/* eslint-disable camelcase */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable react/prop-types */
import React from 'react';

import TickerBox from './TickerBox';

export default function Tickers({ coin, setFavourite, setActive }) {
  function handleSelect() {
    const current = document.getElementsByClassName('active');
    current[0].className = current[0].className.replace(' active', '');
    this.className += ' active';
    setActive(this.dataset.symbol);
  }

  const tickerList = Object.keys(coin).map(key => {
    // const { symbol, last_price } = key;
    return (
      <div className='list-item' key={`tick-${key}`}>
        <TickerBox name={key} price={coin.key.last_price} setFavourite={setFavourite} />
      </div>
    );
  });
  const boxes = document.querySelectorAll('.box-values');
  boxes.forEach(box => box.addEventListener('click', handleSelect));

  return <div className='coin-list'>{tickerList}</div>;
}
