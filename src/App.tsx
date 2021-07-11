import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Airports from "./Pages/Airports"
import Flights from "./Pages/Flights"
import Home from "./Pages/Home";
import NavBar from "./Components/NavigationBar/NavBar";
import Admin from "./Pages/Admin";

export default function App() {
  return (
      <Router>
        <div>
        <NavBar/>
          <Switch>
            <Route exact path="/Airports">
              <Airports />
            </Route>
            <Route exact path="/Flights">
              <Flights />
            </Route>
            <Route exact path="/Admin">
              <Admin />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
  );
}