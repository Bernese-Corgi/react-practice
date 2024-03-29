import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
// Provider
import { Provider } from 'react-redux';
// Store 생성
import { applyMiddleware, createStore } from 'redux';
// import rootReducer, rootSaga
import rootReducer, { rootSaga } from './modules';
// import middleware
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

// logger 생성
const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();

// store 생성
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger, thunk, sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

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
