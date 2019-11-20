/* eslint-disable react/state-in-constructor */
import React, { Component } from "react";
import MySection from "./MySection";

class App extends Component {
  state = {
    name: "Thomas",
    age: 53
  };

  render() {
    const { name, age } = this.state;
    return (
      <>
        <div>
          <MySection name={name} age={age} />
        </div>
      </>
    );
  }
}

export default App;
