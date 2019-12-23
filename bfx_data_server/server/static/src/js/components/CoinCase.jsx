/* eslint-disable no-restricted-syntax */
import React from "react";
// import PropTypes from "prop-types";
import CoinBox from "./CoinBox";

class CoinCase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: [],
    };
  }

  componentDidMount() {
    fetch("/api/data")
      .then(response => {
        return response.json();
      })
      .then(data => {
        const coins = Object.entries(data).map(([key, value]) => {
          return { coin: [key, value] };
        });
        this.setState({ coins });
      });
  }

  render() {
    const { coins } = this.state;
    const coinlist = coins.map((obj, idx) => {
      return (
        <li key={obj.id}>
          <CoinBox name={obj.coin[0]} price={obj.coin[1]} />
        </li>
      );
    });

    return (
      <div className='coinlist'>
        <ol>{coinlist}</ol>
      </div>
    );
  }
}

// CoinCase.propTypes = {};

export default CoinCase;
