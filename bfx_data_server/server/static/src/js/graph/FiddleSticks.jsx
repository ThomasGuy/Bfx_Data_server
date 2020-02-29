import React from 'react';

// import { createChart } from 'lightweight-charts';

export default function FiddleSticks({ candleRef, candle }) {
  // const myChart = createChart(canvasRef, {
  //   width: 600,
  //   height: 300,
  // });
  // const candleSeries = myChart.addCandleSeries({
  //   upColor: '#6495ED',
  //   downColor: '#FF6347',
  //   borderVisible: false,
  //   wickVisible: true,
  //   borderColor: '#000000',
  //   wickColor: '#000000',
  //   borderUpColor: '#4682B4',
  //   borderDownColor: '#A52A2A',
  //   wickUpColor: '#4682B4',
  //   wickDownColor: '#A52A2A',
  // });

  // candleSeries.setData(candle);

  return <div ref={candleRef}>Fiddle Sticks</div>;
}
