import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import configureStore from "./redux";
import "antd/dist/antd.css";
import Layout from "./containers/Layout";

const { store, persistor } = configureStore();

function App() {
  return (
    <div className="app">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <HashRouter>
            <Switch>
              <Route path="/" name="Home" component={Layout} />
            </Switch>
          </HashRouter>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
