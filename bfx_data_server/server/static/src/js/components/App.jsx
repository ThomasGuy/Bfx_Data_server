/* eslint-disable react/prop-types */
import React from "react";
import io from "socket.io-client";
import CoinCase from "./CoinCase";

const socket = io("http://localhost:5000/main");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: [],
      favCoins: []
    };
    this.username = props.username;
    this.age = props.age;
    console.log(`Hi ${this.username} age: ${this.age}`);
  }

  componentDidMount() {
    socket.on("connect", () => {
      return console.log("connected");
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
    return <CoinCase props={this.props} coins={coins} favCoins={favCoins} />;
  }
}

export default App;
