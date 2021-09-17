import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
// Provider
import { Provider } from 'react-redux';
// Store 생성
import { applyMiddleware, createStore } from 'redux';
// rootReducer import
import rootReducer from './modules';
// middleware import
import logger from 'redux-logger';

// store 생성
const store = createStore(rootReducer, applyMiddleware(logger));

ReactDOM.render(
  // App 컴포넌트를 Provider로 감싸고, store를 props로 전달
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
