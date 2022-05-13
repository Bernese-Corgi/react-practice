# Redux Middleware

- [Redux Middleware](#redux-middleware)
  - [리덕스 미들웨어란](#리덕스-미들웨어란)
    - [리듀서가 액션을 처리하기 전에 미들웨어가 할 수 있는 작업](#리듀서가-액션을-처리하기-전에-미들웨어가-할-수-있는-작업)
    - [미들웨어의 기본 구조](#미들웨어의-기본-구조)
    - [유용한 미들웨어](#유용한-미들웨어)
  - [비동기 작업을 위한 미들웨어](#비동기-작업을-위한-미들웨어)
    - [redux-thunk](#redux-thunk)
      - [thunk](#thunk)
      - [특정 시간 후 디스패치되는 함수 실습](#특정-시간-후-디스패치되는-함수-실습)
      - [웹 요청 비동기 작업 처리하기](#웹-요청-비동기-작업-처리하기)
    - [redux-saga](#redux-saga)

## 리덕스 미들웨어란

액션을 디스패치했을 때 리듀서에서 이를 처리하기에 앞서 사전에 지정된 작업들을 실행한다.

미들웨어는 액션과 리듀서 사이의 중간자이다.

### 리듀서가 액션을 처리하기 전에 미들웨어가 할 수 있는 작업

1. 전달받은 액션을 단순히 콘솔에 기록
2. 전달받은 액션 정보를 기반으로 액션을 아예 취소
3. 전달받은 액션 정보를 기반으로 다른 종류의 액션을 추가로 디스패치
4. 특정 조건에 따라 액션을 무시
5. 특정 조건에 따라 액션 정보를 가로채서 변경한 후 리듀서에게 전달
6. 특정 액션에 기반하여 새로운 액션을 여러 번 디스패치
7. 네트워크 요청과 같은 비동기 작업에 유용

### 미들웨어의 기본 구조

```jsx
const myMiddleware =
  (store /* 리덕스 스토어 인스턴스 */) =>
  (next /* 함수 형태, 액션을 전달하는 역할 */) =>
  (action /* 디스패치된 액션 */) => {
    // 미들 웨어의 기본 구조
  };

export default myMiddleware;
```

미들웨어는 함수를 반환하는 함수를 반환하는 함수이다.

**매개변수 `next`**

- 함수 형태
- `store.dispatch`와 비슷한 역할이지만, 차이가 있다.
- `next(action)`을 호출하면 그 다음 처리해야할 미들웨어에게 액션을 넘겨주고, 그 다음 미들웨어가 없다면 리듀서에게 액션을 넘겨준다.

![next함수의 action 전달](https://user-images.githubusercontent.com/72931773/133740979-e14d0fcb-b088-4b5e-b006-c258db10240b.jpg)

미들웨어 내부에서 `store.dispatch`를 사용하면 첫 번째 미들웨어부터 다시 처리한다.

미들웨어에서 next를 사용하지 않으면 액션이 리듀서에 전달되지 않는다. (액션이 무시된다.)

### 유용한 미들웨어

`redux-logger` : 콘솔에 액션과 상태를 출력해주는 미들웨어 라이브러리

`redux-thunk` : 비동기 작업을 처리할 때 가장 많이 사용하는 미들웨어. 객체가 아닌 함수 형태의 액션을 디스패치할 수 있다.

`redux-saga` : `redux-thunk` 다음으로 가장 많이 사용되는 비동기 작업 관련 미들웨어 라이브러리. 특정 액션이 디스패치되었을 때 정해진 로직에 따라 다른 액션을 디스패치시키는 규칙을 작성하여 비동기 작업을 처리할 수 있다.

## 비동기 작업을 위한 미들웨어

### redux-thunk

리덕스를 사용하는 프로젝트에서 비동기 작업을 처리할 때 가장 기본적으로 사용하는 미들웨어.

#### thunk

**thunk** : 특정 작업을 나중에 할 수 있도록 미루기 위해 함수 형태로 감싼 것

<span style="color: #a3a8a5">▾ redux-thunk에서 사용할 수 있는 thunk 함수 예시</span>

```jsx
const sampleThunk = () => (dispatch, getState) => {
  // 1. 현재 상태 참조 가능
  // 2. 새 액션 디스패치 가능
};
```

#### 특정 시간 후 디스패치되는 함수 실습

1초 뒤에 디스패치되는 `__Async` 함수를 정의하고 적용

<span style="color: #a3a8a5">▾ src/modules/counter.js</span>

```jsx
// 1초 뒤에 increase 함수 디스패치
export const increaseAsync = () => (dispatch) => {
  setTimeout(() => {
    dispatch(increase());
  }, 1000);
};

// 1초 뒤에 decrease 함수 디스패치
export const decreaseAsync = () => (dispatch) => {
  setTimeout(() => {
    dispatch(decrease());
  }, 1000);
};
```

<span style="color: #a3a8a5">▾ src/containers/CounterContainer.js</span>

```jsx
import React from 'react';
import Counter from '../components/Counter';
import { connect } from 'react-redux';
import { decreaseAsync, increaseAsync } from '../modules/counter';

const CounterContainer = ({ number, increaseAsync, decreaseAsync }) => {
  return (
    <Counter
      number={number}
      onIncrease={increaseAsync}
      onDecrease={decreaseAsync}
    />
  );
};

export default connect(
  (state) => ({
    number: state.counter,
  }),
  {
    increaseAsync,
    decreaseAsync,
  }
)(CounterContainer);
```

<span style="background-color: linen">▾ 처음에 디스패치되는 액션은 함수 형태</span>

<img src="https://user-images.githubusercontent.com/72931773/133753422-6c9ee271-ae0e-4507-a6d1-9c0a6139b8eb.png" width="45%" />

<img src="https://user-images.githubusercontent.com/72931773/133753160-8b25fc29-1d0f-4b86-b580-a53f133d857f.png" width="45%" />

<span style="background-color: linen">▾ 1초 뒤에 디스패치되는 액션은 객체 형태</span>
<img src="https://user-images.githubusercontent.com/72931773/133753504-8a43e4a5-c212-4944-a498-8581da811bca.png" width="60%" />

#### 웹 요청 비동기 작업 처리하기

<span style="color: #a3a8a5">▾ src/</span>

```jsx

```

<span style="color: #a3a8a5">▾ src/</span>

```jsx

```

---

### redux-saga

`redux-saga`는 `redux-thunk` 다음으로 많이 사용하는 비동기 작업 관련 미들웨어이다.

`redux-saga`는 `redux-thunk`에 비해서 까다로운 상황에 유리하다.

- 기존 요청을 취소 처리해야 할 때 (불필요한 중복 요청 방지)
- 특정 액션이 발생했을 때 다른 액션을 발생시키거나, API 요청 등 리덕스와 관계없는 코드를 실행할 때
- 웹소켓을 사용할 때
- API 요청 실패 시 재요청해야 할 때
