/* eslint-disable react/prop-types */
import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';

import Sidebar from './sidebar/Sidebar';
import Graph from './graph/Graph';
// import usePersistedState from './components/PersistedState';
// import { asyncGetData, getData } from './Utils';

const updateCheckbox = favouriteCheckBoxes => {
  if (favouriteCheckBoxes.length > 0) {
    favouriteCheckBoxes.forEach(box => {
      const el = document.getElementById(`fav-${box}`);
      if (el) el.checked = true;
    });
  }
};

const App = () => {
  const canvasRef = useRef(null);
  const [favourite, setFavourite] = useState([]);
  const [active, setActive] = useState('BTCUSD');
  const [candle, setCandle] = useState([]);
  const [coin, setCoin] = useState({});

  useEffect(() => {
    const temp = {};
    axios
      .get('/api/v1/tickers')
      .then(
        res => {
          res.data.forEach(obj => (temp[obj.symbol] = obj));
          console.log(Object.keys(temp));
        },
        error => {
          console.log(error);
        },
      )
      .then(() =>
        Object.keys(temp).map(key => setCoin(prev => ({ ...prev, [key]: { ...temp[key] } }))),
      );

    // .then(() => setCoin(prev => ({ ...prev, ...temp })));
    // return () => {
    //   console.log(favourite);
    //   axios.post('/api/v1/favCoins', { data: favourite }).then(
    //     (res => {
    //       console.log(res.data);
    //     },
    //     error => {
    //       console.log(error);
    //     }),
    //   );
    // };
  }, []);

  useEffect(() => {
    axios.get('/api/v1/favCoins').then(
      res => {
        if (res.data[0]) {
          setFavourite([...res.data]);
          updateCheckbox(res);
        }
      },
      error => console.log(error),
    );
  }, []);

  useEffect(() => {
    fetch('/api/v1/candles')
      .then(res => res.json())
      .then(res => setCandle(res))
      .catch(() => console.log('Error'));
  }, [canvasRef]);

  useEffect(() => {
    updateCheckbox(favourite);
  }, [favourite]);

  return (
    <div className='row'>
      <div className='sidebar container-fluid'>
        <Sidebar
          coin={coin}
          favCoins={favourite}
          setFavourite={setFavourite}
          active={active}
          setActive={setActive}
        />
      </div>
      <div className='col container-fluid'>
        <div className='row graph box'>
          <Graph canvasRef={canvasRef} candle={candle} />
        </div>
      </div>
    </div>
  );
};

export default App;
