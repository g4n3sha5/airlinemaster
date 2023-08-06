import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { About } from "./components/About";
import { Home } from "./components/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import { AirPassenger, AirPassengerPage } from "./components/Passenger";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/passenger/:slug" component={AirPassengerPage} />
      </Switch>
    </Router>
  );
}

export default App;
