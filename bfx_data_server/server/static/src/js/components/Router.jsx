import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import CoinCase from "./CoinCase";
import NotFound from "./NotFound";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" />
      <Route path="/main" component={CoinCase} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
