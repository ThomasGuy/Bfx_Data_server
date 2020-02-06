import React from 'react';

import CoinInfo from './CoinInfo';
import Tickers from './Tickers';
import Balance from './Balance';

export default function Sidebar({ coin, favCoins, setFavourite, active, setActive }) {
  return (
    <>
      <div className='row coin_title box'>
        <CoinInfo active={active} coin={coin} />
      </div>
      <div className='row coin_box box'>
        <Tickers
          coin={coin}
          favCoins={favCoins}
          setFavourite={setFavourite}
          setActive={setActive}
        />
      </div>
      <div className='row balance box'>
        <Balance />
      </div>
    </>
  );
}
