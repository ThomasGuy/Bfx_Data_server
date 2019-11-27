import React from "react";
import { render } from "react-dom";
// import App from "./components/App";
import TwgLogin from "./components/TwgLogin";
import TwgRegister from "./components/TwgRegister";
import NavMenu from "./components/Dropdown";

// render(<App />, document.querySelector("#coins"));

render(<NavMenu />, document.querySelector("#twg-dropdown-nav"));
render(<TwgLogin />, document.querySelector("#twg-login"));
render(<TwgRegister />, document.querySelector("#twg-register"));
