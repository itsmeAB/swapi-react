import React from "react";
import { BrowserRouter as Router, Route, IndexRoute } from "react-router-dom";
import Login from "../components/Login/Login";
const Root = () => (
  <Router>
    <Route path="/login" component={Login}/>
    <Route path="/swapi">
        <div>Router checking</div>
    </Route>
  </Router>
);

export default Root;
