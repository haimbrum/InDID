import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.10.0";

// pages for this product
import VerifyPeople from "views/VerifyPeople/VerifyPeople";
import Main from "views/Main/Main";

var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/verify-people" component={VerifyPeople} />
      <Route path="/docs" component={Main} />
      <Route path="/" component={Main} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
