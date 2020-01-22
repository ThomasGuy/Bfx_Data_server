/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
import React from "react";

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.socket = props.socket;
    this.state = {
      coindata: [],
      symbol: "coin",
    };
  }

  componentDidMount() {
    this.socket.on("connect", () => {
      console.log("Socket Connected");
    });
    this.socket.on("ticker event", data => {
      console.log("I got one!");
      if (data.symbol === "tBSVUSD") {
        this.setState({
          coindata: data.data,
          symbol: data.symbol,
        });
      }
    });
    this.socket.on("disconnect", () => {
      console.log("Disconnected server");
    });
  }

  render() {
    const { coindata, symbol } = this.state;
    return (
      <div className='sport'>
        <h1>Testing</h1>

        <h4>
          {symbol.slice(1, 4)} -- ${coindata[0]}
        </h4>
      </div>
    );
  }
}

export default Test;
