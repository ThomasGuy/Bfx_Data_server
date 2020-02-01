import React from 'react';

import FiddleSticks from './FiddleSticks';

export default function Graph({ canvasRef, candle }) {
  return (
    <div className='container-fluid'>
      <div className='row graph-stats'>Graph Stats</div>
      <FiddleSticks canvasRef={canvasRef} candle={candle} />
    </div>
  );
}
