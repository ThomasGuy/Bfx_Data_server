import React from "react";
import CoinCase from "./CoinCase";

// eslint-disable-next-line react/prop-types
const App = ({ username, age }) => {
  return <CoinCase username={username} age={age} />;
};

export default App;
