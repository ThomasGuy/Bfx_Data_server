import React from "react";
import { render } from "react-dom";
import App from "./components/App";
// import Conn from "./components/Conn";

const el = document.getElementById("twgcoins");
// eslint-disable-next-line react/jsx-props-no-spreading
render(<App {...el.dataset} />, el);

// render(<Conn />, document.getElementById("youwelcome"));
