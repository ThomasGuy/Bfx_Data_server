/* eslint-disable react/no-this-in-sfc */
/* eslint-disable react/prop-types */
import React from 'react';

import TickerBox from './TickerBox';

export default function Tickers({ coins, favCoins, setState, setActive }) {
  function handleSelect() {
    const current = document.getElementsByClassName('active');
    current[0].className = current[0].className.replace(' active', '');
    this.className += ' active';
    setActive(this.dataset.coin);
  }

  const tickerList = Object.entries(coins).map(([key, value]) => {
    return (
      <div className='list-item' key={`tick-${key}`}>
        <TickerBox
          name={key}
          price={value}
          favCoins={favCoins}
          setState={setState}
          id={`ticker-${key}`}
        />
      </div>
    );
  });
  const boxes = document.querySelectorAll('.tickerbox');
  boxes.forEach(box => box.addEventListener('click', handleSelect));

  return <div className='coin-list'>{tickerList}</div>;
}
