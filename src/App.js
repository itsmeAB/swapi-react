import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
// import logo from './logo.svg';
import "./App.css";
import "antd/dist/antd.css";
import Layout from "./containers/Layout";

function App() {
  return (
    <div className="app">
      <HashRouter>
        <Switch>
          <Route path="/" name="Home" component={Layout} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
