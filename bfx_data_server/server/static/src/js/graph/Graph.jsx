import React from 'react';

import FiddleSticks from './FiddleSticks';

export default function Graph({ candleRef, candle }) {
  return (
    <div className='container-fluid'>
      <div className='row graph-stats'>Graph Stats</div>
      <FiddleSticks candleRef={candleRef} candle={candle} />
    </div>
  );
}
