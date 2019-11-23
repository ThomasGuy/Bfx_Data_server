import React from "react";
import { render } from "react-dom";
import Navigation from "./components/Navigation";
import App from "./components/App";

render(<Navigation />, document.querySelector("#topnav"));

render(<App />, document.querySelector("#test"));
