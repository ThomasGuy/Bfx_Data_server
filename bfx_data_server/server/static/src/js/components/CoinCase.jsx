/* eslint-disable no-restricted-syntax */
import React from "react";
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
      .then((response) => response.json())
      .then((data) => {
        const coins = Object.entries(data).map(([key, value]) => ({ coin: [key, value] }));
        this.setState({ coins });
      });
  }

  render() {
    const { coins } = this.state;
    const coinlist = coins.map((obj, idx) => (
      <li key={idx}>
        <CoinBox name={obj.coin[0]} price={obj.coin[1]} />
      </li>
    ));

    return (
      <div className="coinlist">
        <ol>{coinlist}</ol>
      </div>
    );
  }
}

export default CoinCase;
