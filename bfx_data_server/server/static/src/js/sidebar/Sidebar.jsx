import React from "react";

import CoinInfo from "./CoinInfo";
import Tickers from "./Tickers";
import Balance from "./Balance";

export default function Sidebar() {
  return (
    <>
      <div className='row coin_title box'>
        <CoinInfo />
      </div>
      <div className='row coin_list box'>
        <Tickers />
      </div>
      <div className='row balance box'>
        <Balance />
      </div>
    </>
  );
}
