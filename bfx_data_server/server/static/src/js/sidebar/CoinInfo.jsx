import React from 'react';

export default function CoinInfo({ coin, active }) {
  // const current = coin.filter(item => item.symbol === active)[0];
  // console.log(current);
  return <p>{coin.active ? `${active.slice(0, 3)} : ${coin.active.last_price}` : active}</p>;
}
