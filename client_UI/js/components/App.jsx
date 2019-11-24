/* eslint-disable react/state-in-constructor */
import React, { Component } from "react";
import MySection from "./MySection";

class App extends Component {
  state = {
    name: "Sporty",
    age: 344,
  };

  render() {
    const { name, age } = this.state;
    return <MySection name={name} age={age} />;
  }
}

export default App;
