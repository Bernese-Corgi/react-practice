import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import './exercise';
// 6. provider, createStore, redux modules 불러오기
// Provider : 리액트 프로젝트에서 리덕스를 적용할 수 있다.
import { Provider } from 'react-redux';
// createStore : store를 생성하는 함수
import { createStore } from 'redux';
// modules 폴더를 불러오면 바로 modules/index.js 파일을 불러오게 된다.
import rootReducer from './modules';

// 7. store 생성하고 rootReducer를 인수로 넣는다.
const store = createStore(rootReducer);
// console.log(store.getState()); // counter와 todos의 상태를 모두 가지고 있다.

ReactDOM.render(
  // 8. Provider로 App 컴포넌트를 감싸고, store props에 store를 설정
  // 리액트 컴포넌트 어디서든지 store를 사용할 수 있다.
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
