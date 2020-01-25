/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

import Sidebar from './sidebar/Sidebar';
import Graph from './graph/Graph';

const coins = {
  BTC: 9087.34,
  ETH: 165.43,
  XRP: 0.2543,
  LTC: 58.34,
  NEO: 11.23,
  BSV: 323.45,
  EOS: 3.21,
  ETC: 8.8904,
  IOTA: 0.23344,
  XMR: 62.401,
  TRX: 0.016569,
  ZEC: 50.424,
};

const updateCheckbox = boxes => {
  boxes.forEach(el => {
    document.getElementById(`fav-${el}`).checked = true;
  });
};

export default function App({ socket }) {
  const [favourite, setFavourite] = useState([]);
  const [active, setActive] = useState('BTC');
  useEffect(() => {
    fetch('/api/v1/favCoins')
      .then(res => res.json())
      .then(res => {
        setFavourite([...res]);
        updateCheckbox(res);
      })
      .catch(() => console.log('Error'));
  }, []);

  return (
    <div className='row'>
      <div className='sidebar container-fluid'>
        <Sidebar
          coins={coins}
          favCoins={favourite}
          setState={setFavourite}
          active={active}
          setActive={setActive}
        />
      </div>
      <div className='col container-fluid'>
        <div className='row graph box'>
          <Graph />
        </div>
      </div>
    </div>
  );
}
