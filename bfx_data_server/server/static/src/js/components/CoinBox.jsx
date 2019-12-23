/* eslint-disable react/prop-types */
import React from "react";
// import PropTypes from "prop-types";

const CoinBox = props => {
  const { name, price } = props;
  return (
    <div className='d-flex flex-row coinbox'>
      <div className='p-2'>{name}</div>
      <div className='p-2'>{price}</div>
    </div>
  );
};

// CoinBox.propTypes = {
//   name: PropTypes.string,
//   price: PropTypes.number,
// };

export default CoinBox;
