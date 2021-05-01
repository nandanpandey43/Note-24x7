import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app/App";
import * as serviceWorker from "./serviceWorker";
import { Route, BrowserRouter as Router } from "react-router-dom";
import SignIn from "./signin/signIn";
import SignUp from "./signup/signUp";
import Landing from "./landingpage/landing";
// import 'bootstrap/dist/css/bootstrap.min.css'



const routing = (
  <Router>
    <div id="routing-container">
      <Route path="/" component={Landing} exact />
      <Route path="/signin" component={SignIn} />
      <Route path="/app" component={App} />
      <Route path="/signup" component={SignUp} />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("note-360"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
