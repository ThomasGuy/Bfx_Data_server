import React, { useRef, useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import Sidebar from './sidebar/Sidebar';
import Graph from './graph/Graph';
import appReducer, { updateCheckbox, colorDaily } from './components/reducers';

const socket = io('http://localhost:5000/main');

const App = () => {
  const [state, dispatch] = useReducer(appReducer, {
    favourite: [],
    active: 'BTCUSD',
    coins: {},
  });
  const { favourite, active, coins } = state;
  const [candle, setCandle] = useState([]);
  const candleRef = useRef(null);

  useEffect(() => {
    const source = axios.CancelToken.source();
    axios
      .all([
        axios.get('/api/v1/tickers', { cancelToken: source.token }),
        axios.get('/api/v1/favCoins', { cancelToken: source.token }),
        axios.get('/api/v1/candles', { cancelToken: source.token }),
      ])
      .then(
        responseArr => {
          dispatch({ type: 'INIT', response: { ...responseArr[0].data } });
          dispatch({ type: 'ADD_FAVOURITE', item: [...responseArr[1].data] });
          setCandle(responseArr[2].data);

          Object.entries(responseArr[0].data).forEach(([key, val]) => {
            colorDaily(key, val);
          });
          updateCheckbox(responseArr[1].data);
        },
        error => {
          if (axios.isCancel(error)) {
            // request cancelled
          } else {
            throw error;
          }
        },
      );

    socket.on('ticker event', payload => {
      dispatch({ type: 'UPDATE', response: JSON.parse(payload) });
    });
  }, []);

  // useEffect(() =>
  //   // updateCheckbox(favourite);
  //   () => {
  //     console.log(favourite);
  //     axios.post('/api/v1/favCoins', { data: favourite }).then(
  //       (res => {
  //         console.log('Post: ', res.data);
  //       },
  //       error => {
  //         console.log(error);
  //       }),
  //     );
  //   }
  // , [favourite]);

  return (
    <div className="row">
      <div className="sidebar container-fluid">
        <Sidebar coins={coins} active={active} dispatch={dispatch} />
      </div>
      <div className="col container-fluid">
        <div className="row graph box">
          <Graph candleRef={candleRef} candle={candle} />
        </div>
      </div>
    </div>
  );
};

export default App;
