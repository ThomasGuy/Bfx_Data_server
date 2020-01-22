/* eslint-disable react/prop-types */
import React from "react";
import CoinCase from "./CoinCase";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: [],
      favCoins: [],
    };
  }

  componentDidMount() {
    const { socket } = this.props;
    socket.on("connect", () => {
      return console.log("App connected");
    });
    fetch("/api/v1/favCoins")
      .then(response => {
        return response.json();
      })
      .then(favCoins => {
        this.setState({ favCoins });
      });
  }

  render() {
    const { coins, favCoins } = this.state;
    return <CoinCase coins={coins} favCoins={favCoins} />;
  }
}

export default App;
