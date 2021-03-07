import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//Route component
import App from './App';
import reportWebVitals from './reportWebVitals';
//STRORE + PERSISTANT
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import allReducers from "../src/storeRedux/reducer/index";
require("dotenv").config();


const persistConfig = {
  key: "root",
  storage,
  // whitelist: ["products"]
}
// PERSISTEDREDUCER TAKE 2 PARAMS ONE FOR THE PERSISTCONFIG AND ALL OUR REDUCERS
const persistedReducer = persistReducer(persistConfig, allReducers);

let store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const persistor = persistStore(store)
console.log("Indexing")

ReactDOM.render(
  <Provider store={store}>
     <PersistGate persistor={persistor}>
       <App></App>
     </PersistGate>
   </Provider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

