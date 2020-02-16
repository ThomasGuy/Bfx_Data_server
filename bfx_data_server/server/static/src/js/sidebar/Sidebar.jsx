import React from 'react';

import CoinInfo from './CoinInfo';
import Tickers from './Tickers';
import Balance from './Balance';

export default function Sidebar({ coins, dispatch, active }) {
  return (
    <>
      <div className='row coin_title box'>
        <CoinInfo active={active} coins={coins} />
      </div>
      <div className='row coin_box box'>
        <Tickers
          coins={coins}
          dispatch={dispatch} />
      </div>
      <div className='row balance box'>
        <Balance />
      </div>
    </>
  );
}
