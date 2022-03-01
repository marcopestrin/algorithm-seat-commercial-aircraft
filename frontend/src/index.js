import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { configureStore } from "./redux/store";
import App from './App';
import reportWebVitals from './reportWebVitals';
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
