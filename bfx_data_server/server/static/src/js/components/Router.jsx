import React from "react";
import { BrowserRouter, Route, Switch } from "react-browser-router";

import Dropdown from "react-bootstrap/Dropdown";
import App from "./App";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Dropdown} />
      <Route path="/main" component={App} />
    </Switch>
  </BrowserRouter>
);

export default Router;
