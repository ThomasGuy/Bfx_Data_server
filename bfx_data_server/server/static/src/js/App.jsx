/* eslint-disable no-fallthrough */
/* eslint-disable react/prop-types */
import React, { useRef, useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import Sidebar from './sidebar/Sidebar';
import Graph from './graph/Graph';


const socket = io('http://localhost:5000/main');
const updateCheckbox = favouriteCheckBoxes => {
  favouriteCheckBoxes.forEach(box => {
    document.getElementById(`fav-${box}`).checked = true;
  });
};
const colorDaily = (key, val) => {
  const el = document.getElementById(`daily-${key}`)
  if (val[1] < 0) {
    (el.style.color = '#E95157');
  } else {
    (el.style.color = '#1A9451');
  };
}

// function handleFavourite(evt) {
//   const selectCoin = evt.target.name;
//   if (evt.target.checked) {
//     setFavourite(prev => [...prev, selectCoin]);
//   } else {
//     setFavourite(prev => prev.filter(item => item !== selectCoin));
//   }
// }

// function favouriteReducer (state, action) {
//   switch (action.type) {
//   case 'TICKERBOX': handleFavourite()
//   default:
//     throw new Error()
//   }
// }

const App = () => {
  const canvasRef = useRef(null);
  const [favourite, setFavourite] = useState([]);
  const [active, setActive] = useState('BTCUSD');
  const [candle, setCandle] = useState([]);
  const [coin, setCoin] = useState({});

  useEffect(() => {
    const source = axios.CancelToken.source();
    axios.all([
      axios.get('/api/v1/tickers', { cancelToken: source.token }),
      axios.get('/api/v1/favCoins', { cancelToken: source.token }),
      axios.get('/api/v1/candles', { cancelToken: source.token }),
    ])
      .then(
        responseArr => {
          setCoin({ ...responseArr[0].data });
          setFavourite([...responseArr[1].data]);
          setCandle(responseArr[2].data)
          Object.entries(responseArr[0].data).forEach(([key, val]) => {
            colorDaily(key, val);
          })
          updateCheckbox(responseArr[1].data);
        },
        error => {
          if (axios.isCancel(error)) {
            // request cancelled
          } else {
            throw error;
          }
        }
      );

    socket.on('ticker event', payload => {
      const { symbol, data } = JSON.parse(payload);
      setCoin(prev => ({ ...prev, [symbol]: data }));
      colorDaily(symbol, data);
    });
  }, []);

  useEffect(() => {
    updateCheckbox(favourite);
    return () => {
      console.log(favourite);
      axios.post('/api/v1/favCoins', { data: favourite }).then(
        (res => {
          console.log('Post: ', res.data);
        },
        error => {
          console.log(error);
        }),
      );
    };
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

// .then(() => setCoin(prev => ({ ...prev, ...temp })));
