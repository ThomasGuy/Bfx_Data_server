import React from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const Conn = () => {
  socket.on("connect", () => {
    return console.log("connected");
  });
};

export default Conn;
