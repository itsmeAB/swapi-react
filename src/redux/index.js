import user from "./user";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

export const appReducer = combineReducers({
  [user.name]: user.reducer
});

const config = {
  key: "app",
  whiteList: ["user"],
  storage
};

const persistedReducer = persistReducer(config, appReducer);

const middlewares = [];
middlewares.push(thunk);

const composeEnhancers = composeWithDevTools(applyMiddleware(...middlewares));

const store = createStore(persistedReducer, {}, composeEnhancers);

export default () => {
  let persistor = persistStore(store);
  return { store, persistor };
};
