/* eslint-disable react/prop-types */
/* eslint-disable react/state-in-constructor */
import React from "react";

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: false,
      response: {},
    };
  }

  componentDidMount() {
    const { socket } = this.props;
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("event", data => {
      // console.log('Got data:', data.symbol);
      this.setState({
        response: data,
        message: data.symbol,
      });
    });
    socket.on("disconnect", () => {
      console.log("Disconnect to server");
    });
  }

  render() {
    const { response, message } = this.state;
    return (
      <div className='sport'>
        <h1>Testing</h1>
        <h3>{message}</h3>
        <h4>{response.data}</h4>
      </div>
    );
  }
}

export default Test;
