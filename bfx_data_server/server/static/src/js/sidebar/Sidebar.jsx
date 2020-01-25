import React from 'react';

import CoinInfo from './CoinInfo';
import Tickers from './Tickers';
import Balance from './Balance';

export default function Sidebar({ coins, favCoins, setState, active, setActive }) {
  return (
    <>
      <div className='row coin_title box'>
        <CoinInfo active={active} coins={coins} />
      </div>
      <div className='row coin_box box'>
        <Tickers
          coins={coins}
          favCoins={favCoins}
          setState={setState}
          active={active}
          setActive={setActive}
        />
      </div>
      <div className='row balance box'>
        <Balance />
      </div>
    </>
  );
}
