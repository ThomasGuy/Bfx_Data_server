/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
/* eslint-disable no-restricted-syntax */
import React from "react";
// import PropTypes from "prop-types";
import CoinBox from "./CoinBox";

function CoinCase({ coins, favCoins }) {
  const coinlist = Object.entries(coins).map(([key, value]) => {
    return (
      <li key={key}>
        <CoinBox name={key} price={value} />
      </li>
    );
  });
  const favlist = favCoins.map(coin => {
    return (
      <li key={coin}>
        <CoinBox name={coin} />
      </li>
    );
  });

  return (
    <>
      <div className='favlist'>
        <ul>{favlist}</ul>
      </div>
      <hr />
      <div className='coinlist'>
        <ol>{coinlist}</ol>
      </div>
    </>
  );
}

// CoinCase.propTypes = {};

export default CoinCase;
