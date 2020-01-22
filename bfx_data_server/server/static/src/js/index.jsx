import React from "react";
import { render } from "react-dom";
import io from "socket.io-client";
import App from "./App";
// import Test from "./components/Test";

const socket = io("ws://localhost:5000/main");

render(<App socket={socket} />, document.getElementById("twg_coins"));
// render(<Test socket={socket} />, document.getElementById("twgsession"));
