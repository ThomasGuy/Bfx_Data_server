/* eslint-disable react/prop-types */
import React from "react";

import Sidebar from "./sidebar/Sidebar";
import Graph from "./graph/Graph";

export default function App({ socket }) {
  return (
    <div className='row'>
      <div className='sidebar container-fluid'>
        <Sidebar />
      </div>
      <div className='col container-fluid'>
        <div className='row graph box'>
          <Graph />
        </div>
      </div>
    </div>
  );
}
