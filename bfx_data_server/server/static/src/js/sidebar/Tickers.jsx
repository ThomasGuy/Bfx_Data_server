/* eslint-disable react/no-this-in-sfc */
import React from 'react';

import TickerBox from './TickerBox';

export default function Tickers({ coins, dispatch }) {
  function handleSelect() {
    const current = document.getElementsByClassName('active');
    if (current[0]) current[0].className = current[0].className.replace(' active', '');
    this.className += ' active';
    dispatch({ type: 'ACTIVATE', active: this.dataset.symbol });
  }

  const tickerList = Object.entries(coins).map(([key, value]) => (
    <div className='list-item' key={`tick-${key}`}>
      <TickerBox name={key} price={value[2]} daily={value[1]} dispatch={dispatch} />
    </div>
  ));
  const boxes = document.querySelectorAll('.box-values');
  boxes.forEach(box => box.addEventListener('click', handleSelect));

  return <div className='coin-list'>{tickerList}</div>;
}
